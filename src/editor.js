import { LitElement, html, css } from 'lit-element';
import { translateState } from './translations.js';
import { initializeEntityConfig } from './entity-config.js';

class StatusCardEditor extends LitElement {
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
      this.entityConfig = initializeEntityConfig();
      this.config = {
        extra_entities: [],
        hidden_entities: [],
      };
    }
  
  
    setConfig(config) {
      this.config = config;
      if (!config.extra_entities) delete this.config.extra_entities;
      if (!config.hidden_entities) delete this.config.hidden_entities;
      this.entityConfig = initializeEntityConfig();
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
      showPerson: (hass) => translateState("show_person", hass.language),
      showPersonName: (hass) => `${hass.localize("component.person.entity_component._.name")} ${hass.localize("ui.panel.lovelace.editor.card.generic.show_name")}`,
      showBadgeName: (hass) => `${hass.localize("ui.panel.lovelace.editor.cardpicker.domain")} ${hass.localize("ui.panel.lovelace.editor.card.generic.show_name")}`,
      bulkMode: (hass) => translateState("bulk_mode", hass.language),
      hideDomain: (hass, domain) =>
        `${hass.localize(`component.${domain}.entity_component._.name`)} ${hass.localize("ui.common.disable")}`,
      hide_cover_DeviceClass: (hass, domain, deviceClass) =>
        `${hass.localize(`ui.dialogs.entity_registry.editor.device_classes.cover.${deviceClass}`)} ${hass.localize("ui.common.disable")}`,
      hide_binary_sensor_DeviceClass: (hass, domain, deviceClass) =>
        `${hass.localize(`ui.dialogs.entity_registry.editor.device_classes.binary_sensor.${deviceClass}`)} ${hass.localize("ui.common.disable")}`,
      domainName: (hass) => hass.localize("ui.panel.lovelace.editor.cardpicker.domain"),
      deviceClassName: () => "Device Class",
      sortOrder: () => "Sort Order",
      area: (hass) => hass.localize("ui.components.selectors.selector.types.area"),
      floor: (hass) => hass.localize("ui.components.selectors.selector.types.floor"),
      areaFloorFilter: (hass) =>
        `${hass.localize("ui.components.selectors.selector.types.area")} / ${hass.localize("ui.components.selectors.selector.types.floor")} Filter`,
    };
  
  
    _computeLabel(schema, domain, deviceClass) {
      const labelGenerator = StatusCardEditor.labelMap[schema.name];
      return labelGenerator ? labelGenerator(this.hass, domain, deviceClass) : "";
    }
    
    toggleSetting(type, checked) {
      if (['showPerson', 'bulkMode', 'showPersonName', 'showBadgeName'].includes(type)) {
          this.config[type] = checked; 
          this.configChanged(this.config);
      }
    }
  
    showMoreHiddenEntities() {
      this.showMore = true;
      this.requestUpdate(); 
    }
  
  
    updateConfig(property, domain, deviceClassName, value) {
      this.config[property] = this.config[property] || {};
      this.config[property][domain] = this.config[property][domain] || {};
      
      deviceClassName ? 
        (this.config[property][domain][deviceClassName] = value) : 
        (this.config[property][domain] = value);
    
      this.configChanged(this.config);
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
      this.config.extra_entities = this.config.extra_entities || [];
  
      if (action === 'add') {
          this.config.extra_entities.push({ entity: '', status: '', icon: '', color: '' });
      } else if (action === 'update' && index !== null && field !== null) {
          this.config.extra_entities[index][field] = value;
      } else if (action === 'remove' && index !== null) {
          this.config.extra_entities.splice(index, 1);
      }
  
      this.configChanged(this.config);
    }
  
  
    manageHiddenEntity(entity, action) {
      const hiddenEntities = this.config.hidden_entities || [];
    
      if (action === 'add' && !hiddenEntities.includes(entity)) {
        hiddenEntities.push(entity);
      } else if (action === 'remove') {
        hiddenEntities.splice(hiddenEntities.indexOf(entity), 1);
      }
    
      this.config = {
        ...this.config,
        hidden_entities: hiddenEntities,
      };
    
      this.configChanged(this.config);
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
    const areaFloorOptions = [
      { label: this.hass.localize("ui.components.selectors.selector.types.area"), value: 'area' },
      { label: this.hass.localize("ui.components.selectors.selector.types.floor"), value: 'floor' }
    ];
  
    const selectedAreaFloor = this.config.area_filter ? Object.keys(this.config.area_filter)[0] : '';
  
    return html`
    <div class="settings">
      <div class="top-row">
        <div class="area-floor-picker">
          ${this.renderHaForm("areaFloorFilter", { select: { options: areaFloorOptions } }, 
            { areaFloorFilter: selectedAreaFloor },
            this._computeLabel, (e) => this.updateAreaFloorSelection(e.detail.value.areaFloorFilter, ''))}
        </div>
        <div class="toggle">
          ${this.renderHaForm("showPerson", { boolean: {} }, { showPerson: this.config.showPerson ?? true }, this._computeLabel, 
            (e) => this.toggleSetting('showPerson', e.detail.value.showPerson))}
            <div class="sub">
          ${this.renderHaForm("showPersonName", { boolean: {} }, { showPersonName: this.config.showPersonName ?? true }, this._computeLabel, 
            (e) => this.toggleSetting('showPersonName', e.detail.value.showPersonName))}
            </div>
            <div class="sub">
          ${this.renderHaForm("showBadgeName", { boolean: {} }, { showBadgeName: this.config.showBadgeName ?? true }, this._computeLabel, 
            (e) => this.toggleSetting('showBadgeName', e.detail.value.showBadgeName))}
            </div>            
            <div class="sub">
          ${this.renderHaForm("bulkMode", { boolean: {} }, { bulkMode: this.config.bulkMode ?? false }, this._computeLabel, 
            (e) => this.toggleSetting('bulkMode', e.detail.value.bulkMode))}
            </div>
        </div>
      </div>
      <div class="area-floor-form">
        ${selectedAreaFloor === 'area' ? this.renderHaForm("area", { area: {} }, 
          { area: this.config.area_filter.area || '' }, this._computeLabel, 
          (e) => this.updateAreaFloorSelection('area', e.detail.value.area)) : ''}
        ${selectedAreaFloor === 'floor' ? this.renderHaForm("floor", { floor: {} }, 
          { floor: this.config.area_filter.floor || '' }, this._computeLabel, 
          (e) => this.updateAreaFloorSelection('floor', e.detail.value.floor)) : ''}
      </div>
    </div>
  `;
}
  
  
  renderDomainConfig() {
    return html`
      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">${translateState('edit_domains', this.hass.language)}</div>
        <div class="content flexbox">
          ${Object.keys(this.entityConfig)
            .filter(domain => !['cover', 'binary_sensor'].includes(domain))
            .map(domain => html`
              <ha-expansion-panel outlined ?expanded="${this.openedDomains.includes(domain)}" class="child">
                <div slot="header" role="heading" aria-level="3">
                  ${this.hass.localize(`component.${domain}.entity_component._.name`) || domain}
                </div>
                <div class="content" style="padding: 10px 5px;">
                  ${this.renderHaForm("hideDomain", { boolean: {} }, { hideDomain: this.config.hide?.[domain] || false }, 
                    (schema) => this._computeLabel(schema, domain), 
                    (e) => this.updateVisibility(domain, null, e.detail.value.hideDomain))}
                  ${this.renderHaForm("domainName", { text: {} }, { domainName: this.config.names?.[domain] || '' }, this._computeLabel, 
                    (e) => this.updateNames(domain, null, e.detail.value.domainName))}
                  ${this.renderHaForm("icon", { icon: {} }, { icon: this.config.icons?.[domain] || '' }, this._computeLabel, 
                    (e) => this.updateIcons(domain, null, e.detail.value.icon))}
                  ${this.renderHaForm("color", { ui_color: {} }, { color: this.config.colors?.[domain] || '' }, this._computeLabel, 
                    (e) => this.updateColors(domain, null, e.detail.value.color))}
                  ${this.renderHaForm("sortOrder", { number: {} }, { sortOrder: this.config.newSortOrder?.[domain] !== undefined ? this.config.newSortOrder?.[domain] : this.entityConfig[domain]?.sortOrder || 0 }, this._computeLabel, (e) => { const newValue = Number(e.detail.value.sortOrder); this.newSortOrder = newValue; this.updateSortOrder(domain, null, newValue); })}
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
          <div slot="header" role="heading" aria-level="3">${translateState(`edit_${domain}_dc`, this.hass.language)}</div>
          <div class="content flexbox">
            ${this.entityConfig[domain].deviceClasses.map(deviceClass => html`
              <ha-expansion-panel outlined ?expanded="${this.openedDeviceClasses.includes(`${domain}-${deviceClass.name}`)}" class="child">
                <div slot="header" role="heading" aria-level="3">
                  ${this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass.name}`)}
                </div>
                <div class="content" style="padding: 10px 5px;">
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
      <div class="extra-entities">
        <h3>Extra ${this.hass.localize("ui.panel.lovelace.editor.card.entities.name")}</h3>
        <ha-icon-button @click=${() => this.manageExtraEntity('add')}>
          <ha-icon class="extra-entitities-icon" icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      ${extraEntities.map((entity, index) => html`
        <div class="extra-entity-top">
          <div class="extra-entity-entity">
            ${this.renderHaForm("entity", { entity: {} }, { entity: entity.entity }, this._computeLabel, 
              (e) => this.manageExtraEntity('update', index, 'entity', e.detail.value.entity))}
          </div>
          <div class="extra-entity-status">
            ${this.renderHaForm("status", { text: {} }, { status: entity.status }, this._computeLabel, 
              (e) => this.manageExtraEntity('update', index, 'status', e.detail.value.status))}
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
          <div class="extra-entity-sort">
            ${this.renderHaForm("sortOrder", { number: {} }, 
              { sortOrder: this.config.newSortOrder?.['extra']?.[entity.entity] ?? '' }, this._computeLabel, 
              (e) => this.updateSortOrder('extra', entity.entity, Number(e.detail.value.sortOrder)))}
          </div>
          <ha-icon-button class="remove-button" icon="mdi:minus" 
            @click=${() => { this.manageExtraEntity('remove', index); this.updateSortOrder('extra', entity.entity, '');}}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </ha-icon-button>
        </div>
      `)}
    `;
  }
  
  
  renderHiddenEntities() {
    const hiddenEntities = (this.config.hidden_entities || []).slice().sort();
    const showAll = this.showMore || hiddenEntities.length <= 5;
    const entitiesToShow = showAll ? hiddenEntities : hiddenEntities.slice(0, 5);
  
    return html`
      <div>
        <h3>${this.hass.localize("ui.panel.lovelace.editor.entities.remove")}</h3>
        <div class="entity-picker-container">
          ${this.renderHaForm("entity", { entity: {} }, { entity: null }, this._computeLabel, 
            (e) => this.manageHiddenEntity(e.detail.value.entity, 'add'))}
        </div>
        ${hiddenEntities.length ? html`
          <h3>${this.hass.localize("ui.dialogs.entity_registry.editor.disabled_label")}:</h3>
          <ul>
            ${entitiesToShow.map(entity => html`
              <li class="hidden-entity">
                <span>${entity}</span>
                <mwc-button @click=${() => this.manageHiddenEntity(entity, 'remove')}>
                  ${this.hass.localize("ui.common.remove")}
                </mwc-button>
              </li>
            `)}
            ${!showAll ? html`
              <li class="hidden-entity">
                <mwc-button @click=${() => this.showMoreHiddenEntities()}>
                  ${this.hass.localize("ui.dialogs.more_info_control.show_more")}
                </mwc-button>
              </li>
            ` : ''}
          </ul>
        ` : ''}
      </div>
    `;
  }
   
  render() {
    if (!this.config) return html`<div>Invalid Configuration</div>`;
  
    return html`
        ${this.renderSettings()}
        ${this.renderDomainConfig()}
        ${this.renderDeviceClassConfig()}
        ${this.renderExtraEntities()}
        ${this.renderHiddenEntities()}
    `;
  }
  
    
    static get styles() {
      return css`  
        h3 { margin: 0; padding: 8px 0; display: flex; align-items: center; }
        ha-icon { margin-right: 8px; }
        .main {margin-top: 5px;}
        .sub {margin-top: -15px;}
        .child {width:calc(50% - 2px); margin-top: 3px;}
        .person-entity, .hidden-entity { display: flex; align-items: center; } 
        .hidden-entity { justify-content: space-between; }
        .hidden-entity span { max-width: calc(100% - 120px); word-wrap: break-word; }
        .flexbox { display: flex; flex-wrap: wrap; margin-bottom: 16px; }    
        .entity-picker { flex: 7; }
        .status-text { flex: 3; }
        .extra-entities { display: flex; justify-content: space-between; align-items: center; }
        .extra-entity-top, .extra-entity-bottom { display: flex; gap: 10px; margin-bottom: 5px; }
        .extra-entity-entity, .extra-entity-status { flex: 4; }
        .extra-entity-color, .extra-entity-icon { flex: 4; min-width: 0; }
        .extra-entity-sort { flex: 2; }
        .area-floor-picker { margin-right: auto; flex: 4;}
        .toggle {flex: 4;}
        .top-row {display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; padding: 2px 5px;}
      `;
    }
  }
  
  
export { StatusCardEditor };