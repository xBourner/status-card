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
        <div slot="header" role="heading" aria-level="3">${this.hass.localize(`ui.panel.lovelace.editor.common.edit`)} ${this.hass.localize(`ui.components.subpage-data-table.filters`)}</div>
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
        <div slot="header" role="heading" aria-level="3">${translateState('edit_domains', this.hass.language)}</div>
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
          <div slot="header" role="heading" aria-level="3">${translateState(`edit_${domain}_dc`, this.hass.language)}</div>
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
          <div slot="header" role="heading" aria-level="3">${translateState('edit_domains_dc', this.hass.language)}</div>
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
  
  
export { StatusCardEditor };