import { LitElement, html, css, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { HomeAssistant, computeDomain, LovelaceCard } from "custom-card-helpers";
import type { HassEntity } from "home-assistant-js-websocket";
import { domainIcon, sortOrder, ALLOWED_DOMAINS, deviceClasses } from './properties';
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

interface AreaFilter {
  area?: string;
  floor?: string;
}

interface Config {
  area: string;
  extra_entities?: ExtraEntityConfig[];
  showPerson?: boolean;
  showPersonName?: boolean;
  bulkMode?: boolean;
  showBadgeName?: boolean;
  area_filter?: AreaFilter;
  label_filter?: string;
  newSortOrder?: Record<string, Record<string, number>>;
  icons?: Record<string, Record<string, string>>;
  names?: Record<string, Record<string, string>>;
  colors?: {
    [domain: string]: {
      [deviceClass: string]: string;
    };
  };
  hide?: Record<string, Record<string, boolean>>;
  hidden_entities: string[];
  hidden_labels: string[];
  moreInfoColumns?: number;
  invert?: Record<string, Record<string, boolean>>;
}


interface ExtraEntityConfig {
  entity: string;
  status: string;
  icon: string;
  color: string;
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
  @property({ type: Object }) public config!: Config;

  @state() private areas?: AreaRegistryEntry[];
  @state() private devices: DeviceRegistryEntry[] = [];
  @state() private entities: EntityRegistryEntry[] = [];
  @state() private entitiesByDomain: { [domain: string]: HassEntity[] } = {};
  @state() private selectedDomain: string | null = null;
  @state() private selectedDeviceClass: string | null = null;
  @state() private showPersonName: boolean = true;
  @state() private hiddenEntities: string[] = [];
  @state() private hiddenLabels: string[] = [];
  @state() private showPerson: boolean = true;
  @state() private showBadgeName: boolean = true;
  @state() private bulkMode: boolean = false;


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
  }


  static getConfigElement() {
    return document.createElement("status-card-editor");
  }

  public setConfig(config: Config): void {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    this.config = config;
    this.showPersonName = config.showPersonName !== undefined ? config.showPersonName : true;
    this.showPerson = config.showPerson !== undefined ? config.showPerson : true;
    this.showBadgeName = config.showBadgeName !== undefined ? config.showBadgeName : true;
    this.bulkMode = config.bulkMode !== undefined ? config.bulkMode : false;
    this.hiddenEntities = config.hidden_entities || [];
    this.hiddenLabels = config.hidden_labels || [];
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
      const area = this.config.area_filter?.area || null;
      const floor = this.config.area_filter?.floor || null;
      const label = this.config.label_filter || null;
  
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
              ? entry.labels?.includes(label) ||
                (device?.labels?.includes(label) ?? false)
              : true;
          if (!matchesLabel) {
            return false;
          }
  
          const matchesArea = area
            ? entry.area_id === area || device?.area_id === area
            : true;
  
          const matchesFloor = floor
            ? this.areas?.some(
                (a) => a.floor_id === floor && a.area_id === entry.area_id
              ) || (device?.area_id && this.areas?.some(
                (a) => a.floor_id === floor && a.area_id === device.area_id
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
      .filter((entity) => !["unavailable", "unknown"].includes(entity.state))
      .filter((entity) => {
        const matchesDeviceClass = !deviceClass || entity.attributes.device_class === deviceClass;
        const isInverted =
          (deviceClass && this.config.invert?.[domain]?.[deviceClass]) ??
          (!deviceClass && this.config.invert?.[domain]) ??
          false;
  
        const isActive = !["closed", "locked", "off", "docked", "idle", "standby", "paused", "auto", "not_home", "disarmed"].includes(entity.state);
        const isInactive = !isActive;
  
        if (["cover", "binary_sensor"].includes(domain)) {
          return matchesDeviceClass && (isInverted ? isInactive : isActive);
        }
  
        return isInverted ? isInactive : isActive;
      });
  }
  
  
  private getStatusProperty(domain: string, deviceClass?: string, state?: string): string {
    const openDeviceClasses = ['window', 'door', 'lock', 'awning', 'blind', 'curtain', 'damper', 'garage', 'gate', 'shade', 'shutter'];
  
    const isInverted =
      (deviceClass && this.config.invert?.[domain]?.[deviceClass]) ??
      (!deviceClass && this.config.invert?.[domain]) ??
      false;
  
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
  

  private getCustomConfig<T>(
    type: "icons" | "colors" | "names" | "hide",
    domain: string,
    deviceClass?: string
  ): T | undefined {
    const domainConfig = this.config[type]?.[domain];
  
    if (deviceClass && typeof domainConfig === "object" && domainConfig[deviceClass] !== undefined) {
      return domainConfig[deviceClass] as T;
    } 
    if (typeof domainConfig !== "object") {
      return domainConfig as T;
    }
    if (type === "icons") {
      return domainIcon(domain, undefined, deviceClass) as T;
    } else if (type === "hide") {
      return false as T; 
    }
  
    return undefined;
  }

  private getCustomIcon(domain: string, deviceClass?: string): string {
    const isInverted =
      (deviceClass && this.config.invert?.[domain]?.[deviceClass]) ??
      (!deviceClass && this.config.invert?.[domain]) ??
      false;
    const state = isInverted ? "off" : "on";
  
    return this.getCustomConfig<string>("icons", domain, deviceClass) || domainIcon(domain, state, deviceClass);
  }
  
  
  private getCustomColor(domain: string, deviceClass?: string): string | undefined {
    return this.getCustomConfig<string | undefined>("colors", domain, deviceClass);
  }
  
  private getCustomName(domain: string, deviceClass?: string): string | undefined {
    return this.getCustomConfig<string | undefined>("names", domain, deviceClass);
  }
  
  private isHidden(domain: string, deviceClass?: string): boolean {
    return this.getCustomConfig<boolean>("hide", domain, deviceClass) || false;
  } 
 
  private loadPersonEntities(): HassEntity[] {
    return this.showPerson
      ? this.entities.filter((entity) =>
        entity.entity_id.startsWith("person.") &&
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
              <div class="entity-name"> ${this.showPersonName ? (entity.attributes.friendly_name?.split(" ")[0] || "") : ""} </div>
              <div class="entity-state"> ${this.getStatusProperty("person", undefined, entityState?.state)} </div>
            </div>
          </div>
        </paper-tab>
      `;
    });
  }
  
  private loadExtraEntities(): { type: string; originalName: string; entities: HassEntity[]; icon: string; color: string; }[] {
    if (!this.config?.extra_entities || !this.hass) {
      return [];
    }

    return this.config.extra_entities.reduce((acc, { entity, status, icon, color }) => {
      const selectedEntity = this.hass!.states[entity];
      if (selectedEntity && selectedEntity.state === status) {
        acc.push({
          type: "extra",
          originalName: selectedEntity.attributes.friendly_name || entity,
          entities: [selectedEntity],
          icon,
          color,
        });
      }
      return acc;
    }, [] as { type: string; originalName: string; entities: HassEntity[]; icon: string; color: string; }[]);
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



  private renderMoreInfoDialog(): TemplateResult {
    const columns = this.bulkMode ? 1 : this.config.moreInfoColumns || 4; 
    return html`
      <ha-dialog id="more-info-dialog" style="--columns: ${columns};" open @closed="${this._closeDialog}">
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
          ${this.bulkMode
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
                      ...(this.selectedDomain === "light" && { features: [{ type: "light-brightness" }] }),
                      ...(this.selectedDomain === "cover" && {
                        features: [{ type: "cover-open-close" }, { type: "cover-position" }],
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
    const sortedDomains = Object.keys(this.entitiesByDomain)
      .filter(domain => !['binary_sensor', 'cover'].includes(domain))
      .map(domain => ({
        type: 'domain',
        domain,
        order: Number(this.config.newSortOrder?.[domain] ?? sortOrder?.[domain] ?? Infinity)
      }));
  
    const domainDeviceClasses = Object.keys(deviceClasses).flatMap(domain => {
      return deviceClasses[domain].map(deviceClass => ({
        type: 'deviceClass',
        domain,
        deviceClass,
        order: Number(
          this.config.newSortOrder?.[domain]?.[deviceClass] ??
          sortOrder?.[domain]?.deviceClasses?.[deviceClass] ?? Infinity
        )
      }));
    });
  
    const extraEntities = this.loadExtraEntities().map(({ entities, icon, color }) => {
      const entity = entities[0];
      const order = Number(this.config.newSortOrder?.extra?.[entity.entity_id] ?? 0 ?? Infinity);
      return { entity, icon, color, order, type: 'extra' };
    });
  
    const allEntities = [
      ...extraEntities,
      ...sortedDomains,
      ...domainDeviceClasses,
    ];
  
    const sortedEntities = allEntities.sort((a, b) => a.order - b.order);
  
    return html`
      <ha-card>
        <paper-tabs scrollable hide-scroll-buttons>
          ${this.renderPersonEntities()}
  
          ${sortedEntities.map((item: any) => {
            if (item.type === 'extra') {
              const { entity, icon, color } = item;
              const friendlyName = entity.attributes.friendly_name || entity.entity_id;
              const domain = computeDomain(entity.entity_id);
              const translatedEntityState = translateEntityState(this.hass!, entity.state, domain);
              return html`
                <paper-tab @click="${() => this.showMoreInfo(entity)}">
                  <div class="extra-entity">
                    <div class="entity-icon" style="color: var(--${color || ''}-color);">
                      <ha-icon icon="${icon}"></ha-icon>
                    </div>
                    <div class="entity-info">
                      <div class="entity-name">${friendlyName}</div>
                      <div class="entity-state">${translatedEntityState}</div>
                    </div>
                  </div>
                </paper-tab>
              `;
            }
            else if (item.type === 'domain') {
              if (this.isHidden(item.domain)) return null;
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
                        ${this.showBadgeName
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
            } else if (item.type === 'deviceClass') {
              const { domain, deviceClass } = item;
              if (this.isHidden(domain, deviceClass)) return null;
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
                        ${this.showBadgeName
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
  
          ${this.selectedDomain ? this.renderMoreInfoDialog() : ''}
        </paper-tabs>
      </ha-card>
    `;
  } 

  static get styles() {
    return css`
      ul { margin: 0; padding: 5px;  }
      paper-tabs { height: 110px; padding: 4px 8px }
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
      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px;} 
      .dialog-header ha-icon-button { margin-right: 10px;  }
      ha-dialog#more-info-dialog { --mdc-dialog-max-width: calc(22.5vw * var(--columns) + 60px); }
      .tile-container { display: flex; flex-wrap: wrap; gap: 4px; --columns: 4;  }
      .entity-card { width: 22.5vw ;  box-sizing: border-box; }
      .entity-list { list-style: none;  display: flex; flex-direction: column; }
      @media (max-width: 768px) {
          .entity-card { flex-basis: 100%; max-width: 100%; }
          .tile-container { width: 100%; }
      }
    `;
  }

  static getStubConfig() {
    return {};
}


}
