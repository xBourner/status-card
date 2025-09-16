import { LitElement, html, css, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import memoizeOne from "memoize-one";
import type { HassEntity } from "home-assistant-js-websocket";
import "./popup-dialog";
import { computeLabelCallback, translateEntityState } from "./translations";
import {
  actionHandler,
  applyThemesOnElement,
  STATES_OFF,
  CardConfig,
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  DeviceClassItem,
  DomainItem,
  ExtraItem,
  AnyItem,
  Schema,
  CustomizationConfig,
  GroupItem,
  computeEntitiesByDomain,
  typeKey,
  domainIcon,
  ALLOWED_DOMAINS,
} from "./helpers";
import {
  HomeAssistant,
  computeDomain,
  hasAction,
  handleAction,
  ActionHandlerEvent,
  ActionConfig,
  formatNumber,
} from "custom-card-helpers";
import { filterEntitiesByRuleset } from "./smart_groups";

@customElement("status-card")
export class StatusCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public _config!: CardConfig;

  @state() public areas?: AreaRegistryEntry[] = [];
  @state() public devices: DeviceRegistryEntry[] = [];
  @state() public entities: EntityRegistryEntry[] = [];
  @state() private entitiesByDomain: { [domain: string]: HassEntity[] } = {};
  @state() public selectedDomain: string | null = null;
  @state() public selectedDeviceClass: string | null = null;
  @state() public hiddenEntities: string[] = [];
  @state() private hiddenLabels: string[] = [];
  @state() private hiddenAreas: string[] = [];
  @state() private hide_person: boolean = false;
  @state() private hide_content_name: boolean = true;
  @state() public list_mode: boolean = false;
  @state() public selectedGroup: number | null = null;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this._loadData();
  }

  getCardSize() {
    return 2;
  }

  getGridOptions() {
    return {
      rows: 2,
    };
  }

  private async _loadData(): Promise<void> {
    try {
      const [areas, devices, entities]: [
        AreaRegistryEntry[],
        DeviceRegistryEntry[],
        EntityRegistryEntry[]
      ] = await Promise.all([
        this.hass?.callWS<AreaRegistryEntry[]>({
          type: "config/area_registry/list",
        }) ?? [],
        this.hass?.callWS<DeviceRegistryEntry[]>({
          type: "config/device_registry/list",
        }) ?? [],
        this.hass?.callWS<EntityRegistryEntry[]>({
          type: "config/entity_registry/list",
        }) ?? [],
      ]);

      this.areas = areas;
      this.devices = devices;
      this.entities = entities;

      this._processEntities();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  private _processEntities(): void {
    const entitiesByDomain = this._entitiesByDomain(
      this.entities,
      this.devices,
      this.areas ?? [],
      (this.hass as HomeAssistant).states
    );
    if (entitiesByDomain !== this.entitiesByDomain) {
      this.entitiesByDomain = entitiesByDomain;
    }
  }

  private _lastEntitiesByDomainInput?: [
    EntityRegistryEntry[],
    DeviceRegistryEntry[],
    AreaRegistryEntry[],
    HomeAssistant["states"],
    CardConfig["area"] | null,
    CardConfig["floor"] | null,
    CardConfig["label"] | null,
    string[],
    string[],
    string[]
  ];
  private _lastEntitiesByDomainResult?: { [domain: string]: HassEntity[] };

  private _entitiesByDomain(
    registryEntities: EntityRegistryEntry[],
    deviceRegistry: DeviceRegistryEntry[],
    areas: AreaRegistryEntry[],
    states: HomeAssistant["states"]
  ): { [domain: string]: HassEntity[] } {
    const area = this._config.area || null;
    const floor = this._config.floor || null;
    const label = this._config.label || null;
    const hiddenAreas = this.hiddenAreas;
    const hiddenLabels = this.hiddenLabels;
    const hiddenEntities = this.hiddenEntities;
    const input: [
      EntityRegistryEntry[],
      DeviceRegistryEntry[],
      AreaRegistryEntry[],
      HomeAssistant["states"],
      CardConfig["area"] | null,
      CardConfig["floor"] | null,
      CardConfig["label"] | null,
      string[],
      string[],
      string[]
    ] = [
      registryEntities,
      deviceRegistry,
      areas,
      states,
      area,
      floor,
      label,
      hiddenAreas,
      hiddenLabels,
      hiddenEntities,
    ];
    if (
      this._lastEntitiesByDomainInput &&
      this._shallowArrayEqual(input, this._lastEntitiesByDomainInput)
    ) {
      return this._lastEntitiesByDomainResult!;
    }
    const result = computeEntitiesByDomain(
      registryEntities,
      deviceRegistry,
      areas,
      states,
      { area, floor, label, hiddenAreas, hiddenLabels, hiddenEntities },
      ALLOWED_DOMAINS
    );
    this._lastEntitiesByDomainInput = input;
    this._lastEntitiesByDomainResult = result;
    return result;
  }

  private _shallowArrayEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (Array.isArray(a[i]) && Array.isArray(b[i])) {
        if (
          a[i] !== b[i] &&
          (a[i].length !== b[i].length ||
            a[i].some((v: any, idx: number) => v !== b[i][idx]))
        )
          return false;
      } else if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
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
    const all =
      this._entitiesByDomain(
        this.entities,
        this.devices,
        this.areas ?? [],
        this.hass.states
      )[domain] || [];
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
    const isInverted = this.getCustomizationForType(key)?.invert === true;

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

  public setConfig(config: CardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    this._config = config;
    this.hide_person =
      config.hide_person !== undefined ? config.hide_person : false;
    this.hide_content_name =
      config.hide_content_name !== undefined ? config.hide_content_name : false;
    this.list_mode = config.list_mode !== undefined ? config.list_mode : false;
    this.hiddenEntities = config.hidden_entities || [];
    this.hiddenLabels = config.hidden_labels || [];
    this.hiddenAreas = config.hidden_areas || [];
  }

  private _showPopup(
    element: HTMLElement,
    dialogTag: string,
    dialogParams: any
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

  private _openDomainPopup(domain: string | number) {
    let title = "Details";
    if (typeof domain === "string") {
      title = this.getCustomName(domain) || this.computeLabel({ name: domain });
    } else if (typeof domain === "number" && this._config.content?.[domain]) {
      title = this._config.content[domain];
    }

    let entities: HassEntity[] = [];
    if (typeof domain === "number") {
      const groupId = this._config.content?.[domain];
      const ruleset = this._config.rulesets?.find(
        (g: any) => g.group_id === groupId
      );
      entities = ruleset ? filterEntitiesByRuleset(this, ruleset) : [];
    } else {
      const deviceClass = this.selectedDeviceClass || undefined;
      const showAll = this._shouldShowTotalEntities(domain, deviceClass);
      entities = showAll
        ? this._totalEntities(domain, deviceClass)
        : this._isOn(domain, deviceClass);
    }

    const dialogTag = "status-card-popup";
    this._showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      entities,
      selectedDomain: typeof domain === "string" ? domain : undefined,
      selectedDeviceClass: this.selectedDeviceClass || undefined,
      selectedGroup: this.selectedGroup || undefined,
      card: this,
      content: entities.length ? undefined : `Keine Entitäten`,
    });
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (!this._config || !this.hass) return;

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as CardConfig | undefined;

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

    if (
      changedProps.has("hass") ||
      changedProps.has("_config") ||
      changedProps.has("hiddenEntities") ||
      changedProps.has("hiddenLabels") ||
      changedProps.has("hiddenAreas")
    ) {
      const statesChanged = !oldHass || oldHass.states !== this.hass.states;
      if (
        statesChanged ||
        changedProps.has("_config") ||
        changedProps.has("hiddenEntities") ||
        changedProps.has("hiddenLabels") ||
        changedProps.has("hiddenAreas")
      ) {
        this._processEntities();
      }
    }
  }

  public computeLabel = memoizeOne(
    (schema: Schema, domain?: string, deviceClass?: string): string => {
      return computeLabelCallback(this.hass, schema, domain, deviceClass);
    }
  );

  private showMoreInfo(entity: HassEntity): void {
    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: entity.entity_id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private getStatusProperty(
    domain: string,
    deviceClass?: string,
    state?: string
  ): string {
    if (
      this._shouldShowTotalEntities(domain, deviceClass) &&
      !this._shouldShowTotalNumbers(domain, deviceClass)
    ) {
      return "";
    }

    const openDeviceClasses = [
      "window",
      "door",
      "lock",
      "awning",
      "blind",
      "curtain",
      "damper",
      "garage",
      "gate",
      "shade",
      "shutter",
    ];

    const key = typeKey(domain, deviceClass);
    const customization = this.getCustomizationForType(key);
    const isInverted = customization?.invert === true;

    switch (domain) {
      case "device_tracker": {
        const normalState = translateEntityState(
          this.hass!,
          "home",
          "device_tracker"
        );
        const invertedState = translateEntityState(
          this.hass!,
          "not_home",
          "device_tracker"
        );
        return isInverted ? invertedState : normalState;
      }
      case "lock":
      case "cover": {
        const normalState = translateEntityState(this.hass!, "open", "cover");
        const invertedState = translateEntityState(
          this.hass!,
          "closed",
          "cover"
        );
        return isInverted ? invertedState : normalState;
      }
      case "person": {
        if (state === "home") {
          return translateEntityState(this.hass!, "home", "person");
        } else if (state === "not_home") {
          return translateEntityState(this.hass!, "not_home", "person");
        } else {
          return state ?? "unknown";
        }
      }
      default: {
        if (deviceClass && openDeviceClasses.includes(deviceClass)) {
          const normalState = translateEntityState(this.hass!, "open", "cover");
          const invertedState = translateEntityState(
            this.hass!,
            "closed",
            "cover"
          );
          return isInverted ? invertedState : normalState;
        }
        const normalState = translateEntityState(
          this.hass!,
          state ?? "on",
          "light"
        );
        const invertedState = translateEntityState(
          this.hass!,
          state ?? "off",
          "light"
        );
        return isInverted ? invertedState : normalState;
      }
    }
  }

  private _customizationIndex = memoizeOne((list?: CustomizationConfig[]) => {
    const map = new Map<string, CustomizationConfig>();
    (list ?? []).forEach((c) => {
      if (c.type) map.set(c.type.toLowerCase(), c);
    });
    return map;
  });

  public getCustomizationForType(
    type: string
  ): CustomizationConfig | undefined {
    if (!type) return undefined;
    const map = this._customizationIndex(this._config.customization);
    return map.get(type.toLowerCase());
  }

  private getCustomIcon(
    domain: string,
    deviceClass?: string,
    entity?: HassEntity
  ): string {
    const customization = this.getCustomizationForType(
      typeKey(domain, deviceClass)
    );

    if (
      customization?.show_entity_picture === true &&
      entity &&
      entity.attributes &&
      entity.attributes.entity_picture
    ) {
      return entity.attributes.entity_picture;
    }

    if (customization && customization.icon) {
      return customization.icon;
    }

    if (entity && entity.attributes && entity.attributes.icon) {
      return entity.attributes.icon;
    }

    if (!entity) {
      const isInverted = customization?.invert === true;
      const state = isInverted ? "off" : "on";
      let fallbackDomain = domain;
      if (!deviceClass && domain.includes(".")) {
        fallbackDomain = domain.split(".")[0];
      }

      return domainIcon(fallbackDomain, state, deviceClass);
    }
    return "";
  }

  private getBackgroundColor(domain: string, deviceClass?: string): string {
    const customization = this.getCustomizationForType(
      typeKey(domain, deviceClass)
    );

    const toColor = (arr: number[]): string => {
      if (arr.length === 4)
        return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
      return `rgb(${arr[0]},${arr[1]},${arr[2]})`;
    };

    if (customization && Array.isArray(customization.background_color)) {
      const arr = customization.background_color as number[];
      if (arr.length >= 3) return toColor(arr);
    }

    if (Array.isArray(this._config?.background_color)) {
      const arr = this._config.background_color as number[];
      if (arr.length >= 3) return toColor(arr);
    }

    return "rgba(var(--rgb-primary-text-color), 0.15)";
  }

  private getCustomColor(
    domain: string,
    deviceClass?: string
  ): string | undefined {
    const customization = this.getCustomizationForType(
      typeKey(domain, deviceClass)
    );
    if (customization && customization.icon_color) {
      return customization.icon_color;
    }
    if (this._config && this._config.color) {
      return this._config.color;
    }
    return undefined;
  }

  private getCustomName(
    domain: string,
    deviceClass?: string,
    entity?: HassEntity
  ): string | undefined {
    const customization = this.getCustomizationForType(
      typeKey(domain, deviceClass)
    );
    if (customization && customization.name) {
      return customization.name;
    }
    if (entity && entity.attributes.friendly_name) {
      return entity.attributes.friendly_name;
    }
    return undefined;
  }

  private getCustomCSS(
    domain: string,
    deviceClass?: string
  ): string | undefined {
    const customization = this.getCustomizationForType(
      typeKey(domain, deviceClass)
    );
    if (customization && customization.icon_css) {
      return customization.icon_css;
    }
    return undefined;
  }

  public toggleDomain(domain?: string, deviceClass?: string): void {
    domain = domain ?? this.selectedDomain!;
    deviceClass = deviceClass ?? this.selectedDeviceClass!;

    const entities = this._isOn(domain, deviceClass);

    if (entities.length === 0) {
      console.warn(`Keine aktiven Entitäten für ${domain} gefunden.`);
      return;
    }

    if (
      [
        "light",
        "switch",
        "fan",
        "cover",
        "siren",
        "climate",
        "humidifier",
        "valve",
        "remote",
      ].includes(domain)
    ) {
      this.hass.callService(domain, "toggle", {
        entity_id: entities.map((e) => e.entity_id),
      });
      return;
    }

    for (const entity of entities) {
      let isOn = !STATES_OFF.includes(entity.state);

      if (domain === "media_player") {
        this.hass.callService(domain, isOn ? "media_pause" : "media_play", {
          entity_id: entity.entity_id,
        });
      } else if (domain === "lock") {
        this.hass.callService(domain, isOn ? "lock" : "unlock", {
          entity_id: entity.entity_id,
        });
      } else if (domain === "vacuum") {
        this.hass.callService(domain, isOn ? "stop" : "start", {
          entity_id: entity.entity_id,
        });
      } else if (domain === "alarm_control_panel") {
        this.hass.callService(
          domain,
          isOn ? "alarm_arm_away" : "alarm_disarm",
          { entity_id: entity.entity_id }
        );
      } else if (domain === "lawn_mower") {
        this.hass.callService(domain, isOn ? "pause" : "start_mowing", {
          entity_id: entity.entity_id,
        });
      } else if (domain === "water_heater") {
        this.hass.callService(domain, isOn ? "turn_off" : "turn_on", {
          entity_id: entity.entity_id,
        });
      } else if (domain === "update") {
        this.hass.callService(domain, isOn ? "skip" : "install", {
          entity_id: entity.entity_id,
        });
      }
    }
    return;
  }

  private _handleDomainAction(
    domain: string,
    deviceClass?: string
  ): (ev: ActionHandlerEvent) => void {
    return (ev: ActionHandlerEvent) => {
      ev.stopPropagation();

      const customization = this.getCustomizationForType(
        typeKey(domain, deviceClass)
      );

      let actionFromCustomization: ActionConfig | undefined;
      let actionFromConfig: ActionConfig | undefined;

      if (ev.detail.action === "tap") {
        actionFromCustomization = customization?.tap_action;
        actionFromConfig = this._config?.tap_action;
      } else if (ev.detail.action === "hold") {
        actionFromCustomization = customization?.hold_action;
        actionFromConfig = this._config?.hold_action;
      } else if (ev.detail.action === "double_tap") {
        actionFromCustomization = customization?.double_tap_action;
        actionFromConfig = this._config?.double_tap_action;
      }

      const actionConfig =
        actionFromCustomization !== undefined
          ? actionFromCustomization
          : actionFromConfig;

      const isMoreInfo =
        (typeof actionConfig === "string" && actionConfig === "more-info") ||
        (typeof actionConfig === "object" &&
          actionConfig?.action === "more-info");

      const isToggle =
        (typeof actionConfig === "string" && actionConfig === "toggle") ||
        (typeof actionConfig === "object" && actionConfig?.action === "toggle");

      // for entities
      if (domain.includes(".")) {
        const entityId = domain;
        const stateObj = this.hass.states[entityId];
        const baseDomain = computeDomain(entityId);

        if (isToggle) {
          this.hass.callService(baseDomain, "toggle", { entity_id: entityId });
          return;
        }

        if (isMoreInfo) {
          this.showMoreInfo(stateObj);
          return;
        }
      }

      //  for domain/device_class
      if (isMoreInfo || actionConfig === undefined) {
        this.selectedDomain = domain;
        this.selectedDeviceClass = deviceClass || null;
        return;
      }

      if (isToggle) {
        this.toggleDomain(domain, deviceClass);
        return;
      }

      handleAction(
        this,
        this.hass!,
        {
          tap_action: customization?.tap_action || this._config.tap_action,
          hold_action: customization?.hold_action || this._config.hold_action,
          double_tap_action:
            customization?.double_tap_action || this._config.double_tap_action,
        },
        ev.detail.action!
      );
    };
  }

  private _getPersonItemsMemo = memoizeOne(
    (
      entities: EntityRegistryEntry[],
      hiddenEntities: string[],
      hiddenLabels: string[],
      hide_person: boolean,
      hassStates: HomeAssistant["states"]
    ): HassEntity[] => {
      if (hide_person) return [];
      return entities
        .filter(
          (entity) =>
            entity.entity_id.startsWith("person.") &&
            !hiddenEntities.includes(entity.entity_id) &&
            !entity.labels?.some((l) => hiddenLabels.includes(l)) &&
            !entity.hidden_by &&
            !entity.disabled_by
        )
        .reverse()
        .map((entry) => hassStates[entry.entity_id])
        .filter((stateObj): stateObj is HassEntity => !!stateObj);
    }
  );

  private getPersonItems(): HassEntity[] {
    return this._getPersonItemsMemo(
      this.entities,
      this.hiddenEntities,
      this.hiddenLabels,
      this.hide_person,
      this.hass.states
    );
  }

  private _computeExtraItems = memoizeOne(
    (
      cfg: CardConfig,
      states: { [entity_id: string]: HassEntity }
    ): ExtraItem[] => {
      const content = cfg.content || [];
      if (!cfg.extra_entities) return [];

      return (cfg.extra_entities as string[])
        .reduce<ExtraItem[]>((acc: ExtraItem[], eid: string) => {
          if (!content.includes(eid)) return acc;

          const entity: HassEntity | undefined = states[eid];
          if (!entity) return acc;

          const cust: CustomizationConfig | undefined = cfg.customization?.find(
            (c: CustomizationConfig) => c.type === eid
          );
          if (
            cust &&
            cust.state !== undefined &&
            cust.invert_state !== undefined
          ) {
            const inv: boolean = cust.invert_state === "true";
            const match: boolean = entity.state === cust.state;
            if ((!inv && !match) || (inv && match)) return acc;
          }

          const idx: number = content.indexOf(eid);
          const order: number = idx >= 0 ? idx : 0;
          const icon: string = this.getCustomIcon(eid, undefined, entity);
          const name: string =
            this.getCustomName(eid, undefined, entity) ??
            entity.attributes.friendly_name ??
            eid;
          const color: string | undefined = this.getCustomColor(eid, undefined);
          const icon_css: string | undefined = this.getCustomCSS(
            eid,
            undefined
          );
          const background_color: string = this.getBackgroundColor(
            eid,
            undefined
          );

          acc.push({
            type: "extra" as const,
            panel: eid,
            entity,
            order,
            icon,
            name,
            color,
            icon_css,
            background_color,
          });
          return acc;
        }, [])
        .sort((a: ExtraItem, b: ExtraItem) => a.order - b.order);
    }
  );

  private _computeGroupItems = memoizeOne(
    (
      content: string[],
      rulesets: any[]
    ): {
      type: "group";
      group_id: string;
      order: number;
      ruleset: any;
    }[] =>
      content
        .map((id, idx) => {
          const ruleset = rulesets.find((g: any) => g.group_id === id);
          if (!ruleset) return undefined;
          const hasAttrs = Object.keys(ruleset).some(
            (key) =>
              key !== "group_id" &&
              key !== "group_icon" &&
              ruleset[key] !== undefined &&
              ruleset[key] !== ""
          );
          if (!hasAttrs) return undefined;
          return {
            type: "group" as const,
            group_id: id,
            order: idx,
            ruleset,
          };
        })
        .filter(
          (
            g
          ): g is {
            type: "group";
            group_id: string;
            order: number;
            ruleset: any;
          } => !!g
        )
  );

  private _computeDomainItems = memoizeOne((content: string[]): DomainItem[] =>
    content
      .map((c, idx) =>
        !c.includes(" - ")
          ? ({ type: "domain" as const, domain: c, order: idx } as DomainItem)
          : null
      )
      .filter((v): v is DomainItem => v !== null)
  );

  private _computeDeviceClassItems = memoizeOne(
    (content: string[]): DeviceClassItem[] =>
      content
        .map((c, idx) => {
          if (!c.includes(" - ")) return null;
          const [rawDomain, rawClass] = c.split(" - ");
          return {
            type: "deviceClass" as const,
            domain: rawDomain.trim().toLowerCase().replace(/\s+/g, "_"),
            deviceClass: rawClass.trim().toLowerCase(),
            order: idx,
          } as DeviceClassItem;
        })
        .filter((v): v is DeviceClassItem => v !== null)
  );

  private getGroupItems(): GroupItem[] {
    return this._computeGroupItems(
      this._config.content || [],
      this._config.rulesets || []
    );
  }
  public getExtraItems(): ExtraItem[] {
    if (!this._config || !this.hass) {
      return [];
    }
    return this._computeExtraItems(this._config, this.hass.states);
  }

  private getDomainItems(): DomainItem[] {
    return this._computeDomainItems(this._config.content || []);
  }

  private getDeviceClassItems(): DeviceClassItem[] {
    return this._computeDeviceClassItems(this._config.content || []);
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
    const { color, background_color, square, isNotHome } = options;
    const base: Record<string, string | undefined> = {
      "border-radius": square ? "20%" : "50%",
      "background-color": background_color,
      color: color ? `var(--${color}-color)` : undefined,
    };

    if (type === "person" && isNotHome) {
      base.filter = "grayscale(100%)";
    }

    return base;
  }

  private renderExtraTab(item: ExtraItem): TemplateResult {
    const { panel, entity, icon, name, color, icon_css, background_color } =
      item;
    const stateObj = this.hass.states[panel];
    const raw = entity.state;
    const num = Number(raw);
    const displayState =
      !Number.isNaN(num) && raw !== ""
        ? formatNumber(num, this.hass.locale)
        : translateEntityState(this.hass, raw, computeDomain(panel));
    const unit = entity.attributes.unit_of_measurement;
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

    return html`
      <sl-tab slot="nav" panel=${panel} @action=${handler} .actionHandler=${ah}>
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
              : html`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                  .icon=${icon}
                  data-domain=${computeDomain(panel)}
                  data-state=${stateObj.state}
                  style="${icon_css || ""}"
                ></ha-state-icon>`}
          </div>
          <div class="entity-info">
            ${!this.hide_content_name
              ? html`<div class="entity-name">${name}</div>`
              : ""}
            <div class="entity-state">
              ${displayState}${unit ? ` ${unit}` : ""}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }

  private renderGroupTab(ruleset: any, index: number): TemplateResult {
    const entities = filterEntitiesByRuleset(this, ruleset);

    if (!entities.length) return html``;

    const groupId =
      ruleset.group_id ||
      `${this.hass!.localize("component.group.entity_component._.name")} ${
        index + 1
      }`;
    const groupIcon = ruleset.group_icon || "mdi:format-list-group";
    const color = this.getCustomColor(groupId);
    const background_color = this.getBackgroundColor(groupId);

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

    return html`
      <sl-tab
        slot="nav"
        panel=${"group-" + index}
        @action=${handler}
        .actionHandler=${ah}
      >
        <div class="entity ${classMap(contentClasses)}">
          <div class="entity-icon" style=${styleMap(iconStyles)}>
            <ha-icon icon=${groupIcon}></ha-icon>
          </div>
          <div class="entity-info">
            ${!this.hide_content_name
              ? html`<div class="entity-name">${groupId}</div>`
              : ""}
            <div class="entity-state">
              ${entities.length}
              ${ruleset.group_status ? ` ${ruleset.group_status}` : ""}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }

  private renderDomainTab(item: DomainItem): TemplateResult {
    const { domain } = item;
    const active = this._isOn(domain);
    const total = this._totalEntities(domain);
    const showTotal = this._shouldShowTotalEntities(domain);
    const entities = showTotal ? total : active;
    if (!entities.length) return html``;

    const color = this.getCustomColor(domain);
    const customization = this.getCustomizationForType(domain);

    const handler = this._handleDomainAction(domain);
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
      background_color: this.getBackgroundColor(domain),
      square: this._config.square,
    });

    return html`
      <sl-tab
        slot="nav"
        panel=${domain}
        @action=${handler}
        .actionHandler=${ah}
      >
        <div class="entity ${classMap(contentClasses)}">
          <div class="entity-icon" style=${styleMap(iconStyles)}>
            <ha-icon
              icon=${this.getCustomIcon(domain)}
              style=${styleMap({})}
            ></ha-icon>
          </div>
          <div class="entity-info">
            ${!this.hide_content_name
              ? html`<div class="entity-name">
                  ${this.getCustomName(domain) ||
                  this.computeLabel({ name: domain })}
                </div>`
              : ""}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(domain)
                ? `${active.length}/${total.length} ${this.getStatusProperty(
                    domain
                  )}`
                : this._shouldShowTotalEntities(domain)
                ? `${total.length}`
                : `${active.length} ${this.getStatusProperty(domain)}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }

  private renderDeviceClassTab(item: DeviceClassItem): TemplateResult {
    const { domain, deviceClass } = item;
    const active = this._isOn(domain, deviceClass);
    const total = this._totalEntities(domain, deviceClass);
    const showTotal = this._shouldShowTotalEntities(domain, deviceClass);
    const entities = showTotal ? total : active;
    if (!entities.length) return html``;

    const color = this.getCustomColor(domain, deviceClass);
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

    const iconStyles = this._getIconStyles("deviceClass", {
      color,
      background_color: this.getBackgroundColor(domain, deviceClass),
      square: this._config.square,
    });

    return html`
      <sl-tab
        slot="nav"
        panel=${deviceClass}
        @action=${handler}
        .actionHandler=${ah}
      >
        <div class="entity ${classMap(contentClasses)}">
          <div class="entity-icon" style=${styleMap(iconStyles)}>
            <ha-icon icon=${this.getCustomIcon(domain, deviceClass)}></ha-icon>
          </div>
          <div class="entity-info">
            ${!this.hide_content_name
              ? html`<div class="entity-name">
                  ${this.getCustomName(domain, deviceClass) ||
                  this.computeLabel({ name: deviceClass })}
                </div>`
              : ""}
            <div class="entity-state">
              ${this._shouldShowTotalNumbers(domain, deviceClass)
                ? `${active.length}/${total.length} ${this.getStatusProperty(
                    domain,
                    deviceClass
                  )}`
                : this._shouldShowTotalEntities(domain, deviceClass)
                ? `${total.length}`
                : `${active.length} ${this.getStatusProperty(
                    domain,
                    deviceClass
                  )}`}
            </div>
          </div>
        </div>
      </sl-tab>
    `;
  }

  private _computeSortedEntities = memoizeOne(
    (
      extra: ExtraItem[],
      group: { type: "group"; group_id: string; order: number; ruleset: any }[],
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
        return this.renderDomainTab(item);
      case "deviceClass":
        return this.renderDeviceClassTab(item);
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
    const noScroll = {
      "no-scroll": !!this._config.no_scroll,
    };

    const personEntities = this.getPersonItems();
    return html`
      <ha-card>
        <sl-tab-group no-scroll-controls class=${classMap(noScroll)}>
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
              return html`
                <sl-tab
                  slot="nav"
                  panel=${entity.entity_id}
                  @click="${() => this.showMoreInfo(entity)}"
                >
                  <div class="entity ${classMap(contentClasses)}">
                    <div class="entity-icon" style=${styleMap(iconStyles)}>
                      ${entity.attributes.entity_picture
                        ? html`<img
                            src=${entity.attributes.entity_picture}
                            alt=${entity.attributes.friendly_name ||
                            entity.entity_id}
                            style=${styleMap(iconStyles)}
                          />`
                        : html`<ha-icon
                            class="center"
                            icon=${entity.attributes.icon || "mdi:account"}
                            style=${styleMap(iconStyles)}
                          ></ha-icon>`}
                    </div>
                    <div class="entity-info">
                      ${!this.hide_content_name
                        ? html`<div class="entity-name">
                            ${entity.attributes.friendly_name?.split(" ")[0] ||
                            ""}
                          </div>`
                        : ""}
                      <div class="entity-state">
                        ${this.getStatusProperty(
                          "person",
                          undefined,
                          entityState?.state
                        )}
                      </div>
                    </div>
                  </div>
                </sl-tab>
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
        </sl-tab-group>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
        align-content: center;
      }
      sl-tab-group {
        padding: 6px 4px;
        align-content: center;
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
        overflow: hidden;
      }
      .entity-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
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
      sl-tab {
        pointer-events: auto;
      }
      sl-tab * {
        pointer-events: none;
      }
      sl-tab::part(base) {
        padding: 0 8px !important;
        display: flex;
      }
      sl-tab-group::part(tabs) {
        border-bottom: none !important;
      }
      sl-tab-group.no-scroll::part(tabs) {
        display: flex;
        flex-wrap: wrap;
        overflow-x: visible !important;
        max-width: 100%;
        border-bottom: none !important;
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
