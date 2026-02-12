import { LitElement, html, css, PropertyValues } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { property, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";
import {
  mdiClose,
  mdiDotsVertical,
  mdiSwapHorizontal,
  mdiToggleSwitchOffOutline,
} from "@mdi/js";
import {
  LovelaceCard,
  LovelaceCardConfig,
  HomeAssistant,
  computeDomain,
  Schema,
  STATES_OFF,
} from "./ha";
import {
  compareByFriendlyName,
  typeKey,
  createCardElement,
  createCardElementSynchronous,
  ensureHelpersLoaded,
} from "./helpers";
import { computeLabelCallback, translateEntityState } from "./translations";
import { DOMAIN_FEATURES } from "./const";
import { StatusCard } from "./card";
import { PopupCardConfigCache, CardElementCache } from "./ha/types";

export class StatusCardPopup extends LitElement {
  @property({ type: Boolean }) public open = false;
  @property({ type: String }) public title = "";
  @property({ type: String }) public selectedDomain?: string;
  @property({ type: String }) public selectedDeviceClass?: string;
  @property({ type: String }) public content = "";
  @property({ type: Array }) public entities: HassEntity[] = [];
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public card!: StatusCard;
  @state() public _showAll = false;
  @state() public selectedGroup?: number;
  private _cardEls: Map<string, HTMLElement> = new Map();
  private _lastEntityIds: string[] = [];
  private _activeEntities: HassEntity[] = [];
  private _allEntities: HassEntity[] = [];

  public async showDialog(params: {
    title?: string;
    hass: HomeAssistant;
    entities?: HassEntity[];
    allEntities?: HassEntity[];
    content?: string;
    selectedDomain?: string;
    selectedDeviceClass?: string;
    selectedGroup?: number;
    card?: StatusCard;
    initialShowAll?: boolean;
  }): Promise<void> {
    this.title = params.title ?? this.title;
    this.hass = params.hass;
    this._activeEntities = params.entities ?? [];
    this._allEntities = params.allEntities ?? [];
    if (!params.allEntities || params.allEntities.length === 0) {
      this._allEntities = this._activeEntities;
    }

    this.entities = params.entities ?? [];
    if (params.content !== undefined) this.content = params.content;
    this.selectedDomain = params.selectedDomain;
    this.selectedDeviceClass = params.selectedDeviceClass;
    this.selectedGroup = params.selectedGroup;
    this.card = params.card as StatusCard;
    this._cardEls.clear();
    this._showAll = params.initialShowAll ?? false;
    this.open = true;
    await ensureHelpersLoaded();
    if (!customElements.get("hui-tile-card")) {
      try {
        await customElements.whenDefined("hui-tile-card");
      } catch {}
    }
    this.requestUpdate();
    try {
      await this.updateComplete;
    } catch (_) {}
    this._applyDialogStyleAfterRender();
  }

  private _applyDialogStyleAfterRender() {
    try {
      requestAnimationFrame(() => {
        try {
          this._applyDialogStyle();
        } catch (_) {}
      });
    } catch (_) {
      try {
        this._applyDialogStyle();
      } catch (_) {}
    }
  }

  private _applyDialogStyle() {
    const surface = document
      .querySelector("body > home-assistant")
      ?.shadowRoot?.querySelector("status-card-popup")
      ?.shadowRoot?.querySelector("ha-dialog")
      ?.shadowRoot?.querySelector(
        "div > div.mdc-dialog__container > div.mdc-dialog__surface"
      ) as HTMLElement | null;

    if (surface) {
      surface.style.minHeight = "unset";
      return true;
    }
    return false;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
  }

  private _onClosed = (_ev: Event) => {
    this.open = false;
    this._cardEls.clear();
    this.dispatchEvent(
      new CustomEvent("dialog-closed", {
        bubbles: true,
        composed: true,
        detail: { dialog: this },
      })
    );
    this.dispatchEvent(
      new CustomEvent("popup-closed", {
        bubbles: true,
        composed: true,
        detail: { dialog: this },
      })
    );
  };

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("popstate", this._onPopState);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._onPopState);
    this._cardEls.clear();
  }

  private _onPopState = (ev: PopStateEvent) => {
    if (this.open) {
      this._onClosed(ev);
    }
  };

  private async _createCardElement(
    hass: HomeAssistant,
    cardConfig: LovelaceCardConfig,
    isFallback = false
  ): Promise<LovelaceCard | HTMLElement> {
    return createCardElement(hass, cardConfig, isFallback);
  }

  private _getPopupCardConfig(entity: HassEntity) {
    const card = this.card;

    if (this.selectedGroup !== undefined && card._config.content?.[this.selectedGroup]) {
      const groupId = card._config.content[this.selectedGroup];
      
      const customization = card.getCustomizationForType(groupId);

      if (customization?.popup_card) {
        return {
          ...customization.popup_card,
          entity: entity.entity_id,
        } as LovelaceCardConfig;
      }
    }

    const domainFromEntity = computeDomain(entity.entity_id);
    const domain = this.selectedDomain || domainFromEntity;
    const deviceClass = this.selectedDomain
      ? this.selectedDeviceClass
      : this.hass?.states?.[entity.entity_id]?.attributes?.device_class;

    const key = typeKey(domain, deviceClass);
    const customization =
      typeof card?.getCustomizationForType === "function"
        ? card.getCustomizationForType(key)
        : undefined;
    const popupCard = customization?.popup_card;
    const resolvedType: string =
      (popupCard && typeof popupCard.type === "string" && popupCard.type) ||
      "tile";
    const baseOptions =
      resolvedType === "tile" ? DOMAIN_FEATURES[domainFromEntity] ?? {} : {};
    let overrideOptions: Record<string, unknown> = {};
    if (popupCard && typeof popupCard === "object") {
      const { type: _omitType, entity: _omitEntity, ...rest } = popupCard;
      overrideOptions = rest;
    } else {
      overrideOptions = {};
    }
    const finalConfig = {
      type: resolvedType,
      entity: entity.entity_id,
      ...baseOptions,
      ...overrideOptions,
    } as LovelaceCardConfig;

    const hash = this._configHash(finalConfig);
    const cache = this._popupCardConfigCache.get(entity.entity_id);
    if (cache && cache.hash === hash) {
      return cache.config;
    }
    this._popupCardConfigCache.set(entity.entity_id, {
      hash,
      config: finalConfig,
    });
    return finalConfig;
  }
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.open) {
      return changedProps.has("open");
    }

    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass") as HomeAssistant;
      const newHass = this.hass;

      if (
        !newHass ||
        !oldHass ||
        oldHass.themes !== newHass.themes ||
        oldHass.language !== newHass.language ||
        oldHass.localize !== newHass.localize ||
        this._hasRelevantStateChanged(oldHass, newHass)
      ) {
        const currentIds = this._getCurrentEntities()
          .map((e) => e.entity_id)
          .sort();
        const lastIds = (this._lastEntityIds || []).slice().sort();
        const same =
          currentIds.length === lastIds.length &&
          currentIds.every((id, i) => id === lastIds[i]);
        this._updateCardsHass();
        return !same;
      }
      return false;
    }
    return true;
  }

  private _hasRelevantStateChanged(
    oldHass: HomeAssistant,
    newHass: HomeAssistant
  ): boolean {
    for (const entity of this._allEntities) {
      if (
        oldHass.states[entity.entity_id] !== newHass.states[entity.entity_id]
      ) {
        return true;
      }
    }
    return false;
  }

  private _updateCardsHass(): void {
    if (!this.hass) return;
    this._cardEls.forEach((el) => {
      if ((el as LovelaceCard).hass !== this.hass) {
        try {
          (el as LovelaceCard).hass = this.hass;
        } catch (_) {}
      }
    });
  }

  private _getOrCreateCard(entity: HassEntity): HTMLElement {
    const id = entity.entity_id;
    const cfg = this._getPopupCardConfig(entity);
    const hash = this._configHash(cfg);
    const cached = this._cardElementCache.get(id);
    if (cached && cached.hash === hash) {
      (cached.el as LovelaceCard).hass = this.hass;
      this._cardEls.set(id, cached.el);
      return cached.el;
    }

    const syncEl = createCardElementSynchronous(this.hass!, cfg);
    if (syncEl) {
      if ((syncEl as LovelaceCard).hass !== this.hass) {
        (syncEl as LovelaceCard).hass = this.hass;
      }
      this._cardEls.set(id, syncEl);
      this._cardElementCache.set(id, { hash, el: syncEl });
      return syncEl;
    }

    const placeholder = document.createElement("div");
    placeholder.classList.add("card-placeholder");
    placeholder.setAttribute("data-hui-card", "");
    this._cardEls.set(id, placeholder);
    this._createCardElement(this.hass!, cfg).then((el) => {
      try {
        const current = this._cardEls.get(id);
        if (current === placeholder) {
          placeholder.replaceWith(el);
          this._cardEls.set(id, el);
          this._cardElementCache.set(id, { hash, el: el });
        }
        (el as LovelaceCard).hass = this.hass;
      } catch (_) {}
    });
    this._cardElementCache.set(id, { hash, el: placeholder });
    return placeholder;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    if (
      changedProps.has("open") ||
      changedProps.has("hass") ||
      changedProps.has("selectedDomain") ||
      changedProps.has("selectedGroup") ||
      changedProps.has("_showAll")
    ) {
      this._entities = this._getCurrentEntities();
    }
  }

  @state() private _entities: HassEntity[] = [];

  private _getUpdatedEntity(entity: HassEntity): HassEntity {
    return this.hass?.states[entity.entity_id] || entity;
  }

  private _isEntityActive(entity: HassEntity): boolean {
    const domain = this.selectedDomain || computeDomain(entity.entity_id);
    const deviceClass =
      this.selectedDeviceClass || entity.attributes.device_class;
    const key = typeKey(domain, deviceClass);
    const customization =
      typeof this.card?.getCustomizationForType === "function"
        ? this.card.getCustomizationForType(key)
        : undefined;
    const isInverted = customization?.invert === true;

    if (domain === "climate") {
      const hvacAction = entity.attributes.hvac_action;
      if (hvacAction !== undefined) {
        const active = !["idle", "off"].includes(hvacAction);
        return isInverted ? !active : active;
      }
    }

    if (domain === "humidifier") {
      const humAction = entity.attributes.action;
      if (humAction !== undefined) {
        const active = !["idle", "off"].includes(humAction);
        return isInverted ? !active : active;
      }
    }

    const isOn = !STATES_OFF.includes(entity.state);
    return isInverted ? !isOn : isOn;
  }

  private _getCurrentEntities(): HassEntity[] {
    if (!this.hass)
      return this._showAll ? this._allEntities : this._activeEntities;

    const updatedAll = this._allEntities.map((e) => this._getUpdatedEntity(e));

    if (this._showAll) {
      return updatedAll;
    }

    return updatedAll.filter((e) => this._isEntityActive(e));
  }

  private toggleAllOrOn(): void {
    this._showAll = !this._showAll;
  }

  public computeLabel = memoizeOne(
    (schema: Schema, domain?: string, deviceClass?: string): string => {
      return computeLabelCallback(this.hass!, schema, domain, deviceClass);
    }
  );

  private _handleMenuAction(e: CustomEvent) {
    const action = (e.detail.item as any).action;
    if (action === "toggle_domain") {
        this.handleAskToggleDomain();
    } else if (action === "toggle_all") {
        this.handleAskToggleAll();
    }
  }

  private handleAskToggleDomain() {
    const dialogTag = "status-card-popup-confirmation";
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag,
          dialogImport: () => customElements.whenDefined(dialogTag),
          dialogParams: {
            hass: this.hass,
            card: this.card,
            selectedDomain: this.selectedDomain,
            selectedDeviceClass: this.selectedDeviceClass,
          },
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAskToggleAll() {
    this.toggleAllOrOn();
  }

  private _stopPropagation(e: Event) {
    e.stopPropagation();
  }

  private getAreaForEntity(entity: HassEntity): string {
    const entry = this.hass?.entities[entity.entity_id];
    if (entry) {
      if (entry.area_id) {
        return entry.area_id;
      }
      if (entry.device_id) {
        const device = this.hass?.devices[entry.device_id];
        if (device && device.area_id) {
          return device.area_id;
        }
      }
    }
    return "unassigned";
  }

  private _isActive(e: HassEntity): boolean {
    return !STATES_OFF.includes(e.state);
  }

  private _popupCardConfigCache = new Map<string, PopupCardConfigCache>();
  private _cardElementCache = new Map<string, CardElementCache>();
  private _sortEntitiesMemo = memoizeOne(
    (
      entities: HassEntity[],
      mode: string,
      locale: string,
      hassStates: HomeAssistant["states"]
    ) => {
      const arr = entities.slice();
      if (mode === "state") {
        const cmp = compareByFriendlyName(hassStates, locale);
        return arr.sort((a, b) => {
          const aActive = this._isActive(a) ? 0 : 1;
          const bActive = this._isActive(b) ? 0 : 1;
          if (aActive !== bActive) return aActive - bActive;
          const aDom = computeDomain(a.entity_id);
          const bDom = computeDomain(b.entity_id);
          const aState = this.hass
            ? translateEntityState(this.hass, a.state, aDom)
            : a.state;
          const bState = this.hass
            ? translateEntityState(this.hass, b.state, bDom)
            : b.state;
          const s = (aState || "").localeCompare(bState || "");
          if (s !== 0) return s;
          return cmp(a.entity_id, b.entity_id);
        });
      }
      const cmp = compareByFriendlyName(hassStates, locale);
      return arr.sort((a, b) => cmp(a.entity_id, b.entity_id));
    }
  );
  private _configHash(obj: unknown): string {
    return JSON.stringify(obj);
  }

  private _getGroupCustomization() {
    if (this.selectedGroup !== undefined && this.card._config.content?.[this.selectedGroup]) {
      const groupId = this.card._config.content[this.selectedGroup];
      return this.card.getCustomizationForType(groupId);
    }
    return undefined;
  }

  private sortEntitiesForPopup(entities: HassEntity[]): HassEntity[] {
    const customization = this._getGroupCustomization();
    const mode = customization?.popup_sort || this.card._config?.popup_sort || "name";
    return this._sortEntitiesMemo(
      entities,
      mode,
      this.hass?.locale?.language ?? "en",
      this.hass?.states ?? {}
    );
  }

  private groupAndSortEntities = memoizeOne(
    (
      entities: HassEntity[],
      areaMap: Map<string, string>,
      sortEntities: (ents: HassEntity[]) => HassEntity[]
    ): Array<[string, HassEntity[]]> => {
      const groups = new Map<string, HassEntity[]>();
      for (const entity of entities) {
        const areaId = this.getAreaForEntity(entity);
        if (!groups.has(areaId)) {
          groups.set(areaId, []);
        }
        groups.get(areaId)!.push(entity);
      }

      const sortedGroups = Array.from(groups.entries()).sort(
        ([areaIdA], [areaIdB]) => {
          const nameA =
            areaMap.get(areaIdA)?.toLowerCase() ??
            (areaIdA === "unassigned" ? "unassigned" : areaIdA);
          const nameB =
            areaMap.get(areaIdB)?.toLowerCase() ??
            (areaIdB === "unassigned" ? "unassigned" : areaIdB);
          return nameA.localeCompare(nameB);
        }
      );

      return sortedGroups.map(([areaId, ents]) => [areaId, sortEntities(ents)]);
    }
  );

  protected render() {
    if (!this.open) return html``;

    const customization = this._getGroupCustomization();
    const isListMode = customization?.list_mode ?? this.card.list_mode;
    const columnsConfig = customization?.columns ?? this.card._config.columns ?? 4;
    const columns = isListMode ? 1 : columnsConfig;
    
    const domain = this.selectedDomain!;
    const deviceClass = this.selectedDeviceClass;
    const group = this.selectedGroup;
    const card = this.card;
    const areaMap = new Map<string, string>();

    const hassAreas = this.hass?.areas ?? [];
    const arr = Array.isArray(hassAreas) ? hassAreas : Object.values(hassAreas);
    for (const a of arr) {
      if (a && a.area_id && a.name) areaMap.set(a.area_id, a.name);
    }

    let ents: HassEntity[] = this._entities;
    let isNoGroup = false;

    if (group === undefined && domain) {
      isNoGroup = true;
    }

    const flatSorted = this.sortEntitiesForPopup(ents);
    const currentIdsSet = new Set(ents.map((e) => e.entity_id));
    Array.from(this._cardEls.keys()).forEach((key) => {
      if (!currentIdsSet.has(key)) this._cardEls.delete(key);
    });
    this._lastEntityIds = ents.map((e) => e.entity_id);

    const sortedGroups = this.groupAndSortEntities(
      ents,
      areaMap,
      this.sortEntitiesForPopup.bind(this)
    );

    const ungroupAreas =
      customization?.ungroup_areas === true ||
      card?._config?.ungroupAreas === true ||
      card?._config?.ungroup_areas === true ||
      (card?._config?.area_grouping !== undefined &&
        card?._config?.area_grouping === false);

    const maxCardsPerArea = sortedGroups.length
      ? Math.max(...sortedGroups.map(([, ents]) => ents.length))
      : 0;
    const displayColumns = !ungroupAreas
      ? Math.min(columns, Math.max(1, maxCardsPerArea))
      : Math.min(columns, Math.max(1, ents.length));

    const key = typeKey(domain, deviceClass);
    const domainCustomization =
      typeof card?.getCustomizationForType === "function"
        ? card.getCustomizationForType(key)
        : undefined;
    const isInverted = domainCustomization?.invert === true;

    return html`
      <ha-dialog
        .open=${this.open}
        hideActions
        @closed=${this._onClosed}
        style="--columns: ${displayColumns};"
      >
        <div class="dialog-header">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass!.localize("ui.common.close")}
            .path=${mdiClose}
            @click=${this._onClosed}
          ></ha-icon-button>
          <h3>
            ${(() => {
              const group = this.selectedGroup;
              const card = this.card;
              if (group !== undefined && card._config?.content?.[group]) {
                const groupId = card._config.content[group];
                return (
                  this.hass!.localize(
                    "ui.panel.lovelace.editor.card.entities.name"
                  ) +
                  " in " +
                  groupId
                );
              }
              return this.selectedDomain && this.selectedDeviceClass
                ? this.computeLabel(
                    { name: "header" },
                    this.selectedDomain,
                    this.selectedDeviceClass
                  )
                : this.computeLabel(
                    { name: "header" },
                    this.selectedDomain || undefined
                  );
            })()}
          </h3>

          ${isNoGroup
            ? html`
                <ha-dropdown
                  slot="actionItems"
                  placement="bottom-end"
                  @wa-select=${this._handleMenuAction}
                  @closed=${this._stopPropagation}
                >
                  <ha-icon-button
                    slot="trigger"
                    .label=${this.hass!.localize("ui.common.menu")}
                    .path=${mdiDotsVertical}
                  ></ha-icon-button>

                  <ha-dropdown-item
                    graphic="icon"
                    .action=${"toggle_domain"}
                  >
                    <ha-svg-icon
                      slot="icon"
                      .path=${mdiToggleSwitchOffOutline}
                    ></ha-svg-icon>
                    ${isInverted
                      ? this.hass!.localize("ui.card.common.turn_on")
                      : this.hass!.localize("ui.card.common.turn_off")}
                  </ha-dropdown-item>

                  <ha-dropdown-item
                    graphic="icon"
                    .action=${"toggle_all"}
                  >
                    <ha-svg-icon
                      slot="icon"
                      .path=${mdiSwapHorizontal}
                    ></ha-svg-icon>
                    ${this.hass!.localize("ui.card.common.toggle") +
                    " " +
                    this.hass!.localize(
                      "component.sensor.entity_component._.state_attributes.state_class.state.total"
                    ) +
                    " " +
                    this.hass!.localize(
                      "ui.panel.lovelace.editor.card.entities.name"
                    )}
                  </ha-dropdown-item>
                </ha-dropdown>
              `
            : ""}
        </div>
        <div class="dialog-content scrollable">
          ${this.card?.list_mode
            ? !ungroupAreas
              ? html`
                  <ul class="entity-list">
                    ${repeat(
                      sortedGroups,
                      ([areaId]) => areaId,
                      ([areaId, groupEntities]) => {
                        const areaName =
                          areaMap.get(areaId) ??
                          (areaId === "unassigned" ? "Unassigned" : areaId);
                        return html`
                          <li class="entity-item">
                            <h4>${areaName}:</h4>
                            <ul>
                              ${repeat(
                                groupEntities,
                                (entity) => entity.entity_id,
                                (entity) =>
                                  html`<li class="entity-item">
                                    - ${entity.entity_id}
                                  </li>`
                              )}
                            </ul>
                          </li>
                        `;
                      }
                    )}
                  </ul>
                `
              : html`
                  <ul class="entity-list">
                    ${repeat(
                      flatSorted,
                      (entity) => entity.entity_id,
                      (entity) =>
                        html`<li class="entity-item">- ${entity.entity_id}</li>`
                    )}
                  </ul>
                `
            : !ungroupAreas
            ? html`${sortedGroups.map(([areaId, groupEntities]) => {
                const areaName =
                  areaMap.get(areaId) ??
                  (areaId === "unassigned" ? "Unassigned" : areaId);
                return html`
                  <div class="cards-wrapper">
                    <h4>${areaName}</h4>
                    <div class="entity-cards">
                      ${repeat(
                        groupEntities,
                        (entity) => entity.entity_id,
                        (entity) => html`
                          <div class="entity-card">
                            ${this._getOrCreateCard(entity)}
                          </div>
                        `
                      )}
                    </div>
                  </div>
                `;
              })}`
            : html`
                <h4></h4>
                <div class="entity-cards">
                  ${repeat(
                    flatSorted,
                    (entity) => entity.entity_id,
                    (entity) => html`
                      <div class="entity-card">
                        ${this._getOrCreateCard(entity)}
                      </div>
                    `
                  )}
                </div>
              `}
          ${ents.length === 0 ? this.content : ""}
        </div>
      </ha-dialog>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }

    ha-dialog {
      --dialog-content-padding: 12px;
      --mdc-dialog-min-width: calc((var(--columns, 4) * 22.5vw) + 3vw);
      --mdc-dialog-max-width: 96vw;
      box-sizing: border-box;
      overflow-x: auto;
    }

    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      min-width: 15vw;
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      background: transparent;
    }
    .dialog-header h3 {
      flex-grow: 1;
      margin: 0;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content.scrollable {
      margin-bottom: 16px;
      max-height: 80vh;
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .dialog-content.scrollable::-webkit-scrollbar {
      display: none;
    }
    .dialog-actions {
      text-align: right;
    }
    .cards-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      overflow-x: auto;
    }
    .entity-list {
      list-style: none;
      padding: 0 8px;
      margin: 0;
    }
    .entity-list .entity-item {
      list-style: none;
      margin: 0.2em 0;
    }
    h4 {
      width: 100%;
      padding-left: 1.5em;
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.6em 0;
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--columns, 4), 22.5vw);
      gap: 4px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
    }
    .entity-card {
      width: 22.5vw;
      box-sizing: border-box;
    }
    @media (max-width: 1200px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 30vw;
      }
      .entity-cards {
        grid-template-columns: repeat(3, 30vw);
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 900px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(2, 45vw);
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 700px) {
      ha-dialog {
        --dialog-content-padding: 8px;
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-card {
        width: 92vw;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 0.3em;
        box-sizing: border-box;
      }
    }
  `;
}

customElements.define("status-card-popup", StatusCardPopup);

class StatusCardPopupConfirmation extends LitElement {
  @property({ type: Boolean }) public open = false;
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public card?: StatusCard;
  @property({ type: String }) public selectedDomain?: string;
  @property({ type: String }) public selectedDeviceClass?: string;

  public showDialog(params: {
    hass: HomeAssistant;
    card: StatusCard;
    selectedDomain?: string;
    selectedDeviceClass?: string;
  }): void {
    this.hass = params.hass;
    this.card = params.card;
    this.selectedDomain = params.selectedDomain;
    this.selectedDeviceClass = params.selectedDeviceClass;
    this.open = true;
    this.requestUpdate();
  }

  private _onClosed = () => {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("dialog-closed", { bubbles: true, composed: true })
    );
  };

  private _confirm = () => {
    try {
      this.card?.toggleDomain?.(this.selectedDomain, this.selectedDeviceClass);
    } catch (_) {}
    this._onClosed();
  };

  protected render() {
    if (!this.open || !this.hass || !this.card) return html``;

    const domain = this.selectedDomain || "";
    const deviceClass = this.selectedDeviceClass;
    const key = typeKey(domain, deviceClass);
    const customization = this.card?.getCustomizationForType?.(key);
    const isInverted = customization?.invert === true;

    return html`
      <ha-dialog
        .open=${this.open}
        heading="${isInverted
          ? this.hass.localize("ui.card.common.turn_on") + "?"
          : this.hass.localize("ui.card.common.turn_off") + "?"}"
        @closed=${this._onClosed}
      >
        <div>
          ${this.hass.localize(
            "ui.panel.lovelace.cards.actions.action_confirmation",
            {
              action: isInverted
                ? this.hass.localize("ui.card.common.turn_on")
                : this.hass.localize("ui.card.common.turn_off"),
            }
          )}
        </div>
        <ha-button
          appearance="plain"
          slot="secondaryAction"
          dialogAction="close"
        >
          ${this.hass.localize("ui.common.no")}
        </ha-button>
        <ha-button
          appearance="accent"
          slot="primaryAction"
          @click=${this._confirm}
        >
          ${this.hass.localize("ui.common.yes")}
        </ha-button>
      </ha-dialog>
    `;
  }

  static styles = css``;
}

customElements.define(
  "status-card-popup-confirmation",
  StatusCardPopupConfirmation
);
