import { LitElement, html, css } from 'lit-element';
import { translateState } from './translations.js';


class BaseCard extends LitElement {
  constructor() {
    super();
    this.entityConfig = this.initializeEntityConfig(); // Initialisiere hier, wenn du eine Instanz erzeugst.
  }

  initializeEntityConfig() {
    // Konsolidierte Icons und deviceClasses mit Sortierung
    const entityConfig = {
      update: { icon: 'mdi:update', sortOrder: 1 },
      light: { icon: 'mdi:lightbulb', sortOrder: 2 },
      media_player: { icon: 'mdi:cast', sortOrder: 3 },
      lock: { icon: 'mdi:lock', sortOrder: 4 },
      input_boolean: { icon: 'mdi:toggle-switch', sortOrder: 5 },
      timer: { icon: 'mdi:timer-outline', sortOrder: 6 },
      counter: { icon: 'mdi:counter', sortOrder: 7 },
      switch: { icon: 'mdi:power', sortOrder: 8 },
      vacuum: { icon: 'mdi:robot-vacuum', sortOrder: 9 },
      device_tracker: { icon: 'mdi:cellphone', sortOrder: 10 },
      calendar: { icon: 'mdi:calendar', sortOrder: 11 },
      climate: { icon: 'mdi:thermostat', sortOrder: 12 },
      remote: { icon: 'mdi:remote', sortOrder: 13 },
      fan: { icon: 'mdi:fan', sortOrder: 14 },
      alarm_control_panel: { icon: 'mdi:bell-ring', sortOrder: 15 },
      humidifier: { icon: 'mdi:air-humidifier', sortOrder: 16 },
      lawn_mower: { icon: 'mdi:robot-mower', sortOrder: 17 },
      siren: { icon: 'mdi:alarm-light', sortOrder: 18 },
      valve: { icon: 'mdi:valve', sortOrder: 19 },
      water_heater: { icon: 'mdi:water-boiler', sortOrder: 20 },
      cover: {
        icon: {
          awning: 'mdi:window-shutter-open',
          blind: 'mdi:blinds-open',
          curtain: 'mdi:curtains',
          damper: 'mdi:valve',
          door: 'mdi:door-open',
          garage: 'mdi:garage-open',
          gate: 'mdi:gate-open',
          shade: 'mdi:roller-shade',
          shutter: 'mdi:window-shutter-open',
          window: 'mdi:window-open',
          none: 'mdi:window-shutter',
        },
        deviceClasses: [
          { name: 'awning', sortOrder: 21 },
          { name: 'blind', sortOrder: 22 },
          { name: 'curtain', sortOrder: 23 },
          { name: 'damper', sortOrder: 24 },
          { name: 'door', sortOrder: 25 },
          { name: 'garage', sortOrder: 26 },
          { name: 'gate', sortOrder: 27 },
          { name: 'shade', sortOrder: 28 },
          { name: 'shutter', sortOrder: 29 },
          { name: 'window', sortOrder: 30 }
        ]
      },
      binary_sensor: {
        icon: {
          battery: 'mdi:battery-alert',
          battery_charging: 'mdi:battery-charging',
          carbon_monoxide: 'mdi:molecule-co',
          cold: 'mdi:snowflake',
          connectivity: 'mdi:connection',
          door: 'mdi:door-open',
          garage_door: 'mdi:garage-open',
          gas: 'mdi:gas-cylinder',
          heat: 'mdi:thermometer',
          light: 'mdi:brightness-5',
          lock: 'mdi:lock-open',
          moisture: 'mdi:water',
          motion: 'mdi:run',
          moving: 'mdi:car',
          occupancy: 'mdi:seat',
          opening: 'mdi:door-open',
          plug: 'mdi:power-plug',
          power: 'mdi:power-plug',
          presence: 'mdi:home',
          problem: 'mdi:alert-circle',
          running: 'mdi:play',
          safety: 'mdi:shield-alert',
          smoke: 'mdi:smoke-detector',
          sound: 'mdi:volume-high',
          tamper: 'mdi:shield-off',
          update: 'mdi:update',
          vibration: 'mdi:vibrate',
          window: 'mdi:window-open',
          none: 'mdi:alert-circle-outline',
        },
        deviceClasses: [
          { name: 'battery', sortOrder: 31 },
          { name: 'battery_charging', sortOrder: 32 },
          { name: 'carbon_monoxide', sortOrder: 33 },
          { name: 'cold', sortOrder: 34 },
          { name: 'connectivity', sortOrder: 35 },
          { name: 'door', sortOrder: 36 },
          { name: 'garage_door', sortOrder: 37 },
          { name: 'gas', sortOrder: 38 },
          { name: 'heat', sortOrder: 39 },
          { name: 'light', sortOrder: 40 },
          { name: 'lock', sortOrder: 41 },
          { name: 'moisture', sortOrder: 42 },
          { name: 'motion', sortOrder: 43 },
          { name: 'moving', sortOrder: 44 },
          { name: 'occupancy', sortOrder: 45 },
          { name: 'opening', sortOrder: 46 },
          { name: 'plug', sortOrder: 47 },
          { name: 'power', sortOrder: 48 },
          { name: 'presence', sortOrder: 49 },
          { name: 'problem', sortOrder: 50 },
          { name: 'running', sortOrder: 51 },
          { name: 'safety', sortOrder: 52 },
          { name: 'smoke', sortOrder: 53 },
          { name: 'sound', sortOrder: 54 },
          { name: 'tamper', sortOrder: 55 },
          { name: 'update', sortOrder: 56 },
          { name: 'vibration', sortOrder: 57 },
          { name: 'window', sortOrder: 58 }
        ]
      }
    };
    return entityConfig;
  }
}

class StatusCard extends BaseCard {
  static get properties() {
      return {
          hass: { type: Object },
          areas: { type: Array },
          devices: { type: Array },
          entities: { type: Array },
          config: { type: Object },
          selectedDomain: { type: String },
          entitiesInDomain: { type: Array },
          hideDomains: { type: Array },
          hideCoverDeviceClasses: { type: Array },
          hideBinaryDeviceClasses: { type: Array },
          hiddenEntities: { type: Array },
          domainIcons:  {type: Array},
          domainNames:  {type: Array},
          domainColors:  {type: Array},
          BinaryDeviceClassNames:  {type: Array},
          CoverDeviceClassNames:  {type: Array},
          CoverDeviceClassIcons:  {type: Array},
          BinaryDeviceClassIcons:  {type: Array},
          BinaryDeviceClassColors:  {type: Array},
          CoverDeviceClassColors:  {type: Array},
          showPerson: { type: Boolean }, 
          bulkMode: { type: Boolean } 
      };
  }

  setConfig(config) {
      if (!config) {
          throw new Error('Invalid configuration');
      }
      this._config = config;
      this.hass = config.hass;
      this.areas = [];
      this.devices = [];
      this.entities = [];
      this.entitiesInDomain = [];
      this.selectedDomain = null;
      this.hideDomains = config.hide_domains || [];
      this.hideCoverDeviceClasses = config.hide_cover_deviceClasses || [];
      this.hideBinaryDeviceClasses = config.hide_binary_deviceClasses || [];
      this.hiddenEntities = config.hidden_entities || [];
      this.domainIcons = config.domainIcons || [];
      this.domainNames = config.domainNames || [];
      this.domainColors = config.domainColors || [];
      this.CoverDeviceClassNames = config.CoverDeviceClassNames || [];
      this.BinaryDeviceClassNames = config.BinaryDeviceClassNames || [];
      this.CoverDeviceClassIcons = config.CoverDeviceClassIcons || [];
      this.BinaryDeviceClassIcons = config.BinaryDeviceClassIcons || [];      
      this.CoverDeviceClassColors = config.CoverDeviceClassNames || [];
      this.BinaryDeviceClassColors = config.BinaryDeviceClassColors || []; 
      this.showPerson = config.showPerson !== undefined ? config.showPerson : true;
      this.bulkMode = config.bulkMode !== undefined ? config.bulkMode : false;
  }


  firstUpdated() {
      if (this.hass) {
          this._loadData();
      } else {
          console.error('HASS instance is not available.');
      }
  }

  async _loadData() {
      if (!this.hass) {
          console.error('HASS instance is not available.');
          return;
      }

      try {
          this.areas = await this.hass.callWS({ type: "config/area_registry/list" });
          this.devices = await this.hass.callWS({ type: "config/device_registry/list" });
          this.entities = await this.hass.callWS({ type: "config/entity_registry/list" });
      } catch (error) {
          console.error('Error loading data:', error);
      }
  }

  getEntityStatus(group) {
    if (group.type === 'device_tracker') {
      return this.hass.localize('component.person.entity_component._.state.home');
    }
    if (group.type === 'lock' || ['window', 'lock', 'door'].includes(group.originalName)) {
      return this.hass.localize('component.cover.entity_component._.state.open');
    }  
    if (group.type === 'cover' || ['awning', 'blind', 'curtain', 'damper', 'garage', 'gate', 'shade', 'shutter'].includes(group.originalName)) {
      return this.hass.localize('component.cover.entity_component._.state.open');
    }  
    return this.hass.localize('component.light.entity_component._.state.on');
  }

  getPersonStatus(entity) {
    const state = this.hass.states[entity.entity_id]?.state;
    
    if (state === 'home') {
      return this.hass.localize('component.person.entity_component._.state.home');
    }
    if (state === 'not_home') {
      return this.hass.localize('component.person.entity_component._.state.not_home');
    } 
    return state; 
  }
  
  getIconForEntity(group) {
    return group.type === 'binary_sensor' ? 
      (this.BinaryDeviceClassIcons?.[group.originalName] || this.entityConfig['binary_sensor']?.icon[group.originalName]) : 
      group.type === 'cover' ? 
      (this.CoverDeviceClassIcons?.[group.originalName] || this.entityConfig['cover']?.icon[group.originalName]) : 
      (this.domainIcons?.[group.type] || this.entityConfig[group.type]?.icon);
  }

  getNameForEntity(group) {
    return group.type === 'binary_sensor' 
      ? (this.BinaryDeviceClassNames?.[group.originalName] || this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${group.originalName}`))
      : group.type === 'cover' 
      ? (this.CoverDeviceClassNames?.[group.originalName] || this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${group.originalName}`))
      : (this.domainNames?.[group.type] || this.hass.localize(`component.${group.type}.entity_component._.name`) || translateState(group.type, this.hass.language));
  }  
  
  getColorForEntity(group) {
    return group.type === 'binary_sensor' ? 
      (this.BinaryDeviceClassColors?.[group.originalName] || '') : 
      group.type === 'cover' ? 
      (this.CoverDeviceClassColors?.[group.originalName] || '') : 
      (this.domainColors?.[group.type] || '');
  }  
 
  getSortOrder(type, deviceClassName) {
    if (this._config.newSortOrder && this._config.newSortOrder[type]) {
      if (deviceClassName) {
        return (this._config.newSortOrder[type][deviceClassName] !== undefined)
          ? this._config.newSortOrder[type][deviceClassName]
          : (this.initializeEntityConfig()[type]?.deviceClasses?.find(dc => dc.name === deviceClassName)?.sortOrder || Infinity);
      }
      return (this._config.newSortOrder[type] !== undefined) 
        ? this._config.newSortOrder[type] 
        : (this.initializeEntityConfig()[type]?.sortOrder || Infinity);
    }
  
    return (this.initializeEntityConfig()[type]?.sortOrder || Infinity);
  }

  createCard(cardConfig) {
    const element = document.createElement(`hui-${cardConfig.type}-card`);
    if (element) {
      element.hass = this.hass;
      element.setConfig(cardConfig);
      return element;
    }
    return html`<p>Kartenkonfiguration fehlgeschlagen</p>`;
  }

  showMoreInfo(domain, entities, entityName) {
    this.selectedDomain = domain;
    this.entitiesInDomain = entities;
    this.selectedEntityName = entityName; 
    this.requestUpdate();
  
    const dialog = this.shadowRoot.getElementById('more-info-dialog');
    
    if (dialog) {
      dialog.style.display = 'block'; 
      dialog.setAttribute('open', 'true'); 
    }
  }
  
  closeMoreInfo() {
    const dialog = this.shadowRoot.getElementById('more-info-dialog');
    if (dialog) {
      dialog.removeAttribute('open');
      dialog.style.display = 'none'; 
    }
  }
    
  showMorePersonInfo(entity) {
      const event = new CustomEvent("hass-more-info", {
          detail: { entityId: entity.entity_id },
          bubbles: true,
          composed: true,
      });
      document.querySelector("home-assistant").dispatchEvent(event);
  }
  
  render() {
    const entityConfig = this.initializeEntityConfig();   
    const personEntities = this.showPerson ? this.entities.filter(entity =>
      entity.entity_id.startsWith('person.') && !this.hiddenEntities.includes(entity.entity_id)
    ) : [];
  
    const groupedEntities = {};
    const binarySensorClasses = {}; 
    const coverClasses = {};
    const STATES_OFF = ["closed", "locked", "off", "docked", "idle", "standby", "paused", "auto", "not_home", "disarmed"];
    const UNAVAILABLE_STATES = ["unavailable", "unknown"];

  
    for (const area of this.areas) {
      const areaDevices = new Set();
  
      for (const device of this.devices) {
        if (device.area_id === area.area_id) {
          areaDevices.add(device.id);
        }
      }
  
      for (const entity of this.entities) {
        const domain = entity.entity_id.split('.')[0];
        const state = this.hass.states[entity.entity_id]?.state;
        const deviceClass = this.hass.states[entity.entity_id]?.attributes.device_class || 'none';
        
        if (!entityConfig[domain]) continue;
  
        if (entity &&
          this.hass.states[entity.entity_id] &&
          !["cover", "binary_sensor"].includes(domain) &&
          (entity.area_id ? entity.area_id === area.area_id : areaDevices.has(entity.device_id)) &&
          !STATES_OFF.includes(state) &&
          !UNAVAILABLE_STATES.includes(state) &&
          !this.hiddenEntities.includes(entity.entity_id)
        ) {
          if (!groupedEntities[domain]) {
            groupedEntities[domain] = [];
          }
          groupedEntities[domain].push(entity);
        }
  
        if (domain === 'cover' && (state === 'on' || state === 'open') &&
          (entity.area_id ? entity.area_id === area.area_id : areaDevices.has(entity.device_id)) &&
          !this.hiddenEntities.includes(entity.entity_id)
        ) {
          if (entityConfig.cover.deviceClasses.some(dc => dc.name === deviceClass)) { 
            if (!coverClasses[deviceClass]) {
              coverClasses[deviceClass] = [];
            }
            coverClasses[deviceClass].push(entity);
          }
        }
  
        if (domain === 'binary_sensor' && (state === 'on' || state === 'open') &&
          (entity.area_id ? entity.area_id === area.area_id : areaDevices.has(entity.device_id)) &&
          !this.hiddenEntities.includes(entity.entity_id)
        ) {
          if (entityConfig.binary_sensor.deviceClasses.some(dc => dc.name === deviceClass)) { 
            if (!binarySensorClasses[deviceClass]) {
              binarySensorClasses[deviceClass] = [];
            }
            binarySensorClasses[deviceClass].push(entity);
          }
        }
      }
    }
  
    const allEntities = [];
  
    Object.keys(groupedEntities).forEach(domain => {
      allEntities.push({
        type: domain,
        originalName: domain, 
        entities: groupedEntities[domain],
        sortOrder: entityConfig[domain]?.sortOrder || 100 
      });
    });

    Object.keys(binarySensorClasses).forEach(deviceClass => {
      const entities = binarySensorClasses[deviceClass];

      allEntities.push({
        type: 'binary_sensor',
        originalName: deviceClass, 
        device_class: deviceClass, 
        entities: entities, 
        entityCount: entities.length,
        sortOrder: entityConfig.binary_sensor.deviceClasses.find(dc => dc.name === deviceClass)?.sortOrder || 100
      });
    });

    Object.keys(coverClasses).forEach(deviceClass => {
      const entities = coverClasses[deviceClass];

      allEntities.push({
        type: 'cover',
        originalName: deviceClass, 
        device_class: deviceClass,
        entities: entities, 
        entityCount: entities.length, 
        sortOrder: entityConfig.cover.deviceClasses.find(dc => dc.name === deviceClass)?.sortOrder || 100
      });
    });

    allEntities.sort((a, b) => {
      const sortOrderA = this.getSortOrder(a.type, a.device_class);
      const sortOrderB = this.getSortOrder(b.type, b.device_class);
      return sortOrderA - sortOrderB;
    });

    const extraEntities = this._config?.extra_entities || []; 
     
    return html`
      <ha-card>
        <paper-tabs selected="0" scrollable hide-scroll-buttons>
          ${personEntities.map(entity => html`
            <paper-tab @click=${() => this.showMorePersonInfo(entity)}>
              <div class="entity">
                <div class="entity-icon">
                  <img src="${this.hass.states[entity.entity_id]?.attributes.entity_picture || ''}" alt="Person Picture" />
                </div>
                <div class="entity-info">
                  <div class="entity-name">${this.hass.states[entity.entity_id]?.attributes.friendly_name}</div>
                  <div class="entity-state">${this.getPersonStatus(entity)}</div>
                </div>
              </div>
            </paper-tab>
          `)}
        
            ${extraEntities.map(({ entity, status, icon, color }) => {
              const selectedEntity = entity ? this.hass.states[entity] : null;
              const friendlyName = selectedEntity?.attributes?.friendly_name || entity;
              const isVisible = selectedEntity && selectedEntity.state === status;

              return isVisible
                ? html`
                  <paper-tab>
                    <div class="extra-entity">
                      <div class="entity-icon" style="color: var(--${color || ''}-color);">
                        <ha-icon icon="${icon}"></ha-icon>
                      </div>
                      <div class="entity-info">
                        <div class="entity-name">${friendlyName}</div>
                        <div class="entity-state">${translateState(selectedEntity?.state, this.hass.language)}</div>
                      </div>
                    </div>
                  </paper-tab>
                `
                : null;
            })}
          
          ${allEntities
            .filter(group => !this.hideDomains.includes(group.type)) 
            .filter(entity => 
              entity.type !== 'binary_sensor' || 
              !this.hideBinaryDeviceClasses.includes(entity.originalName)
            )
            .filter(entity => 
              entity.type !== 'cover' || 
              !this.hideCoverDeviceClasses.includes(entity.originalName)
            )
            .map(group => html`
              <paper-tab @click=${() => this.showMoreInfo(group.type, group.entities, this.getNameForEntity(group))}>
                <div class="entity">
                  <div class="entity-icon" style="color: var(--${this.getColorForEntity(group) || ''}-color);">
                    <ha-icon icon="${this.getIconForEntity(group)}"></ha-icon>
                  </div>
                  <div class="entity-info">
                    <div class="entity-name">${this.getNameForEntity(group)}</div>
                    <div class="entity-state">
                      ${group.entities.length} ${this.getEntityStatus(group)}
                    </div>
                  </div>
                </div>
              </paper-tab>
            `)
          }              
            </paper-tabs>
          </ha-card>
      
          <ha-dialog id="more-info-dialog" style="display:none;">
            <div class="dialog-header">
              <ha-icon-button slot="navigationIcon" dialogaction="cancel" @click=${() => this.closeMoreInfo()} title="Schließen">
                <ha-icon icon="mdi:close"></ha-icon>
              </ha-icon-button>
              <h3>${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")} in ${this.selectedEntityName}:</h3>
            </div>
      
          <div class="tile-container">
            ${this.bulkMode 
              ? html`
                  <ul class="entity-list">
                    ${this.entitiesInDomain.map(entity => html`
                      <li class="entity-item">- ${entity.entity_id}</li>
                    `)}
                  </ul>`
              : html`
                ${this.entitiesInDomain.map(entity => html`
                  <div class="entity-card" .entity="${entity.entity_id}">
                    ${this.createCard({
                      type: 'tile',
                      entity: entity.entity_id,
                      ...(this.selectedDomain === 'light' && {
                        features: [
                          { type: "light-brightness" }
                        ]
                      }),
                      ...(this.selectedDomain === 'cover' && {
                        features: [
                          { type: "cover-open-close" },
                          { type: "cover-position" }
                        ]
                      })
                    })}
                  </div>
                `)}
              `
            }
          </div>
        </ha-dialog>
        `;
      }
      
  static get styles() {
    return css`  
          paper-tabs {
            height: 110px;
          }
          .entity {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .extra-entity {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .entity-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-background-color);
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
          .dialog-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .dialog-header ha-icon-button {
            margin-right: 10px;
          }
          .dialog-header h3 {
            margin-bottom: 10px;
          }
          ha-dialog#more-info-dialog {
            --mdc-dialog-max-width: 90vw;
          }
          .tile-container {
            display: flex;
            flex-wrap: wrap; 
            gap: 4px; 
            padding: 10px;
          }  
          .entity-card {
            width: 21vw;
            box-sizing: border-box;
          }
          .entity-list {
            list-style: none; 
          }            
          @media (max-width: 768px) {
            .tile-container {
              justify-content: center;
            }
            .entity-card {
              flex-basis: 100%;
              max-width: 100%;
            }
          }    
    `}
      
    static getConfigElement() {
        return document.createElement("status-card-editor");
    }
  
    static getStubConfig() {
        return {};
    }
}

customElements.define('status-card', StatusCard);

class StatusCardEditor extends BaseCard {
  static get properties() {
    return {
      hass: {},
      _config: {},
      openedDomains: { type: Array },
      openedDeviceClasses: { type: Array },
      coverDeviceClasses: { type: Array },
      binaryDeviceClasses: { type: Array },
      extraEntity: { type: String }, 
      extraEntityStatus: { type: String }  
    };
  }

  constructor() {
    super();
    this.openedDomains = [];
    this.openedDeviceClasses = [];
    this._config = {
      extra_entities: [],
    }; 
  }

  setConfig(config) {
    this._config = config;
    this._config.extra_entities = this._config.extra_entities || [];  
  }

  connectedCallback() {
    super.connectedCallback();
  }

  configChanged(newConfig) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  _computeLabel(schema) {
    const domain = this.data?.domain; 
    const deviceClass = this.data?.deviceClass?.name;

    var labelMap = {
        entity: this.hass.localize("ui.components.selectors.selector.types.entity"),
        status: this.hass.localize("ui.components.selectors.selector.types.state"),
        color: this.hass.localize("ui.panel.lovelace.editor.card.tile.color"),
        icon: this.hass.localize("ui.components.selectors.selector.types.icon"),
        showPerson: translateState('show_person', this.hass.language),
        bulkMode: translateState('bulk_mode', this.hass.language),
        hideDomain: `${this.hass.localize(`component.${domain}.entity_component._.name`)} ${this.hass.localize("ui.common.disable")}`, 
        hideCoverDeviceClass: `${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${deviceClass}`)} ${this.hass.localize("ui.common.disable")}`,
        hideBinaryDeviceClass: `${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${deviceClass}`)} ${this.hass.localize("ui.common.disable")}`,
        domainName: this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain"),
        deviceClassName: 'Device Class',
        sortOrder: 'Sort Order'
    }
    return labelMap[schema.name];
  }

  updateSortOrder(domain, deviceClassName, newSortOrder) {

    if (!this._config.newSortOrder) {
      this._config.newSortOrder = {};
    }

    if (!this._config.newSortOrder[domain]) {
      this._config.newSortOrder[domain] = {};
    }

    if (deviceClassName) {
      this._config.newSortOrder[domain][deviceClassName] = newSortOrder;
    } else {
      this._config.newSortOrder[domain] = newSortOrder; 
    }
    
    this.configChanged(this._config);
    this.requestUpdate();
  }

  _addExtraEntity() {
    if (!this._config.extra_entities) {
      this._config.extra_entities = [];
    }
    this._config.extra_entities.push({ entity: '', status: '', icon: '', color: '' });
    this.configChanged(this._config);
  }

  _updateEntity(index, field, value) { 
    this._config.extra_entities[index][field] = value;
    this.configChanged(this._config);
  }

  _removeExtraEntity(index) {
    this._config.extra_entities.splice(index, 1);
    this.configChanged(this._config);
  }

  toggleDetails(type, domain, deviceClassName) {
    const key = `${domain}-${deviceClassName}`;  

    if (type === 'domain') {
      this.openedDomains = this.toggleArrayItem(this.openedDomains, domain);
    } else if (type === 'deviceClass') {
      this.openedDeviceClasses = this.toggleArrayItem(this.openedDeviceClasses, key);
    }

    this.requestUpdate();
  }

  toggleArrayItem(array, item) {
    return array.includes(item) ? array.filter(i => i !== item) : [...array, item];
  }

  updateIcon(type, key, icon) {
    if (!this._config[type]) {
      this._config[type] = {};
    }
    this._config[type][key] = icon;
    this.configChanged(this._config);
  }

  updateName(type, key, name) {
    if (!this._config[type]) {
      this._config[type] = {};
    }
    this._config[type][key] = name;
    this.configChanged(this._config);
  }

  updateColor(type, key, color) {
    if (!this._config[type]) {
      this._config[type] = {};
    }
    this._config[type][key] = color;
    this.configChanged(this._config);
  }

  toggleSetting(type, key, checked) {
    if (type === 'showPerson') {
        this._config.showPerson = checked;
    } 
    if (type === 'bulkMode') {
      this._config.bulkMode = checked;
  }     
    else if (type === 'domains') {
        if (!this._config.hide_domains) {
            this._config.hide_domains = [];
        }
        if (checked) {
            this._config.hide_domains.push(key);
        } else {
            this._config.hide_domains = this._config.hide_domains.filter(domain => domain !== key);
        }
    } 
    else if (type === 'binary_deviceClass') {
        if (!this._config.hide_binary_deviceClasses) {
            this._config.hide_binary_deviceClasses = [];
        }
        if (checked) {
            this._config.hide_binary_deviceClasses.push(key);
        } else {
            this._config.hide_binary_deviceClasses = this._config.hide_binary_deviceClasses.filter(deviceClass => deviceClass !== key);
        }
    } 
    else if (type === 'cover_deviceClass') {
        if (!this._config.hide_cover_deviceClasses) {
            this._config.hide_cover_deviceClasses = [];
        }
        if (checked) {
            this._config.hide_cover_deviceClasses.push(key);
        } else {
            this._config.hide_cover_deviceClasses = this._config.hide_cover_deviceClasses.filter(deviceClass => deviceClass !== key);
        }
    }

    this.configChanged(this._config); 
  }

  addHiddenEntity(entity) {
    if (entity && !this._config.hidden_entities?.includes(entity)) {
      this._config.hidden_entities = this._config.hidden_entities || [];
      this._config.hidden_entities.push(entity);
      this.configChanged(this._config);
    }
  }

  removeHiddenEntity(entity) {
  this._config.hidden_entities = this._config.hidden_entities.filter(e => e !== entity);
  this.configChanged(this._config);
  }

  render() {
    if (!this._config) return html`<div>Keine Konfiguration gefunden</div>`;
    return html`
      <div>
        <div class=toggle> 
        <ha-form
          .schema=${[{ name: "showPerson", selector: { boolean: {} } }]}
          .data=${{ showPerson: this._config.showPerson !== undefined ? this._config.showPerson : true }}
          .hass=${this.hass}
          .computeLabel=${this._computeLabel}
          @value-changed=${(e) => {
            const newValue = e.detail.value.showPerson;
            this.toggleSetting('showPerson', null, newValue);
          }}>
        </ha-form>
        <ha-form
          .schema=${[{ name: "bulkMode", selector: { boolean: {} } }]}
          .data=${{ bulkMode: this._config.bulkMode }}
          .hass=${this.hass}
          .computeLabel=${this._computeLabel}
          @value-changed=${(e) => {
            const newValue = e.detail.value.bulkMode;
            this.toggleSetting('bulkMode', null, newValue);
          }}>
        </ha-form>
        </div>

        <p  @click=${() => this.toggleDetails('domain', 'customization')} class="toggle-header">
        ${translateState('edit_domains', this.hass.language)}
          <ha-icon icon="${this.openedDomains.includes('customization') ? 'hass:chevron-up' : 'hass:chevron-down'}"></ha-icon>
        </p>
        ${this.openedDomains.includes('customization') ? html`
          <div class="checkbox-group">
            ${Object.keys(this.entityConfig)
              .filter(domain => domain !== 'cover' && domain !== 'binary_sensor')
              .map(domain => html`
                <div class="domain-container">
                  <div @click=${() => this.toggleDetails('domain', domain)} class="domain-header">
                    ${this.hass.localize(`component.${domain}.entity_component._.name`) || domain}
                    <ha-icon class="toggle-icon" icon="${this.openedDomains.includes(domain) ? 'hass:chevron-up' : 'hass:chevron-down'}"></ha-icon>
                  </div>
                  ${this.openedDomains.includes(domain) ? html`
                    <div class="domain-settings">
                      <ha-form
                        .schema=${[{ name: "hideDomain", selector: { boolean: {} } }]}
                        .data=${{ 
                          hideDomain: this._config.hide_domains?.includes(domain),
                          domain: domain
                        }}
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${(e) => {
                          const newValue = e.detail.value.hideDomain;
                          this.toggleSetting('domains', domain, newValue);
                        }}>
                      </ha-form>

                      <ha-form
                        .schema=${[{ name: "domainName", selector: { text: {} } }]}
                        .data=${{ domainName: this._config.domainNames?.[domain] || '' }}
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${(e) => {
                          const newValue = e.detail.value.domainName;
                          this.updateName('domainNames', domain, newValue);
                        }}>
                      </ha-form>

<ha-form
  .schema=${[{ name: "icon", selector: { icon: {} } }]}
  .data=${this._config.domainIcons?.[domain] ? { icon: this._config.domainIcons[domain] } : { icon: '' }}
  .hass=${this.hass}
  .computeLabel=${this._computeLabel}
  @value-changed=${(e) => {
    const newValue = e.detail.value.icon;
    this.updateIcon('domainIcons', domain, newValue);
  }}>
</ha-form>



                      <ha-form
                        .schema=${[{ name: "color", selector: { ui_color: {} } }]}
                        .data=${{ color: this._config.domainColors?.[domain] || '' }}
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${(e) => {
                          const newValue = e.detail.value.color;
                          this.updateColor('domainColors', domain, newValue);
                        }}>
                      </ha-form>

                      <ha-form
                        .schema=${[{ name: "sortOrder", selector: { number: {} } }]}
                        .data=${{ sortOrder: this._config.newSortOrder?.[domain] !== undefined ? this._config.newSortOrder?.[domain] : this.entityConfig[domain]?.sortOrder || 0 }} 
                        .hass=${this.hass}
                        .computeLabel=${this._computeLabel}
                        @value-changed=${(e) => {
                          const newValue = Number(e.detail.value.sortOrder);
                          this.newSortOrder = newValue;
                          this.updateSortOrder(domain, null, newValue);
                        }}>
                      </ha-form>

                    </div>
                  ` : ''}
                </div>
              `)}
          </div>
        ` : ''}

        <p @click=${() => this.toggleDetails('deviceClass', 'cover')} class="toggle-header">
          ${translateState('edit_cover_dc', this.hass.language)} 
          <ha-icon icon="${this.openedDeviceClasses.some(key => key.startsWith('cover-')) ? 'hass:chevron-up' : 'hass:chevron-down'}" class="toggle-icon"></ha-icon>
        </p>
        ${this.openedDeviceClasses.some(key => key.startsWith('cover-')) ? html`
          <div class="checkbox-group">
            ${this.entityConfig.cover.deviceClasses.map(deviceClass => html`
              <div class="domain-container">
                <div 
                  @click=${() => this.toggleDetails('deviceClass', 'cover', deviceClass.name)} 
                  class="domain-header">

                  ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${deviceClass.name}`)}

                  <ha-icon class="toggle-icon"
                    icon="${this.openedDeviceClasses.includes(`cover-${deviceClass.name}`) 
                      ? 'hass:chevron-up' 
                      : 'hass:chevron-down'}">
                  </ha-icon>
                </div>

                ${this.openedDeviceClasses.includes(`cover-${deviceClass.name}`) ? html`
                  <div class="domain-settings">
                    <ha-form
                      .schema=${[{ name: "hideCoverDeviceClass", selector: { boolean: {} } }]}
                      .data=${{ hideCoverDeviceClass: this._config.hide_cover_deviceClasses?.includes(deviceClass.name), deviceClass: { name: deviceClass.name } }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.hideCoverDeviceClass;
                        this.toggleSetting('cover_deviceClass', deviceClass.name, newValue);
                      }}>
                    </ha-form>

                    <ha-form
                      .schema=${[{ name: "deviceClassName", selector: { text: {} } }]}
                      .data=${{ deviceClassName: this._config.CoverDeviceClassNames?.[deviceClass.name] || '' }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.deviceClassName;
                        this.updateName('CoverDeviceClassNames', deviceClass.name, newValue);
                      }}>
                    </ha-form>

                    <ha-form
                      .schema=${[{ name: "icon", selector: { icon: {} } }]}
                      .data=${{ icon: this._config.CoverDeviceClassIcons?.[deviceClass.name] || '' }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.icon;
                        this.updateIcon('CoverDeviceClassIcons', deviceClass.name, newValue);
                      }}>
                    </ha-form>

                    <ha-form
                      .schema=${[{ name: "color", selector: { ui_color: {} } }]}
                      .data=${{ color: this._config.CoverDeviceClassColors?.[deviceClass.name] || '' }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.color;
                        this.updateColor('CoverDeviceClassColors', deviceClass.name, newValue);
                      }}>
                    </ha-form>


                    <ha-form
                      .schema=${[{ name: "sortOrder", selector: { number: {} } }]}
                      .data=${{ sortOrder: (this._config.newSortOrder?.cover?.[deviceClass.name] !== undefined) ? this._config.newSortOrder.cover[deviceClass.name] : deviceClass.sortOrder || 0 }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = Number(e.detail.value.sortOrder);
                        this.updateSortOrder('cover', deviceClass.name, newValue);
                      }}>
                    </ha-form>


                  </div>
                ` : ''}
              </div>
            `)}
          </div>
        ` : ''}


        <p @click=${() => this.toggleDetails('deviceClass', 'binary_sensor')} class="toggle-header">
            ${translateState('edit_binary_dc', this.hass.language)}
          <ha-icon icon="${this.openedDeviceClasses.some(key => key.startsWith('binary_sensor-')) ? 'hass:chevron-up' : 'hass:chevron-down'}"></ha-icon>
        </p>
        ${this.openedDeviceClasses.some(key => key.startsWith('binary_sensor-')) ? html`
          <div class="checkbox-group">
            ${this.entityConfig.binary_sensor.deviceClasses.map(deviceClass => html`
              <div class="domain-container">
                <div 
                  @click=${() => this.toggleDetails('deviceClass', 'binary_sensor', deviceClass.name)} 
                  class="domain-header">

                  ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${deviceClass.name}`)}
                  
                  <ha-icon class="toggle-icon"
                    icon="${this.openedDeviceClasses.includes(`binary_sensor-${deviceClass.name}`) 
                      ? 'hass:chevron-up' 
                      : 'hass:chevron-down'}">
                  </ha-icon>

                  
                </div>

                ${this.openedDeviceClasses.includes(`binary_sensor-${deviceClass.name}`) ? html`
                  <div class="domain-settings">

                    <ha-form
                      .schema=${[{ name: "hideBinaryDeviceClass", selector: { boolean: {} } }]}
                      .data=${{ hideBinaryDeviceClass: this._config.hide_binary_deviceClasses?.includes(deviceClass.name), deviceClass: { name: deviceClass.name } }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.hideBinaryDeviceClass;
                        this.toggleSetting('binary_deviceClass', deviceClass.name, newValue);
                      }}>
                    </ha-form>


                    <ha-form
                      .schema=${[{ name: "deviceClassName", selector: { text: {} } }]}
                      .data=${{ deviceClassName: this._config.BinaryDeviceClassNames?.[deviceClass.name] || '' }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.deviceClassName;
                        this.updateName('BinaryDeviceClassNames', deviceClass.name, newValue);
                      }}>
                    </ha-form>

                    <ha-form
                      .schema=${[{ name: "icon", selector: { icon: {} } }]}
                      .data=${{ icon: this._config.BinaryDeviceClassIcons?.[deviceClass.name] || '' }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.icon;
                        this.updateIcon('BinaryDeviceClassIcons', deviceClass.name, newValue);
                      }}>
                    </ha-form>

                    <ha-form
                      .schema=${[{ name: "color", selector: { ui_color: {} } }]}
                      .data=${{ color: this._config.BinaryDeviceClassColors?.[deviceClass.name] || '' }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = e.detail.value.color;
                        this.updateColor('BinaryDeviceClassColors', deviceClass.name, newValue);
                      }}>
                    </ha-form>

                    <ha-form
                      .schema=${[{ name: "sortOrder", selector: { number: {} } }]}
                      .data=${{ sortOrder: this._config.newSortOrder?.binary_sensor?.[deviceClass.name] !== undefined ? this._config.newSortOrder.binary_sensor[deviceClass.name] : deviceClass.sortOrder || 0 }}
                      .hass=${this.hass}
                      .computeLabel=${this._computeLabel}
                      @value-changed=${(e) => {
                        const newValue = Number(e.detail.value.sortOrder);
                        this.updateSortOrder('binary_sensor', deviceClass.name, newValue);
                      }}>
                    </ha-form>
                  </div>
                ` : ''}
              </div>
            `)}
          </div>
        ` : ''}

        <div class=extra-entities>  
          <h2>Extra ${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")}</h2>   
          <ha-icon-button 
            @click=${() => this._addExtraEntity()}>
            <ha-icon class="extra-entitities-icon" icon="mdi:plus"></ha-icon>
          </ha-icon-button>
        </div>


        ${this._config.extra_entities.map((entity, index) => html`
          <div class="extra-entity-input">
            <ha-form
              .schema=${[{ name: "entity", selector: { entity: {} } }]}
              .data=${{ entity: entity.entity }}
              .hass=${this.hass}
              .computeLabel=${this._computeLabel}
              @value-changed=${(e) => {
                const newValue = e.detail.value.entity;
                this._updateEntity(index, 'entity', newValue);
              }}>
            </ha-form>

            <ha-form
              .schema=${[{ name: "status", selector: { text: {} } }]}
              .data=${{ status: entity.status }}
              .hass=${this.hass}
              .computeLabel=${this._computeLabel}
              @value-changed=${(e) => {
                const newValue = e.detail.value.status;
                this._updateEntity(index, 'status', newValue);
              }}>
            </ha-form>
          </div>
          <div class="extra-entity-input-down">
              <ha-form
                .schema=${[{ name: "icon", selector: { icon: {} } }]}
                .data=${{ icon: entity.icon || '' }}
                .hass=${this.hass}
                .computeLabel=${this._computeLabel}
                @value-changed=${(e) => {
                  const newValue = e.detail.value.icon;
                  this._updateEntity(index, 'icon', newValue);
                }}>
              </ha-form>

              <ha-form
                .schema=${[{ name: "color", selector: { ui_color: { } } }]}
                .data=${{ color: entity.color || '' }}
                .hass=${this.hass}
                .computeLabel=${this._computeLabel}
                @value-changed=${(e) => {
                  const newValue = e.detail.value.color;
                  this._updateEntity(index, 'color', newValue);
                }}>
              </ha-form>

              <ha-icon-button
                class="remove-button"
                icon="mdi:minus"
                @click=${() => this._removeExtraEntity(index)}>
                <ha-icon icon="mdi:minus"></ha-icon>
              </ha-icon-button>
          </div>
        `)}

        <div>
          <h2>${this.hass.localize("ui.panel.lovelace.editor.entities.remove")}</h2>
          <div class="entity-picker-container">
            <ha-form
              .schema=${[{ name: "entity", selector: { entity: {} } }]}
              .hass=${this.hass}
              .computeLabel=${this._computeLabel}
              @value-changed=${(e) => {
                this.addHiddenEntity(e.detail.value.entity)
              }}>
            </ha-form>
          </div>
        </div>
  
        ${this._config.hidden_entities && this._config.hidden_entities.length > 0 ? html`
          <h3>
            ${this.hass.localize("ui.dialogs.entity_registry.editor.disabled_label")}: 
          </h3>
          <ul>
            ${this._config.hidden_entities.map(entity => html`
              <li class="hidden-entity">
                ${entity}
                <mwc-button @click=${() => this.removeHiddenEntity(entity)}>${this.hass.localize("ui.common.remove")}</mwc-button>
              </li>
            `)}
          </ul>
        ` : ''}
      </div>
    `;    
  }
  
  static get styles() {
    return css`  
      ha-card {
        padding: 16px;
      }
      .domain-group {
        margin-bottom: 16px;
        cursor: pointer;
      }
      h2 {
        margin: 0;
        padding: 8px 0;
        font-size: 18px;
        display: flex;
        align-items: center;
      }
      ha-icon {
        margin-right: 8px;
      }
      .person-entity {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .hidden-entity {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .checkbox-group label {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        cursor: pointer;
        flex-wrap: wrap; 
      }
      .domain-settings {
        margin-left: 20px;
        padding: 10px 0;
      }         
      .domain-container {
        flex: 1 1 calc(50% - 16px);
        box-sizing: border-box; 
      }
      .entity-picker-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .entity-picker-container ha-form {
        width: 100%; 
      }
      .entity-picker-container mwc-button {
        align-self: flex-end;
        margin-top: 8px; 
      }
      .row {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .entity-picker {
        flex: 7;
      }
      .status-text {
        flex: 3;
      }
      .extra-entities {
        display: flex;
        justify-content: space-between; 
        align-items: center; 
      }
      .extra-entity-input {
        display: flex;
        gap: 10px;
        margin-bottom: 5px;
      }
      .extra-entity-input > ha-form:nth-of-type(1) {
        flex:8;
      }
      .extra-entity-input > ha-form:nth-of-type(2) {
        flex: 2;
      }      
      .extra-entity-input-down {
        display: flex;
        gap: 10px;
      }
      .extra-entity-input-down > ha-form:nth-of-type(1) {
        flex:5;
      }
      .extra-entity-input-down > ha-form:nth-of-type(2) {
        flex: 3;
      }   
      .toggle {
        display: flex;
        gap: 20px;
        padding: 0 10px 0 10px;
      }
      .toggle > ha-form:nth-of-type(1) {
        flex:1;
      }

      .toggle > ha-form:nth-of-type(2) {
        flex: 1;
      }   
      .toggle-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--expansion-panel-summary-padding, 0 8px);
        border: 1px solid var(--divider-color); 
        border-radius: 4px; 
        cursor: pointer; 
        background-color: var(--paper-card-background-color);
        margin-bottom: 5px;
        font-weight: 500;
        min-height: 48px;
      }
      .domain-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--expansion-panel-summary-padding, 0 8px);
        border: 1px solid var(--divider-color); 
        border-radius: 4px; 
        cursor: pointer; 
        background-color: var(--paper-card-background-color);
        margin: 0 3px 5px 3px;
        font-weight: 500;
        min-height: 36px;
      }
      .toggle-icon {
        margin-left: auto;
      }
    `;
  }
}

customElements.define('status-card-editor', StatusCardEditor);


// Registrierung der Karte
window.customCards = window.customCards || [];
window.customCards.push({
  type: "status-card",
  name: "Status Card",
  preview: true, // Optional - defaults to false
  description: "A custom card that displays active entities grouped by domain.", // Optional
  documentationURL: "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card", // Hilfslinie in der Benutzeroberfläche
});
