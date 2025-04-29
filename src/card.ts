import { LitElement, html, css, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import {
  HomeAssistant,
  computeDomain,
  LovelaceCard,
  applyThemesOnElement,
  hasAction,
  handleAction,
  ActionHandlerEvent,
  ActionConfig,
  STATES_OFF,
} from "custom-card-helpers";
import type { HassEntity } from "home-assistant-js-websocket";
import { domainIcon, ALLOWED_DOMAINS, DataStore } from "./properties";
import { computeLabelCallback, translateEntityState } from "./translations";
import { actionHandler } from "./helpers";
import { styleMap } from "lit/directives/style-map.js";

interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  area_id?: string;
  hidden_by?: string;
  disabled_by?: string;
  labels?: string[];
}

interface AreaRegistryEntry {
  area_id: string;
  floor_id?: string;
  name: string;
}

interface DeviceRegistryEntry {
  area_id: string;
  labels?: string[];
  id: string;
}

interface CustomizationConfig {
  type: string;
  invert?: boolean;
  name?: string;
  icon?: string;
  icon_color?: string;
  state?: string;
  state_not?: string;
  invert_state?: "true" | "false";
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  icon_css?: string;
  background_color?: number[];
}

interface Config {
  area?: string[];
  extra_entities?: string[];
  hide_person?: boolean;
  list_mode?: boolean;
  hide_content_name?: boolean;
  floor?: string[];
  label?: string[];
  hidden_entities?: string[];
  hidden_labels?: string[];
  columns?: number;
  invert?: Record<string, Record<string, boolean>>;
  content: string[];
  customization?: CustomizationConfig[];
  theme?: string;
  color?: string;
  background_color?: string[];
  show_total_number: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  square?: boolean;
}

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;
  default?: any;
  type?: string;
}

@customElement("status-card")
export class StatusCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public _config!: Config;

  @state() private areas?: AreaRegistryEntry[];
  @state() private devices: DeviceRegistryEntry[] = [];
  @state() private entities: EntityRegistryEntry[] = [];
  @state() private entitiesByDomain: { [domain: string]: HassEntity[] } = {};
  @state() private selectedDomain: string | null = null;
  @state() private selectedDeviceClass: string | null = null;
  @state() private hiddenEntities: string[] = [];
  @state() private hiddenLabels: string[] = [];
  @state() private hide_person: boolean = false;
  @state() private hide_content_name: boolean = true;
  @state() private list_mode: boolean = false;
  @state() private _isMobile: boolean = false;

  private computeLabel(
    schema: Schema,
    domain?: string,
    deviceClass?: string
  ): string {
    return computeLabelCallback(this.hass, schema, domain, deviceClass);
  }

  private _closeDialog(): void {
    this.selectedDomain = null;
    this.selectedDeviceClass = null;

    const container = document.querySelector("home-assistant")?.shadowRoot;
    const dialog = container?.querySelector("ha-dialog");

    if (dialog && container?.contains(dialog)) {
      container.removeChild(dialog);
    }
  }

  static getConfigElement() {
    return document.createElement("status-card-editor");
  }

  public setConfig(config: Config): void {
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
    const oldConfig = changedProps.get("_config") as Config | undefined;

    if (
      (changedProps.has("hass") &&
        (!oldHass || oldHass.themes !== this.hass.themes)) ||
      (changedProps.has("_config") &&
        (!oldConfig || oldConfig.theme !== this._config.theme))
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this._loadData();
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
      (this.hass as HomeAssistant).states
    );

    // Speichere die Ergebnisse in der DataStore-Klasse
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

  private showMoreInfo(entity: HassEntity): void {
    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: entity.entity_id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _entitiesByDomain = memoizeOne(
    (
      registryEntities: EntityRegistryEntry[],
      deviceRegistry: DeviceRegistryEntry[],
      states: HomeAssistant["states"]
    ): { [domain: string]: HassEntity[] } => {
      const area = this._config.area || null;
      const floor = this._config.floor || null;
      const label = this._config.label || null;

      const deviceMap = new Map(
        deviceRegistry.map((device) => [device.id, device])
      );

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

          const areas = area ? (Array.isArray(area) ? area : [area]) : null;
          const floors = floor
            ? Array.isArray(floor)
              ? floor
              : [floor]
            : null;

          const matchesArea = areas
            ? (entry.area_id !== undefined && areas.includes(entry.area_id)) ||
              (device &&
                device.area_id !== undefined &&
                areas.includes(device.area_id))
            : true;

          const matchesFloor = floors
            ? (entry.area_id !== undefined &&
                this.areas?.some(
                  (a) =>
                    a.area_id === entry.area_id &&
                    a.floor_id !== undefined &&
                    floors.includes(a.floor_id)
                )) ||
              (device?.area_id &&
                this.areas?.some(
                  (a) =>
                    a.area_id === device.area_id &&
                    a.floor_id !== undefined &&
                    floors.includes(a.floor_id)
                ))
            : true;

          return (
            !entry.hidden_by &&
            !entry.disabled_by &&
            matchesArea &&
            matchesFloor &&
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

  private _isOn(domain: string, deviceClass?: string): HassEntity[] {
    const entities = this._entitiesByDomain(
      this.entities,
      this.devices,
      (this.hass as HomeAssistant).states
    )[domain];

    if (!entities) {
      return [];
    }

    return entities
      .filter((entity) => !["unavailable", "unknown"].includes(entity.state)) // Filtere ungültige Zustände
      .filter((entity) => {
        const entityDeviceClass = entity.attributes.device_class;

        // Für die Domain "switch" spezielle Logik anwenden
        if (domain === "switch") {
          if (deviceClass === "outlet") {
            // Zeige nur Entitäten mit device_class "outlet"
            return entityDeviceClass === "outlet";
          } else if (deviceClass === "switch") {
            // Zeige Entitäten mit device_class "switch" oder ohne device_class
            return (
              entityDeviceClass === "switch" || entityDeviceClass === undefined
            );
          }
        }

        // Standard-Logik für andere Domains
        return !deviceClass || entityDeviceClass === deviceClass;
      })
      .filter((entity) => {
        // Prüfe, ob die Entität aktiv oder inaktiv ist
        const isActive = ![
          "closed",
          "locked",
          "off",
          "docked",
          "idle",
          "standby",
          "paused",
          "auto",
          "not_home",
          "disarmed",
          "0",
        ].includes(entity.state);

        const customization = this.getCustomizationForType(
          deviceClass
            ? `${this._formatDomain(domain)} - ${deviceClass}`
            : domain
        );
        const isInverted = customization?.invert === true;

        return isInverted ? !isActive : isActive;
      });
  }

  private _totalEntities(domain: string, deviceClass?: string): HassEntity[] {
    const entities = this._entitiesByDomain(
      this.entities,
      this.devices,
      (this.hass as HomeAssistant).states
    )[domain];

    if (!entities) {
      return [];
    }
    return entities.filter((entity) => {
      const matchesDeviceClass =
        !deviceClass || entity.attributes.device_class === deviceClass;
      return (
        matchesDeviceClass && !["unavailable", "unknown"].includes(entity.state)
      );
    });
  }

  private getStatusProperty(
    domain: string,
    deviceClass?: string,
    state?: string
  ): string {
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
      key = `${this._formatDomain(domain)} - ${deviceClass}`;
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

  private getCustomizationForType(type: string):
    | {
        name?: string;
        icon?: string;
        icon_color?: string;
        invert?: boolean;
        show_entity_picture?: boolean;
        tap_action?: ActionConfig;
        double_tap_action?: ActionConfig;
        hold_action?: ActionConfig;
        icon_css?: string;
        background_color?: number[];
      }
    | undefined {
    return this._config.customization?.find(
      (entry: any) => entry.type?.toLowerCase() === type.toLowerCase()
    );
  }

  private getCustomIcon(
    domain: string,
    deviceClass?: string,
    entity?: HassEntity
  ): string {
    let key: string;
    if (deviceClass) {
      key = `${this._formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }

    const customization = this.getCustomizationForType(key);

    // Falls show_entity_picture aktiviert ist und ein Bild vorhanden ist, dieses zurückgeben:
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

    const isInverted = customization?.invert === true;
    const state = isInverted ? "off" : "on";
    let fallbackDomain = domain;
    if (!deviceClass && domain.includes(".")) {
      fallbackDomain = domain.split(".")[0];
    }

    return domainIcon(fallbackDomain, state, deviceClass);
  }

  private getBackgroundColor(
    domain: string,
    deviceClass?: string,
    entity?: HassEntity
  ): string {
    // 1) Erzeuge denselben key wie in getCustomColor
    const key = deviceClass
      ? `${this._formatDomain(domain)} - ${deviceClass}`
      : domain;

    // 2) Hole die customization für genau diesen key
    const customization = this.getCustomizationForType(key);

    // 3) Prüfe, ob in der customization ein Array für background_color steckt
    if (
      customization &&
      Array.isArray((customization as any).background_color)
    ) {
      const arr = (customization as any).background_color as number[];
      return `rgb(${arr.join(",")})`;
    }

    // 4) Sonst globalen Hintergrund aus this._config nehmen
    if (Array.isArray(this._config?.background_color)) {
      return `rgb(${this._config.background_color.join(",")})`;
    }

    // 5) letzter Fallback
    return "rgba(var(--rgb-primary-text-color), 0.15)";
  }

  private getCustomColor(
    domain: string,
    deviceClass?: string,
    entity?: HassEntity
  ): string | undefined {
    let key: string;
    if (deviceClass) {
      key = `${this._formatDomain(domain)} - ${deviceClass}`;
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
      key = `${this._formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }
    const customization = this.getCustomizationForType(key);
    if (customization && customization.name) {
      return customization.name;
    }
    if (entity && entity.attributes && entity.attributes.friendly_name) {
      return entity.attributes.friendly_name;
    }
    return undefined;
  }

  private getCustomCSS(
    domain: string,
    deviceClass?: string,
    entity?: HassEntity
  ): string | undefined {
    let key: string;
    if (deviceClass) {
      key = `${this._formatDomain(domain)} - ${deviceClass}`;
    } else {
      key = domain;
    }
    const customization = this.getCustomizationForType(key);
    if (customization && customization.icon_css) {
      return customization.icon_css;
    }
    return undefined;
  }

  private _formatDomain(domain: string): string {
    return domain
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private loadPersonEntities(): HassEntity[] {
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
          .map((entry) => (this.hass as HomeAssistant).states[entry.entity_id])
          .filter((stateObj): stateObj is HassEntity => !!stateObj)
      : [];
  }

  private renderPersonEntities(): TemplateResult[] {
    const personEntities = this.loadPersonEntities();

    return personEntities.map((entity) => {
      const entityState = this.hass!.states[entity.entity_id];
      const isNotHome = entityState?.state === "not_home";

      const iconStyles = {
        "border-radius": this._config?.square ? "20%" : "50%",
      };

      return html`
        <paper-tab @click="${() => this.showMoreInfo(entity)}">
          <div class="entity">
            <div class="entity-icon" style=${styleMap(iconStyles)}>
              <img
                src="${entity.attributes.entity_picture || ""}"
                style=${styleMap(iconStyles)}
                alt="${entity.attributes.friendly_name || entity.entity_id}"
              />
            </div>
            <div class="entity-info">
              <div class="entity-name">
                ${!this.hide_content_name
                  ? entity.attributes.friendly_name?.split(" ")[0] || ""
                  : ""}
              </div>
              <div class="entity-state">
                ${this.getStatusProperty(
                  "person",
                  undefined,
                  entityState?.state
                )}
              </div>
            </div>
          </div>
        </paper-tab>
      `;
    });
  }

  private loadExtraEntities(): {
    type: string;
    entities: HassEntity[];
    icon: string;
  }[] {
    if (!this._config?.extra_entities || !this.hass) {
      return [];
    }

    return this._config.extra_entities
      .filter((entity_id) => this._config.content.includes(entity_id))
      .map((entity_id) => {
        const entity = this.hass!.states[entity_id];
        const domain = computeDomain(entity_id);
        if (!entity) {
          return null;
        }

        const customizationEntry = this._config.customization?.find(
          (entry: any) => entry.type === entity_id
        );

        if (
          customizationEntry &&
          customizationEntry.state !== undefined &&
          customizationEntry.invert_state !== undefined
        ) {
          if (customizationEntry.invert_state === "false") {
            if (entity.state !== customizationEntry.state) {
              return null;
            }
          } else if (customizationEntry.invert_state === "true") {
            if (entity.state === customizationEntry.state) {
              return null;
            }
          }
        }

        return {
          type: "extra",
          entities: [entity],
          icon: entity.attributes.icon || domainIcon(domain),
        };
      })
      .filter(
        (
          item
        ): item is { type: string; entities: HassEntity[]; icon: string } =>
          item !== null
      );
  }

  createCard(cardConfig: { type: string; entity: string; [key: string]: any }) {
    const cardElement = document.createElement(
      `hui-${cardConfig.type}-card`
    ) as LovelaceCard;
    if (cardElement) {
      cardElement.hass = this.hass;
      cardElement.setConfig(cardConfig);
      return cardElement;
    }
    return html`<p>Invalid Configuration for card type: ${cardConfig.type}</p>`;
  }

  private desktopStyles = `
      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px;} 
      .dialog-header ha-icon-button { margin-right: 10px;  }
      ha-dialog#more-info-dialog { --mdc-dialog-max-width: calc(22.5vw * var(--columns) + 3vw); }
      .entity-card { width: 22.5vw ;  box-sizing: border-box; }
      .entity-cards { display: flex; flex-wrap: wrap; gap: 4px; }
      .entity-list .entity-item { list-style: none;  display: flex; flex-direction: column; }
      ul { margin: 0; padding: 5px;  }
      ha-icon { display: flex; }
      h4 { font-size: 1.2em; margin: 0.8em 0em;} 
`;

  private mobileStyles = `
      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px;} 
      .dialog-header ha-icon-button { margin-right: 10px;  }
      ha-dialog#more-info-dialog { --mdc-dialog-max-width: 96vw; --mdc-dialog-min-width: 96vw; }
      .entity-list { list-style: none;  display: flex; flex-direction: column; }
      ul { margin: 0; padding: 5px;  };
      .entity-card { flex-basis: 100%; max-width: 100%; }
      .entity-cards { display: flex; flex-direction: column; gap: 4px; }
      ha-icon { display: flex; }
      h4 { font-size: 1.2em; margin: 0.6em 0em;} 
  }
`;

  private getAreaForEntity(entity: HassEntity): string {
    const entry = this.entities.find((e) => e.entity_id === entity.entity_id);
    if (entry) {
      if (entry.area_id) {
        return entry.area_id;
      }

      if (entry.device_id) {
        const device = this.devices.find((d) => d.id === entry.device_id);
        if (device && device.area_id) {
          return device.area_id;
        }
      }
    }
    return "unassigned";
  }

  private renderPopup(): TemplateResult {
    const columns = this.list_mode ? 1 : this._config.columns || 4;
    const styleBlock = this._isMobile ? this.mobileStyles : this.desktopStyles;
    const entities = this._isOn(
      this.selectedDomain!,
      this.selectedDeviceClass!
    );

    const groups = new Map<string, HassEntity[]>();
    for (const entity of entities) {
      const areaId = this.getAreaForEntity(entity);
      if (!groups.has(areaId)) {
        groups.set(areaId, []);
      }
      groups.get(areaId)!.push(entity);
    }

    const sortEntities = (ents: HassEntity[]) => {
      return ents.slice().sort((a, b) => {
        const nameA = (
          a.attributes?.friendly_name || a.entity_id
        ).toLowerCase();
        const nameB = (
          b.attributes?.friendly_name || b.entity_id
        ).toLowerCase();
        return nameA.localeCompare(nameB);
      });
    };

    const sortedGroups = Array.from(groups.entries()).sort(
      ([areaIdA], [areaIdB]) => {
        const areaObjA = this.areas?.find((a) => a.area_id === areaIdA);
        const areaObjB = this.areas?.find((a) => a.area_id === areaIdB);

        const nameA = areaObjA
          ? areaObjA.name.toLowerCase()
          : areaIdA === "unassigned"
          ? "Unassigned"
          : areaIdA;
        const nameB = areaObjB
          ? areaObjB.name.toLowerCase()
          : areaIdB === "unassigned"
          ? "Unassigned"
          : areaIdB;

        return nameA.localeCompare(nameB);
      }
    );

    return html`
      <ha-dialog
        id="more-info-dialog"
        style="--columns: ${columns};"
        open
        @closed="${this._closeDialog}"
      >
        <style>
          ${styleBlock}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            dialogaction="cancel"
            @click=${() => this._closeDialog()}
            title="${this.computeLabel({ name: "close" })}"
          >
            <ha-icon class="center" icon="mdi:close"></ha-icon>
          </ha-icon-button>
          <h3>
            ${this.selectedDomain && this.selectedDeviceClass
              ? this.computeLabel(
                  { name: "header" },
                  this.selectedDomain,
                  this.selectedDeviceClass
                )
              : this.computeLabel(
                  { name: "header" },
                  this.selectedDomain || undefined
                )}
          </h3>
        </div>
        ${this.list_mode
          ? html`
              <ul class="entity-list">
                ${sortedGroups.map(([areaId, groupEntities]) => {
                  const areaObj = this.areas?.find((a) => a.area_id === areaId);
                  const areaName = areaObj
                    ? areaObj.name
                    : areaId === "unassigned"
                    ? "Unassigned"
                    : areaId;
                  const sortedEntities = sortEntities(groupEntities);
                  return html`
                    <li class="entity-item">
                      <h4>${areaName}:</h4>
                      <ul>
                        ${sortedEntities.map(
                          (entity) => html`
                            <li class="entity-item">- ${entity.entity_id}</li>
                          `
                        )}
                      </ul>
                    </li>
                  `;
                })}
              </ul>
            `
          : html`
              ${sortedGroups.map(([areaId, groupEntities]) => {
                const areaObj = this.areas?.find((a) => a.area_id === areaId);
                const areaName = areaObj
                  ? areaObj.name
                  : areaId === "unassigned"
                  ? "Unassigned"
                  : areaId;
                const sortedEntities = sortEntities(groupEntities);
                return html`
                  <div class="area-group">
                    <h4>${areaName}</h4>
                    <div class="entity-cards">
                      ${sortedEntities.map(
                        (entity) => html`
                          <div class="entity-card">
                            ${this.createCard({
                              type: "tile",
                              entity: entity.entity_id,
                              ...(this.selectedDomain ===
                                "alarm_control_panel" && {
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
                              }),
                              ...(this.selectedDomain === "light" && {
                                state_content: [
                                  "state",
                                  "brightness",
                                  "last_changed",
                                ],
                                features: [{ type: "light-brightness" }],
                              }),
                              ...(this.selectedDomain === "cover" && {
                                state_content: [
                                  "state",
                                  "position",
                                  "last_changed",
                                ],
                                features: [
                                  { type: "cover-open-close" },
                                  { type: "cover-position" },
                                ],
                              }),
                              ...(this.selectedDomain === "vacuum" && {
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
                              }),
                              ...(this.selectedDomain === "climate" && {
                                state_content: [
                                  "state",
                                  "current_temperature",
                                  "last_changed",
                                ],
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
                              }),
                              ...(this.selectedDomain === "water_heater" && {
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
                              }),
                              ...(this.selectedDomain === "humidifier" && {
                                state_content: [
                                  "state",
                                  "current_humidity",
                                  "last_changed",
                                ],
                                features: [
                                  {
                                    type: "target-humidity",
                                  },
                                ],
                              }),
                              ...(this.selectedDomain === "media_player" && {
                                show_entity_picture: true,
                                state_content: [
                                  "state",
                                  "volume_level",
                                  "last_changed",
                                ],
                                features: [
                                  { type: "media-player-volume-slider" },
                                ],
                              }),
                              ...(this.selectedDomain === "lock" && {
                                state_content: ["state", "last_changed"],
                                features: [{ type: "lock-commands" }],
                              }),
                              ...(this.selectedDomain === "fan" && {
                                state_content: [
                                  "state",
                                  "percentage",
                                  "last_changed",
                                ],
                                features: [{ type: "fan-speed" }],
                              }),
                              ...(this.selectedDomain === "counter" && {
                                state_content: ["state", "last_changed"],
                                features: [
                                  {
                                    type: "counter-actions",
                                    actions: [
                                      "increment",
                                      "decrement",
                                      "reset",
                                    ],
                                  },
                                ],
                              }),
                              ...(this.selectedDomain === "lawn_mower" && {
                                state_content: ["state", "last_changed"],
                                features: [
                                  {
                                    type: "lawn-mower-commands",
                                    commands: ["start_pause", "dock"],
                                  },
                                ],
                              }),
                              ...(this.selectedDomain === "update" && {
                                state_content: [
                                  "state",
                                  "latest_version",
                                  "last_changed",
                                ],
                                features: [
                                  { type: "update-actions", backup: "ask" },
                                ],
                              }),
                              ...(["switch", "input_boolean"].includes(
                                this.selectedDomain as string
                              ) && {
                                state_content: ["state", "last_changed"],
                                features: [{ type: "toggle" }],
                              }),
                              ...(this.selectedDomain === "calendar" && {
                                state_content: "message",
                              }),
                              ...(this.selectedDomain === "timer" && {
                                state_content: ["state", "remaining_time"],
                              }),
                              ...([
                                "binary_sensor",
                                "device_tracker",
                                "remote",
                              ].includes(this.selectedDomain as string) && {
                                state_content: ["state", "last_changed"],
                              }),
                            })}
                          </div>
                        `
                      )}
                    </div>
                  </div>
                `;
              })}
            `}
      </ha-dialog>
    `;
  }

  private _handleDomainAction(
    domain: string,
    deviceClass?: string
  ): (ev: ActionHandlerEvent) => void {
    return (ev: ActionHandlerEvent) => {
      ev.stopPropagation();

      let key: string;
      if (deviceClass) {
        key = `${this._formatDomain(domain)} - ${deviceClass}`;
      } else {
        key = domain;
      }
      const customization = this.getCustomizationForType(key);

      let actionFromCustomization: ActionConfig | undefined;
      let actionFromConfig: ActionConfig | undefined;

      if (ev.detail.action === "tap") {
        actionFromCustomization = customization?.tap_action
          ? { ...customization.tap_action }
          : undefined;
        actionFromConfig = this._config?.tap_action
          ? { ...this._config.tap_action }
          : undefined;
      } else if (ev.detail.action === "hold") {
        actionFromCustomization = customization?.hold_action
          ? { ...customization.hold_action }
          : undefined;
        actionFromConfig = this._config?.hold_action
          ? { ...this._config.hold_action }
          : undefined;
      } else if (ev.detail.action === "double_tap") {
        actionFromCustomization = customization?.double_tap_action
          ? { ...customization.double_tap_action }
          : undefined;
        actionFromConfig = this._config?.double_tap_action
          ? { ...this._config.double_tap_action }
          : undefined;
      }

      let actionConfig =
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

      if (isMoreInfo || actionConfig === undefined) {
        this.selectedDomain = domain;
        this.selectedDeviceClass = deviceClass || null;
        return;
      }

      if (isToggle) {
        const entities = this._isOn(domain, deviceClass);
        const invert = customization?.invert === true;

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
          if (invert) {
            isOn = !isOn;
          }

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

      const config = {
        tap_action: customization?.tap_action || this._config.tap_action,
        hold_action: customization?.hold_action || this._config.hold_action,
        double_tap_action:
          customization?.double_tap_action || this._config.double_tap_action,
      };

      handleAction(this, this.hass!, config, ev.detail.action!);
    };
  }

  protected render() {
    const configContent = this._config.content || [];
    const domainContent = configContent.filter(
      (content) => !content.includes(" - ")
    );
    const deviceClassContent = configContent.filter((content) =>
      content.includes(" - ")
    );

    const domainEntities = domainContent.map((content) => ({
      type: "domain",
      domain: content,
      order: configContent.indexOf(content),
    }));

    const deviceClassEntities = deviceClassContent.map((content) => {
      const parts = content.split(" - ");
      const domain = parts[0].trim().toLowerCase().replace(/\s+/g, "_");
      const deviceClass = parts[1].trim().toLowerCase();
      return {
        type: "deviceClass",
        domain,
        deviceClass,
        order: configContent.indexOf(content),
      };
    });

    const extraEntities = this.loadExtraEntities().map(({ entities }) => {
      const entity = entities[0];
      const customIndex = this._config.content?.findIndex(
        (item: string) => item === entity.entity_id
      );
      const order =
        customIndex !== -1 && customIndex !== undefined ? customIndex : 0;
      const calculatedIcon = this.getCustomIcon(
        entity.entity_id,
        undefined,
        entity
      );
      const calculatedName = this.getCustomName(
        entity.entity_id,
        undefined,
        entity
      );
      const calculatedcolor = this.getCustomColor(
        entity.entity_id,
        undefined,
        entity
      );
      const calculatedCSS = this.getCustomCSS(
        entity.entity_id,
        undefined,
        entity
      );
      const calculatedBackground = this.getBackgroundColor(
        entity.entity_id,
        undefined,
        entity
      );
      return {
        entity,
        icon: calculatedIcon,
        name: calculatedName,
        color: calculatedcolor,
        icon_css: calculatedCSS,
        background_color: calculatedBackground,
        order,
        type: "extra",
      };
    });

    const allEntities = [
      ...extraEntities,
      ...domainEntities,
      ...deviceClassEntities,
    ];

    const sortedEntities = allEntities.sort((a, b) => a.order - b.order);

    return html`
      <ha-card>
        <paper-tabs scrollable hide-scroll-buttons>
          ${this.renderPersonEntities()}
          ${sortedEntities.map((item: any) => {
            if (item.type === "extra") {
              const { entity, icon, name, color, icon_css, background_color } =
                item;
              const domain = computeDomain(entity.entity_id);
              const translatedEntityState = translateEntityState(
                this.hass!,
                entity.state,
                domain
              );

              const iconStyles = {
                color: color ? `var(--${color}-color)` : "",
                "border-radius": this._config?.square ? "20%" : "50%",
                "background-color": `${background_color}`,
              };

              return html`
                <paper-tab @click="${() => this.showMoreInfo(entity)}">
                  <div class="extra-entity">
                    <div class="entity-icon" style=${styleMap(iconStyles)}>
                      ${icon &&
                      (icon.startsWith("/") || icon.startsWith("http"))
                        ? html`
                            <img
                              src="${icon}"
                              alt="${name}"
                              style="border-radius:
                            ${this._config?.square ? "20%" : "50%"};"
                            />
                          `
                        : html`
                            <ha-icon
                              icon="${icon}"
                              style="${icon_css
                                ? icon_css
                                    .split("\n")
                                    .map((line: string) => line.trim())
                                    .filter(
                                      (line: string) =>
                                        line && line.includes(":")
                                    )
                                    .map((line: string) =>
                                      line.endsWith(";") ? line : `${line};`
                                    )
                                    .join(" ")
                                : ""}"
                            ></ha-icon>
                          `}
                    </div>
                    <div class="entity-info">
                      ${this._config?.hide_content_name !== true
                        ? html`<div class="entity-name">${name}</div>`
                        : ""}
                      <div class="entity-state">${translatedEntityState}</div>
                    </div>
                  </div>
                </paper-tab>
              `;
            } else if (item.type === "domain") {
              const activeEntities = this._isOn(item.domain);
              const totalEntities = this._totalEntities(item.domain);
              if (activeEntities.length === 0) return null;
              const color = this.getCustomColor(item.domain);
              const customization = this.getCustomizationForType(item.domain);
              const iconStyles = {
                color: color ? `var(--${color}-color)` : "",
                "border-radius": this._config?.square ? "20%" : "50%",
                "background-color": this.getBackgroundColor(item.domain),
              };

              return html`
                <paper-tab
                  @action=${this._handleDomainAction(item.domain)}
                  .actionHandler=${actionHandler({
                    hasHold: hasAction(
                      customization?.hold_action ?? this._config.hold_action
                    ),
                    hasDoubleClick: hasAction(
                      customization?.double_tap_action ??
                        this._config.double_tap_action
                    ),
                  })}
                >
                  <div class="entity">
                    <div class="entity-icon" style=${styleMap(iconStyles)}>
                      <ha-icon
                        icon="${this.getCustomIcon(item.domain)}"
                        style="${customization?.icon_css
                          ? customization.icon_css
                              .split("\n")
                              .map((line: string) => line.trim())
                              .filter(
                                (line: string) => line && line.includes(":")
                              )
                              .map((line: string) =>
                                line.endsWith(";") ? line : `${line};`
                              )
                              .join(" ")
                          : ""}"
                      ></ha-icon>
                    </div>
                    <div class="entity-info">
                      <div class="entity-name">
                        ${!this.hide_content_name
                          ? this.getCustomName(item.domain) ||
                            this.computeLabel({ name: item.domain })
                          : ""}
                      </div>
                      <div class="entity-state">
                        <span
                          >${!this._config.show_total_number
                            ? activeEntities.length +
                              " " +
                              this.getStatusProperty(item.domain)
                            : activeEntities.length +
                              "/" +
                              totalEntities.length +
                              " " +
                              this.getStatusProperty(item.domain)}</span
                        >
                      </div>
                    </div>
                  </div>
                </paper-tab>
              `;
            } else if (item.type === "deviceClass") {
              const { domain, deviceClass } = item;
              const activeEntities = this._isOn(domain, deviceClass);
              const totalEntities = this._totalEntities(domain, deviceClass);
              if (activeEntities.length === 0) return null;
              const color = this.getCustomColor(domain, deviceClass);
              const customization = this.getCustomizationForType(
                `${this._formatDomain(domain)} - ${deviceClass}`
              );
              const iconStyles = {
                color: color ? `var(--${color}-color)` : "",
                "border-radius": this._config?.square ? "20%" : "50%",
                "background-color": this.getBackgroundColor(
                  domain,
                  deviceClass
                ),
              };
              return html`
                <paper-tab
                  @action=${this._handleDomainAction(domain, deviceClass)}
                  .actionHandler=${actionHandler({
                    hasHold: hasAction(
                      customization?.hold_action ?? this._config.hold_action
                    ),
                    hasDoubleClick: hasAction(
                      customization?.double_tap_action ??
                        this._config.double_tap_action
                    ),
                  })}
                >
                  <div class="entity">
                    <div class="entity-icon" style=${styleMap(iconStyles)}>
                      <ha-icon
                        icon="${this.getCustomIcon(domain, deviceClass)}"
                      ></ha-icon>
                    </div>
                    <div class="entity-info">
                      <div class="entity-name">
                        ${!this.hide_content_name
                          ? this.getCustomName(domain, deviceClass) ||
                            this.computeLabel({ name: deviceClass })
                          : ""}
                      </div>
                      <div class="entity-state">
                        <span
                          >${!this._config.show_total_number
                            ? activeEntities.length +
                              " " +
                              this.getStatusProperty(domain, deviceClass)
                            : activeEntities.length +
                              "/" +
                              totalEntities.length +
                              " " +
                              this.getStatusProperty(domain, deviceClass)}</span
                        >
                      </div>
                    </div>
                  </div>
                </paper-tab>
              `;
            }
            return null;
          })}
          ${this.selectedDomain ? this.renderPopup() : ""}
        </paper-tabs>
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
      paper-tabs {
        height: 110px;
        padding: 4px 8px;
      }
      paper-tab {
        padding: 0 5px;
      }
      .center {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .entity,
      .extra-entity {
        display: flex;
        flex-direction: column;
        align-items: center;
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
      .entity-info {
        text-align: center;
        margin-top: 5px;
      }
      .entity-name {
        font-weight: bold;
        margin-bottom: 2px;
      }
      .entity-state {
        color: var(--secondary-text-color);
        font-size: 0.9em;
      }
      paper-tab {
        pointer-events: auto;
      }
      paper-tab * {
        pointer-events: none;
      }
    `;
  }

  static getStubConfig() {
    return {};
  }
}
