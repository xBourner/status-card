import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';
//import { LitElement, html, css } from 'lit-element';
//import { translateState } from '../src/translations.js';
//import packageJson from '../package.json' assert { type: 'json' };

class BaseCard extends LitElement {
  constructor() {
    super();
    this.entityConfig = this.initializeEntityConfig(); 
  }

  initializeEntityConfig() {
    const entityConfig = {
      alarm_control_panel: { icon: 'mdi:bell-ring', sortOrder: 1 },
      siren: { icon: 'mdi:alarm-light', sortOrder: 2 },
      lock: { icon: 'mdi:lock', sortOrder: 3 },  
      light: { icon: 'mdi:lightbulb', sortOrder: 4 },
      media_player: { icon: 'mdi:cast', sortOrder: 5 },
      climate: { icon: 'mdi:thermostat', sortOrder: 6 },
      switch: { icon: 'mdi:power', sortOrder: 7 },
      vacuum: { icon: 'mdi:robot-vacuum', sortOrder: 8 },     
      fan: { icon: 'mdi:fan', sortOrder: 9 },
      humidifier: { icon: 'mdi:air-humidifier', sortOrder: 10 },
      lawn_mower: { icon: 'mdi:robot-mower', sortOrder: 11 },
      valve: { icon: 'mdi:valve', sortOrder: 12 },
      water_heater: { icon: 'mdi:water-boiler', sortOrder: 13 },      	  
      remote: { icon: 'mdi:remote', sortOrder: 14 },	    
      update: { icon: 'mdi:update', sortOrder: 53 },
      device_tracker: { icon: 'mdi:cellphone', sortOrder: 54 },
      input_boolean: { icon: 'mdi:toggle-switch', sortOrder: 55 },
      timer: { icon: 'mdi:timer-outline', sortOrder: 56 },
      counter: { icon: 'mdi:counter', sortOrder: 57 },
      calendar: { icon: 'mdi:calendar', sortOrder: 58 },
      cover: {
        deviceClasses: [
          { name: 'door', icon: 'mdi:door-open', sortOrder: 15 },
          { name: 'window', icon: 'mdi:window-open', sortOrder: 16 },     
          { name: 'garage', icon: 'mdi:garage-open', sortOrder: 17 },
          { name: 'gate', icon: 'mdi:gate-open', sortOrder: 18 },    
          { name: 'blind', icon: 'mdi:blinds-open', sortOrder: 19 },
          { name: 'curtain', icon: 'mdi:curtains', sortOrder: 20 },
          { name: 'damper', icon: 'mdi:valve', sortOrder: 21 },
          { name: 'awning', icon: 'mdi:window-shutter-open', sortOrder: 22 },
          { name: 'shade', icon: 'mdi:roller-shade', sortOrder: 23 },
          { name: 'shutter', icon: 'mdi:window-shutter-open', sortOrder: 24 },
        ],
        icon: 'mdi:alert-circle'
      },
      binary_sensor: {
        deviceClasses: [
          { name: 'door', icon: 'mdi:door-open', sortOrder: 25 },
          { name: 'window', icon: 'mdi:window-open', sortOrder: 26 },
          { name: 'lock', icon: 'mdi:lock-open', sortOrder: 27 },
          { name: 'motion', icon: 'mdi:run', sortOrder: 28 },
          { name: 'presence', icon: 'mdi:home', sortOrder: 29 },
          { name: 'occupancy', icon: 'mdi:seat', sortOrder: 30 },
          { name: 'vibration', icon: 'mdi:vibrate', sortOrder: 31 },
          { name: 'plug', icon: 'mdi:power-plug', sortOrder: 32 },
          { name: 'power', icon: 'mdi:power-plug', sortOrder: 33 },
          { name: 'battery', icon: 'mdi:battery-alert', sortOrder: 34 },
          { name: 'battery_charging', icon: 'mdi:battery-charging', sortOrder: 35 },
          { name: 'moving', icon: 'mdi:car', sortOrder: 36 },
          { name: 'running', icon: 'mdi:play', sortOrder: 37 },
          { name: 'gas', icon: 'mdi:gas-cylinder', sortOrder: 38 },
          { name: 'carbon_monoxide', icon: 'mdi:molecule-co', sortOrder: 39 },
          { name: 'cold', icon: 'mdi:snowflake', sortOrder: 40 },
          { name: 'heat', icon: 'mdi:thermometer', sortOrder: 41 },
          { name: 'moisture', icon: 'mdi:water', sortOrder: 42 },
          { name: 'connectivity', icon: 'mdi:connection', sortOrder: 43 },
          { name: 'opening', icon: 'mdi:door-open', sortOrder: 44 },
          { name: 'garage_door', icon: 'mdi:garage-open', sortOrder: 45 },
          { name: 'light', icon: 'mdi:brightness-5', sortOrder: 46 },
          { name: 'problem', icon: 'mdi:alert-circle', sortOrder: 47 },
          { name: 'safety', icon: 'mdi:shield-alert', sortOrder: 48 },
          { name: 'smoke', icon: 'mdi:smoke-detector', sortOrder: 49 },
          { name: 'sound', icon: 'mdi:volume-high', sortOrder: 50 },
          { name: 'tamper', icon: 'mdi:shield-off', sortOrder: 51 },
          { name: 'update', icon: 'mdi:update', sortOrder: 52 },
        ],
        icon: 'mdi:alert-circle'
      }
    };
    return entityConfig;
  }
}

const STATES_OFF = new Set(["closed", "locked", "off", "docked", "idle", "standby", "paused", "auto", "not_home", "disarmed"]);
const UNAVAILABLE_STATES = new Set(["unavailable", "unknown"]);

class StatusCard extends BaseCard {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
      areas: { type: Array },
      devices: { type: Array },
      entities: { type: Array },
    };
  }

  
  constructor() {
    super();
    this.entityConfig = this.initializeEntityConfig();
  }


shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.config !== this.props.config || nextState !== this.state) {
      return true;
    }
    return false; 
  }

  setConfig(config) {
      if (!config) { throw new Error('Invalid configuration'); }
      this.config = config;
      this.areas = [];
      this.devices = [];
      this.entities = [];
      this.entitiesInDomain = [];
      this.filteredAreas = [];
      this.areaDevicesMap = new Map();
      this.hiddenEntities = new Set(config.hidden_entities || []);
      this.hiddenLabels = new Set(config.hidden_labels || []);
      this.showPerson = config.showPerson !== undefined ? config.showPerson : true;
      this.showPersonName = config.showPersonName !== undefined ? config.showPersonName : true;
      this.showBadgeName = config.showBadgeName !== undefined ? config.showBadgeName : true;
      this.bulkMode = config.bulkMode !== undefined ? config.bulkMode : false;
      this.propertyCache = new Map(); 
      this.entityConfig = this.initializeEntityConfig();
  }


  async firstUpdated() {
    await this._loadData(); 
  }

  async _loadData() {
    try {
      const [areas, devices, entities] = await Promise.all([
        this.hass.callWS({ type: "config/area_registry/list" }),
        this.hass.callWS({ type: "config/device_registry/list" }),
        this.hass.callWS({ type: "config/entity_registry/list" })
      ]);
      this.areas = areas;
      this.devices = devices;
      this.entities = entities;
      this.updateFilteredAreasAndDevices();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  getProperty(group, propertyType) {
    const cacheKey = this._generateCacheKey(group, propertyType);
    const cachedValue = this._getCachedValue(cacheKey, group, propertyType);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
  
    const { type, device_class: deviceClassName, originalName } = group;
    const entityConfig = this.entityConfig[type];
    const config = this.config[propertyType];
    const entityState = this.hass.states[group.entity_id];
    
    let result = null;
  
    if (propertyType === 'sortOrder') {
      result = this._getSortOrder(type, deviceClassName, entityConfig);
    } else if (['binary_sensor', 'cover'].includes(type)) {
      result = this._getBinarySensorOrCoverProperty(type, deviceClassName, propertyType, config, entityConfig);
    }
  
    if (result === null) {
      result = this._getDefaultProperty(type, originalName, propertyType, config, entityState, group);
    }
  
    this.propertyCache.set(cacheKey, result);
    return result;
  }
  
  _generateCacheKey(group, propertyType) {
    return `${group.type}_${group.device_class || ''}_${propertyType}`;
  }
 
  
  _getCachedValue(cacheKey, group, propertyType) {
    if (this.propertyCache.has(cacheKey)) {
        const cachedValue = this.propertyCache.get(cacheKey);
        if (propertyType === 'status' && group.entity_id?.startsWith('person.')) {
            const entityState = this.hass.states[group.entity_id];
            if (entityState?.state !== cachedValue) {
                this.propertyCache.delete(cacheKey);
                return this.getProperty(group, propertyType);
            }
        }
        return cachedValue;
    }
    return undefined;
}

  
  _getSortOrder(type, deviceClassName, entityConfig) {
    if (type === 'extra') {
      return this.config.newSortOrder?.['extra']?.[deviceClassName] ?? -1;
    }
    return deviceClassName
      ? this.config.newSortOrder?.[type]?.[deviceClassName] ?? 
        (entityConfig?.deviceClasses?.find(dc => dc.name === deviceClassName)?.sortOrder || Infinity)
      : this.config.newSortOrder?.[type] ?? (entityConfig?.sortOrder || Infinity);
  }
  
  _getBinarySensorOrCoverProperty(type, deviceClassName, propertyType, config, entityConfig) {
    switch (propertyType) {
      case 'hide':
        return config?.[type]?.[deviceClassName] || '';
      case 'names':
        return config?.[type]?.[deviceClassName] ||
          this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${type}.${deviceClassName}`);
      case 'icons':
        return config?.[type]?.[deviceClassName] || 
          entityConfig?.deviceClasses?.find(dc => dc.name === deviceClassName)?.icon ||
          entityConfig?.icon;
      case 'colors':
        return config?.[type]?.[deviceClassName] || '';
      default:
        return null;
    }
  }
  
  _getDefaultProperty(type, originalName, propertyType, config, entityState, group) {
    if (['hide', 'colors'].includes(propertyType)) {
      return config?.[type] || '';
    } else if (propertyType === 'names') {
      return config?.[type] || 
        this.hass.localize(`component.${type}.entity_component._.name`) || type
    } else if (propertyType === 'icons') {
      return config?.[type] || this.entityConfig[type]?.icon;
    } else if (propertyType === 'status') {
      return this._getStatusProperty(type, originalName, entityState, group);
    }
    return null;
  }
  
  _getStatusProperty(type, originalName, entityState, group) {
    if (group.entity_id && group.entity_id.startsWith('person.')) {
      return entityState?.state === 'home'
        ? this.hass.localize('component.person.entity_component._.state.home')
        : entityState?.state === 'not_home'
          ? this.hass.localize('component.person.entity_component._.state.not_home')
          : entityState?.state;
    } else if (type === 'device_tracker') {
      return this.hass.localize('component.person.entity_component._.state.home');
    } else if (['lock', 'cover'].includes(type) || ['window', 'door', 'lock'].includes(originalName)) {
      return this.hass.localize('component.cover.entity_component._.state.open');
    } else if (['awning', 'blind', 'curtain', 'damper', 'garage', 'gate', 'shade', 'shutter'].includes(originalName)) {
      return this.hass.localize('component.cover.entity_component._.state.open');
    } else {
      return this.hass.localize('component.light.entity_component._.state.on');
    }
  }
  


toggleMoreInfo(action, domain = null, entities = null, entityName = null) {
  const dialog = this.shadowRoot.getElementById("more-info-dialog");
  if (dialog) {
    if (action === "show") {
      Object.assign(this, { selectedDomain: domain, entitiesInDomain: entities, selectedEntityName: entityName });
      this.requestUpdate();
      if (!dialog.hasAttribute("open")) dialog.style.display = "block";
      dialog.setAttribute("open", "true");
    } else if (action === "close") {
      dialog.removeAttribute("open");
      dialog.style.display = "none";
    }
  }
}
    
  showMoreInfo(entity) {
      const event = new CustomEvent("hass-more-info", {
          detail: { entityId: entity.entity_id },
          bubbles: true,
          composed: true,
      });
      document.querySelector("home-assistant").dispatchEvent(event);
  }

  createCard(cardConfig) {
    const element = document.createElement(`hui-${cardConfig.type}-card`);
    if (element) {
      element.hass = this.hass;
      element.setConfig(cardConfig);
      return element;
    }
    return html`<p>Invalid Configuration</p>`;
  }

  isEntityHidden(entity) {
    const hiddenLabels = this.config.hidden_labels || [];
  
    return (
      this.hiddenEntities.has(entity.entity_id) || 
      hiddenLabels.some(label => entity.labels && entity.labels.includes(label)) || 
      entity.hidden_by
    );
  }
  

  updateFilteredAreasAndDevices() {
    const { area, floor } = this.config.area_filter || {};
    const label = this.config.label_filter || '';
  
    this.filteredAreas = this.areas.filter(areaItem => 
      (!floor || areaItem.floor_id === floor) &&
      (!area || areaItem.area_id === area)
    );
  
    this.areaDevicesMap.clear();
    this.filteredAreas.forEach(area => {
      const devicesInArea = this.devices.filter(device => device.area_id === area.area_id);
      const filteredDevices = devicesInArea.filter(device => 
        !label || this.entities.some(entity => 
          entity.device_id === device.id &&
          entity.labels && entity.labels.includes(label)
        )
      );
  
      this.areaDevicesMap.set(area.area_id, new Set(filteredDevices.map(device => device.id)));
    });
  }
  
  
  
  getEntityData(entity_id) {
    const entityDataCache = new Map();
    if (!entityDataCache.has(entity_id)) {
      const state = this.hass.states[entity_id]?.state;
      const deviceClass = this.hass.states[entity_id]?.attributes.device_class;
      const friendlyName = this.hass.states[entity_id]?.attributes?.friendly_name || entity_id;
      const entityPicture = this.hass.states[entity_id]?.attributes?.entity_picture || '';
      entityDataCache.set(entity_id, { state, deviceClass, friendlyName, entityPicture });
    }
    return entityDataCache.get(entity_id);
  }
  
  loadPersonEntities() {
    return this.showPerson
        ? this.entities.filter(entity => 
            entity.entity_id.startsWith("person.") &&
            !this.hiddenEntities.has(entity.entity_id) &&
            !entity.disabled_by && 
            !entity.hidden_by 
          )
        : [];
}
  
loadGroupedEntities() {
  const deviceClassEntities = { cover: {}, binary_sensor: {} };
  const label = this.config.label_filter || '';

  const groupedEntities = this.entities.reduce((acc, entity) => {
    const { entity_id, area_id, device_id } = entity;
    const domain = entity_id.split(".")[0];
    const cachedData = this.getEntityData(entity_id);
    const { state, deviceClass } = cachedData;

    if (!this.entityConfig[domain] || !state || UNAVAILABLE_STATES.has(state) || this.isEntityHidden(entity)) {
      return acc;
    }

    const isUpdateDomain = domain === 'update';
    const isAreaMatched = isUpdateDomain || (area_id
      ? this.areaDevicesMap.has(area_id)
      : Array.from(this.areaDevicesMap.values()).some(devices => devices.has(device_id)));

    const isLabelMatched = !label || 
      (entity.labels && entity.labels.includes(label)) || 
      (device_id && this.devices.some(device => 
        device.id === device_id && 
        device.labels && device.labels.includes(label)
      ));

    if (isAreaMatched && isLabelMatched) {
      if (["cover", "binary_sensor"].includes(domain) && (state === "on" || state === "open") && deviceClass && deviceClass !== "none") {
        deviceClassEntities[domain][deviceClass] ||= [];
        deviceClassEntities[domain][deviceClass].push(entity);
      } else if (!STATES_OFF.has(state) && !["cover", "binary_sensor"].includes(domain)) {
        acc[domain] ||= [];
        acc[domain].push(entity);
      }
    }

    return acc;
  }, {});

  return { deviceClassEntities, groupedEntities };
}



  loadExtraEntities() {
    return (this.config?.extra_entities || []).reduce((acc, { entity, status, icon, color }) => {
      const selectedEntity = entity ? this.hass.states[entity] : null;
      if (selectedEntity && selectedEntity.state === status) {
        acc.push({
          type: 'extra',
          originalName: selectedEntity.attributes.friendly_name || entity,
          entities: [selectedEntity],
          icon,
          color,
          device_class: entity,
          sortOrder: this.config.newSortOrder?.['extra']?.[entity] ?? -1
        });
      }
      return acc;
    }, []);
  }
  
  
  loadAllEntities() {
    const { deviceClassEntities, groupedEntities } = this.loadGroupedEntities();
    const extraEntities = this.loadExtraEntities();
  
    const allEntities = [
      ...extraEntities,
      ...Object.entries(groupedEntities).map(([domain, entities]) => ({
        type: domain,
        originalName: domain,
        entities,
        sortOrder: this.entityConfig[domain]?.sortOrder || 100
      })),
      ...["cover", "binary_sensor"].flatMap(domain =>
        Object.entries(deviceClassEntities[domain]).map(([deviceClass, entities]) => ({
          type: domain,
          originalName: deviceClass,
          device_class: deviceClass,
          entities,
          sortOrder: this.entityConfig[domain]?.deviceClasses.find(dc => dc.name === deviceClass)?.sortOrder || 100
        }))
      )
    ];
  
    allEntities.sort((a, b) => (this.getProperty(a, 'sortOrder') || 100) - (this.getProperty(b, 'sortOrder') || 100));
    return allEntities;
  }

  renderPersonEntities() {
    const personEntities = this.loadPersonEntities();
    return personEntities.map(entity => {
      const cachedData = this.getEntityData(entity.entity_id);
      const entityState = this.hass.states[entity.entity_id];
      const isNotHome = entityState?.state === 'not_home';
      return html`
        <paper-tab @click=${() => this.showMoreInfo(entity)}>
          <div class="entity">
            <div class="entity-icon">
              <img src="${cachedData.entityPicture}" alt="Person Picture" style="${isNotHome ? 'filter: grayscale(100%)' : ''}" />
            </div>
            <div class="entity-info">
              <div class="entity-name">${this.showPersonName ? cachedData.friendlyName.split(' ')[0] : ''}</div>
              <div class="entity-state">${this.getProperty(entity, 'status')}</div>
            </div>
          </div>
        </paper-tab>
      `;
    });
  }

  renderExtraEntities() {
    const extraEntities = this.loadExtraEntities();
    return extraEntities.map(({ entity, icon, color }) => {
      const selectedEntity = entity ? this.hass.states[entity] : null;
      const friendlyName = selectedEntity?.attributes?.friendly_name || entity;
      return selectedEntity ? html`
        <paper-tab @click=${() => this.showMoreInfo(selectedEntity)}>
          <div class="extra-entity">
            <div class="entity-icon" style="color: var(--${color || ''}-color);">
              <ha-icon icon="${icon}"></ha-icon>
            </div>
            <div class="entity-info">
              <div class="entity-name">${this.showBadgeName ? friendlyName : ''}</div>
              <div class="entity-state">${selectedEntity?.state}</div>
            </div>
          </div>
        </paper-tab>
      ` : null;
    });
  }

  renderAllEntities() {
    const allEntities = this.loadAllEntities();
    return allEntities.filter(group => !this.getProperty(group, 'hide')).map(group => html`
      <paper-tab @click=${() => { 
        const showInfo = group.type === 'extra' ? this.showMoreInfo(group.entities[0]) : this.toggleMoreInfo('show', group.type, group.entities, this.getProperty(group, 'names'));
        showInfo;
      }}>
        <div class="entity">
          <div class="entity-icon" style="color: var(--${group.color || this.getProperty(group, 'colors') || ''}-color);">
            <ha-icon icon="${group.icon || this.getProperty(group, 'icons')}"></ha-icon>
          </div>
          <div class="entity-info">
            <div class="entity-name">${this.showBadgeName ? (group.type === 'extra' ? group.originalName : this.getProperty(group, 'names')) : ''}</div>
            <div class="entity-state">
              ${group.type === 'extra' && group.entities?.[0]
                ? group.entities[0].state
                : `${group.entities.length} ${this.getProperty(group, 'status')}`}
            </div>
          </div>
        </div>
      </paper-tab>
    `);
  }



  renderMoreInfoDialog() {
    return html`
      <ha-dialog id="more-info-dialog" style="display:none;">
        <div class="dialog-header">
          <ha-icon-button slot="navigationIcon" dialogaction="cancel" @click=${() => this.toggleMoreInfo('close')} title="${this.hass.localize("ui.common.close")}">
            <ha-icon class="center" icon="mdi:close"></ha-icon>
          </ha-icon-button>
          <h3>${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")} in ${this.selectedEntityName}:</h3>
        </div>
        <div class="tile-container">
          ${this.bulkMode 
            ? html`<ul class="entity-list">${this.entitiesInDomain.map(entity => html`<li class="entity-item">- ${entity.entity_id}</li>`)}</ul>` 
            : this.entitiesInDomain.map(entity => html`
              <div class="entity-card" .entity="${entity.entity_id}">
                ${this.createCard({
                  type: 'tile',
                  entity: entity.entity_id,
                  ...(this.selectedDomain === 'light' && { features: [{ type: "light-brightness" }] }),
                  ...(this.selectedDomain === 'cover' && { features: [{ type: "cover-open-close" }, { type: "cover-position" }] })
                })}
              </div>
            `)}
        </div>
      </ha-dialog>
    `;
  }


  render() { 
    return html`
      <ha-card>
        <paper-tabs selected="0" scrollable hide-scroll-buttons>
        ${this.renderPersonEntities()}
        ${this.renderExtraEntities()}
        ${this.renderAllEntities()}
        </paper-tabs>
        ${this.renderMoreInfoDialog()}
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
        ha-dialog#more-info-dialog { --mdc-dialog-max-width: 90vw; } 
        .tile-container { display: flex; flex-wrap: wrap; gap: 4px; }
        .entity-card { width: calc(22.5vw  - 15px ); box-sizing: border-box; }
        .entity-list { list-style: none; }
        @media (max-width: 768px) {
            .entity-card { flex-basis: 100%; max-width: 100%; }
            .tile-container { width: 100%; }
        }
    `;
}

          
    static getConfigElement() {
        return document.createElement("dev-status-card-editor");
    }
  
    static getStubConfig() {
        return {};
    }
}

customElements.define('dev-status-card', StatusCard);

class StatusCardEditor extends BaseCard {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }



  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.config !== this.props.config || nextState !== this.state) {
      return true;
    }
    return false; 
  }

  constructor() {
    super();
    this.openedDomains = [];
    this.openedDeviceClasses = [];
    this.entityConfig = this.initializeEntityConfig();
    this.config = {
      extra_entities: [],
      hidden_entities: [],
    };
  }


  setConfig(config) {
    this.config = config;
    if (!config.extra_entities) delete this.config.extra_entities;
    if (!config.hidden_entities) delete this.config.hidden_entities;
    this.entityConfig = this.initializeEntityConfig();
  }

  configChanged(newConfig) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  static labelMap = {
    entity: (hass) => hass.localize("ui.components.selectors.selector.types.entity"),
    status: (hass) => hass.localize("ui.components.selectors.selector.types.state"),
    color: (hass) => hass.localize("ui.panel.lovelace.editor.card.tile.color"),
    icon: (hass) => hass.localize("ui.components.selectors.selector.types.icon"),
    showPerson:  () => "Show Person",
    showPersonName:  () => "Show Person Name",
    showBadgeName: () =>  "Show Badge Name",
    bulkMode:  () => "Bulk Mode",
    hideDomain: (hass, domain) =>
      `${hass.localize(`component.${domain}.entity_component._.name`)} ${hass.localize("ui.common.disable")}`,
    hide_cover_DeviceClass: (hass, domain, deviceClass) =>
      `${hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${deviceClass}`)} ${hass.localize("ui.common.disable")}`,
    hide_binary_sensor_DeviceClass: (hass, domain, deviceClass) =>
      `${hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${deviceClass}`)} ${hass.localize("ui.common.disable")}`,
    domainName: (hass) => hass.localize("ui.panel.lovelace.editor.cardpicker.domain"),
    deviceClassName: (hass) => `${hass.localize("ui.panel.lovelace.editor.card.generic.show_name")} device_class`,
    sortOrder: () => "Order",
    area: (hass) => hass.localize("ui.components.selectors.selector.types.area"),
    floor: (hass) => hass.localize("ui.components.selectors.selector.types.floor"),
    label: (hass) => hass.localize("ui.components.label-picker.label"),
    labelFilter: (hass) => `${hass.localize("ui.components.label-picker.label")} Filter`,
    areaFloorFilter: () => "",
  };


  _computeLabel(schema, domain, deviceClass) {
    const labelGenerator = StatusCardEditor.labelMap[schema.name];
    return labelGenerator ? labelGenerator(this.hass, domain, deviceClass) : "";
  }
  
  toggleSetting(type, checked) {
    const updatedConfig = { ...this.config, [type]: checked };
    this.configChanged(updatedConfig);
  }
  

  showMoreHiddenItems() {
    this.showMore = true;
    this.requestUpdate();
  }

  updateConfig(property, domain, deviceClassName, value) {
    const updatedConfig = { ...this.config }; 
    updatedConfig[property] = { ...this.config[property] }; 
    updatedConfig[property][domain] = { ...this.config[property]?.[domain] }; 
    
    if (deviceClassName) {
      updatedConfig[property][domain][deviceClassName] = value; 
    } else {
      updatedConfig[property][domain] = value; 
    }
    
    this.configChanged(updatedConfig); 
    this.requestUpdate(); 
  }
  

  
updateSortOrder(domain, deviceClassName, newSortOrder) {
  this.updateConfig('newSortOrder', domain, deviceClassName, newSortOrder);
}

  updateIcons(domain, deviceClassName, icon) {
    this.updateConfig('icons', domain, deviceClassName, icon);
  }
  
  updateNames(domain, deviceClassName, name) {
    this.updateConfig('names', domain, deviceClassName, name);
  }
  
  updateColors(domain, deviceClassName, color) {
    const updatedConfig = { ...this.config };
    updatedConfig.colors = { ...this.config.colors };
    updatedConfig.colors[domain] = color;
    this.configChanged(updatedConfig);
  }
  
  
  
  updateVisibility(domain, deviceClassName, visible) {
    this.updateConfig('hide', domain, deviceClassName, visible);
  }


  
  manageExtraEntity(action, index = null, field = null, value = null) {
    const updatedConfig = { ...this.config };
    updatedConfig.extra_entities = updatedConfig.extra_entities ? updatedConfig.extra_entities.map(entity => ({ ...entity })) : [];
  
    if (action === 'add') {
      updatedConfig.extra_entities.push({ entity: '', status: '', icon: '', color: '' });
    } else if (action === 'update' && index !== null && field !== null) {
      const updatedEntity = { ...updatedConfig.extra_entities[index] };
      updatedEntity[field] = value;
      updatedConfig.extra_entities[index] = updatedEntity;
    } else if (action === 'remove' && index !== null) {
      updatedConfig.extra_entities.splice(index, 1);
    }
    this.configChanged(updatedConfig); 
    setTimeout(() => {this.requestUpdate();}, 100); 
  }
  

  manageHiddenItem(type, item, action) {
    const validTypes = ["hidden_entities", "hidden_labels"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}. Expected one of ${validTypes.join(", ")}`);
    }
  
    const updatedConfig = { ...this.config };
    updatedConfig[type] = updatedConfig[type] ? [...updatedConfig[type]] : [];
  
    const list = updatedConfig[type];
  
    const cleanedItem = typeof item === "string" ? item.trim() : item;
    if (!cleanedItem || (typeof cleanedItem === "string" && cleanedItem === "")) {
      return;
    }
  
    if (action === "add" && !list.includes(cleanedItem)) {
      list.push(cleanedItem);
    } else if (action === "remove") {
      const index = list.indexOf(cleanedItem);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }

    this.configChanged(updatedConfig);
    this.requestUpdate();
  }
  
  
  
  

  updateAreaFloorSelection(type, value) {
    this.config = {
        ...this.config,
        area_filter: {
            [type]: value || '',
            ...(type === 'area' ? { floor: undefined } : { area: undefined }),
        },
    };
    this.configChanged(this.config);
}


updateLabelSelection(value) {
  this.config = {
      ...this.config,
      label_filter:  value || ''};
  this.configChanged(this.config);
}


renderHaForm(name, selector, data, computeLabel, onChange) {
  const originalData = { ...data };
  const onDataChange = (event) => {
    const newData = event.detail.value;
    if (JSON.stringify(newData) !== JSON.stringify(originalData)) {
      onChange(event);
    }
  };
  return html`
    <ha-form
      .schema=${[{ name, selector }]}
      .data=${data}
      .hass=${this.hass}
      .computeLabel=${computeLabel}
      @value-changed=${onDataChange}>
    </ha-form>
  `;
}

renderSettings() {
  return html`
  <div class="settings">
      <div class="sub">
        ${this.renderHaForm("showPerson", { boolean: {} }, { showPerson: this.config.showPerson ?? true }, this._computeLabel, 
          (e) => this.toggleSetting('showPerson', e.detail.value.showPerson))}
          </div>
            <div class="sub">
        ${this.renderHaForm("showPersonName", { boolean: {} }, { showPersonName: this.config.showPersonName ?? true }, this._computeLabel, 
          (e) => this.toggleSetting('showPersonName', e.detail.value.showPersonName))}
          </div>           

        </div>          
  <div class="settings">    
             <div class="sub">
        ${this.renderHaForm("bulkMode", { boolean: {} }, { bulkMode: this.config.bulkMode ?? false }, this._computeLabel, 
          (e) => this.toggleSetting('bulkMode', e.detail.value.bulkMode))}
          </div>  
          <div class="sub">
        ${this.renderHaForm("showBadgeName", { boolean: {} }, { showBadgeName: this.config.showBadgeName ?? true }, this._computeLabel, 
          (e) => this.toggleSetting('showBadgeName', e.detail.value.showBadgeName))}
          </div>            

  </div>
`;
}


renderFilters() {
  const areaFloorOptions = [
    { label: this.hass.localize("ui.components.selectors.selector.types.area"), value: 'area' },
    { label: this.hass.localize("ui.components.selectors.selector.types.floor"), value: 'floor' }
  ];

  const selectedAreaFloor = this.config.area_filter ? Object.keys(this.config.area_filter)[0] : '';

  return html`
    <ha-expansion-panel outlined class="main">
      <div slot="header" role="heading" aria-level="3"> ${this.hass.localize(`ui.components.subpage-data-table.filters`)} ${this.hass.localize(`ui.components.subpage-data-table.filters`)} </div>
      <div class="settings">
        <div class="flex">
          ${this.renderHaForm(
            "areaFloorFilter",{ select: { options: areaFloorOptions } },{ areaFloorFilter: selectedAreaFloor },
            this._computeLabel,(e) => this.updateAreaFloorSelection(e.detail.value.areaFloorFilter, ''))}
        </div>
        <div class="flex">
          ${this.renderHaForm("labelFilter",{ boolean: {} },{ labelFilter: (this.labelFilter || this.config.label_filter) ?? false },
            this._computeLabel,(e) => {this.labelFilter = e.detail.value.labelFilter; this.requestUpdate(); })}
        </div>
      </div>
      <div class="filter">
        ${selectedAreaFloor === 'area' ? this.renderHaForm("area",{ area: {} },{ area: this.config.area_filter.area || '' },
          this._computeLabel,(e) => this.updateAreaFloorSelection('area', e.detail.value.area)): ''}
        ${selectedAreaFloor === 'floor'? this.renderHaForm("floor",{ floor: {} },{ floor: this.config.area_filter.floor || '' },
          this._computeLabel,(e) => this.updateAreaFloorSelection('floor', e.detail.value.floor)): ''}
      </div>
      <div class="filter">
        ${this.labelFilter || this.config.label_filter ? this.renderHaForm("label",{ label: {} },{ label: this.config.label_filter || '' },
          this._computeLabel,(e) => this.updateLabelSelection(e.detail.value.label)): ''}
      </div>
    </ha-expansion-panel>
  `;
}



renderDomainConfig() {

  return html`
    <ha-expansion-panel outlined class="main">
      <div slot="header" role="heading" aria-level="3">edit_domains</div>
      <div class="content">
        ${Object.keys(this.entityConfig)
          .filter(domain => !['cover', 'binary_sensor'].includes(domain))
          .map(domain => html`
            <ha-expansion-panel outlined ?expanded="${this.openedDomains.includes(domain)}" class="child">
              <div slot="header" role="heading" aria-level="3">
                ${this.hass.localize(`component.${domain}.entity_component._.name`) || domain}
              </div>
              <div class="sub-content">
                ${this.renderHaForm("hideDomain", { boolean: {} }, { hideDomain: this.config.hide?.[domain] || false }, 
                  (schema) => this._computeLabel(schema, domain), 
                  (e) => this.updateVisibility(domain, null, e.detail.value.hideDomain))}
                ${this.renderHaForm("domainName", { text: {} }, { domainName: this.config.names?.[domain] || '' }, this._computeLabel, 
                  (e) => this.updateNames(domain, null, e.detail.value.domainName))}
                ${this.renderHaForm("icon", { icon: {} }, { icon: this.config.icons?.[domain] || '' }, this._computeLabel, 
                  (e) => this.updateIcons(domain, null, e.detail.value.icon))}
                ${this.renderHaForm("color", { ui_color: {} }, { color: this.config.colors?.[domain] || '' }, this._computeLabel, 
                  (e) => this.updateColors(domain, null, e.detail.value.color))}
                ${this.renderHaForm("sortOrder", { number: {} }, { sortOrder: this.config.newSortOrder?.[domain] !== undefined ? this.config.newSortOrder?.[domain] : this.entityConfig[domain]?.sortOrder || 0 }, 
                this._computeLabel, (e) => { const newValue = Number(e.detail.value.sortOrder); this.newSortOrder = newValue; this.updateSortOrder(domain, null, newValue); })}
              </div>
            </ha-expansion-panel>
          `)}
      </div>
    </ha-expansion-panel>
  `;
}

renderDeviceClassConfig() {
  return html`
    ${['cover', 'binary_sensor'].map(domain => html`
      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">'edit_dc'</div>
        <div class="content">
          ${this.entityConfig[domain].deviceClasses.map(deviceClass => html`
            <ha-expansion-panel outlined ?expanded="${this.openedDeviceClasses.includes(`${domain}-${deviceClass.name}`)}" class="child">
              <div slot="header" role="heading" aria-level="3">
                ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass.name}`)}
              </div>
              <div class="sub-content">
                ${this.renderHaForm(`hide_${domain}_DeviceClass`, { boolean: {} }, 
                  { [`hide_${domain}_DeviceClass`]: this.config.hide?.[domain]?.[deviceClass.name] || false }, 
                  (schema) => this._computeLabel(schema, domain, deviceClass.name), 
                  (e) => this.updateVisibility(domain, deviceClass.name, e.detail.value[`hide_${domain}_DeviceClass`]))}
                ${this.renderHaForm("deviceClassName", { text: {} }, 
                  { deviceClassName: this.config.names?.[domain]?.[deviceClass.name] || '' }, this._computeLabel, 
                  (e) => this.updateNames(domain, deviceClass.name, e.detail.value.deviceClassName))}
                ${this.renderHaForm("icon", { icon: {} }, 
                  { icon: this.config.icons?.[domain]?.[deviceClass.name] || '' }, this._computeLabel, 
                  (e) => this.updateIcons(domain, deviceClass.name, e.detail.value.icon))}
                ${this.renderHaForm("color", { ui_color: {} }, 
                  { color: this.config.colors?.[domain]?.[deviceClass.name] || '' }, this._computeLabel, 
                  (e) => this.updateColors(domain, deviceClass.name, e.detail.value.color))}
                ${this.renderHaForm("sortOrder", { number: {} }, { sortOrder: (this.config.newSortOrder?.[domain]?.[deviceClass.name] !== undefined) ? this.config.newSortOrder[domain][deviceClass.name] : deviceClass.sortOrder || 0 }, this._computeLabel, (e) => this.updateSortOrder(domain, deviceClass.name, Number(e.detail.value.sortOrder)))}
              </div>
            </ha-expansion-panel>
          `)}
        </div>
      </ha-expansion-panel>
    `)}
  `;
}



renderExtraEntities() {
  const extraEntities = this.config.extra_entities || [];
  return html`
    <ha-expansion-panel outlined class="main">
      <div slot="header" role="heading" aria-level="3">
        Extra ${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")}
      </div>
      <div class="content">
        ${extraEntities.map((entity, index) => html`
          <div class="extra-entity">
            <div class="extra-entity-top">
              <div class="extra-entity-entity">
                ${this.renderHaForm("entity", { entity: {} }, { entity: entity.entity }, this._computeLabel, 
                  (e) => this.manageExtraEntity('update', index, 'entity', e.detail.value.entity))}
              </div>
              <div class="extra-entity-remove">
              <ha-icon-button class="remove-icon" @click=${() => { 
                this.manageExtraEntity('remove', index); 
                this.updateSortOrder('extra', entity.entity, '');
              }}>
                <ha-icon class="center" icon="mdi:delete"></ha-icon>
              </ha-icon-button>
              </div>
            </div>
            <div class="extra-entity-bottom">
              <div class="extra-entity-status">
                ${this.renderHaForm("status", { state: { entity_id: entity.entity } }, { status: entity.status }, this._computeLabel, 
                  (e) => this.manageExtraEntity('update', index, 'status', e.detail.value.status))}
              </div>
              <div class="extra-entity-sort">
                ${this.renderHaForm("sortOrder", { number: {} }, 
                  { sortOrder: this.config.newSortOrder?.['extra']?.[entity.entity] ?? '' }, this._computeLabel, 
                  (e) => this.updateSortOrder('extra', entity.entity, Number(e.detail.value.sortOrder)))}
              </div>
            </div>
            <div class="extra-entity-bottom">
              <div class="extra-entity-icon">
                ${this.renderHaForm("icon", { icon: {} }, { icon: entity.icon || '' }, this._computeLabel, 
                  (e) => this.manageExtraEntity('update', index, 'icon', e.detail.value.icon))}
              </div>            
              <div class="extra-entity-color">
                ${this.renderHaForm("color", { ui_color: {} }, { color: entity.color || '' }, this._computeLabel, 
                  (e) => this.manageExtraEntity('update', index, 'color', e.detail.value.color))}
              </div>
            </div>
          </div>
        `)}
        <ha-button slot="trigger" outlined="" @click=${() => this.manageExtraEntity('add')}> 
          <ha-icon class="button-icon" icon="mdi:plus"></ha-icon>
          <span class="button-text">${this.hass.localize("ui.common.add")}</span>
        </ha-button>
      </div>
    </ha-expansion-panel>
  `;
}


renderHiddenEntities() {
  const hiddenEntities = (this.config.hidden_entities || []).slice().sort();
  const hiddenLabels = (this.config.hidden_labels || []).slice().sort();
  const combinedItems = [
    ...hiddenEntities.map(entity => ({ type: "entity", value: entity })),
    ...hiddenLabels.map(label => ({ type: "label", value: label }))
  ];
  const showAll = this.showMore || combinedItems.length <= 5;
  const itemsToShow = showAll ? combinedItems : combinedItems.slice(0, 5);
  const entityLabelOptions = [
    { label: this.hass.localize("ui.components.selectors.selector.types.entity"), value: 'entity' },
    { label: this.hass.localize("ui.components.label-picker.label"), value: 'label' }
  ];
  const selectedEntityLabel = this.hide_type;

  return html`
    <ha-expansion-panel outlined class="main">
      <div slot="header" role="heading" aria-level="3">
        ${this.hass.localize("ui.panel.lovelace.editor.entities.remove")}
      </div>
        <div class="entity-label-picker">
          ${this.renderHaForm("entityLabelFilter", { select: { options: entityLabelOptions } }, 
            { entityLabelFilter: selectedEntityLabel },
            this._computeLabel, 
            (e) => {
              this.hide_type = e.detail.value.entityLabelFilter; 
              this.requestUpdate();
            })}
        </div>
        <div class="entity-label-form">
          ${selectedEntityLabel === 'entity' ? this.renderHaForm("entity", { entity: {} }, { entity: null }, this._computeLabel, 
            (e) => this.manageHiddenItem("hidden_entities", e.detail.value.entity, "add")) : ''}
          ${selectedEntityLabel === 'label' ? this.renderHaForm("label", { label: {} }, { label: null }, this._computeLabel, 
            (e) => this.manageHiddenItem("hidden_labels", e.detail.value.label, "add")) : ''}
        </div>
     

        ${(combinedItems.length > 0) ? html`
          <h3>${this.hass.localize("ui.dialogs.entity_registry.editor.disabled_label")}:</h3>
          <ul>
            ${itemsToShow.map(item => html`
              <li class="hidden-entity">
                <span>
                  ${item.type === "entity"
                    ? `${this.hass.localize("ui.components.selectors.selector.types.entity")}: ${item.value}` 
                    : `${this.hass.localize("ui.components.label-picker.label")}: ${item.value.charAt(0).toUpperCase() + item.value.slice(1)}`}
                </span>
                <ha-icon-button class="remove-icon"
                  @click=${() => this.manageHiddenItem(
                    item.type === "entity" ? "hidden_entities" : "hidden_labels",
                    item.value,
                    "remove"
                  )}>
                  <ha-icon class="center" icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </li>
            `)}
            ${!showAll ? html`
              <li class="hidden-entity">
                <mwc-button @click=${() => this.showMoreHiddenItems()}>
                  ${this.hass.localize("ui.dialogs.more_info_control.show_more")}
                </mwc-button>
              </li>
            ` : ''}
          </ul>
        ` : ''}
        </div>        
    </ha-expansion-panel>
  `;
}




 
render() {
  if (!this.config) return html`<div>Invalid Configuration</div>`;

  return html`
      ${this.renderSettings()}
      ${this.renderFilters() }
      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">Edit Domains/ Device Classes</div>
      ${this.renderDomainConfig()}
      ${this.renderDeviceClassConfig()}
      </ha-expansion-panel>
      ${this.renderExtraEntities()}
      ${this.renderHiddenEntities()}
  `;
}

  



  static get styles() {
    return css`  
      ul { margin: 0; padding: 5px;  }
      .button-icon { --mdc-icon-size: 1.125rem; margin-right: 8px; }
      .button-text { font-size:  var(--mdc-typography-button-font-size, .875rem);}
      .remove-icon { --mdc-icon-button-size: 36px; color: var(--secondary-text-color); align-self: center; }
      h3 { margin: 0; padding: 8px 0; display: flex; align-items: center; }
      .center {display: flex; align-items: center; justify-content: center;}
      .main {margin: 5px 0;}
      .sub {margin-top: -10px; flex: 1}
      .child {width:calc(50% - 2px); margin-top: 3px;}
      .person-entity, .hidden-entity { display: flex; align-items: center; } 
      .hidden-entity { justify-content: space-between; }
      .hidden-entity span { max-width: calc(100% - 35px); word-wrap: break-word; }
      .content { display: flex; flex-wrap: wrap; margin: 10px 0px; }  
      .settings { display: flex; flex-wrap: wrap; gap: 20px; padding: 0 6px; align-items: center;}
      .flex { flex: 1; }
      .sub-content { padding: 10px 5px; }  
      .entity-picker { flex: 7; }
      .filter { margin-bottom: 10px; } 
      .status-text { flex: 3; }
      .extra-entity {width: 100%; }
      .extra-entity-color, .extra-entity-icon, .extra-entity-sort { flex: 1; min-width: 0; }
      .extra-entity-remove {text-align: center; flex: 1; align-content: center;}
      .remove-icon{ text-align: end;  }
      .extra-entity-entity, .extra-entity-status { flex: 5; }
      .extra-entity-bottom, .extra-entity-top{ display: flex;flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
      .area-floor-picker { margin-right: auto; flex: 4;}
      .entity-label-form {margin-bottom: 10px }
      .top-row {display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; padding: 2px 5px;}
    `;
  }
}

customElements.define('dev-status-card-editor', StatusCardEditor);

console.info(
  `%c STATUS-CARD %c DEV `,
  'color: steelblue; background: black; font-weight: bold;',
  'color: white ; background: dimgray; font-weight: bold;'
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "dev-status-card",
  name: "dev-Status Card",
  preview: true, 
  description: "A custom card that displays active entities grouped by domain.", 
  documentationURL: "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card", 
});
