import { LitElement, html, css, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { LovelaceCard, HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { Schema } from "./helpers";
import {
  mdiClose,
  mdiDotsVertical,
  mdiSwapHorizontal,
  mdiToggleSwitchOffOutline,
} from "@mdi/js";
import { computeLabelCallback, translateEntityState } from "./translations";
import memoizeOne from "memoize-one";
import { _formatDomain } from "./helpers";
import { filterEntitiesByRuleset } from "./smart_groups";
import { AreaRegistryEntry } from "./helpers";

const OFF_STATES = new Set([
  "off",
  "idle",
  "not_home",
  "closed",
  "locked",
  "standby",
  "disarmed",
  "unknown",
  "unavailable",
]);

export class PopupDialog extends LitElement {
  @property({ type: Boolean }) public open = false;
  @property({ type: String }) public title = "";
  @property({ type: String }) public selectedDomain?: string;
  @property({ type: String }) public selectedDeviceClass?: string;
  @property({ type: String }) public content = "";
  @property({ type: Array }) public entities: HassEntity[] = [];
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public card!: LovelaceCard & {
    areas?: AreaRegistryEntry[];
    entities?: any[];
    devices?: any[];
    _config?: any;
    selectedGroup?: number | null;
    selectedDomain?: string | null;
    getCustomizationForType?: (type: string) => any;
    _totalEntities?: (...args: any[]) => HassEntity[];
    _isOn?: (...args: any[]) => HassEntity[];
    _shouldShowTotalEntities?: (...args: any[]) => boolean;
    list_mode?: boolean;
  };
  @state() public _showAll = false;
  @state() public selectedGroup?: number;
  private _cardEls: Map<string, HTMLElement> = new Map();
  private _lastEntityIds: string[] = [];

  public showDialog(params: {
    title?: string;
    hass: HomeAssistant;
    entities?: HassEntity[];
    content?: string;
    selectedDomain?: string;
    selectedDeviceClass?: string;
    selectedGroup?: number;
    card?: unknown;
  }): void {
    this.title = params.title ?? this.title;
    this.hass = params.hass;
    this.entities = params.entities ?? [];
    if (params.content !== undefined) this.content = params.content;
    this.selectedDomain = params.selectedDomain;
    this.selectedDeviceClass = params.selectedDeviceClass;
    this.selectedGroup = params.selectedGroup;
    this.card = params.card as LovelaceCard & { areas?: AreaRegistryEntry[] };
    this._cardEls.clear();
    this.open = true;
    this.requestUpdate();
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

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cardEls.clear();
  }

  private _toTileConfig(cardConfig: {
    type: string;
    entity?: string;
    [k: string]: any;
  }) {
    return {
      type: "tile",
      entity: cardConfig.entity,
    };
  }

  private async _createCardElement(
    hass: HomeAssistant,
    cardConfig: { type: string; entity?: string; [key: string]: any },
    isFallback = false
  ): Promise<LovelaceCard | HTMLElement> {
    try {
      const helpers = await (window as any)?.loadCardHelpers?.();
      if (helpers?.createCardElement) {
        const el = helpers.createCardElement(cardConfig) as LovelaceCard;
        (el as any).hass = hass;
        (el as any).setAttribute?.("data-hui-card", "");
        return el;
      }
    } catch {}

    try {
      const type = cardConfig.type || "tile";
      const isCustom = typeof type === "string" && type.startsWith("custom:");
      const tag = isCustom ? type.slice(7) : `hui-${type}-card`;

      if (isCustom && !(customElements as any).get(tag)) {
        await customElements.whenDefined(tag).catch(() => {});
      }

      const el = document.createElement(tag) as LovelaceCard;

      if (typeof el.setConfig === "function") {
        el.setConfig(cardConfig);
      }

      (el as any).hass = hass;
      (el as any).setAttribute?.("data-hui-card", "");
      return el;
    } catch {
      if (!isFallback) {
        return this._createCardElement(
          hass,
          this._toTileConfig(cardConfig),
          true
        );
      }
      const empty = document.createElement("div");
      empty.setAttribute("data-hui-card", "");
      return empty;
    }
  }

  private _getPopupCardConfig(entity: HassEntity) {
    const card: any = this.card;
    const domainFromEntity = entity.entity_id.split(".")[0];

    const domain = this.selectedDomain || domainFromEntity;
    const deviceClass = this.selectedDomain
      ? this.selectedDeviceClass
      : (this.hass?.states?.[entity.entity_id]?.attributes as any)?.device_class;

    const key = deviceClass
      ? `${_formatDomain(domain)} - ${deviceClass}`
      : domain;

    const customization =
      typeof card?.getCustomizationForType === "function"
        ? card.getCustomizationForType(key)
        : undefined;

    const popupCard = customization?.popup_card as any | undefined;

    const resolvedType: string =
      (popupCard && typeof popupCard.type === "string" && popupCard.type) ||
      customization?.popup_card_type ||
      "tile";

    const baseOptions =
      resolvedType === "tile"
        ? (this.DOMAIN_FEATURES as any)[domainFromEntity] ?? {}
        : {};

    let overrideOptions: any = {};
    if (popupCard && typeof popupCard === "object") {
      const { type: _omitType, entity: _omitEntity, ...rest } = popupCard;
      overrideOptions = rest;
    } else {
      overrideOptions = customization?.popup_card_options ?? {};
    }

    const finalConfig = {
      type: resolvedType,
      entity: entity.entity_id,
      ...baseOptions,
      ...overrideOptions,
    } as any;

    return finalConfig;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.open) {
      return changedProps.has("open");
    }
    if (changedProps.size === 1 && changedProps.has("hass")) {
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
    return true;
  }

  private _updateCardsHass(): void {
    if (!this.hass) return;
    this._cardEls.forEach((el) => {
      try {
        (el as any).hass = this.hass;
      } catch (_) {}
    });
  }

  private _getOrCreateCard(entity: HassEntity): HTMLElement {
    const id = entity.entity_id;
    const existing = this._cardEls.get(id);
    if (existing) {
      try {
        (existing as any).hass = this.hass;
      } catch (_) {}
      return existing;
    }
    const placeholder = document.createElement("div");
    placeholder.classList.add("card-placeholder");
    placeholder.setAttribute("data-hui-card", "");
    this._cardEls.set(id, placeholder);

    const cfg = this._getPopupCardConfig(entity);
    this._createCardElement(this.hass!, cfg).then((el) => {
      try {
        const current = this._cardEls.get(id);
        if (current === placeholder) {
          placeholder.replaceWith(el as any);
          this._cardEls.set(id, el as any);
        }
        (el as any).hass = this.hass;
      } catch (_) {}
    });
    return placeholder;
  }

  private _getCurrentEntities(): HassEntity[] {
    const card = this.card as any;
    const domain = this.selectedDomain!;
    const deviceClass = this.selectedDeviceClass;
    const group = this.selectedGroup;

    let ents: HassEntity[] = [];

    if (group !== undefined && card._config?.content?.[group]) {
      const groupId = card._config.content[group];
      const ruleset = card._config.rulesets?.find(
        (g: any) => g.group_id === groupId
      );
      ents = ruleset ? filterEntitiesByRuleset(card, ruleset) : [];
    } else {
      if (domain) {
        const shouldShowTotal =
          typeof card?._shouldShowTotalEntities === "function"
            ? card._shouldShowTotalEntities(domain, deviceClass)
            : false;
        const showAllEntities = shouldShowTotal ? true : this._showAll;

        ents = showAllEntities
          ? card._totalEntities(domain, deviceClass)
          : card._isOn(domain, deviceClass);
      } else {
        ents = Array.isArray(this.entities) ? this.entities : [];
      }
    }
    return ents;
  }

  private toggleAllOrOn(): void {
    this._showAll = !this._showAll;
  }

  public computeLabel = memoizeOne(
    (schema: Schema, domain?: string, deviceClass?: string): string => {
      return computeLabelCallback(this.hass!, schema, domain, deviceClass);
    }
  );

  private handleAskToggleDomain(e: MouseEvent) {
    e.stopPropagation();

    const dialogTag = "popup-dialog-confirmation";
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

  private handleAskToggleAll(e: MouseEvent) {
    e.stopPropagation();
    this.toggleAllOrOn();
  }

  private _stopPropagation(e: Event) {
    e.stopPropagation();
  }

  private getAreaForEntity(entity: HassEntity): string {
    const entry = this.card.entities?.find(
      (e: any) => e.entity_id === entity.entity_id
    );
    if (entry) {
      if (entry.area_id) {
        return entry.area_id;
      }
      if (entry.device_id) {
        const device = this.card.devices?.find(
          (d: any) => d.id === entry.device_id
        );
        if (device && device.area_id) {
          return device.area_id;
        }
      }
    }
    return "unassigned";
  }

  private _getEntityName(e: HassEntity): string {
    return (
      (e.attributes && (e.attributes as any).friendly_name) ||
      e.entity_id
    ).toString();
  }

  private _isActive(e: HassEntity): boolean {
    return !OFF_STATES.has(e.state);
  }

  private sortEntitiesForPopup(entities: HassEntity[]): HassEntity[] {
    const mode = (this.card as any)?._config?.popup_sort || "name";
    const arr = entities.slice();
    if (mode === "state") {
      return arr.sort((a, b) => {
        const aActive = this._isActive(a) ? 0 : 1;
        const bActive = this._isActive(b) ? 0 : 1;
        if (aActive !== bActive) return aActive - bActive;
        const aDom = a.entity_id.split(".")[0];
        const bDom = b.entity_id.split(".")[0];
        const aState = this.hass
          ? translateEntityState(this.hass, a.state, aDom)
          : a.state;
        const bState = this.hass
          ? translateEntityState(this.hass, b.state, bDom)
          : b.state;
        const s = (aState || "").localeCompare(bState || "");
        if (s !== 0) return s;
        return this._getEntityName(a)
          .toLowerCase()
          .localeCompare(this._getEntityName(b).toLowerCase());
      });
    }
    return arr.sort((a, b) =>
      this._getEntityName(a)
        .toLowerCase()
        .localeCompare(this._getEntityName(b).toLowerCase())
    );
  }

  private groupAndSortEntities = memoizeOne(
    (
      entities: HassEntity[],
      areas: AreaRegistryEntry[] | undefined,
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

    const columns = (this.card as any)?.list_mode
      ? 1
      : (this.card as any)?._config?.columns || 4;
    const domain = this.selectedDomain!;
    const deviceClass = this.selectedDeviceClass;
    const group = this.selectedGroup;
    const card = this.card as any;
    const shouldShowTotal =
      typeof card?._shouldShowTotalEntities === "function"
        ? card._shouldShowTotalEntities(domain, deviceClass)
        : false;
    const showAllEntities = shouldShowTotal ? true : this._showAll;
    const areaMap = new Map<string, string>(
      card.areas?.map((a: any) => [a.area_id, a.name])
    );

    let ents: HassEntity[] = [];
    let isNoGroup = false;

    if (group !== undefined && card._config?.content?.[group]) {
      const groupId = card._config.content[group];
      const ruleset = card._config.rulesets?.find(
        (g: any) => g.group_id === groupId
      );
      ents = ruleset ? filterEntitiesByRuleset(card, ruleset) : [];
    } else {
      if (domain) {
        ents = showAllEntities
          ? card._totalEntities(domain, deviceClass)
          : card._isOn(domain, deviceClass);
      } else {
        ents = Array.isArray(this.entities) ? this.entities : [];
      }
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
      card.areas,
      areaMap,
      this.sortEntitiesForPopup.bind(this)
    );

    const ungroupAreas =
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

    const key = deviceClass
      ? `${_formatDomain(domain)} - ${deviceClass}`
      : domain;
    const customization =
      typeof card?.getCustomizationForType === "function"
        ? card.getCustomizationForType(key)
        : undefined;
    const isInverted = customization?.invert === true;

    return html`
      <ha-dialog
        .open=${this.open}
        hideActions
        @closed=${this._onClosed}
        style="--columns: ${displayColumns};"
      >
        <style>
          ${PopupDialog.styles}
        </style>
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
              const card: any = this.card;
              if (group !== undefined && card?._config?.content?.[group]) {
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
                <ha-button-menu
                  class="menu-button"
                  slot="actionItems"
                  fixed
                  corner="BOTTOM_END"
                  menu-corner="END"
                  @closed=${this._stopPropagation}
                >
                  <ha-icon-button
                    slot="trigger"
                    .label=${this.hass!.localize("ui.common.menu")}
                    .path=${mdiDotsVertical}
                  ></ha-icon-button>

                  <ha-list-item
                    graphic="icon"
                    @click=${this.handleAskToggleDomain}
                    @closed=${this._stopPropagation}
                  >
                    ${isInverted
                      ? this.hass!.localize("ui.card.common.turn_on")
                      : this.hass!.localize("ui.card.common.turn_off")}
                    <ha-svg-icon
                      slot="graphic"
                      .path=${mdiToggleSwitchOffOutline}
                    ></ha-svg-icon>
                  </ha-list-item>

                  <ha-list-item
                    graphic="icon"
                    @click=${this.handleAskToggleAll}
                    @closed=${this._stopPropagation}
                  >
                    ${this.hass!.localize("ui.card.common.toggle") +
                    " " +
                    this.hass!.localize(
                      "component.sensor.entity_component._.state_attributes.state_class.state.total"
                    ) +
                    " " +
                    this.hass!.localize(
                      "ui.panel.lovelace.editor.card.entities.name"
                    )}
                    <ha-svg-icon
                      slot="graphic"
                      .path=${mdiSwapHorizontal}
                    ></ha-svg-icon>
                  </ha-list-item>
                </ha-button-menu>
              `
            : ""}
        </div>
        <div class="dialog-content">
          ${this.card?.list_mode
            ? !ungroupAreas
              ? html`
                  <ul class="entity-list">
                    ${sortedGroups.map(([areaId, groupEntities]) => {
                      const areaName =
                        areaMap.get(areaId) ??
                        (areaId === "unassigned" ? "Unassigned" : areaId);
                      return html`
                        <li class="entity-item">
                          <h4>${areaName}:</h4>
                          <ul>
                            ${groupEntities.map(
                              (entity) => html`
                                <li class="entity-item">
                                  - ${entity.entity_id}
                                </li>
                              `
                            )}
                          </ul>
                        </li>
                      `;
                    })}
                  </ul>
                `
              : html`
                  <ul class="entity-list">
                    ${flatSorted.map(
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
                      ${groupEntities.map(
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
                <div class="entity-cards">
                  ${flatSorted.map(
                    (entity) => html` <div class="entity-card">
                      ${this._getOrCreateCard(entity)}
                    </div>`
                  )}
                </div>
              `}
          ${ents.length === 0 ? this.content : ""}
        </div>
      </ha-dialog>
    `;
  }

  private DOMAIN_FEATURES: Record<string, any> = {
    alarm_control_panel: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "alarm-modes",
          modes: [
            "armed_home",
            "armed_away",
            "armed_night",
            "armed_vacation",
            "armed_custom_bypass",
            "disarmed",
          ],
        },
      ],
    },
    light: {
      state_content: ["state", "brightness", "last_changed"],
      features: [{ type: "light-brightness" }],
    },
    cover: {
      state_content: ["state", "position", "last_changed"],
      features: [{ type: "cover-open-close" }, { type: "cover-position" }],
    },
    vacuum: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "vacuum-commands",
          commands: [
            "start_pause",
            "stop",
            "clean_spot",
            "locate",
            "return_home",
          ],
        },
      ],
    },
    climate: {
      state_content: ["state", "current_temperature", "last_changed"],
      features: [
        {
          type: "climate-hvac-modes",
          hvac_modes: [
            "auto",
            "heat_cool",
            "heat",
            "cool",
            "dry",
            "fan_only",
            "off",
          ],
        },
      ],
    },
    water_heater: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "water-heater-operation-modes",
          operation_modes: [
            "electric",
            "gas",
            "heat_pump",
            "eco",
            "performance",
            "high_demand",
            "off",
          ],
        },
      ],
    },
    humidifier: {
      state_content: ["state", "current_humidity", "last_changed"],
      features: [{ type: "target-humidity" }],
    },
    media_player: {
      show_entity_picture: true,
      state_content: ["state", "volume_level", "last_changed"],
      features: [{ type: "media-player-playback" }],
    },
    lock: {
      state_content: ["state", "last_changed"],
      features: [{ type: "lock-commands" }],
    },
    fan: {
      state_content: ["state", "percentage", "last_changed"],
      features: [{ type: "fan-speed" }],
    },
    counter: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "counter-actions",
          actions: ["increment", "decrement", "reset"],
        },
      ],
    },
    lawn_mower: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "lawn-mower-commands",
          commands: ["start_pause", "dock"],
        },
      ],
    },
    update: {
      state_content: ["state", "latest_version", "last_changed"],
      features: [{ type: "update-actions", backup: "ask" }],
    },
    switch: {
      state_content: ["state", "last_changed"],
      features: [{ type: "toggle" }],
    },
    input_boolean: {
      state_content: ["state", "last_changed"],
      features: [{ type: "toggle" }],
    },
    calendar: {
      state_content: "message",
    },
    timer: {
      state_content: ["state", "remaining_time"],
    },
    binary_sensor: {
      state_content: ["state", "last_changed"],
    },
    device_tracker: {
      state_content: ["state", "last_changed"],
    },
    remote: {
      state_content: ["state", "last_changed"],
    },
    valve: {
      state_content: ["state", "last_changed"],
      features: [{ type: "valve-open-close" }],
    },
  };

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
      --mdc-dialog-max-width: calc((var(--columns, 4) * 22.5vw) + 5vw);
      box-sizing: border-box;
      overflow-x: auto;
    }

    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      min-width: 15vw;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content {
      margin-bottom: 16px;
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
      width: calc(var(--columns, 4) * 22.5vw);
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.8em 0.2em;
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
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(var(--columns, 2), 45vw);
      }
      h4 {
        width: calc(var(--columns, 2) * 45vw);
        margin: 0.8em 0.2em;
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
        width: 100%;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  `;
}

customElements.define("popup-dialog", PopupDialog);

class PopupDialogConfirmation extends LitElement {
  @property({ type: Boolean }) public open = false;
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public card?: any;
  @property({ type: String }) public selectedDomain?: string;
  @property({ type: String }) public selectedDeviceClass?: string;

  public showDialog(params: {
    hass: HomeAssistant;
    card: any;
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
    const key = deviceClass
      ? `${_formatDomain(domain)} - ${deviceClass}`
      : domain;
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

customElements.define("popup-dialog-confirmation", PopupDialogConfirmation);
