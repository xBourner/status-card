import { LitElement, html, css } from 'lit-element';
import { translateState } from './translations.js';
import packageJson from '../package.json' assert { type: 'json' };

class BaseCard extends LitElement {
  constructor() {
    super();
    this.entityConfig = this.initializeEntityConfig(); 
  }

  initializeEntityConfig() {
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
        deviceClasses: [
          { name: 'awning', icon: 'mdi:window-shutter-open', sortOrder: 21 },
          { name: 'blind', icon: 'mdi:blinds-open', sortOrder: 22 },
          { name: 'curtain', icon: 'mdi:curtains', sortOrder: 23 },
          { name: 'damper', icon: 'mdi:valve', sortOrder: 24 },
          { name: 'door', icon: 'mdi:door-open', sortOrder: 25 },
          { name: 'garage', icon: 'mdi:garage-open', sortOrder: 26 },
          { name: 'gate', icon: 'mdi:gate-open', sortOrder: 27 },
          { name: 'shade', icon: 'mdi:roller-shade', sortOrder: 28 },
          { name: 'shutter', icon: 'mdi:window-shutter-open', sortOrder: 29 },
          { name: 'window', icon: 'mdi:window-open', sortOrder: 30 },
        ],
        icon: 'mdi:alert-circle'
      },
      binary_sensor: {
        deviceClasses: [
          { name: 'battery', icon: 'mdi:battery-alert', sortOrder: 31 },
          { name: 'battery_charging', icon: 'mdi:battery-charging', sortOrder: 32 },
          { name: 'carbon_monoxide', icon: 'mdi:molecule-co', sortOrder: 33 },
          { name: 'cold', icon: 'mdi:snowflake', sortOrder: 34 },
          { name: 'connectivity', icon: 'mdi:connection', sortOrder: 35 },
          { name: 'door', icon: 'mdi:door-open', sortOrder: 36 },
          { name: 'garage_door', icon: 'mdi:garage-open', sortOrder: 37 },
          { name: 'gas', icon: 'mdi:gas-cylinder', sortOrder: 38 },
          { name: 'heat', icon: 'mdi:thermometer', sortOrder: 39 },
          { name: 'light', icon: 'mdi:brightness-5', sortOrder: 40 },
          { name: 'lock', icon: 'mdi:lock-open', sortOrder: 41 },
          { name: 'moisture', icon: 'mdi:water', sortOrder: 42 },
          { name: 'motion', icon: 'mdi:run', sortOrder: 43 },
          { name: 'moving', icon: 'mdi:car', sortOrder: 44 },
          { name: 'occupancy', icon: 'mdi:seat', sortOrder: 45 },
          { name: 'opening', icon: 'mdi:door-open', sortOrder: 46 },
          { name: 'plug', icon: 'mdi:power-plug', sortOrder: 47 },
          { name: 'power', icon: 'mdi:power-plug', sortOrder: 48 },
          { name: 'presence', icon: 'mdi:home', sortOrder: 49 },
          { name: 'problem', icon: 'mdi:alert-circle', sortOrder: 50 },
          { name: 'running', icon: 'mdi:play', sortOrder: 51 },
          { name: 'safety', icon: 'mdi:shield-alert', sortOrder: 52 },
          { name: 'smoke', icon: 'mdi:smoke-detector', sortOrder: 53 },
          { name: 'sound', icon: 'mdi:volume-high', sortOrder: 54 },
          { name: 'tamper', icon: 'mdi:shield-off', sortOrder: 55 },
          { name: 'update', icon: 'mdi:update', sortOrder: 56 },
          { name: 'vibration', icon: 'mdi:vibrate', sortOrder: 57 },
          { name: 'window', icon: 'mdi:window-open', sortOrder: 58 }
        ],
        icon: 'mdi:alert-circle'
      }
    };
    return entityConfig;
  }
}

class StatusCard extends BaseCard {
  static get properties() {
      return {
          config: { type: Object },  
          hass: { type: Object },      
          areas: { type: Array },
          devices: { type: Array },
          entities: { type: Array }
      };
  }

  setConfig(config) {
      if (!config) { throw new Error('Invalid configuration'); }
      this._config = config;
      this.hass = config.hass;
      this.areas = [];
      this.devices = [];
      this.entities = [];
      this.entitiesInDomain = [];
      this.hiddenEntities = config.hidden_entities || [];
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

  getProperty(group, propertyType) {
    const { type, device_class: deviceClassName, originalName } = group;
    const entityConfig = this.initializeEntityConfig()[type];
    const config = this._config[propertyType];
    const state = this.hass.states[group.entity_id]?.state;

    if (propertyType === 'sortOrder') {
      if (type === 'extra') {
        return this._config.newSortOrder?.['extra']?.[deviceClassName] ?? -1;
      }
        return deviceClassName 
            ? this._config.newSortOrder?.[type]?.[deviceClassName] ?? (entityConfig?.deviceClasses?.find(dc => dc.name === deviceClassName)?.sortOrder || Infinity)
            : this._config.newSortOrder?.[type] ?? (entityConfig?.sortOrder || Infinity);
    }

    if (['binary_sensor', 'cover'].includes(type)) {
        switch (propertyType) {
            case 'hide':
                return config?.[type]?.[deviceClassName] || '';
            case 'names':
                return config?.[type]?.[deviceClassName] || this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${type}.${deviceClassName}`);
            case 'icons':
                return config?.[type]?.[deviceClassName] || entityConfig?.deviceClasses?.find(dc => dc.name === deviceClassName)?.icon || entityConfig?.icon;
            case 'colors':
                return config?.[type]?.[deviceClassName] || '';
        }
    }

    if (['hide', 'colors'].includes(propertyType)) {
        return config?.[type] || '';
    }
    if (propertyType === 'names') {
        return config?.[type] || this.hass.localize(`component.${type}.entity_component._.name`) || translateState(type, this.hass.language);
    }
    if (propertyType === 'icons') {
        return config?.[type] || entityConfig?.icon;
    }

    if (propertyType === 'status') {
      if (group.entity_id && group.entity_id.startsWith('person.')) {
          return state === 'home' ? this.hass.localize('component.person.entity_component._.state.home') : state === 'not_home' ? this.hass.localize('component.person.entity_component._.state.not_home') : state; 
      }
      return type === 'device_tracker' ? this.hass.localize('component.person.entity_component._.state.home')
          : (type === 'lock' || ['window', 'lock', 'door'].includes(originalName)) ? this.hass.localize('component.cover.entity_component._.state.open')
          : (type === 'cover' || ['awning', 'blind', 'curtain', 'damper', 'garage', 'gate', 'shade', 'shutter'].includes(originalName)) ? this.hass.localize('component.cover.entity_component._.state.open')
          : this.hass.localize('component.light.entity_component._.state.on');
  }
    return null;
  }

  toggleMoreInfo(action, domain = null, entities = null, entityName = null) {
    const dialog = this.shadowRoot.getElementById('more-info-dialog');

    if (action === 'show' && dialog) {
        Object.assign(this, { selectedDomain: domain, entitiesInDomain: entities, selectedEntityName: entityName });
        this.requestUpdate();
        dialog.style.display = 'block';
        dialog.setAttribute('open', 'true');
    } else if (action === 'close' && dialog) {
        dialog.removeAttribute('open');
        dialog.style.display = 'none';
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
    return html`<p>Kartenkonfiguration fehlgeschlagen</p>`;
  }
  
  isEntityHidden(entity) {
    return this.hiddenEntities.includes(entity.entity_id) || entity.hidden_by;
  }

  render() {
    const entityConfig = this.initializeEntityConfig();
    const statesOff = new Set(["closed", "locked", "off", "docked", "idle", "standby", "paused", "auto", "not_home", "disarmed"]);
    const unavailableStates = new Set(["unavailable", "unknown"]);
    
    const personEntities = this.showPerson 
        ? this.entities.filter(entity => entity.entity_id.startsWith('person.') && !this.hiddenEntities.includes(entity.entity_id)) 
        : [];

    const areaDeviceMap = this.areas.map(area => ({
        area,
        devices: new Set(this.devices.filter(device => device.area_id === area.area_id).map(device => device.id))
    }));

    const groupedEntities = {};
    const deviceClassEntities = { cover: {}, binary_sensor: {} };

    for (const { area, devices: areaDevices } of areaDeviceMap) {
        for (const entity of this.entities) {
            const { entity_id, area_id, device_id } = entity;
            const domain = entity_id.split('.')[0];
            const state = this.hass.states[entity_id]?.state;
            const deviceClass = this.hass.states[entity_id]?.attributes.device_class;

            if (!entityConfig[domain] || !state || unavailableStates.has(state) || this.isEntityHidden(entity)) continue;

            const isAreaMatched = area_id ? area_id === area.area_id : areaDevices.has(device_id);

            if (isAreaMatched && ["cover", "binary_sensor"].includes(domain) && (state === 'on' || state === 'open') && deviceClass !== 'none') {
                const configDeviceClass = entityConfig[domain]?.deviceClasses.find(dc => dc.name === deviceClass);
                if (configDeviceClass) {
                    deviceClassEntities[domain][deviceClass] ||= [];
                    deviceClassEntities[domain][deviceClass].push(entity);
                }
            } else if (isAreaMatched && !statesOff.has(state)) {
                groupedEntities[domain] ||= [];
                groupedEntities[domain].push(entity);
            }
        }
    }

    const extraEntities = (this._config?.extra_entities || []).map(({ entity, status, icon, color }) => {
        const selectedEntity = entity ? this.hass.states[entity] : null;
        const friendlyName = selectedEntity?.attributes?.friendly_name || entity;
        const isVisible = selectedEntity && selectedEntity.state === status;
        const sortOrder = this._config.newSortOrder?.['extra']?.[entity] ?? -1;

        return isVisible ? {
            type: 'extra',
            originalName: friendlyName,
            entities: [selectedEntity],
            icon,
            color,
            device_class: entity,
            sortOrder
        } : null;
    }).filter(Boolean);

    const allEntities = [
        ...extraEntities,
        ...Object.entries(groupedEntities).map(([domain, entities]) => ({
            type: domain,
            originalName: domain,
            entities,
            sortOrder: entityConfig[domain]?.sortOrder || 100
        })),
        ...["cover", "binary_sensor"].flatMap(domain =>
            Object.entries(deviceClassEntities[domain]).map(([deviceClass, entities]) => ({
                type: domain,
                originalName: deviceClass,
                device_class: deviceClass,
                entities,
                sortOrder: entityConfig[domain]?.deviceClasses.find(dc => dc.name === deviceClass)?.sortOrder || 100
            }))
        )
    ];

    allEntities.sort((a, b) => (this.getProperty(a, 'sortOrder') || 100) - (this.getProperty(b, 'sortOrder') || 100));

    return html`
        <ha-card>
            <paper-tabs selected="0" scrollable hide-scroll-buttons>
                ${personEntities.map(entity => html`
                    <paper-tab @click=${() => this.showMoreInfo(entity)}>
                        <div class="entity">
                            <div class="entity-icon">
                                <img src="${this.hass.states[entity.entity_id]?.attributes.entity_picture || ''}" alt="Person Picture" />
                            </div>
                            <div class="entity-info">
                                <div class="entity-name">${this.hass.states[entity.entity_id]?.attributes.friendly_name}</div>
                                <div class="entity-state">${this.getProperty(entity, 'status')}</div>
                            </div>
                        </div>
                    </paper-tab>
                `)}
                ${extraEntities.map(({ entity, icon, color }) => {
                    const selectedEntity = entity ? this.hass.states[entity] : null;
                    const friendlyName = selectedEntity?.attributes?.friendly_name || entity;
                    return selectedEntity ? html`
                        <paper-tab @click=${() => this.showMoreInfo(selectedEntity)}>
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
                    ` : null;
                })}
                ${allEntities.filter(group => !this.getProperty(group, 'hide')).map(group => html`
                    <paper-tab @click=${() => { 
                        const showInfo = group.type === 'extra' ? this.showMoreInfo(group.entities[0]) : this.toggleMoreInfo('show', group.type, group.entities, this.getProperty(group, 'names'));
                        showInfo;
                    }}>
                        <div class="entity">
                            <div class="entity-icon" style="color: var(--${group.color || this.getProperty(group, 'colors') || ''}-color);">
                                <ha-icon icon="${group.icon || this.getProperty(group, 'icons')}"></ha-icon>
                            </div>
                            <div class="entity-info">
                                <div class="entity-name">${group.type === 'extra' ? group.originalName : this.getProperty(group, 'names')}</div>
                                <div class="entity-state">
                                    ${group.type === 'extra' && group.entities?.[0]
                                        ? translateState(group.entities[0].state, this.hass.language)
                                        : `${group.entities.length} ${this.getProperty(group, 'status')}`}
                                </div>
                            </div>
                        </div>
                    </paper-tab>
                `)}
            </paper-tabs>
        </ha-card>
        <ha-dialog id="more-info-dialog" style="display:none;">
            <div class="dialog-header">
                <ha-icon-button slot="navigationIcon" dialogaction="cancel" @click=${() => this.toggleMoreInfo('close')} title="Schließen">
                    <ha-icon icon="mdi:close"></ha-icon>
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

      static get styles() {
        return css`
            paper-tabs { height: 110px; }
            paper-tab {padding: 0 5px; }
            .entity, .extra-entity { display: flex; flex-direction: column; align-items: center;}
            .entity-icon { width: 50px; height: 50px; border-radius: 50%;
                background-color: rgba(var(--rgb-primary-text-color), 0.15);
                display: flex; align-items: center; justify-content: center;
                overflow: hidden;}
            .entity-icon img {width: 100%; height: 100%; object-fit: cover; border-radius: 50%;}
            .entity-info { text-align: center; margin-top: 5px; }
            .entity-name { font-weight: bold; margin-bottom: 2px; }
            .entity-state { color: var(--secondary-text-color); font-size: 0.9em; }
            .dialog-header { display: flex; align-items: center; justify-content: flex-start;}  
            .dialog-header ha-icon-button { margin-right: 10px; }
            .dialog-header h3 { margin-bottom: 10px; }
            ha-dialog#more-info-dialog { --mdc-dialog-max-width: 90vw; } 
            .tile-container { display: flex; flex-wrap: wrap; gap: 4px; padding: 10px; }
            .entity-card { width: 21vw; box-sizing: border-box; }
            .entity-list { list-style: none; }
            @media (max-width: 768px) {
                .entity-card { flex-basis: 100%; max-width: 100%; }
                .tile-container { width: 100%; }
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

customElements.define('status-card', StatusCard);

class StatusCardEditor extends BaseCard {
  static get properties() {
    return {
      hass: {},
      _config: {},
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

  configChanged(newConfig) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  _computeLabel(schema, domain, deviceClass) {
    var labelMap = {
      entity: this.hass.localize("ui.components.selectors.selector.types.entity"),
      status: this.hass.localize("ui.components.selectors.selector.types.state"),
      color: this.hass.localize("ui.panel.lovelace.editor.card.tile.color"),
      icon: this.hass.localize("ui.components.selectors.selector.types.icon"),
      showPerson: translateState('show_person', this.hass.language),
      bulkMode: translateState('bulk_mode', this.hass.language),
      hideDomain: `${this.hass.localize(`component.${domain}.entity_component._.name`)} ${this.hass.localize("ui.common.disable")}`, 
      hide_cover_DeviceClass: `${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${deviceClass}`)} ${this.hass.localize("ui.common.disable")}`,
      hide_binary_sensor_DeviceClass: `${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${deviceClass}`)} ${this.hass.localize("ui.common.disable")}`,
      domainName: this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain"),
      deviceClassName: 'Device Class',
      sortOrder: 'Sort Order'
    };
    return labelMap[schema.name];
  }
  
  toggleSetting(type, checked) {
    if (['showPerson', 'bulkMode'].includes(type)) {
        this._config[type] = checked; 
        this.configChanged(this._config);
    }
  }

  showMoreHiddenEntities() {
    this.showMore = true;
    this.requestUpdate(); 
  }

  toggleDetails(type, domain, deviceClassName) {
    const key = `${domain}-${deviceClassName}`;
    const targetArray = type === 'domain' ? this.openedDomains : this.openedDeviceClasses;
    const itemToToggle = type === 'domain' ? domain : key;

    if (targetArray) {
        this[type === 'domain' ? 'openedDomains' : 'openedDeviceClasses'] = targetArray.includes(itemToToggle)
            ? targetArray.filter(i => i !== itemToToggle)
            : [...targetArray, itemToToggle];
    }

    this.requestUpdate();
  }

  updateConfig(property, domain, deviceClassName, value) {
    this._config[property] = this._config[property] || {};
    this._config[property][domain] = this._config[property][domain] || {};
    
    deviceClassName ? 
      (this._config[property][domain][deviceClassName] = value) : 
      (this._config[property][domain] = value);
  
    this.configChanged(this._config);
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
    this.updateConfig('colors', domain, deviceClassName, color);
  }
  
  updateVisibility(domain, deviceClassName, visible) {
    this.updateConfig('hide', domain, deviceClassName, visible);
  }
  
  manageExtraEntity(action, index = null, field = null, value = null) {
    this._config.extra_entities = this._config.extra_entities || [];

    if (action === 'add') {
        this._config.extra_entities.push({ entity: '', status: '', icon: '', color: '' });
    } else if (action === 'update' && index !== null && field !== null) {
        this._config.extra_entities[index][field] = value;
    } else if (action === 'remove' && index !== null) {
        this._config.extra_entities.splice(index, 1);
    }

    this.configChanged(this._config);
  }

  manageHiddenEntity(entity, action) {
    this._config.hidden_entities = this._config.hidden_entities || [];

    if (action === 'add' && entity && !this._config.hidden_entities.includes(entity)) {
        this._config.hidden_entities.push(entity);
    } else if (action === 'remove') {
        this._config.hidden_entities = this._config.hidden_entities.filter(e => e !== entity);
    }

    this.configChanged(this._config);
  }

  render() {
    if (!this._config) return html`<div>Keine Konfiguration gefunden</div>`;
  
    const renderHaForm = (name, selector, data, computeLabel, onChange) => html`
      <ha-form
        .schema=${[{ name, selector }]}
        .data=${data}
        .hass=${this.hass}
        .computeLabel=${computeLabel}
        @value-changed=${onChange}>
      </ha-form>
    `;
  
    return html`
      <div>
        <div class=toggle> 
          ${renderHaForm("showPerson", { boolean: {} }, { showPerson: this._config.showPerson !== undefined ? this._config.showPerson : true }, this._computeLabel, (e) => this.toggleSetting('showPerson', e.detail.value.showPerson))}
          ${renderHaForm("bulkMode", { boolean: {} }, { bulkMode: this._config.bulkMode !== undefined ? this._config.bulkMode : false }, this._computeLabel, (e) => this.toggleSetting('bulkMode', e.detail.value.bulkMode))}
        </div>
  
        <p @click=${(e) => { e.stopPropagation(); this.toggleDetails('domain', 'customization')}} class="toggle-header">
          ${translateState('edit_domains', this.hass.language)}
          <ha-icon icon="${this.openedDomains.includes('customization') ? 'hass:chevron-up' : 'hass:chevron-down'}"></ha-icon>
        </p>
        ${this.openedDomains.includes('customization') ? html`
          <div class="checkbox-group">
            ${Object.keys(this.entityConfig)
              .filter(domain => domain !== 'cover' && domain !== 'binary_sensor')
              .map(domain => html`
                <div class="domain-container">
                  <div @click=${(e) => { e.stopPropagation(); this.toggleDetails('domain', domain); }} class="domain-header">

                    ${this.hass.localize(`component.${domain}.entity_component._.name`) || domain}
                    <ha-icon class="toggle-icon" icon="${this.openedDomains.includes(domain) ? 'hass:chevron-up' : 'hass:chevron-down'}"></ha-icon>
                  </div>
                  ${this.openedDomains.includes(domain) ? html`
                    <div class="domain-settings">
                      ${renderHaForm("hideDomain", { boolean: {} }, { hideDomain: this._config.hide?.[domain] || false }, (schema) => this._computeLabel(schema, domain), (e) => this.updateVisibility(domain, null, e.detail.value.hideDomain))}
                      ${renderHaForm("domainName", { text: {} }, { domainName: this._config.names?.[domain] || '' }, this._computeLabel, (e) => this.updateNames(domain, null, e.detail.value.domainName))}
                      ${renderHaForm("icon", { icon: {} }, this._config.icons?.[domain] ? { icon: this._config.icons[domain] } : { icon: '' }, this._computeLabel, (e) => this.updateIcons(domain, null, e.detail.value.icon))}
                      ${renderHaForm("color", { ui_color: {} }, { color: this._config.colors?.[domain] || '' }, this._computeLabel, (e) => {if (e.detail.value.color !== (this._config.colors?.[domain] || '')) { this.updateColors(domain, null, e.detail.value.color);}})}
                      ${renderHaForm("sortOrder", { number: {} }, { sortOrder: this._config.newSortOrder?.[domain] !== undefined ? this._config.newSortOrder?.[domain] : this.entityConfig[domain]?.sortOrder || 0 }, this._computeLabel, (e) => { const newValue = Number(e.detail.value.sortOrder); this.newSortOrder = newValue; this.updateSortOrder(domain, null, newValue); })}
                    </div>
                  ` : ''}
                </div>
              `)}
          </div>
        ` : ''}
  
        ${['cover', 'binary_sensor'].map(domain => html`
          <p @click=${() => this.toggleDetails('deviceClass', domain)} class="toggle-header">
            ${translateState(`edit_${domain}_dc`, this.hass.language)}
            <ha-icon icon="${this.openedDeviceClasses.some(key => key.startsWith(`${domain}-`)) ? 'hass:chevron-up' : 'hass:chevron-down'}"></ha-icon>
          </p>
          ${this.openedDeviceClasses.some(key => key.startsWith(`${domain}-`)) ? html`
            <div class="checkbox-group">
              ${this.entityConfig[domain].deviceClasses.map(deviceClass => html`
                <div class="domain-container">
                  <div @click=${() => this.toggleDetails('deviceClass', domain, deviceClass.name)} class="domain-header">
                    ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass.name}`)}
                    <ha-icon class="toggle-icon" icon="${this.openedDeviceClasses.includes(`${domain}-${deviceClass.name}`) ? 'hass:chevron-up' : 'hass:chevron-down'}"></ha-icon>
                  </div>
                  ${this.openedDeviceClasses.includes(`${domain}-${deviceClass.name}`) ? html`
                    <div class="domain-settings">
                      ${renderHaForm(`hide_${domain}_DeviceClass`, { boolean: {} }, { [`hide_${domain}_DeviceClass`]: this._config.hide?.[domain]?.[deviceClass.name] || false }, (schema) => this._computeLabel(schema, domain, deviceClass.name), (e) => this.updateVisibility(domain, deviceClass.name, e.detail.value[`hide_${domain}_DeviceClass`]))}
                      ${renderHaForm("deviceClassName", { text: {} }, { deviceClassName: this._config.names?.[domain]?.[deviceClass.name] || '' }, this._computeLabel, (e) => this.updateNames(domain, deviceClass.name, e.detail.value.deviceClassName))}
                      ${renderHaForm("icon", { icon: {} }, this._config.icons?.[domain]?.[deviceClass.name] ? { icon: this._config.icons[domain][deviceClass.name] } : { icon: '' }, this._computeLabel, (e) => this.updateIcons(domain, deviceClass.name, e.detail.value.icon))}
                      ${renderHaForm("color", { ui_color: {} }, { color: this._config.colors?.[domain]?.[deviceClass.name] || '' }, this._computeLabel, (e) => {if (e.detail.value.color !== (this._config.colors?.[domain]?.[deviceClass.name] || '')) { this.updateColors(domain, deviceClass.name, e.detail.value.color);}})}   
                      ${renderHaForm("sortOrder", { number: {} }, { sortOrder: (this._config.newSortOrder?.[domain]?.[deviceClass.name] !== undefined) ? this._config.newSortOrder[domain][deviceClass.name] : deviceClass.sortOrder || 0 }, this._computeLabel, (e) => this.updateSortOrder(domain, deviceClass.name, Number(e.detail.value.sortOrder)))}
                    </div>
                  ` : ''}
                </div>
              `)}
            </div>
          ` : ''}
        `)}

        <div class=extra-entities>  
          <h3>Extra ${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")}</h3>   
          <ha-icon-button @click=${() => this.manageExtraEntity('add')}>
            <ha-icon class="extra-entitities-icon" icon="mdi:plus"></ha-icon>
          </ha-icon-button>
        </div>

        ${this._config.extra_entities.map((entity, index) => {
          const deviceClassName = entity.entity; 
          return html`
            <div class="extra-entity-input">
              ${renderHaForm("entity", { entity: {} }, { entity: entity.entity }, this._computeLabel, (e) => this.manageExtraEntity('update', index, 'entity', e.detail.value.entity))}
              ${renderHaForm("status", { text: {} }, { status: entity.status }, this._computeLabel, (e) => this.manageExtraEntity('update', index, 'status', e.detail.value.status))}
            </div>
            <div class="extra-entity-input-down">
              ${renderHaForm("icon", { icon: {} }, { icon: entity.icon || '' }, this._computeLabel, (e) => this.manageExtraEntity('update', index, 'icon', e.detail.value.icon))}
              ${renderHaForm("color", { ui_color: {} }, { color: entity.color || '' }, this._computeLabel, (e) => this.manageExtraEntity('update', index, 'color', e.detail.value.color))}
              ${renderHaForm("sortOrder", { number: {} }, { sortOrder: (this._config.newSortOrder?.['extra']?.[deviceClassName] !== undefined) ? this._config.newSortOrder['extra'][deviceClassName] :  '' }, this._computeLabel, (e) => this.updateSortOrder('extra', deviceClassName, Number(e.detail.value.sortOrder)))}
              <ha-icon-button
                class="remove-button"
                icon="mdi:minus"
                @click=${() => { this.manageExtraEntity('remove', index); this.updateSortOrder('extra', deviceClassName, '');}}>
                <ha-icon icon="mdi:minus"></ha-icon>
              </ha-icon-button>
            </div>
          `;
      })}
      

        <div>
          <h3>${this.hass.localize("ui.panel.lovelace.editor.entities.remove")}</h3>
          <div class="entity-picker-container">
            ${renderHaForm("entity", { entity: {} }, { entity: null }, this._computeLabel, (e) => {
              this.manageHiddenEntity(e.detail.value.entity, 'add');
            })}
          </div>
        </div>
  
        ${this._config.hidden_entities && this._config.hidden_entities.length > 0 ? html`
          <h3>${this.hass.localize("ui.dialogs.entity_registry.editor.disabled_label")}:</h3>
          <ul>
            ${this._config.hidden_entities
              .slice()
              .sort((a, b) => a.localeCompare(b))
              .slice(0, this.showMore ? this._config.hidden_entities.length : 5)
              .map(entity => html`
                <li class="hidden-entity">
                  <span>${entity}</span>
                  <mwc-button @click=${() => this.manageHiddenEntity(entity, 'remove')}>${this.hass.localize("ui.common.remove")}</mwc-button>
                </li>
              `)}
            ${this._config.hidden_entities.length > 5 && !this.showMore ? html`
              <li class="hidden-entity">
                <mwc-button @click=${() => this.showMoreHiddenEntities()}>${this.hass.localize("ui.dialogs.more_info_control.show_more")}</mwc-button>
              </li>
            ` : ''}
          </ul>
        ` : ''}
      </div>
    `;    
  }
  
  static get styles() {
    return css`  
      .toggle-header, .domain-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--expansion-panel-summary-padding, 0 8px);
        border: 1px solid var(--divider-color); 
        border-radius: 4px; 
        cursor: pointer; 
        background-color: var(--paper-card-background-color); 
        font-weight: 500;
        margin-bottom: 5px;
        min-height: 48px;
      }     
      ha-card { padding: 16px; }
      h3 { margin: 0; padding: 8px 0; display: flex; align-items: center; }
      ha-icon { margin-right: 8px; }
      .domain-header { margin: 0 3px 5px 3px; min-height: 36px; }
      .person-entity, .hidden-entity { display: flex; align-items: center; } 
      .hidden-entity { justify-content: space-between; }
      .hidden-entity span { max-width: calc(100% - 120px); word-wrap: break-word; }
      .checkbox-group { display: flex; flex-wrap: wrap; margin-bottom: 16px; }
      .checkbox-group label { display: flex; align-items: center; margin-bottom: 8px; cursor: pointer; flex-wrap: wrap; }
      .domain-settings { margin-left: 20px; padding: 10px 0; }       
      .domain-container { flex: 1 1 calc(50% - 16px); box-sizing: border-box; }
      .entity-picker-container mwc-button { align-self: flex-end; margin-top: 8px; }
      .row { display: flex; gap: 10px; align-items: center; }
      .entity-picker { flex: 7; }
      .status-text { flex: 3; }
      .extra-entities { display: flex; justify-content: space-between; align-items: center; }
      .extra-entity-input, .extra-entity-input-down { display: flex; gap: 10px; margin-bottom: 5px; }
      .extra-entity-input > * { flex: 4; }
      .extra-entity-input-down > ha-form:nth-of-type(1), .extra-entity-input-down > ha-form:nth-of-type(2) { flex: 4; min-width: 0; }
      .extra-entity-input-down > ha-form:nth-of-type(3) { flex: 2; }
      .toggle { display: flex; gap: 20px; padding: 0 10px; }
      .toggle > ha-form { flex: 1; }
      .domain-group { margin-bottom: 16px; cursor: pointer; }
      .entity-picker-container { display: flex; flex-direction: column; align-items: flex-end; }
      .entity-picker-container ha-form { width: 100%; }
      .toggle-icon { margin-left: auto; }
    `;
  }
}

customElements.define('status-card-editor', StatusCardEditor);

console.info(
  `%c STATUS-CARD %c ${packageJson.version} `,
  'color: steelblue; background: black; font-weight: bold;',
  'color: white ; background: dimgray; font-weight: bold;'
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "status-card",
  name: "Status Card",
  preview: true, 
  description: "A custom card that displays active entities grouped by domain.", 
  documentationURL: "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card", 
});