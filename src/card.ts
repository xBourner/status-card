import { LitElement, html, PropertyValues, TemplateResult } from "lit";
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
  isEntityActive,
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
import { filterStaticEntities, filterDynamicEntities } from "./smart_groups";
import {
  getBackgroundColor,
  getCustomColor,
  getCustomIcon,
  getCustomName,
  getCustomizationForType,
  getStatusProperty,
  getIconStyles,
  customizationIndex,
  parseCss,
  getParsedCss,
  cardStyles,
  toCssColor,
  getCountStyles,
} from "./card-styles";
import { handleDomainAction, toggleDomain } from "./card-actions";
import { mdiFormatListGroup } from "@mdi/js";

export type CardDesign = "standard" | "badge" | "chip";

const designClass = (design: CardDesign): string =>
  design === "standard" ? "" : `${design}-mode`;

// Memo equality for (ids, states): same id list and same state object per id.
const sameIdsAndStates = (
  [newIds, newStates]: [string[], HomeAssistant["states"]],
  [oldIds, oldStates]: [string[], HomeAssistant["states"]],
): boolean =>
  newIds === oldIds && newIds.every((id) => newStates[id] === oldStates[id]);

@customElement("status-card")
export class StatusCard extends LitElement {
  @property({ type: Object }) public _config!: LovelaceCardConfig;
  @state() public selectedDomain: string | null = null;
  @state() public selectedDeviceClass: string | null = null;
  @state() public hiddenEntities: string[] = [];
  @state() private hiddenLabels: string[] = [];
  @state() private hiddenAreas: string[] = [];
  @state() private hide_person: boolean = false;
  @state() private hide_content_name: boolean = false;
  @state() public list_mode: boolean = false;
  @state() public design: CardDesign = "standard";
  @state() public no_background: boolean = false;
  @state() public badge_color: string = "";
  @state() public badge_text_color: string = "";
  @state() public selectedGroup: number | null = null;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() public _shouldHideCard: boolean = false;
  @state() public __registryEntities: EntityRegistryEntry[] = [];
  @state() public __registryDevices: DeviceRegistryEntry[] = [];
  @state() public __registryAreas: AreaRegistryEntry[] = [];
  @state() public labels: { label_id: string; name: string }[] = [];
  private __registryFetchInProgress = false;
  @state() private _parsedGlobalCss: Record<string, string> = {};
  @state() private _parsedGlobalIconCss: Record<string, string> = {};
  @state() private _parsedGlobalCardCss: Record<string, string> = {};
  @state() private _parsedGlobalNameCss: Record<string, string> = {};
  @state() private _parsedGlobalStateCss: Record<string, string> = {};
  private _resetDomainTimeout?: ReturnType<typeof setTimeout>;
  private _resetGroupTimeout?: ReturnType<typeof setTimeout>;

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
      // Optional: only needed to match smart group labels by name.
      cacheByProperty<{ label_id: string; name: string }>(
        this.hass,
        "label",
        "label_id",
      ).catch(() => ({})),
    ])
      .then(([entityMap, deviceMap, areaMap, labelMap]) => {
        this.__registryEntities = Object.values(entityMap);
        this.__registryDevices = Object.values(deviceMap);
        this.__registryAreas = Object.values(areaMap);
        this.labels = Object.values(labelMap);
      })
      .catch((e) => {
        console.error("Error fetching registry data", e);
      })
      .finally(() => {
        this.__registryFetchInProgress = false;
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
    if (changedProps.has("design")) return true;
    if (changedProps.has("_shouldHideCard")) return true;
    if (changedProps.has("__registryEntities")) return true;
    if (changedProps.has("__registryDevices")) return true;
    if (changedProps.has("__registryAreas")) return true;
    if (changedProps.has("labels")) return true;

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (!oldHass || !this.hass) return true;

    if (oldHass.themes !== this.hass.themes) return true;
    if (oldHass.states !== this.hass.states) return true;
    // Registry edits (area, label, hidden) can arrive without a state change.
    if (oldHass.entities !== this.hass.entities) return true;
    if (oldHass.devices !== this.hass.devices) return true;
    if (oldHass.areas !== this.hass.areas) return true;
    if (oldHass.localize !== this.hass.localize) return true;
    if (oldHass.language !== this.hass.language) return true;

    return false;
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
      hiddenEntities: string[],
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
        ALLOWED_DOMAINS,
      ),
  );

  private _mapIdsToStatesMemo = memoizeOne(mapIdsToStates, sameIdsAndStates);

  private _customizationIndexMemo = memoizeOne(customizationIndex);

  /** Customizations indexed by type; rebuilt only when the config changes. */
  private get _custMap() {
    return this._customizationIndexMemo(this._config.customization);
  }

  private _computePersonIdsMemo = memoizeOne(getPersonEntityIds);

  private _mapPersonIdsToStatesMemo = memoizeOne(
    mapPersonIdsToStates,
    sameIdsAndStates,
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
    },
  );

  private _computeGroupItemsMemo = memoizeOne(computeGroupItems);
  private _computeDomainItemsMemo = memoizeOne(computeDomainItems);
  private _computeDeviceClassItemsMemo = memoizeOne(computeDeviceClassItems);

  public _computeEntityMap = memoizeOne(
    (entities: EntityRegistryEntry[]) =>
      new Map(entities.map((e) => [e.entity_id, e])),
  );
  public _computeDeviceMap = memoizeOne(
    (devices: DeviceRegistryEntry[]) => new Map(devices.map((d) => [d.id, d])),
  );
  public _computeAreaMap = memoizeOne(
    (areas: AreaRegistryEntry[]) => new Map(areas.map((a) => [a.area_id, a])),
  );

  private _computeGroupCandidatesMemo = memoizeOne(
    (
      rulesets: Ruleset[],
      entities: EntityRegistryEntry[],
      devices: DeviceRegistryEntry[],
      areas: AreaRegistryEntry[],
      hiddenEntities: string[],
      labels: StatusCardLike["labels"],
    ): Map<string, string[]> => {
      const map = new Map();
      const entityMap = this._computeEntityMap(entities);
      const deviceMap = this._computeDeviceMap(devices);
      const areaMap = this._computeAreaMap(areas);

      rulesets.forEach((rs) => {
        const candidates = filterStaticEntities(
          rs,
          entities,
          hiddenEntities,
          entityMap,
          deviceMap,
          areaMap,
          labels,
        );
        map.set(rs.group_id, candidates);
      });
      return map;
    },
  );

  private _computeGroupResultsMemo = memoizeOne(
    (
      candidatesMap: Map<string, string[]>,
      states: HomeAssistant["states"],
      rulesets: Ruleset[],
      entities: EntityRegistryEntry[],
      devices: DeviceRegistryEntry[],
      areas: AreaRegistryEntry[],
      labels: StatusCardLike["labels"],
    ): Map<string, HassEntity[]> => {
      const map = new Map();
      const fakeCard = {
        __registryEntities: entities,
        __registryDevices: devices,
        __registryAreas: areas,
        hass: { states },
        labels,
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
          areaMap,
        );
        map.set(rs.group_id, results);
      });
      return map;
    },
  );

  /** Entities per smart group id (static candidates + live state filters). */
  private _groupResults(): Map<string, HassEntity[]> {
    const candidatesMap = this._computeGroupCandidatesMemo(
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.hiddenEntities,
      this.labels,
    );

    return this._computeGroupResultsMemo(
      candidatesMap,
      this.hass.states,
      this._config.rulesets || [],
      this.__registryEntities,
      this.__registryDevices,
      this.__registryAreas,
      this.labels,
    );
  }

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
      hiddenEntities,
    );

    return this._mapIdsToStatesMemo(includedIds, states);
  }

  // Per domain entity list (new array whenever one of its states changes),
  // the filtered result per device class.
  private _baseEntitiesCache = new WeakMap<HassEntity[], Map<string, HassEntity[]>>();

  private _baseEntities(domain: string, deviceClass?: string): HassEntity[] {
    const all = this._entitiesByDomain()[domain] || [];
    let byClass = this._baseEntitiesCache.get(all);
    if (!byClass) {
      byClass = new Map();
      this._baseEntitiesCache.set(all, byClass);
    }
    const key = deviceClass ?? "";
    let result = byClass.get(key);
    if (!result) {
      result = all.filter((entity) => {
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
      byClass.set(key, result);
    }
    return result;
  }

  public _totalEntities(domain: string, deviceClass?: string): HassEntity[] {
    return this._baseEntities(domain, deviceClass);
  }

  public _shouldShowTotalEntities(
    domain: string,
    deviceClass?: string,
  ): boolean {
    if (this._config.show_total_entities) return true;

    const key = typeKey(domain, deviceClass);
    const customization = this.getCustomizationForType(key);
    return customization?.show_total_entities === true;
  }
  public _shouldShowTotalNumbers(
    domain: string,
    deviceClass?: string,
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

    return ents.filter((entity) =>
      isEntityActive(entity, domain, deviceClass, isInverted),
    );
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
    this.design = config.display_mode || "standard";
    this.no_background = !!config.no_background;
    this.badge_color = config.badge_color || "";
    this.badge_text_color = config.badge_text_color || "";
    this.hiddenEntities = config.hidden_entities || [];
    this.hiddenLabels = config.hidden_labels || [];
    this.hiddenAreas = config.hidden_areas || [];

    const styles = this._config.styles ?? {};

    this._parsedGlobalCardCss = parseCss(styles.card);
    this._parsedGlobalCss = parseCss(styles.button);
    this._parsedGlobalIconCss = parseCss(styles.icon);
    this._parsedGlobalNameCss = parseCss(styles.name);
    this._parsedGlobalStateCss = parseCss(styles.state);
  }

  private _showPopup(
    element: HTMLElement,
    dialogTag: string,
    dialogParams: StatusCardPopupDialogParams,
  ): void {
    element.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag,
          dialogImport: () => customElements.whenDefined(dialogTag),
          dialogParams,
          opener: element,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  public computeLabel = (
    schema: Schema,
    domain?: string,
    deviceClass?: string,
  ): string => {
    if (!this.hass || !schema) return schema?.name || "";
    return computeLabelCallback(this.hass, schema, domain, deviceClass);
  };

  private _openDomainPopup(domain: string | number) {
    let title = "Details";
    if (typeof domain === "string") {
      title =
        getCustomName(this._config, domain, undefined, undefined, this._custMap) ||
        this.computeLabel({ name: domain });
    } else if (typeof domain === "number" && this._config.content?.[domain]) {
      title = this._config.content[domain];
    }

    let entities: HassEntity[] = [];
    let allEntities: HassEntity[] = [];

    if (typeof domain === "number") {
      const groupId = this._config.content?.[domain];
      allEntities = (groupId && this._groupResults().get(groupId)) || [];
      entities = allEntities;
    } else {
      const deviceClass = this.selectedDeviceClass || undefined;
      allEntities = this._totalEntities(domain, deviceClass);
      entities = this._shouldShowTotalEntities(domain, deviceClass)
        ? allEntities
        : this._isOn(domain, deviceClass);
    }

    const showAll =
      typeof domain === "string"
        ? this._shouldShowTotalEntities(
            domain,
            this.selectedDeviceClass || undefined,
          )
        : false;

    const dialogTag = "status-card-popup";
    this._showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      entities,
      allEntities,
      selectedDomain: typeof domain === "string" ? domain : undefined,
      selectedDeviceClass: this.selectedDeviceClass || undefined,
      selectedGroup:
        this.selectedGroup !== null ? this.selectedGroup : undefined,
      card: this,
      opener: this,
      content: entities.length
        ? undefined
        : (this.hass?.localize("ui.card.empty_state.no_entities") ??
          "No entities"),
      initialShowAll: showAll,
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._resetDomainTimeout);
    clearTimeout(this._resetGroupTimeout);
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);

    if (!this._config || !this.hass) return;

    // Registry data feeds smart groups, so it can flip "hide if empty" too.
    if (
      changedProps.has("hass") ||
      changedProps.has("_config") ||
      changedProps.has("__registryEntities") ||
      changedProps.has("labels")
    ) {
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
      clearTimeout(this._resetDomainTimeout);
      this._resetDomainTimeout = setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }

    if (changedProps.has("selectedGroup") && this.selectedGroup !== null) {
      const group = this.selectedGroup;
      this._openDomainPopup(group);
      clearTimeout(this._resetGroupTimeout);
      this._resetGroupTimeout = setTimeout(() => {
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
        true,
      );
    }
  }

  private _handlePersonAction = (
    entity: HassEntity,
  ): ((ev: ActionHandlerEvent) => void) => {
    return (ev: ActionHandlerEvent) => {
      ev.stopPropagation();
      this.showMoreInfo(entity);
    };
  };

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

    const extra = this.getExtraItems();
    if (extra.length > 0) {
      const hasVisibleExtra = extra.some((item) => {
        const stateObj = this.hass?.states[item.panel];
        return (
          stateObj &&
          stateObj.state !== "unavailable" &&
          stateObj.state !== "unknown"
        );
      });
      if (hasVisibleExtra) return true;
    }

    const allGroupEntities = this._groupResults();
    const hasGroupContent = this.getGroupItems().some((g) => {
      const entities = allGroupEntities.get(g.group_id) || [];
      return entities.length > 0;
    });
    if (hasGroupContent) {
      return true;
    }

    const domainAndDeviceClassItems = [
      ...this.getDomainItems(),
      ...this.getDeviceClassItems(),
    ];

    for (const item of domainAndDeviceClassItems) {
      const deviceClass = (item as DeviceClassItem).deviceClass;
      if (this._baseEntities(item.domain, deviceClass).length === 0) continue;
      if (this._shouldShowTotalEntities(item.domain, deviceClass)) return true;
      if (this._isOn(item.domain, deviceClass).length > 0) return true;
    }

    return false;
  }

  private _updateShouldHideCard(): void {
    if ((this._config.hide_card_if_empty ?? false) !== true) {
      this._shouldHideCard = false;
      this.hidden = false;
      return;
    }

    this._shouldHideCard = !this._hasContent();
    this.hidden = this._shouldHideCard;
  }

  private getPersonItems(): HassEntity[] {
    const ids = this._computePersonIdsMemo(
      this.hass.entities,
      this.hiddenEntities,
      this.hiddenLabels,
      this.hide_person,
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
      this._custMap,
    );
  }

  private getGroupItems(): GroupItem[] {
    return this._computeGroupItemsMemo(
      this._config.content || [],
      this._config.rulesets || [],
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
    toggleDomain(this.hass, entities, domain);
  }

  // One stable handler per item, so lit does not rebind listeners on every render.
  // Handlers read hass/_config at call time, so they never go stale.
  private _domainActionHandlers = new Map<string, (ev: ActionHandlerEvent) => void>();

  private _handleDomainAction(
    domain: string,
    deviceClass?: string,
  ): (ev: ActionHandlerEvent) => void {
    const key = typeKey(domain, deviceClass);
    let handler = this._domainActionHandlers.get(key);
    if (!handler) {
      handler = (ev: ActionHandlerEvent) => {
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
          },
        );
      };
      this._domainActionHandlers.set(key, handler);
    }
    return handler;
  }

  private _handleGroupAction(
    groupId: string,
    index: number,
    entities: HassEntity[],
  ): (ev: ActionHandlerEvent) => void {
    return (ev: ActionHandlerEvent) => {
      handleDomainAction(
        this,
        this.hass,
        this._config,
        groupId,
        undefined,
        ev,
        {
          showMoreInfo: (entityId) => {
            const stateObj = this.hass.states[entityId];
            if (stateObj) this.showMoreInfo(stateObj);
          },
          toggleDomain: () => {
            // One service call per domain instead of one per entity.
            const byDomain = new Map<string, HassEntity[]>();
            for (const e of entities) {
              const d = computeDomain(e.entity_id);
              byDomain.set(d, [...(byDomain.get(d) ?? []), e]);
            }
            byDomain.forEach((ents, d) => toggleDomain(this.hass, ents, d));
          },
          selectDomain: () => {
            this.selectedGroup = index;
          },
        },
      );
    };
  }

  public getCustomizationForType(type: string): LovelaceCardConfig | undefined {
    return getCustomizationForType(
      this._config,
      type,
      this._custMap,
    );
  }

  private _getIconStyles(
    type: "person" | "extra" | "domain" | "deviceClass",
    options: {
      color?: string;
      background_color?: string;
      square?: boolean;
      isNotHome?: boolean;
    } = {},
  ) {
    return getIconStyles(type, options);
  }

  private _computeActionHandler = memoizeOne(
    (hasHold: boolean, hasDoubleClick: boolean) => {
      return actionHandler({ hasHold, hasDoubleClick });
    },
  );

  private _computeBadgeStyles(customization?: LovelaceCardConfig) {
    const badgeColor =
      customization?.badge_color || this.badge_color || undefined;
    const badgeTextColor =
      customization?.badge_text_color || this.badge_text_color || undefined;
    const badgeStyles = {
      "--status-card-badge-color": toCssColor(badgeColor),
      "--status-card-badge-text-color": toCssColor(badgeTextColor),
    };
    return { badgeColor, badgeTextColor, badgeStyles };
  }

  private _computeButtonStyles(customization?: LovelaceCardConfig) {
    const itemStyles = getParsedCss(
      customization?.styles?.button || customization?.styles?.card,
      customization as { _parsedCss?: Record<string, string> },
    );
    return { ...this._parsedGlobalCss, ...itemStyles };
  }

  private _computeCustomIconStyles(customization?: LovelaceCardConfig) {
    const itemIconStyles =
      customization?._parsedIconCss || parseCss(customization?.styles?.icon);
    return { ...this._parsedGlobalIconCss, ...itemIconStyles };
  }

  private _computeTabStyles(
    customization?: LovelaceCardConfig,
    iconType: "domain" | "extra" = "domain",
    iconOpts?: { color?: string; background_color?: string },
  ) {
    const ah = this._computeActionHandler(
      hasAction(customization?.hold_action ?? this._config.hold_action),
      hasAction(
        customization?.double_tap_action ?? this._config.double_tap_action,
      ),
    );
    const contentClasses = {
      horizontal: this._config.content_layout === "horizontal",
    };
    const iconStyles = this._getIconStyles(iconType, {
      ...iconOpts,
      square: this._config.square,
    });
    const { badgeStyles } = this._computeBadgeStyles(customization);
    const buttonStyles = this._computeButtonStyles(customization);
    const customIconStyles = this._computeCustomIconStyles(customization);
    const design: CardDesign = customization?.display_mode || this.design;
    const showBadge = design === "badge";
    return {
      ah,
      contentClasses,
      iconStyles,
      badgeStyles,
      buttonStyles,
      customIconStyles,
      showBadge,
      design,
    };
  }

  private _renderIcon(icon: string): TemplateResult {
    return icon.startsWith("M")
      ? html`<ha-svg-icon .path=${icon}></ha-svg-icon>`
      : html`<ha-icon icon=${icon}></ha-icon>`;
  }

  /** Markup shared by extra entity, smart group and domain tabs. */
  private _renderTabShell(opts: {
    panel: string;
    handler: (ev: ActionHandlerEvent) => void;
    customization?: LovelaceCardConfig;
    iconType: "domain" | "extra";
    color?: string;
    background_color?: string;
    count: number;
    entityClass: "entity" | "extra-entity";
    icon: TemplateResult;
    name: unknown;
    state: unknown;
  }): TemplateResult {
    const {
      ah,
      contentClasses,
      iconStyles,
      badgeStyles,
      buttonStyles,
      customIconStyles,
      showBadge,
      design,
    } = this._computeTabStyles(opts.customization, opts.iconType, {
      color: opts.color,
      background_color: opts.background_color,
    });
    const countStyles = getCountStyles(
      opts.customization?._countLevels,
      opts.count,
    );

    return html`
      <ha-tab-group-tab
        slot="nav"
        panel=${opts.panel}
        @action=${opts.handler}
        .actionHandler=${ah}
        class=${designClass(design)}
        style=${styleMap(badgeStyles)}
        data-badge=${ifDefined(showBadge ? String(opts.count) : undefined)}
      >
        <div
          class=${classMap({ [opts.entityClass]: true, ...contentClasses })}
          style=${styleMap({ ...buttonStyles, ...countStyles.button })}
        >
          <div
            class="entity-icon"
            style=${styleMap({
              ...iconStyles,
              ...customIconStyles,
              ...countStyles.icon,
            })}
          >
            ${opts.icon}
          </div>
          ${!showBadge
            ? html`<div class="entity-info">
                ${!this.hide_content_name
                  ? html`<div
                      class="entity-name"
                      style=${styleMap({
                        ...this._parsedGlobalNameCss,
                        ...opts.customization?._parsedNameCss,
                        ...countStyles.name,
                      })}
                    >
                      ${opts.name}
                    </div>`
                  : ""}
                <div
                  class="entity-state"
                  style=${styleMap({
                    ...this._parsedGlobalStateCss,
                    ...opts.customization?._parsedStateCss,
                    ...countStyles.state,
                  })}
                >
                  ${opts.state}
                </div>
              </div>`
            : ""}
        </div>
      </ha-tab-group-tab>
    `;
  }

  private renderExtraTab(item: ExtraItem): TemplateResult {
    const { panel, icon, name, color, icon_css, background_color } = item;
    const stateObj = this.hass.states[panel];
    const customization = this.getCustomizationForType(panel);
    const stateContent = customization?.state_content ?? "state";

    const iconTpl =
      icon.startsWith("/") || icon.startsWith("http")
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
            ></ha-state-icon>`;

    return this._renderTabShell({
      panel,
      handler: this._handleDomainAction(panel),
      customization,
      iconType: "extra",
      color,
      background_color,
      count: 1,
      entityClass: "extra-entity",
      icon: iconTpl,
      name,
      state: html`<state-display
        .stateObj=${stateObj}
        .hass=${this.hass}
        .content=${stateContent}
        .name=${name}
      ></state-display>`,
    });
  }

  private renderGroupTab(ruleset: Ruleset, index: number): TemplateResult {
    const entities = this._groupResults().get(ruleset.group_id) || [];

    if (!entities.length) return html``;

    const groupId =
      ruleset.group_id ||
      `${this.hass!.localize("component.group.entity_component._.name")} ${
        index + 1
      }`;
    const groupIcon = ruleset.group_icon || mdiFormatListGroup;
    const color = getCustomColor(
      this._config,
      groupId,
      undefined,
      this._custMap,
    );
    const background_color = getBackgroundColor(
      this._config,
      groupId,
      undefined,
      this._custMap,
    );

    const customization = this.getCustomizationForType(groupId);

    return this._renderTabShell({
      panel: "group-" + index,
      handler: this._handleGroupAction(groupId, index, entities),
      customization,
      iconType: "domain",
      color,
      background_color,
      count: entities.length,
      entityClass: "entity",
      icon: this._renderIcon(groupIcon),
      name: groupId,
      state: `${entities.length}${
        ruleset.group_status ? ` ${ruleset.group_status}` : ""
      }`,
    });
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
      this._custMap,
    );
    const customization = this.getCustomizationForType(
      typeKey(domain, deviceClass),
    );

    const name =
      getCustomName(this._config, domain, deviceClass, undefined, this._custMap) ||
      this.computeLabel({ name: deviceClass || domain });

    let stateText;
    if (this._shouldShowTotalNumbers(domain, deviceClass)) {
      stateText = `${active.length}/${total.length} ${getStatusProperty(
        this.hass,
        this._config,
        domain,
        deviceClass,
        undefined,
        this._custMap,
      )}`;
    } else if (this._shouldShowTotalEntities(domain, deviceClass)) {
      stateText = `${total.length}`;
    } else {
      stateText = `${active.length} ${getStatusProperty(
        this.hass,
        this._config,
        domain,
        deviceClass,
        undefined,
        this._custMap,
      )}`;
    }

    return this._renderTabShell({
      panel: deviceClass || domain,
      handler: this._handleDomainAction(domain, deviceClass),
      customization,
      iconType: "domain",
      color,
      background_color: getBackgroundColor(
        this._config,
        domain,
        deviceClass,
        this._custMap,
      ),
      count: entities.length,
      entityClass: "entity",
      icon: this._renderIcon(
        getCustomIcon(
          this._config,
          domain,
          deviceClass,
          undefined,
          this._custMap,
        ),
      ),
      name,
      state: stateText,
    });
  }

  private renderPersonTab(entity: HassEntity): TemplateResult {
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
    const personHomeIcon = this._config.person_home_icon || "mdi:home";
    const personAwayIcon =
      this._config.person_away_icon || "mdi:home-export-outline";

    const badgeColor = isNotHome
      ? personAwayColor || "red"
      : personHomeColor || "green";

    const badgeIcon = isNotHome ? personAwayIcon : personHomeIcon;

    return html`
      <ha-tab-group-tab
        slot="nav"
        @action=${this._handlePersonAction(entity)}
        .actionHandler=${this._computeActionHandler(false, false)}
        class=${designClass(this.design)}
      >
        ${this.design === "badge"
          ? html`<div
              class="person-badge"
              style=${styleMap({
                "--status-card-badge-color": toCssColor(badgeColor),
                "--status-card-badge-text-color": toCssColor(
                  this.badge_text_color,
                ),
              })}
            >
              ${this._renderIcon(badgeIcon)}
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
          ${this.design !== "badge"
            ? html`<div class="entity-info">
                ${!this.hide_content_name
                  ? html`<div class="entity-name">
                      ${entity.attributes.friendly_name?.split(
                        " ",
                      )[0] || ""}
                    </div>`
                  : ""}
                <div class="entity-state">
                  ${getStatusProperty(
                    this.hass!,
                    this._config,
                    "person",
                    undefined,
                    entityState?.state,
                    this._custMap,
                  )}
                </div>
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
      deviceClass: DeviceClassItem[],
    ): AnyItem[] =>
      [...extra, ...group, ...domain, ...deviceClass].sort(
        (a, b) => a.order - b.order,
      ),
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
    if (this._shouldHideCard) {
      return html``;
    }

    const extra = this.getExtraItems();
    const group = this.getGroupItems();
    const domain = this.getDomainItems();
    const deviceClass = this.getDeviceClassItems();

    const sorted = this._computeSortedEntities(
      extra,
      group,
      domain,
      deviceClass,
    );

    const personEntities = this.getPersonItems();

    const noScroll = {
      "no-scroll": !!this._config.no_scroll,
      "badge-mode": this.design === "badge",
      "chip-mode": this.design === "chip",
      square: !!this._config.square,
      "no-background": this.no_background,
    };
    return html`
      <ha-card
        class=${classMap(noScroll)}
        style=${styleMap(this._parsedGlobalCardCss)}
      >
        <ha-tab-group without-scroll-controls class=${classMap(noScroll)}>
          <ha-tab-group-tab style="display:none" active></ha-tab-group-tab>
          ${repeat(
            personEntities,
            (entity) => entity.entity_id,
            (entity) => this.renderPersonTab(entity),
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
            (i) => this.renderTab(i),
          )}
        </ha-tab-group>
      </ha-card>
    `;
  }

  static get styles() {
    return [cardStyles];
  }

  static getConfigElement() {
    return document.createElement("status-card-editor");
  }

  static getStubConfig() {
    return {};
  }
}
