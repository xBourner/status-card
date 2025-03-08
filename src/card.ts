import { LitElement, html, css, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { HomeAssistant, computeDomain, LovelaceCard, applyThemesOnElement } from "custom-card-helpers";
import type { HassEntity } from "home-assistant-js-websocket";
import { domainIcon, ALLOWED_DOMAINS } from './properties';
import { computeLabelCallback, translateEntityState } from "./translations";


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
}

interface Config {
  area?: string[];
  extra_entities?: string[];
  hide_person?: boolean;
  hide_person_name?: boolean;
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
  @state() private hide_person_name: boolean = true;
  @state() private hiddenEntities: string[] = [];
  @state() private hiddenLabels: string[] = [];
  @state() private hide_person: boolean = false;
  @state() private hide_content_name: boolean = true;
  @state() private list_mode: boolean = false;
  @state() private _isMobile: boolean = false;


  private computeLabel(schema: Schema, domain?: string, deviceClass?: string): string {
    return computeLabelCallback(this.hass, schema, domain, deviceClass);
  }

  private _showEntities(domain: string, deviceClass?: string): void {
    this.selectedDomain = domain;
    this.selectedDeviceClass = deviceClass || null;
  }

  private _closeDialog(): void {
    this.selectedDomain = null;
    this.selectedDeviceClass = null;

    const container = document.querySelector("home-assistant")?.shadowRoot;
    const dialog = container?.querySelector("ha-dialog"); // Dialog direkt im neuen Container finden
    
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
    this.hide_person_name = config.hide_person_name !== undefined ? config.hide_person_name : false;
    this.hide_person = config.hide_person !== undefined ? config.hide_person : false;
    this.hide_content_name = config.hide_content_name !== undefined ? config.hide_content_name : false;
    this.list_mode = config.list_mode !== undefined ? config.list_mode : false;
    this.hiddenEntities = config.hidden_entities || [];
    this.hiddenLabels = config.hidden_labels || [];
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Initiale Prüfung
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

    const dialog = this.renderRoot?.querySelector("ha-dialog"); // Holt das ha-dialog direkt aus dem gerenderten Output
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
      const [areas, devices, entities]: [AreaRegistryEntry[], DeviceRegistryEntry[], EntityRegistryEntry[]] =
        await Promise.all([
          this.hass?.callWS<AreaRegistryEntry[]>({ type: "config/area_registry/list" }) ?? [],
          this.hass?.callWS<DeviceRegistryEntry[]>({ type: "config/device_registry/list" }) ?? [],
          this.hass?.callWS<EntityRegistryEntry[]>({ type: "config/entity_registry/list" }) ?? [],
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

    this.entitiesByDomain = this._entitiesByDomain(
      this.entities,
      this.devices,
      (this.hass as HomeAssistant).states
    );
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
  
          const device = entry.device_id ? deviceMap.get(entry.device_id) : null;
          const isInAnyArea =
            entry.area_id !== null || (device && device.area_id !== null);
          if (!isInAnyArea) {
            return false;
          }
  
          const matchesLabel =
            label
              ? entry.labels?.some((l) => label.includes(l)) ||
                (device?.labels?.some((l) => label.includes(l)) ?? false)
              : true;
          if (!matchesLabel) {
            return false;
          }
  
          const areas = area ? (Array.isArray(area) ? area : [area]) : null;
          const floors = floor ? (Array.isArray(floor) ? floor : [floor]) : null;

          const matchesArea = areas
            ? ((entry.area_id !== undefined && areas.includes(entry.area_id)) ||
               (device && device.area_id !== undefined && areas.includes(device.area_id)))
            : true;
          
  
            const matchesFloor = floors
            ? (
                (entry.area_id !== undefined &&
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
              )
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
      .filter((entity) => !["unavailable", "unknown"].includes(entity.state))
      .filter((entity) => {
        const matchesDeviceClass = !deviceClass || entity.attributes.device_class === deviceClass;
  
        // Schlüsselaufbau: Falls deviceClass existiert, nutzen wir "FormattedDomain - deviceClass", sonst einfach domain.
        let key: string;
        if (deviceClass) {
          key = `${this._formatDomain(domain)} - ${deviceClass}`;
        } else {
          key = domain;
        }
        const customization = this.getCustomizationForType(key);
        const isInverted = customization?.invert === true;
  
        const isActive = !["closed", "locked", "off", "docked", "idle", "standby", "paused", "auto", "not_home", "disarmed", "0"].includes(entity.state);
        const isInactive = !isActive;
  
        if (domain === "climate") {
          const hvacAction = entity.attributes.hvac_action;
          if (hvacAction !== undefined) {
            return isInverted ? ["idle", "off"].includes(hvacAction) : !["idle", "off"].includes(hvacAction);
          }
        }
  
        if (["cover", "binary_sensor"].includes(domain)) {
          return matchesDeviceClass && (isInverted ? isInactive : isActive);
        }
  
        return isInverted ? isInactive : isActive;
      });
  }
  
  
 private getStatusProperty(domain: string, deviceClass?: string, state?: string): string {
  const openDeviceClasses = ['window', 'door', 'lock', 'awning', 'blind', 'curtain', 'damper', 'garage', 'gate', 'shade', 'shutter'];

  // Schlüsselaufbau analog: mit Device Class "FormattedDomain - deviceClass" oder einfach domain
  let key: string;
  if (deviceClass) {
    key = `${this._formatDomain(domain)} - ${deviceClass}`;
  } else {
    key = domain;
  }
  const customization = this.getCustomizationForType(key);
  const isInverted = customization?.invert === true;

  switch (domain) {
    case 'device_tracker': {
      const normalState = translateEntityState(this.hass!, "home", "device_tracker");
      const invertedState = translateEntityState(this.hass!, "not_home", "device_tracker");
      return isInverted ? invertedState : normalState;
    }
    case 'lock':
    case 'cover': {
      const normalState = translateEntityState(this.hass!, "open", "cover");
      const invertedState = translateEntityState(this.hass!, "closed", "cover");
      return isInverted ? invertedState : normalState;
    }
    case 'person': {
      if (state === 'home') {
        return translateEntityState(this.hass!, "home", "person");
      } else if (state === 'not_home') {
        return translateEntityState(this.hass!, "not_home", "person");
      } else {
        return state ?? "unknown";
      }
    }
    default: {
      if (deviceClass && openDeviceClasses.includes(deviceClass)) {
        const normalState = translateEntityState(this.hass!, "open", "cover");
        const invertedState = translateEntityState(this.hass!, "closed", "cover");
        return isInverted ? invertedState : normalState;
      }
      const normalState = translateEntityState(this.hass!, state ?? "on", "light");
      const invertedState = translateEntityState(this.hass!, state ?? "off", "light");
      return isInverted ? invertedState : normalState;
    }
  }
}


  private getCustomizationForType(
    type: string
  ): { name?: string; icon?: string; icon_color?: string; invert?: boolean } | undefined {
    // Wir vergleichen in lowercase, damit "counter" und "Counter" gleich behandelt werden.
    return this._config.customization?.find((entry: any) =>
      entry.type?.toLowerCase() === type.toLowerCase()
    );
  }
  
  

  private getCustomIcon(domain: string, deviceClass?: string, entity?: HassEntity): string {
    let key: string;
    if (deviceClass) {
      // Für Device-Class-Einträge: Schlüssel im Format "Binary Sensor - door"
      key = `${this._formatDomain(domain)} - ${deviceClass}`;
    } else {
      // Für Domains und extra-Entities (die den gesamten entity_id-String enthalten)
      key = domain;
    }
    
    // Suche in der Customization nach einem passenden Eintrag
    const customization = this.getCustomizationForType(key);
    if (customization && customization.icon) {
      return customization.icon;
    }
    
    // Wenn kein Customization-Eintrag vorhanden ist, aber ein Entity übergeben wurde und
    // dieses ein Icon in den Attributen hat, verwende dieses.
    if (entity && entity.attributes && entity.attributes.icon) {
      return entity.attributes.icon;
    }
    
    // Andernfalls: Fallback – falls der Key einen Punkt enthält (z. B. "remote.tv_samsung_led55"),
    // extrahieren wir den Domain-Teil als Fallback (z. B. "remote").
    const isInverted = customization?.invert === true;
    const state = isInverted ? "off" : "on";
    let fallbackDomain = domain;
    if (!deviceClass && domain.includes(".")) {
      fallbackDomain = domain.split(".")[0];
    }
    
    return domainIcon(fallbackDomain, state, deviceClass);
  }
  
  


  private getCustomColor(domain: string, deviceClass?: string, entity?: HassEntity): string | undefined {
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
    if (this._config && this._config.color ) {
      return this._config.color;
    }
    return undefined;
  }
  
  
  
  private getCustomName(domain: string, deviceClass?: string, entity?: HassEntity): string | undefined {
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
    // Fallback: Falls eine Entität übergeben wurde und ein friendly_name vorhanden ist, diesen nutzen
    if (entity && entity.attributes && entity.attributes.friendly_name) {
      return entity.attributes.friendly_name;
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
      ? this.entities.filter((entity) =>
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
  
    return personEntities
    .map((entity) => {
      const entityState = this.hass!.states[entity.entity_id];
      const isNotHome = entityState?.state === "not_home";
  
      return html`
        <paper-tab @click="${() => this.showMoreInfo(entity)}">
          <div class="entity">
            <div class="entity-icon">
              <img
                src="${entity.attributes.entity_picture || ""}"
                style="${isNotHome ? "filter: grayscale(100%);" : ""}"
                alt="${entity.attributes.friendly_name || entity.entity_id}"
              />
            </div>
            <div class="entity-info">
              <div class="entity-name"> ${!this.hide_person_name ? (entity.attributes.friendly_name?.split(" ")[0] || "") : ""} </div>
              <div class="entity-state"> ${this.getStatusProperty("person", undefined, entityState?.state)} </div>
            </div>
          </div>
        </paper-tab>
      `;
    });
  }
  
  private loadExtraEntities(): { type: string; entities: HassEntity[]; icon: string }[] {
    if (!this._config?.extra_entities || !this.hass) {
      return [];
    }
  
    return this._config.extra_entities
      .filter((entity_id) => this._config.content.includes(entity_id)) // Stelle sicher, dass die Entität auch in config.content ist
      .map((entity_id) => {
        const entity = this.hass!.states[entity_id];
        const domain = computeDomain(entity_id);
        if (!entity) {
          return null;
        }
  
        // Suche in der Customization nach einem Eintrag, der genau diese Entity (über entity_id) definiert.
        const customizationEntry = this._config.customization?.find(
          (entry: any) => entry.type === entity_id
        );
  
        // Falls ein Customization-Eintrag existiert, prüfen wir, ob state oder state_not definiert ist
        if (customizationEntry &&  customizationEntry.state !== undefined && customizationEntry.invert_state !== undefined) {
          if ( customizationEntry.invert_state === "false") {
            // Entität nur anzeigen, wenn sie genau den gewünschten Zustand hat
            if (entity.state !== customizationEntry.state) {
              return null;
            }
          } else if (customizationEntry.invert_state === "true") {
            // Entität nur anzeigen, wenn sie NICHT den unerwünschten Zustand hat
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
      .filter((item): item is { type: string; entities: HassEntity[]; icon: string } => item !== null);
  }
  
  
  
  

  createCard(cardConfig: { type: string, entity: string, [key: string]: any }) {
    const cardElement = document.createElement(`hui-${cardConfig.type}-card`) as LovelaceCard;
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
      .tile-container { display: flex; flex-wrap: wrap; gap: 4px; --columns: 4;  }
      .entity-card { width: 22.5vw ;  box-sizing: border-box; }
      .entity-list { list-style: none;  display: flex; flex-direction: column; }
      ul { margin: 0; padding: 5px;  }
      ha-icon { display: flex; }
`;

// Mobile CSS als String
private mobileStyles = `
      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px;} 
      .dialog-header ha-icon-button { margin-right: 10px;  }
      ha-dialog#more-info-dialog { --mdc-dialog-max-width: 96vw; --mdc-dialog-min-width: 96vw; }
      .entity-list { list-style: none;  display: flex; flex-direction: column; }
      ul { margin: 0; padding: 5px;  }rflow: hidden;
      .entity-card { flex-basis: 100%; max-width: 100%; }
      .tile-container { width: 100%; flex-direction: column; display: flex; gap:4px; }
      ha-icon { display: flex; }
  }
`;

  private renderPopup(): TemplateResult {
    const columns = this.list_mode ? 1 : this._config.columns || 4; 
    const styleBlock = this._isMobile ? this.mobileStyles : this.desktopStyles;
    return html`
      <ha-dialog id="more-info-dialog" style="--columns: ${columns};" open @closed="${this._closeDialog}">
        <style>
          ${styleBlock}
        </style>
        <div class="dialog-header">
          <ha-icon-button slot="navigationIcon" dialogaction="cancel" @click=${() => this._closeDialog} title="${this.computeLabel.bind(this)({ name: "close" })}">
            <ha-icon class="center" icon="mdi:close"></ha-icon>
          </ha-icon-button>
          <h3>
            ${this.selectedDomain && this.selectedDeviceClass
              ? this.computeLabel({ name: "header" }, this.selectedDomain, this.selectedDeviceClass)
              : this.computeLabel({ name: "header" }, this.selectedDomain || undefined)}
          </h3>
        </div>
        <div class="tile-container">
          ${this.list_mode
            ? html`
                <ul class="entity-list">
                  ${this._isOn(this.selectedDomain!, this.selectedDeviceClass!).map(
                    (entity) => html`<li class="entity-item">- ${entity.entity_id}</li>`
                  )}
                </ul>
              `
            : this._isOn(this.selectedDomain!, this.selectedDeviceClass!).map(
                (entity) => html`
                  <div class="entity-card">
                    ${this.createCard({
                      type: "tile",
                      entity: entity.entity_id,
                            ...(this.selectedDomain === "alarm_control_panel" && {
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
                              features: [{ type: "light-brightness" }],
                            }),
                            ...(this.selectedDomain === "cover" && {
                              features: [
                                { type: "cover-open-close" },
                                { type: "cover-position" },
                              ],
                            }),
                            ...(this.selectedDomain === "vacuum" && {
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
                            ...(this.selectedDomain === "media_player" && {
                              features: [{ type: "media-player-volume-slider" }],
                            }),
                            ...(this.selectedDomain === "lock" && {
                              features: [{ type: "lock-commands" }],
                            }),
                            ...(this.selectedDomain === "fan" && {
                              features: [{ type: "fan-speed" }],
                            }),
                            ...(this.selectedDomain === "switch" && {
                              features: [{ type: "toggle" }],
                            }),
                            ...(this.selectedDomain === "counter" && {
                              features: [{ type: "counter-actions", actions: ["increment", "decrement", "reset"] }],
                            }),                            
                            ...(this.selectedDomain === "update" && {
                              features: [
                                { type: "update-actions", backup: "ask" },
                              ],
                            }),
                          
                    })}
                  </div>
                `
              )}
        </div>
      </ha-dialog>
    `;
  }

  protected render() {
    const configContent = this._config.content || [];
  
    // Aus config.items trennen wir die reinen Domains (ohne " - ") und die Device-Class-Items (mit " - ")
    const domainContent = configContent.filter(content => !content.includes(" - "));
    const deviceClassContent = configContent.filter(content => content.includes(" - "));
  
    // Erstelle ein Array von "domain"-Objekten. Die Reihenfolge entspricht dem Index in config.items.
    const domainEntities = domainContent.map(content => ({
      type: 'domain',
      // Bei Domains nehmen wir den String direkt – z. B. "media_player"
      domain: content,
      order: configContent.indexOf(content)
    }));
  
    // Erstelle ein Array von "deviceClass"-Objekten. Hier parsen wir den String.
    const deviceClassEntities = deviceClassContent.map(content => {
      // Beispiel: "Binary Sensor - door"
      const parts = content.split(" - ");
      // Den Domain-Teil (links) wandeln wir in lowercase um und ersetzen Leerzeichen durch Unterstriche,
      // damit wir z. B. "Binary Sensor" zu "binary_sensor" erhalten.
      const domain = parts[0].trim().toLowerCase().replace(/\s+/g, "_");
      const deviceClass = parts[1].trim().toLowerCase();
      return {
        type: 'deviceClass',
        domain,
        deviceClass,
        order: configContent.indexOf(content)
      };
    });
  
    const extraEntities = this.loadExtraEntities().map(({ entities }) => {
      const entity = entities[0];
      const customIndex = this._config.content?.findIndex((item: string) => item === entity.entity_id);
      const order = customIndex !== -1 && customIndex !== undefined ? customIndex : 0;
      // Hier wird nun der Entity-Parameter mit übergeben:
      const calculatedIcon = this.getCustomIcon(entity.entity_id, undefined, entity);
      const calculatedName = this.getCustomName(entity.entity_id, undefined, entity);
      const calculatedcolor = this.getCustomColor(entity.entity_id, undefined, entity);
      return { entity, icon: calculatedIcon, name: calculatedName, color: calculatedcolor, order, type: 'extra' };
    });
    

  
    // Alle Items zusammenfügen:
    const allEntities = [
      ...extraEntities,
      ...domainEntities,
      ...deviceClassEntities,
    ];
  
    // Nach dem Orderwert (der dem Index in config.items entspricht) sortieren
    const sortedEntities = allEntities.sort((a, b) => a.order - b.order);
  
    return html`
      <ha-card>
        <paper-tabs scrollable hide-scroll-buttons>
          ${this.renderPersonEntities()}
  
          ${sortedEntities.map((item: any) => {
            if (item.type === 'extra') {
              // Rendern eines extra_entity-Tabs
              const { entity, icon, name, color } = item;
              const domain = computeDomain(entity.entity_id);
              const translatedEntityState = translateEntityState(this.hass!, entity.state, domain);
              return html`
                <paper-tab @click="${() => this.showMoreInfo(entity)}">
                  <div class="extra-entity">
                    <div class="entity-icon" style="${color ? `color: var(--${color}-color);` : ''}">
                      <ha-icon icon="${icon}"></ha-icon>
                    </div>
                    <div class="entity-info">
                    ${this._config?.hide_content_name !== true
                      ? html`<div class="entity-name">${name}</div>`
                      : ''}
                      <div class="entity-state">${translatedEntityState}</div>
                    </div>
                  </div>
                </paper-tab>
              `;
            }
            else if (item.type === 'domain') {
              // Für Domains: Hier holen wir die aktiven Entitäten zur Domain
              const activeEntities = this._isOn(item.domain);
              if (activeEntities.length === 0) return null;
              const color = this.getCustomColor(item.domain);
              return html`
                <paper-tab @click="${() => this._showEntities(item.domain)}">
                  <div class="entity">
                    <div class="entity-icon" style="${color ? `color: var(--${color}-color);` : ''}">
                      <ha-icon icon="${this.getCustomIcon(item.domain)}"></ha-icon>
                    </div>
                    <div class="entity-info">
                      <div class="entity-name">
                        ${!this.hide_content_name
                          ? this.getCustomName(item.domain) || this.computeLabel({ name: item.domain })
                          : ""}
                      </div>
                      <div class="entity-state">
                        <span>${activeEntities.length} ${this.getStatusProperty(item.domain)}</span>
                      </div>
                    </div>
                  </div>
                </paper-tab>
              `;
            }
            else if (item.type === 'deviceClass') {
              // Für Device Classes: Wir nutzen _isOn(domain, deviceClass)
              const { domain, deviceClass } = item;
              const activeEntities = this._isOn(domain, deviceClass);
              if (activeEntities.length === 0) return null;
              const color = this.getCustomColor(domain, deviceClass);
              return html`
                <paper-tab @click="${() => this._showEntities(domain, deviceClass)}">
                  <div class="entity">
                    <div class="entity-icon" style="${color ? `color: var(--${color}-color);` : ''}">
                      <ha-icon icon="${this.getCustomIcon(domain, deviceClass)}"></ha-icon>
                    </div>
                    <div class="entity-info">
                      <div class="entity-name">
                        ${!this.hide_content_name
                          ? this.getCustomName(domain, deviceClass) || this.computeLabel({ name: deviceClass })
                          : ""}
                      </div>
                      <div class="entity-state">
                        <span>${activeEntities.length} ${this.getStatusProperty(domain, deviceClass)}</span>
                      </div>
                    </div>
                  </div>
                </paper-tab>
              `;
            }
            return null;
          })}
  
          ${this.selectedDomain ? this.renderPopup() : ''}
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
      paper-tabs { height: 110px; padding: 4px 8px;  }
      paper-tab {padding: 0 5px; }
      .center {display: flex; align-items: center; justify-content: center;}
      .entity, .extra-entity { display: flex; flex-direction: column; align-items: center;}
      .entity-icon { width: 50px; height: 50px; border-radius: 50%;
          background-color: rgba(var(--rgb-primary-text-color), 0.15);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;}      
      .entity-icon img {width: 100%; height: 100%; object-fit: cover; border-radius: 50%;}
      .entity-info { text-align: center; margin-top: 5px; }
      .entity-name { font-weight: bold; margin-bottom: 2px; }
      .entity-state { color: var(--secondary-text-color); font-size: 0.9em; }            
      }
    `;
  }

  static getStubConfig() {
    return {};
}


}
