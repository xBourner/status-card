import { LitElement, html, css, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import memoizeOne from "memoize-one";
import type { HassEntity } from "home-assistant-js-websocket";
import "./popup-dialog";
import { computeLabelCallback } from "./translations";
import {
  getIncludedEntityIds,
  mapIdsToStates,
  typeKey,
  cacheByProperty,
} from "./helpers";
import { ALLOWED_DOMAINS } from "./const";
import {
  HomeAssistant,
  computeDomain,
  hasAction,
  ActionHandlerEvent,
  actionHandler,
  applyThemesOnElement,
  LovelaceCardConfig,
  STATES_OFF,
  Schema,
  EntityRegistryEntry,
  DeviceRegistryEntry,
  AreaRegistryEntry,
} from "./ha";
import {
  computeExtraItems,
  computeGroupItems,
  computeDomainItems,
  computeDeviceClassItems,
  getPersonEntityIds,
  mapPersonIdsToStates,
} from "./card-items";
import {
  Ruleset,
  DomainItem,
  DeviceClassItem,
  ExtraItem,
  AnyItem,
  GroupItem,
  StatusCardLike,
  StatusCardPopupDialogParams,
} from "./ha/types";
import {
  filterEntitiesByRuleset,
  filterStaticEntities,
  filterDynamicEntities,
} from "./smart_groups";
import {
  getBackgroundColor,
  getCustomColor,
  getCustomIcon,
  getCustomName,
  getCustomizationForType,
  getStatusProperty,
  getIconStyles,
  customizationIndex,
} from "./card-styles";
import { handleDomainAction, toggleDomain } from "./card-actions";
import { mdiFormatListGroup } from "@mdi/js";

@customElement("status-card")
export class StatusCard extends LitElement {
  @property({ type: Object }) public _config!: LovelaceCardConfig;
  @state() private entitiesByDomain: { [domain: string]: HassEntity[] } = {};
  @state() public selectedDomain: string | null = null;
  @state() public selectedDeviceClass: string | null = null;
  @state() public hiddenEntities: string[] = [];
  @state() private hiddenLabels: string[] = [];
  @state() private hiddenAreas: string[] = [];
  @state() private hide_person: boolean = false;
  @state() private hide_content_name: boolean = true;
  @state() public list_mode: boolean = false;
  @state() public badge_mode: boolean = false;
  @state() public no_background: boolean = false;
  @state() public badge_color: string = "";
  @state() public badge_text_color: string = "";
  @state() public selectedGroup: number | null = null;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() public _shouldHideCard: boolean = false;
  @state() public __registryEntities: EntityRegistryEntry[] = [];
  @state() public __registryDevices: DeviceRegistryEntry[] = [];
  @state() public __registryAreas: AreaRegistryEntry[] = [];
  @state() private __registryFetchInProgress: boolean = false;

  private _ensureRegistryData(): void {
    if (
      this.__registryEntities.length ||
      !this.hass ||
      typeof this.hass.callWS !== "function" ||
      this.__registryFetchInProgress
    ) {
      return;
    }

    this.__registryFetchInProgress = true;
    Promise.all([
      cacheByProperty<EntityRegistryEntry>(this.hass, "entity", "entity_id"),
      cacheByProperty<DeviceRegistryEntry>(this.hass, "device", "id"),
      cacheByProperty<AreaRegistryEntry>(this.hass, "area", "area_id"),
    ])
      .then(([entityMap, deviceMap, areaMap]) => {
        this.__registryEntities = Object.values(entityMap);
        this.__registryDevices = Object.values(deviceMap);
        this.__registryAreas = Object.values(areaMap);
      })
      .catch((e) => {
        console.error("Error fetching registry data", e);
      })
      .finally(() => {
        this.__registryFetchInProgress = false;
        this.requestUpdate();
      });
  }

  getCardSize() {
    return 2;
  }

  getGridOptions() {
    return {
      rows: 2,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return false;
    if (changedProps.has("_config")) return true;
    if (changedProps.has("selectedDomain")) return true;
    if (changedProps.has("selectedDeviceClass")) return true;
    if (changedProps.has("selectedGroup")) return true;
    if (changedProps.has("list_mode")) return true;
    if (changedProps.has("badge_mode")) return true;
    if (changedProps.has("_showAll")) return true;
    if (changedProps.has("_shouldHideCard")) return true;
    if (changedProps.has("__registryEntities")) return true;
    if (changedProps.has("__registryDevices")) return true;
    if (changedProps.has("__registryAreas")) return true;

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (!oldHass || !this.hass) return true;

    if (oldHass.themes !== this.hass.themes) return true;
    if (oldHass.states !== this.hass.states) return true;
    if (oldHass.localize !== this.hass.localize) return true;
    if (oldHass.language !== this.hass.language) return true;

    return false;
  }

  private _processEntities(): void {
    const entitiesByDomain = this._entitiesByDomain();
    if (entitiesByDomain !== this.entitiesByDomain) {
      this.entitiesByDomain = entitiesByDomain;
    }
  }

  private _computeIncludedIdsMemo = memoizeOne(
    (
      entities: HomeAssistant["entities"] | undefined,
      devices: HomeAssistant["devices"] | undefined,
      areas: HomeAssistant["areas"] | undefined,
      area: LovelaceCardConfig["area"] | null,
      floor: LovelaceCardConfig["floor"] | null,
      label: LovelaceCardConfig["label"] | null,
      hiddenAreas: string[],
      hiddenLabels: string[],
      hiddenEntities: string[]
    ) =>
      getIncludedEntityIds(
        entities || {},
        devices || {},
        areas || {},
        {
          area,
          floor,
          label,
          hiddenAreas,
          hiddenLabels,
          hiddenEntities,
        },
        ALLOWED_DOMAINS
      )
  );

  private _mapIdsToStatesMemo = memoizeOne(
    (includedIds: string[], states: HomeAssistant["states"]) =>
      mapIdsToStates(includedIds, states),
    (newArgs, oldArgs) => {
      const [newIds, newStates] = newArgs;
      const [oldIds, oldStates] = oldArgs;

      if (newIds !== oldIds) return false;

      for (const id of newIds) {
        if (newStates[id] !== oldStates[id]) return false;
      }

      return true;
    }
  );

  private _customizationIndexMemo = memoizeOne(customizationIndex);

  private _computePersonIdsMemo = memoizeOne(getPersonEntityIds);

  private _mapPersonIdsToStatesMemo = memoizeOne(
    (ids: string[], states: HomeAssistant["states"]) =>
      mapPersonIdsToStates(ids, states),
    (newArgs, oldArgs) => {
      const [newIds, newStates] = newArgs;
      const [oldIds, oldStates] = oldArgs;

      if (newIds !== oldIds) return false;

      for (const id of newIds) {
        if (newStates[id] !== oldStates[id]) return false;
      }

      return true;
    }
  );

  private _computeExtraItemsMemo = memoizeOne(
    computeExtraItems,
    (newArgs, oldArgs) => {
      const [newCfg, newStates, newCustMap] = newArgs;
      const [oldCfg, oldStates, oldCustMap] = oldArgs;

      if (newCfg !== oldCfg || newCustMap !== oldCustMap) return false;

      const extraEntities = newCfg.extra_entities as string[] | undefined;
      if (!extraEntities) return true;

      for (const id of extraEntities) {
        if (newStates[id] !== oldStates[id]) return false;
      }

      return true;
    }
  );

  private _computeGroupItemsMemo = memoizeOne(computeGroupItems);
  private _computeDomainItemsMemo = memoizeOne(computeDomainItems);
  private _computeDeviceClassItemsMemo = memoizeOne(computeDeviceClassItems);

  public _computeEntityMap = memoizeOne(
    (entities: EntityRegistryEntry[]) =>
      new Map(entities.map((e) => [e.entity_id, e]))
  );
  public _computeDeviceMap = memoizeOne(
    (devices: DeviceRegistryEntry[]) => new Map(devices.map((d) => [d.id, d]))
  );
  public _computeAreaMap = memoizeOne(
    (areas: AreaRegistryEntry[]) => new Map(areas.map((a) => [a.area_id, a]))
  );

  private _computeGroupCandidatesMemo = memoizeOne(
    (
      rulesets: Ruleset[],
      entities: EntityRegistryEntry[],
      devices: DeviceRegistryEntry[],
      areas: AreaRegistryEntry[],
      hiddenEntities: string[]
    ): Map<string, string[]> => {
      const map = new Map();
      const entityMap = this._computeEntityMap(entities);
      const deviceMap = this._computeDeviceMap(devices);
      const areaMap = this._computeAreaMap(areas);

      rulesets.forEach((rs) => {
        const candidates = filterStaticEntities(
          rs,
          entities,
          devices,
          areas,
          hiddenEntities,
          entityMap,
          deviceMap,
          areaMap
        );
        map.set(rs.group_id, candidates);
      });
      return map;
    }
  );

  private _computeGroupResultsMemo = memoizeOne(
    (
      candidatesMap: Map<string, string[]>,
      states: HomeAssistant["states"],
      rulesets: Ruleset[],
      entities: EntityRegistryEntry[],
      devices: DeviceRegistryEntry[],
      areas: AreaRegistryEntry[]
    ): Map<string, HassEntity[]> => {
      const map = new Map();
      const fakeCard = {
        __registryEntities: entities,
        __registryDevices: devices,
        __registryAreas: areas,
        hass: { states },
      } as StatusCardLike;

      const entityMap = this._computeEntityMap(entities);
      const deviceMap = this._computeDeviceMap(devices);
      const areaMap = this._computeAreaMap(areas);

      rulesets.forEach((rs) => {
        const candidates = candidatesMap.get(rs.group_id) || [];
        const results = filterDynamicEntities(
          fakeCard,
          rs,
          candidates,
          states,
          entityMap,
          deviceMap,
          areaMap
        );
        map.set(rs.group_id, results);
      });
      return map;
    }
  );

  private _entitiesByDomain(): { [domain: string]: HassEntity[] } {
    const entities = this.hass.entities || [];
    const devices = this.hass.devices || [];
    const areas = this.hass.areas || [];
    const states = this.hass?.states || {};

    const area = this._config?.area || null;
    const floor = this._config?.floor || null;
    const label = this._config?.label || null;
    const hiddenAreas = this.hiddenAreas;
    const hiddenLabels = this.hiddenLabels;
    const hiddenEntities = this.hiddenEntities;

    const includedIds = this._computeIncludedIdsMemo(
      entities,
      devices,
      areas,
      area,
      floor,
      label,
      hiddenAreas,
      hiddenLabels,
      hiddenEntities
    );

    return this._mapIdsToStatesMemo(includedIds, states);
  }

  private _baseEntitiesMemo = memoizeOne(
    (all: HassEntity[], domain: string, deviceClass?: string): HassEntity[] => {
      return all.filter((entity) => {
        const st = entity.state;
        if (st === "unavailable" || st === "unknown") return false;
        const dc = entity.attributes.device_class;
        if (domain === "switch") {
          if (deviceClass === "outlet") return dc === "outlet";
          if (deviceClass === "switch")
            return dc === "switch" || dc === undefined;
          return true;
        }
        return !deviceClass || dc === deviceClass;
      });
    }
  );

  private _baseEntities(domain: string, deviceClass?: string): HassEntity[] {
    const all = this._entitiesByDomain()[domain] || [];
    return this._baseEntitiesMemo(all, domain, deviceClass);
  }

  public _totalEntities(domain: string, deviceClass?: string): HassEntity[] {
    return this._baseEntities(domain, deviceClass);
  }

  public _shouldShowTotalEntities(
    domain: string,
    deviceClass?: string
  ): boolean {
    if (this._config.show_total_entities) return true;

    const key = typeKey(domain, deviceClass);
    const customization = this.getCustomizationForType(key);
    return customization?.show_total_entities === true;
  }
  public _shouldShowTotalNumbers(
    domain: string,
    deviceClass?: string
  ): boolean {
    if (this._config.show_total_number) return true;

    const key = typeKey(domain, deviceClass);
    const customization = this.getCustomizationForType(key);
    return customization?.show_total_number === true;
  }

  public _isOn(domain: string, deviceClass?: string): HassEntity[] {
    const ents = this._baseEntities(domain, deviceClass);

    const key = typeKey(domain, deviceClass);
    const customization = this.getCustomizationForType(key);
    const isInverted = customization?.invert === true;

    return ents.filter((entity) => {
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

      let isOn = !STATES_OFF.includes(entity.state);

      return isInverted ? !isOn : isOn;
    });
  }

  public setConfig(config: LovelaceCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    this._config = config;
    this.hide_person =
      config.hide_person !== undefined ? config.hide_person : false;
    this.hide_content_name =
      config.hide_content_name !== undefined ? config.hide_content_name : false;
    this.list_mode = config.list_mode !== undefined ? config.list_mode : false;
    this.badge_mode = !!config.badge_mode;
    this.no_background = !!config.no_background;
    this.badge_color = config.badge_color || "";
    this.badge_text_color = config.badge_text_color || "";
    this.hiddenEntities = config.hidden_entities || [];
    this.hiddenLabels = config.hidden_labels || [];
    this.hiddenAreas = config.hidden_areas || [];
  }

  private _showPopup(
    element: HTMLElement,
    dialogTag: string,
    dialogParams: StatusCardPopupDialogParams
  ): void {
    element.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag,
          dialogImport: () => customElements.whenDefined(dialogTag),
          dialogParams,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  public computeLabel = memoizeOne(
    (schema: Schema, domain?: string, deviceClass?: string): string => {
      return computeLabelCallback(this.hass, schema, domain, deviceClass);
    }
  );

  private _openDomainPopup(domain: string | number) {
    let title = "Details";
    if (typeof domain === "string") {
      title =
        getCustomName(this._config, domain) ||
        this.computeLabel({ name: domain });
    } else if (typeof domain === "number" && this._config.content?.[domain]) {
      title = this._config.content[domain];
    }

    let entities: HassEntity[] = [];
    let allEntities: HassEntity[] = [];

    if (typeof domain === "number") {
      const groupId = this._config.content?.[domain];
      const ruleset = this._config.rulesets?.find(
        (g) => g.group_id === groupId
      );
      if (ruleset) {
        const entityMap = this._computeEntityMap(this.__registryEntities);
        const deviceMap = this._computeDeviceMap(this.__registryDevices);
        const areaMap = this._computeAreaMap(this.__registryAreas);
        allEntities = filterEntitiesByRuleset(
          this,
          ruleset,
          entityMap,
          deviceMap,
          areaMap
        );
        entities = allEntities.filter((e) => {
          if (computeDomain(e.entity_id) === "climate") {
            const hvacAction = e.attributes.hvac_action;
            if (hvacAction !== undefined) {
              return !["idle", "off"].includes(hvacAction);
            }
          }
          return !STATES_OFF.includes(e.state);
        });
      } else {
        entities = [];
        allEntities = [];
      }
    } else {
      const deviceClass = this.selectedDeviceClass || undefined;
      allEntities = this._totalEntities(domain, deviceClass);
      entities = this._isOn(domain, deviceClass);
    }

    const dialogTag = "status-card-popup";
    this._showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      entities,
      allEntities, 
      selectedDomain: typeof domain === "string" ? domain : undefined,
      selectedDeviceClass: this.selectedDeviceClass || undefined,
      selectedGroup: this.selectedGroup || undefined,
      card: this,
      content: entities.length ? undefined : `Keine Entitäten`,
    });
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);

    if (!this._config || !this.hass) return;

    if (
      changedProps.has("hass") ||
      changedProps.has("_config") ||
      changedProps.has("hiddenEntities") ||
      changedProps.has("hiddenLabels") ||
      changedProps.has("hiddenAreas")
    ) {
      this._processEntities();
      this._updateShouldHideCard();
    }
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (!this._config || !this.hass) return;

    this._ensureRegistryData();

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as
      | LovelaceCardConfig
      | undefined;

    if (changedProps.has("selectedDomain") && this.selectedDomain) {
      const domain = this.selectedDomain;
      if (domain.includes(".")) {
        const entityId = domain;
        const stateObj = this.hass.states[entityId];
        if (stateObj) {
          this.showMoreInfo(stateObj);
        }
      } else {
        this._openDomainPopup(domain);
      }
      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }

    if (changedProps.has("selectedGroup") && this.selectedGroup !== null) {
      const group = this.selectedGroup;
      this._openDomainPopup(group);
      setTimeout(() => {
        this.selectedGroup = null;
      }, 0);
    }

    if (
      (changedProps.has("hass") &&
        (!oldHass || oldHass.themes !== this.hass.themes)) ||
      (changedProps.has("_config") &&
        (!oldConfig || oldConfig.theme !== this._config.theme))
    ) {
      applyThemesOnElement(
        this,
        this.hass.themes,
        this._config.theme,
        undefined,
        true
      );
    }
  }

  private showMoreInfo(entity: HassEntity): void {
    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: entity.entity_id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _hasContent(): boolean {
    if (this.getPersonItems().length > 0) {
      return true;
    }
    if (this.getExtraItems().length > 0) {
      return true;
    }

    const candidatesMap = this._computeGroupCandidatesMemo(
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.hiddenEntities
    );

    const allGroupEntities = this._computeGroupResultsMemo(
      candidatesMap,
      this.hass.states,
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas
    );

    const hasGroupContent = this.getGroupItems().some(
      (g) => (allGroupEntities.get(g.group_id) || []).length > 0
    );
    if (hasGroupContent) {
      return true;
    }

    const domainAndDeviceClassItems = [
      ...this.getDomainItems(),
      ...this.getDeviceClassItems(),
    ];

    const hasDomainContent = domainAndDeviceClassItems.some((item) => {
      const domain = item.domain;
      const devClass = (item as DeviceClassItem).deviceClass || undefined;
      const showAll = this._shouldShowTotalEntities(domain, devClass);
      const entities = showAll
        ? this._totalEntities(domain, devClass)
        : this._isOn(domain, devClass);
      return entities.length > 0;
    });
    if (hasDomainContent) {
      return true;
    }

    return false;
  }

  private _updateShouldHideCard(): void {
    if ((this._config.hide_card_if_empty ?? false) !== true) {
      this._shouldHideCard = false;
      return;
    }

    this._shouldHideCard = !this._hasContent();
  }

  private getPersonItems(): HassEntity[] {
    const ids = this._computePersonIdsMemo(
      this.hass.entities,
      this.hiddenEntities,
      this.hiddenLabels,
      this.hide_person
    );
    return this._mapPersonIdsToStatesMemo(ids, this.hass.states);
  }

  public getExtraItems(): ExtraItem[] {
    if (!this._config || !this.hass) {
      return [];
    }
    return this._computeExtraItemsMemo(
      this._config,
      this.hass.states,
      this._customizationIndexMemo(this._config.customization)
    );
  }

  private getGroupItems(): GroupItem[] {
    return this._computeGroupItemsMemo(
      this._config.content || [],
      this._config.rulesets || []
    );
  }

  private getDomainItems(): DomainItem[] {
    return this._computeDomainItemsMemo(this._config.content || []);
  }

  private getDeviceClassItems(): DeviceClassItem[] {
    return this._computeDeviceClassItemsMemo(this._config.content || []);
  }
  public toggleDomain(domain?: string, deviceClass?: string): void {
    domain = domain ?? this.selectedDomain!;
    deviceClass = deviceClass ?? this.selectedDeviceClass!;
    const entities = this._isOn(domain, deviceClass);
    toggleDomain(this.hass, entities, domain, deviceClass);
  }

  private _handleDomainAction(
    domain: string,
    deviceClass?: string
  ): (ev: ActionHandlerEvent) => void {
    return (ev: ActionHandlerEvent) => {
      handleDomainAction(
        this,
        this.hass,
        this._config,
        domain,
        deviceClass,
        ev,
        {
          showMoreInfo: (entityId) => {
            const stateObj = this.hass.states[entityId];
            if (stateObj) this.showMoreInfo(stateObj);
          },
          toggleDomain: (d, dc) => this.toggleDomain(d, dc),
          selectDomain: (d, dc) => {
            this.selectedDomain = d;
            this.selectedDeviceClass = dc || null;
          },
        }
      );
    };
  }

  public getCustomizationForType(type: string): LovelaceCardConfig | undefined {
    return getCustomizationForType(
      this._config,
      type,
      this._customizationIndexMemo(this._config.customization)
    );
  }

  private _getIconStyles(
    type: "person" | "extra" | "domain" | "deviceClass",
    options: {
      color?: string;
      background_color?: string;
      square?: boolean;
      isNotHome?: boolean;
    } = {}
  ) {
    return getIconStyles(type, options);
  }

  private renderExtraTab(item: ExtraItem): TemplateResult {
    const { panel, icon, name, color, icon_css, background_color } = item;
    const stateObj = this.hass.states[panel];
    const customization = this.getCustomizationForType(panel);
    const handler = this._handleDomainAction(panel);
    const ah = actionHandler({
      hasHold: hasAction(
        customization?.hold_action ?? this._config.hold_action
      ),
      hasDoubleClick: hasAction(
        customization?.double_tap_action ?? this._config.double_tap_action
      ),
    });

    const contentClasses = {
      horizontal: this._config.content_layout === "horizontal",
    };

    const iconStyles = this._getIconStyles("extra", {
      color,
      background_color,
      square: this._config.square,
    });

    const stateContent = customization?.state_content ?? undefined;
    const showBadge = customization?.badge_mode ?? this.badge_mode;

    const badgeColor =
      customization?.badge_color || this.badge_color || undefined;
    const badgeTextColor =
      customization?.badge_text_color || this.badge_text_color || undefined;

    const badgeStyles = {
      "--status-card-badge-color": badgeColor
        ? `var(--${badgeColor}-color)`
        : undefined,
      "--status-card-badge-text-color": badgeTextColor
        ? `var(--${badgeTextColor}-color)`
        : undefined,
    };

    return html`
      <ha-tab-group-tab
        slot="nav"
        panel=${panel}
        @action=${handler}
        .actionHandler=${ah}
        class=${showBadge ? "badge-mode" : ""}
        style=${styleMap(badgeStyles)}
        data-badge=${ifDefined(showBadge ? "1" : undefined)}
      >
        <div class="extra-entity ${classMap(contentClasses)}">
          <div class="entity-icon" style=${styleMap(iconStyles)}>
            ${icon.startsWith("/") || icon.startsWith("http")
        ? html`<img
                  src=${icon}
                  alt=${name}
                  style="border-radius:${this._config.square
            ? "20%"
            : "50%"};object-fit:cover;"
                />`
        : icon.startsWith("M")
          ? html`<ha-svg-icon
                  .path=${icon}
                  style="${icon_css || ""}"
                ></ha-svg-icon>`
          : html`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                  .icon=${icon}
                  data-domain=${computeDomain(panel)}
                  data-state=${stateObj.state}
                  style="${icon_css || ""}"
                ></ha-state-icon>`}
          </div>

          ${!this.badge_mode
        ? html`<div class="entity-info">
                ${!this.hide_content_name
            ? html`<div class="entity-name">${name}</div>`
            : ""}
                <div class="entity-state">
                  <state-display
                    .stateObj=${stateObj}
                    .hass=${this.hass}
                    .content=${stateContent}
                    .name=${name}
                  ></state-display>
                </div>
              </div>`
        : ""}
        </div>
      </ha-tab-group-tab>
    `;
  }

  private renderGroupTab(ruleset: Ruleset, index: number): TemplateResult {
    const candidatesMap = this._computeGroupCandidatesMemo(
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.hiddenEntities
    );

    const allGroupEntities = this._computeGroupResultsMemo(
      candidatesMap,
      this.hass.states,
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas
    );
    const entities = allGroupEntities.get(ruleset.group_id) || [];

    if (!entities.length) return html``;

    const groupId =
      ruleset.group_id ||
      `${this.hass!.localize("component.group.entity_component._.name")} ${index + 1
      }`;
    const groupIcon = ruleset.group_icon || mdiFormatListGroup;
    const color = getCustomColor(
      this._config,
      groupId,
      undefined,
      this._customizationIndexMemo(this._config.customization)
    );
    const background_color = getBackgroundColor(
      this._config,
      groupId,
      undefined,
      this._customizationIndexMemo(this._config.customization)
    );

    const handler = () => {
      this.selectedGroup = index;
    };

    const ah = actionHandler({
      hasHold: false,
      hasDoubleClick: false,
    });

    const contentClasses = {
      horizontal: this._config.content_layout === "horizontal",
    };

    const iconStyles = this._getIconStyles("domain", {
      color,
      background_color,
      square: this._config.square,
    });

    const badgeStyles = {
      "--status-card-badge-color": this.badge_color
        ? `var(--${this.badge_color}-color)`
        : undefined,
      "--status-card-badge-text-color": this.badge_text_color
        ? `var(--${this.badge_text_color}-color)`
        : undefined,
    };

    return html`
      <ha-tab-group-tab
        slot="nav"
        panel=${"group-" + index}
        @action=${handler}
        .actionHandler=${ah}
        class=${this.badge_mode ? "badge-mode" : ""}
        style=${styleMap(badgeStyles)}
        data-badge=${ifDefined(
      this.badge_mode && entities.length > 0
        ? String(entities.length)
        : undefined
    )}
      >
        <div class="entity ${classMap(contentClasses)}">
          <div class="entity-icon" style=${styleMap(iconStyles)}>
            ${groupIcon.startsWith("M")
        ? html`<ha-svg-icon .path=${groupIcon}></ha-svg-icon>`
        : html`<ha-icon icon=${groupIcon}></ha-icon>`}
          </div>
          ${!this.badge_mode
        ? html`<div class="entity-info">
                ${!this.hide_content_name
            ? html`<div class="entity-name">${groupId}</div>`
            : ""}
                <div class="entity-state">
                  ${entities.length}
                  ${ruleset.group_status ? ` ${ruleset.group_status}` : ""}
                </div>
              </div>`
        : ""}
        </div>
      </ha-tab-group-tab>
    `;
  }

  private renderItemTab(item: DomainItem | DeviceClassItem): TemplateResult {
    const domain = item.domain;
    const deviceClass = (item as DeviceClassItem).deviceClass;

    const active = this._isOn(domain, deviceClass);
    const total = this._totalEntities(domain, deviceClass);
    const showTotal = this._shouldShowTotalEntities(domain, deviceClass);
    const entities = showTotal ? total : active;
    if (!entities.length) return html``;

    const color = getCustomColor(
      this._config,
      domain,
      deviceClass,
      this._customizationIndexMemo(this._config.customization)
    );
    const customization = this.getCustomizationForType(
      typeKey(domain, deviceClass)
    );

    const handler = this._handleDomainAction(domain, deviceClass);
    const ah = actionHandler({
      hasHold: hasAction(
        customization?.hold_action ?? this._config.hold_action
      ),
      hasDoubleClick: hasAction(
        customization?.double_tap_action ?? this._config.double_tap_action
      ),
    });

    const contentClasses = {
      horizontal: this._config.content_layout === "horizontal",
    };

    const iconStyles = this._getIconStyles("domain", {
      color,
      background_color: getBackgroundColor(
        this._config,
        domain,
        deviceClass,
        this._customizationIndexMemo(this._config.customization)
      ),
      square: this._config.square,
    });

    const name =
      getCustomName(this._config, domain, deviceClass) ||
      this.computeLabel({ name: deviceClass || domain });

    let stateText;
    if (this._shouldShowTotalNumbers(domain, deviceClass)) {
      stateText = `${active.length}/${total.length} ${getStatusProperty(
        this.hass,
        this._config,
        domain,
        deviceClass
      )}`;
    } else if (this._shouldShowTotalEntities(domain, deviceClass)) {
      stateText = `${total.length}`;
    } else {
      stateText = `${active.length} ${getStatusProperty(
        this.hass,
        this._config,
        domain,
        deviceClass
      )}`;
    }

    const badgeColor =
      customization?.badge_color || this.badge_color || undefined;
    const badgeTextColor =
      customization?.badge_text_color || this.badge_text_color || undefined;

    const badgeStyles = {
      "--status-card-badge-color": badgeColor
        ? `var(--${badgeColor}-color)`
        : undefined,
      "--status-card-badge-text-color": badgeTextColor
        ? `var(--${badgeTextColor}-color)`
        : undefined,
    };

    const showBadge = customization?.badge_mode ?? this.badge_mode;

    return html`
      <ha-tab-group-tab
        slot="nav"
        panel=${deviceClass || domain}
        @action=${handler}
        .actionHandler=${ah}
        class=${showBadge ? "badge-mode" : ""}
        style=${styleMap(badgeStyles)}
        data-badge=${ifDefined(
      showBadge && entities.length > 0 ? String(entities.length) : undefined
    )}
      >
        <div class="entity ${classMap(contentClasses)}">
          <div class="entity-icon" style=${styleMap(iconStyles)}>
            ${(() => {
              const icon = getCustomIcon(this._config, domain, deviceClass);
              return icon.startsWith("M")
                ? html`<ha-svg-icon .path=${icon}></ha-svg-icon>`
                : html`<ha-icon icon=${icon}></ha-icon>`;
            })()}
          </div>
          ${!showBadge
        ? html`<div class="entity-info">
                ${!this.hide_content_name
            ? html`<div class="entity-name">${name}</div>`
            : ""}
                <div class="entity-state">${stateText}</div>
              </div>`
        : ""}
        </div>
      </ha-tab-group-tab>
    `;
  }

  private _computeSortedEntities = memoizeOne(
    (
      extra: ExtraItem[],
      group: GroupItem[],
      domain: DomainItem[],
      deviceClass: DeviceClassItem[]
    ): AnyItem[] =>
      [...extra, ...group, ...domain, ...deviceClass].sort(
        (a, b) => a.order - b.order
      )
  );

  protected renderTab(item: AnyItem): TemplateResult {
    switch (item.type) {
      case "extra":
        return this.renderExtraTab(item);

      case "group":
        return this.renderGroupTab(item.ruleset, item.order);
      case "domain":
      case "deviceClass":
        return this.renderItemTab(item);
    }
  }

  protected render() {
    const extra = this.getExtraItems();
    const group = this.getGroupItems();
    const domain = this.getDomainItems();
    const deviceClass = this.getDeviceClassItems();

    const sorted = this._computeSortedEntities(
      extra,
      group,
      domain,
      deviceClass
    );

    const personEntities = this.getPersonItems();

    if (this._shouldHideCard) {
      this.hidden = true;
      return html``;
    }
    this.hidden = false;

    const noScroll = {
      "no-scroll": !!this._config.no_scroll,
      "badge-mode": this.badge_mode,
      "no-background": this.no_background,
    };
    return html`
      <ha-card class=${classMap(noScroll)}>
        <ha-tab-group without-scroll-controls class=${classMap(noScroll)}>
          <ha-tab-group-tab style="display:none" active></ha-tab-group-tab>
          ${repeat(
      personEntities,
      (entity) => entity.entity_id,
      (entity) => {
        const entityState = this.hass!.states[entity.entity_id];
        const isNotHome = entityState?.state !== "home";
        const contentClasses = {
          horizontal: this._config.content_layout === "horizontal",
        };
        const iconStyles = {
          "border-radius": this._config?.square ? "20%" : "50%",
          filter: isNotHome ? "grayscale(100%)" : "none",
        };

        const personHomeColor = this._config.person_home_color;
        const personAwayColor = this._config.person_away_color;
        const personHomeIcon =
          this._config.person_home_icon || "mdi:home";
        const personAwayIcon =
          this._config.person_away_icon || "mdi:home-export-outline";

        const badgeColor = isNotHome
          ? personAwayColor || "red"
          : personHomeColor || "green";

        const badgeIcon = isNotHome ? personAwayIcon : personHomeIcon;

        return html`
                <ha-tab-group-tab
                  slot="nav"
                  panel=${entity.entity_id}
                  @click="${() => this.showMoreInfo(entity)}"
                  class=${this.badge_mode ? "badge-mode" : ""}
                >
                  ${this.badge_mode
            ? html`<div
                        class="person-badge"
                        style=${styleMap({
              "--status-card-badge-color": badgeColor
                ? `var(--${badgeColor}-color)`
                : undefined,
              "--status-card-badge-text-color": this
                .badge_text_color
                ? `var(--${this.badge_text_color}-color)`
                : undefined,
            })}
                      >
                        ${badgeIcon.startsWith("M")
                ? html`<ha-svg-icon .path=${badgeIcon}></ha-svg-icon>`
                : html`<ha-icon icon=${badgeIcon}></ha-icon>`}
                      </div>`
            : ""}
                  <div class="entity ${classMap(contentClasses)}">
                    <div class="entity-icon" style=${styleMap(iconStyles)}>
                      ${entity.attributes.entity_picture
            ? html`<img
                            src=${entity.attributes.entity_picture}
                            alt=${entity.attributes.friendly_name ||
              entity.entity_id}
                            style=${styleMap(iconStyles)}
                          />`
            : entity.attributes.icon?.startsWith("M")
              ? html`<ha-svg-icon
                            class="center"
                            .path=${entity.attributes.icon}
                            style=${styleMap(iconStyles)}
                          ></ha-svg-icon>`
              : html`<ha-icon
                            class="center"
                            icon=${entity.attributes.icon || "mdi:account"}
                            style=${styleMap(iconStyles)}
                          ></ha-icon>`}
                    </div>
                    ${!this.badge_mode
            ? html`<div class="entity-info">
                          ${!this.hide_content_name
                ? html`<div class="entity-name">
                                ${entity.attributes.friendly_name?.split(
                  " "
                )[0] || ""}
                              </div>`
                : ""}
                          <div class="entity-state">
                            ${getStatusProperty(
                  this.hass!,
                  this._config,
                  "person",
                  undefined,
                  entityState?.state
                )}
                          </div>
                        </div>`
            : ""}
                  </div>
                </ha-tab-group-tab>
              `;
      }
    )}
          ${repeat(
      sorted,
      (i) =>
        i.type === "extra"
          ? i.panel
          : i.type === "domain"
            ? i.domain
            : i.type === "deviceClass"
              ? `${i.domain}-${i.deviceClass}`
              : i.type === "group"
                ? `group-${i.group_id}`
                : "",
      (i) => this.renderTab(i)
    )}
        </ha-tab-group>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host-context(hui-badge[preview]) {
        max-width: 500px;
        overflow: hidden;
        display: block;
      }
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
        align-content: center;
        max-width: 100%;
      }
      ha-card.no-background {
        background: none;
        border: none;
        box-shadow: none;
      }
      ha-tab-group {
        --track-width: unset !important;
        padding: 6px 4px;
      }
      ha-tab-group.badge-mode {
        padding: 2px;
      }
      ha-tab-group-tab[active],
      ha-tab-group-tab.active {
        font-size: var(--ha-font-size-m);
        --wa-color-brand-on-quiet: var(
          --ha-tab-active-text-color,
          var(--primary-color)
        );
        --wa-color-neutral-on-quiet: var(--wa-color-brand-on-quiet);
        opacity: 0.8;
        color: inherit;
        --wa-space-l: 16px;
      }
      ha-tab-group-tab[active]:hover,
      ha-tab-group-tab.active:hover {
        color: var(--wa-color-brand-on-quiet) !important;
      }
      ha-tab-group::part(nav) {
        padding: 0 !important;
      }
      ha-tab-group-tab {
        pointer-events: auto;
      }
      ha-tab-group-tab * {
        pointer-events: none;
      }
      ha-tab-group-tab::part(base) {
        padding: 0 8px !important;
      }
      ha-tab-group-tab.badge-mode::part(base) {
        padding: 0 4px !important;
      }
      ha-tab-group.no-scroll::part(tabs) {
        display: flex;
        flex-wrap: wrap;
        overflow-x: visible !important;
        max-width: 100%;
        border-bottom: none !important;
      }
      .center {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .entity.horizontal,
      .extra-entity.horizontal {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .entity,
      .extra-entity {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .entity.horizontal .entity-icon,
      .extra-entity.horizontal .entity-icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: visible;
      }
      .entity-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: visible;
      }
      ha-tab-group-tab {
        position: relative;
        overflow: visible;
      }
      ha-tab-group-tab[data-badge]::after {
        content: attr(data-badge);
        position: absolute;
        top: 0;
        right: 0;
        min-width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: var(--status-card-badge-color, var(--primary-color));
        color: var(--status-card-badge-text-color, var(--text-primary-color));
        font-size: 0.75rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        box-sizing: border-box;
        z-index: 1;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }
      .person-badge {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: var(--status-card-badge-color, var(--primary-color));
        color: var(--status-card-badge-text-color, var(--text-primary-color));
        font-size: 0.75rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        box-sizing: border-box;
        z-index: 1;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }
      .person-badge ha-icon {
        --mdc-icon-size: 14px;
      }
      .entity-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      .entity.horizontal .entity-info,
      .extra-entity.horizontal .entity-info {
        text-align: left;
        margin-top: 3px;
        padding-left: 8px;
      }
      .entity-info {
        text-align: center;
        margin-top: 7px;
      }
      .entity-name {
        font-weight: bold;
      }
      .entity-state {
        color: var(--secondary-text-color);
        font-size: 0.9em;
      }
    `;
  }

  static getConfigElement() {
    return document.createElement("status-card-editor");
  }

  static getStubConfig() {
    return {};
  }
}
