import { LitElement, html, css, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import memoizeOne from "memoize-one";
import type { HassEntity } from "home-assistant-js-websocket";
import { renderPopup } from "./popup";
import { domainIcon, ALLOWED_DOMAINS, DataStore } from "./properties";
import { computeLabelCallback, translateEntityState } from "./translations";
import {
  actionHandler,
  applyThemesOnElement,
  _formatDomain,
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
  @state() public _showAll = false;
  @state() public _confirmOpen = false;
  @state() public _confirmParams: { domain: string; deviceClass?: string } = {
    domain: "",
    deviceClass: undefined,
  };
  @state() public _isMobile: boolean = false;
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

    DataStore.setEntitiesByDomain(
      Object.fromEntries(
        Object.entries(entitiesByDomain).map(([domain, entities]) => [
          domain,
          entities.map((entity) => entity.entity_id),
        ])
      )
    );

    this.entitiesByDomain = entitiesByDomain;
  }

  private _entitiesByDomain = memoizeOne(
    (
      registryEntities: EntityRegistryEntry[],
      deviceRegistry: DeviceRegistryEntry[],
      areas: AreaRegistryEntry[],
      states: HomeAssistant["states"]
    ): { [domain: string]: HassEntity[] } => {
      const area = this._config.area || null;
      const floor = this._config.floor || null;
      const label = this._config.label || null;

      const deviceMap = new Map(
        deviceRegistry.map((device) => [device.id, device])
      );

      const areaList = areas ?? [];

      const entitiesInArea = registryEntities
        .filter((entry) => {
          const domain = computeDomain(entry.entity_id);

          if (domain === "update") {
            return !entry.hidden_by && !entry.disabled_by;
          }

          const device = entry.device_id
            ? deviceMap.get(entry.device_id)
            : null;
          const isInAnyArea =
            entry.area_id !== null || (device && device.area_id !== null);

          if (!isInAnyArea) {
            return false;
          }

          const matchesLabel = label
            ? entry.labels?.some((l) => label.includes(l)) ||
              (device?.labels?.some((l) => label.includes(l)) ?? false)
            : true;
          if (!matchesLabel) {
            return false;
          }

          const areasArr = area ? (Array.isArray(area) ? area : [area]) : null;
          const floorsArr = floor
            ? Array.isArray(floor)
              ? floor
              : [floor]
            : null;

          const matchesArea = areasArr
            ? (entry.area_id !== undefined &&
                areasArr.includes(entry.area_id)) ||
              (device &&
                device.area_id !== undefined &&
                areasArr.includes(device.area_id))
            : true;

          const matchesFloor = floorsArr
            ? (entry.area_id !== undefined &&
                areaList.some(
                  (a) =>
                    a.area_id === entry.area_id &&
                    a.floor_id !== undefined &&
                    floorsArr.includes(a.floor_id)
                )) ||
              (device?.area_id &&
                areaList.some(
                  (a) =>
                    a.area_id === device.area_id &&
                    a.floor_id !== undefined &&
                    floorsArr.includes(a.floor_id)
                ))
            : true;

          const matchesHiddenAreas =
            this.hiddenAreas && this.hiddenAreas.length > 0
              ? !(
                  (entry.area_id && this.hiddenAreas.includes(entry.area_id)) ||
                  (device &&
                    device.area_id &&
                    this.hiddenAreas.includes(device.area_id))
                )
              : true;

          return (
            !entry.hidden_by &&
            !entry.disabled_by &&
            matchesArea &&
            matchesFloor &&
            matchesHiddenAreas &&
            !entry.labels?.some((l) => this.hiddenLabels.includes(l)) &&
            !this.hiddenEntities.includes(entry.entity_id)
          );
        })
        .map((entry) => entry.entity_id);

      const entitiesByDomain: { [domain: string]: HassEntity[] } = {};

      for (const entity of entitiesInArea) {
        const domain = computeDomain(entity);
        if (!ALLOWED_DOMAINS.includes(domain)) {
          continue;
        }
        const stateObj = states[entity];
        if (!stateObj) continue;

        if (!(domain in entitiesByDomain)) {
          entitiesByDomain[domain] = [];
        }
        entitiesByDomain[domain].push(stateObj);
      }

      return entitiesByDomain;
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

    return all.filter((entity) => {
      const st = entity.state;
      if (st === "unavailable" || st === "unknown") {
        return false;
      }
      const dc = entity.attributes.device_class;
      if (domain === "switch") {
        if (deviceClass === "outlet") {
          return dc === "outlet";
        }
        if (deviceClass === "switch") {
          return dc === "switch" || dc === undefined;
        }
        return true;
      }

      return !deviceClass || dc === deviceClass;
    });
  }

  public _totalEntities(domain: string, deviceClass?: string): HassEntity[] {
    return this._baseEntities(domain, deviceClass);
  }

  public _shouldShowTotalEntities(
    domain: string,
    deviceClass?: string
  ): boolean {
    if (this._config.show_total_entities) return true;

    const key = deviceClass
      ? `${_formatDomain(domain)} - ${deviceClass}`
      : domain;
    const customization = this.getCustomizationForType(key);
    return customization?.show_total_entities === true;
  }
  public _shouldShowTotalNumbers(
    domain: string,
    deviceClass?: string
  ): boolean {
    if (this._config.show_total_number) return true;

    const key = deviceClass
      ? `${_formatDomain(domain)} - ${deviceClass}`
      : domain;
    const customization = this.getCustomizationForType(key);
    return customization?.show_total_number === true;
  }

  public _isOn(domain: string, deviceClass?: string): HassEntity[] {
    const ents = this._baseEntities(domain, deviceClass);

    const key = deviceClass
      ? `${_formatDomain(domain)} - ${deviceClass}`
      : domain;
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

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (!this._config || !this.hass) {
      return;
    }

    const dialog = this.renderRoot?.querySelector("ha-dialog");
    const container = document.querySelector("home-assistant")?.shadowRoot;

    if (dialog && dialog.parentElement !== container) {
      container?.appendChild(dialog);
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as CardConfig | undefined;

    if (
      (changedProps.has("hass") &&
        (!oldHass || oldHass.themes !== this.hass.themes)) ||
      (changedProps.has("_config") &&
        (!oldConfig || oldConfig.theme !== this._config.theme))
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._updateIsMobile();
    window.addEventListener("resize", this._updateIsMobile.bind(this));
  }

  disconnectedCallback(): void {
    window.removeEventListener("resize", this._updateIsMobile.bind(this));
    super.disconnectedCallback();
  }

  private _updateIsMobile(): void {
    this._isMobile = window.innerWidth <= 768;
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

    let key: string;
    if (deviceClass) {
      key = `${_formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }
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

  public getCustomizationForType(
    type: string
  ): CustomizationConfig | undefined {
    if (!type) return undefined;
    return this._config.customization?.find(
      (entry) => entry.type?.toLowerCase() === type.toLowerCase()
    );
  }

  private getCustomIcon(
    domain: string,
    deviceClass?: string,
    entity?: HassEntity
  ): string {
    let key: string;
    if (deviceClass) {
      key = `${_formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }

    const customization = this.getCustomizationForType(key);

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
    const key = deviceClass
      ? `${_formatDomain(domain)} - ${deviceClass}`
      : domain;

    const customization = this.getCustomizationForType(key);

    if (customization && Array.isArray(customization.background_color)) {
      const arr = customization.background_color as number[];
      return `rgb(${arr.join(",")})`;
    }

    if (Array.isArray(this._config?.background_color)) {
      return `rgb(${this._config.background_color.join(",")})`;
    }

    return "rgba(var(--rgb-primary-text-color), 0.15)";
  }

  private getCustomColor(
    domain: string,
    deviceClass?: string
  ): string | undefined {
    let key: string;
    if (deviceClass) {
      key = `${_formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }
    const customization = this.getCustomizationForType(key);
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
    let key: string;
    if (deviceClass) {
      key = `${_formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }
    const customization = this.getCustomizationForType(key);
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
    let key: string;
    if (deviceClass) {
      key = `${_formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }
    const customization = this.getCustomizationForType(key);
    if (customization && customization.icon_css) {
      return customization.icon_css;
    }
    return undefined;
  }

  public toggleDomain(domain?: string, deviceClass?: string): void {
    domain = domain ?? this.selectedDomain!;
    deviceClass = deviceClass ?? this.selectedDeviceClass!;
    let key: string;
    if (deviceClass) {
      key = `${_formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }

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

      let key = deviceClass
        ? `${_formatDomain(domain)} - ${deviceClass}`
        : domain;
      const customization = this.getCustomizationForType(key);

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

  private getPersonItems(): HassEntity[] {
    return !this.hide_person
      ? this.entities
          .filter(
            (entity) =>
              entity.entity_id.startsWith("person.") &&
              !this.hiddenEntities.includes(entity.entity_id) &&
              !entity.labels?.some((l) => this.hiddenLabels.includes(l)) &&
              !entity.hidden_by &&
              !entity.disabled_by
          )
          .reverse() // Reverse to show the most recent first
          .map((entry) => (this.hass as HomeAssistant).states[entry.entity_id])
          .filter((stateObj): stateObj is HassEntity => !!stateObj)
      : [];
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
    content.reduce<DomainItem[]>((acc, c) => {
      if (!c.includes(" - ")) {
        acc.push({
          type: "domain" as const,
          domain: c,
          order: content.indexOf(c),
        });
      }
      return acc;
    }, [])
  );

  private _computeDeviceClassItems = memoizeOne(
    (content: string[]): DeviceClassItem[] =>
      content.reduce<DeviceClassItem[]>((acc, c) => {
        if (c.includes(" - ")) {
          const [rawDomain, rawClass] = c.split(" - ");
          acc.push({
            type: "deviceClass" as const,
            domain: rawDomain.trim().toLowerCase().replace(/\s+/g, "_"),
            deviceClass: rawClass.trim().toLowerCase(),
            order: content.indexOf(c),
          });
        }
        return acc;
      }, [])
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

  private renderPersonEntities(): TemplateResult[] {
    const personEntities = this.getPersonItems();

    return personEntities.map((entity) => {
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
                    alt=${entity.attributes.friendly_name || entity.entity_id}
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
                    ${entity.attributes.friendly_name?.split(" ")[0] || ""}
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
    });
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
      this.hass!.localize(
        "component.group.entity_component._.name ${index + 1}"
      );
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
    const key = `${_formatDomain(domain)} - ${deviceClass}`;
    const customization = this.getCustomizationForType(key);

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
      "no-scroll": !!this._config.no_scroll, // true, wenn tabs_wrap aktiviert ist
    };

    return html`
      <ha-card>
        <sl-tab-group no-scroll-controls class=${classMap(noScroll)}>
          ${this.renderPersonEntities()}
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
          ${this.selectedDomain !== null || this.selectedGroup !== null
            ? renderPopup(this)
            : ""}
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
        margin-top: 7px;
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
