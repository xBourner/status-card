import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { computeLabelCallback } from "./translations";
import { sortOrder, ALLOWED_DOMAINS, deviceClasses } from './properties';
import memoizeOne from "memoize-one";

interface CardConfig {
  extra_entities?: ExtraEntity[];
  [property: string]: {
    [domain: string]: {
      [deviceClassName: string]: any;
    } | any;
  } | any;
  }

  interface Schema {
    name: string;
    selector?: any;
    required?: boolean;
    default?: any;
    type?: string;
  }
  
  interface ExtraEntity {
    entity: string;
    status?: string;
    icon?: string;
    color?: string;
  }
    

@customElement("status-card-editor")
export class StatusCardEditor extends LitElement {

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public config!: CardConfig;
  @state() private showMore: boolean = false;   
  @state() private hide_type: string = ''; 
  @state() private openedDomains: string[] = []; 
  @state() private openedDeviceClasses: string[] = [];
  @state() private labelFilter?: boolean;

  private computeLabel = memoizeOne ((schema: Schema, domain?: string, deviceClass?: string): string => {
    return computeLabelCallback(this.hass, schema, domain, deviceClass);
  });

  setConfig(config: CardConfig) {
    this.config = {
      ...config,
      sortOrder: config.sortOrder
    };
  }

  configChanged(newConfig: Partial<CardConfig>): void {
    const event = new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: newConfig },
    });
    this.dispatchEvent(event);
  }

  private renderHaForm(
    name: string,
    selector: Record<string, any>,
    data: Record<string, any>,
    computeLabel: (schema: any) => string,
    onChange: (event: CustomEvent<{ value: any }>) => void
  ): TemplateResult {
    const originalData = { ...data };
    const onDataChange = (event: CustomEvent<{ value: any }>) => {
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
        @value-changed=${onDataChange}
      ></ha-form>
    `;
  }
  
  private toggleSetting(type: keyof CardConfig, value: boolean): void {
    const updatedConfig = { ...this.config, [type]: value };
    this.config = updatedConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
      })
    );
  }
  
  private renderSettings(): TemplateResult {
    return html`
      <div class="settings">
        <div class="sub">
          ${this.renderHaForm(
            "showPerson",
            { boolean: {} },
            { showPerson: this.config.showPerson ?? true },
             this.computeLabel.bind(this),
            (e) => this.toggleSetting("showPerson", e.detail.value.showPerson)
          )}
        </div>
        <div class="sub">
          ${this.renderHaForm(
            "showPersonName",
            { boolean: {} },
            { showPersonName: this.config.showPersonName ?? true },
            this.computeLabel.bind(this),
            (e) => this.toggleSetting("showPersonName", e.detail.value.showPersonName)
          )}
        </div>
      </div>
      <div class="settings">
        <div class="sub">
          ${this.renderHaForm(
            "bulkMode",
            { boolean: {} },
            { bulkMode: this.config.bulkMode ?? false },
            this.computeLabel.bind(this),
            (e) => this.toggleSetting("bulkMode", e.detail.value.bulkMode)
          )}
        </div>
        <div class="sub">
          ${this.renderHaForm(
            "showBadgeName",
            { boolean: {} },
            { showBadgeName: this.config.showBadgeName ?? true },
            this.computeLabel.bind(this),
            (e) => this.toggleSetting("showBadgeName", e.detail.value.showBadgeName)
          )}
        </div>
      </div>
          ${this.renderHaForm(
            "moreInfoColumns",
            { number: { min: 1, max: 4, mode: "box"} },
            { moreInfoColumns: this.config.moreInfoColumns || 4 },
             this.computeLabel.bind(this),
            (e) => this.toggleSetting("moreInfoColumns", e.detail.value.moreInfoColumns)
          )}      
    `;
  }

  updateAreaFloorSelection(type: "area" | "floor", value: string): void {
    this.config = {
      ...this.config,
      area_filter: {
        [type]: value || "",
        ...(type === "area" ? { floor: undefined } : { area: undefined }),
      },
    };
    this.configChanged(this.config);
  }
  
  
  updateLabelSelection(value: string): void {
    this.config = {
      ...this.config,
      label_filter: value || "",
    };
    this.configChanged(this.config);
  }

  private renderFilters(): TemplateResult {
    const areaFloorOptions = [
      { label: this.computeLabel.bind(this)({ name: "area" }), value: "area" },
      { label: this.computeLabel.bind(this)({ name: "floor" }), value: "floor" },
    ];
  
    const selectedAreaFloor = this.config.area_filter ? Object.keys(this.config.area_filter)[0] : "";
  
    return html`
      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          ${this.computeLabel.bind(this)({ name: "edit_filters" })}
        </div>
        <div class="settings">
          <div class="flex">
            ${this.renderHaForm(
              "areaFloorFilter",
              { select: { options: areaFloorOptions } },
              { areaFloorFilter: selectedAreaFloor },
              this.computeLabel.bind(this),
              (e: CustomEvent<{ value: { areaFloorFilter: string } }>) =>
                this.updateAreaFloorSelection(e.detail.value.areaFloorFilter as "area" | "floor", "")
            )}
          </div>
          <div class="flex">
            ${this.renderHaForm(
              "labelFilter",
              { boolean: {} },
              { labelFilter: (this.labelFilter || this.config.label_filter) ?? false },
              this.computeLabel.bind(this),
              (e: CustomEvent<{ value: { labelFilter: boolean } }>) => {
                this.labelFilter = e.detail.value.labelFilter;
                this.requestUpdate();
              }
            )}
          </div>
        </div>
        <div class="filter">
          ${selectedAreaFloor === "area"
            ? this.renderHaForm(
                "area",
                { area: {} },
                { area: this.config.area_filter?.area || "" },
                this.computeLabel.bind(this),
                (e: CustomEvent<{ value: { area: string } }>) =>
                  this.updateAreaFloorSelection("area", e.detail.value.area)
              )
            : ""}
          ${selectedAreaFloor === "floor"
            ? this.renderHaForm(
                "floor",
                { floor: {} },
                { floor: this.config.area_filter?.floor || "" },
                this.computeLabel.bind(this),
                (e: CustomEvent<{ value: { floor: string } }>) =>
                  this.updateAreaFloorSelection("floor", e.detail.value.floor)
              )
            : ""}
        </div>
        <div class="filter">
          ${(this.labelFilter || this.config.label_filter)
            ? this.renderHaForm(
                "label",
                { label: {} },
                { label: this.config.label_filter || "" },
                this.computeLabel.bind(this),
                (e: CustomEvent<{ value: { label: string } }>) =>
                  this.updateLabelSelection(e.detail.value.label)
              )
            : ""}
        </div>
      </ha-expansion-panel>
    `;
  }

  public updateConfig(property: string, domain: string, deviceClassName: string | null, value: any): void {
    const updatedConfig = { ...this.config }; 
    updatedConfig[property] = { ...this.config[property] }; 
    updatedConfig[property][domain] = { ...this.config[property]?.[domain] }; 
  
    if (deviceClassName) {
      updatedConfig[property][domain][deviceClassName] = value; 
    } else {
      updatedConfig[property][domain] = value; 
    }
  
    this.configChanged(updatedConfig); 
  }

  public updateSortOrder(domain: string, deviceClassName: string | null, newSortOrder: number): void {
    this.updateConfig('newSortOrder', domain, deviceClassName, newSortOrder);
  }

  public updateIcons(domain: string, deviceClassName: string | null, icon: string): void {
    this.updateConfig('icons', domain, deviceClassName, icon);
  }

  public updateNames(domain: string, deviceClassName: string | null, name: string): void {
    this.updateConfig('names', domain, deviceClassName, name);
  }
  public updateColors(domain: string, deviceClassName: string | null, color: string): void {
    this.updateConfig('colors', domain, deviceClassName, color);
  }

  public updateVisibility(domain: string, deviceClassName: string | null, visible: boolean): void {
    this.updateConfig('hide', domain, deviceClassName, visible);
  }

  public updateOnOff(domain: string, deviceClassName: string | null, invert: boolean): void {
    this.updateConfig('invert', domain, deviceClassName, invert);
  }

  public renderDomainConfig(): TemplateResult {
    return html`
      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          ${this.computeLabel.bind(this)({ name: "edit_domains" })}
        </div>
        <div class="content">
          ${ALLOWED_DOMAINS
            .filter(domain => !['cover', 'binary_sensor'].includes(domain))
            .map(domain => html`
              <ha-expansion-panel
                outlined
                ?expanded="${this.openedDomains.includes(domain)}"
                class="child"
              >
                <div slot="header" role="heading" aria-level="3">
                  ${this.computeLabel.bind(this)({ name: domain }) || domain}
                </div>
                <div class="sub-content">
                  ${this.renderHaForm(
                    "hideDomain",
                    { boolean: {} },
                    { hideDomain: this.config.hide?.[domain] || false },
                    schema => this.computeLabel.bind(this)(schema, domain),
                    e => this.updateVisibility(domain, null, e.detail.value.hideDomain)
                  )}
                  ${this.renderHaForm(
                    "invertDomain",
                    { boolean: {} },
                    { invertDomain: this.config.invert?.[domain] || false },
                    schema => this.computeLabel.bind(this)(schema, domain),
                    e => this.updateOnOff(domain, null, e.detail.value.invertDomain)
                  )}                    
                  ${this.renderHaForm(
                    "domainName",
                    { text: {} },
                    { domainName: this.config.names?.[domain] || '' },
                    this.computeLabel.bind(this),
                    e => this.updateNames(domain, null, e.detail.value.domainName)
                  )}
                  ${this.renderHaForm(
                    "icon",
                    { icon: {} },
                    { icon: this.config.icons?.[domain] || '' },
                    this.computeLabel.bind(this),
                    e => this.updateIcons(domain, null, e.detail.value.icon)
                  )}
                  ${this.renderHaForm(
                    "color",
                    { ui_color: { default_color: "state", include_state: true } },
                    { color: this.config.colors?.[domain] },
                    this.computeLabel.bind(this),
                    e => this.updateColors(domain, null, e.detail.value.color)
                  )}
                  ${this.renderHaForm(
                    "sortOrder",
                    { number: {} },
                    { sortOrder: this.config.newSortOrder?.[domain] ?? sortOrder[domain] ?? 0 },
                    this.computeLabel.bind(this),
                    (e) => this.updateSortOrder(domain, null, Number(e.detail.value.sortOrder))
                  )}

                </div>
              </ha-expansion-panel>
            `)}
        </div>
      </ha-expansion-panel>
    `;
  }
  


  public renderDeviceClassConfig(): TemplateResult {
    return html`
      ${['cover', 'binary_sensor'].map(domain => html`
        <ha-expansion-panel outlined class="main">
          <div slot="header" role="heading" aria-level="3">
            ${this.computeLabel.bind(this)({ name: `edit_${domain}_dc` })}
          </div>
          <div class="content">
            ${deviceClasses[domain].map(deviceClass => html`
              <ha-expansion-panel outlined ?expanded="${this.openedDeviceClasses.includes(`${domain}-${deviceClass}`)}" class="child">
                <div slot="header" role="heading" aria-level="3">
                  ${this.computeLabel.bind(this)({ name: deviceClass }) || deviceClass}
                </div>
                <div class="sub-content">
                  ${this.renderHaForm(
                    `hide_${domain}_DeviceClass`,
                    { boolean: {} },
                    { [`hide_${domain}_DeviceClass`]: this.config.hide?.[domain]?.[deviceClass] || false },
                    (schema) => this.computeLabel.bind(this)(schema, domain, deviceClass),
                    (e) => this.updateVisibility(domain, deviceClass, e.detail.value[`hide_${domain}_DeviceClass`])
                  )}
                  ${this.renderHaForm(
                    `invert_${domain}_DeviceClass`,
                    { boolean: {} },
                    { [`invert_${domain}_DeviceClass`]: this.config.invert?.[domain]?.[deviceClass] || false },
                    schema => this.computeLabel.bind(this)(schema, domain, deviceClass),
                    e => this.updateOnOff(domain, deviceClass, e.detail.value[`invert_${domain}_DeviceClass`])
                  )}                      
                  ${this.renderHaForm(
                    "deviceClassName",
                    { text: {} },
                    { deviceClassName: this.config.names?.[domain]?.[deviceClass] || '' },
                    this.computeLabel.bind(this),
                    (e) => this.updateNames(domain, deviceClass, e.detail.value.deviceClassName)
                  )}
                  ${this.renderHaForm(
                    "icon",
                    { icon: {} },
                    { icon: this.config.icons?.[domain]?.[deviceClass] || '' },
                    this.computeLabel.bind(this),
                    (e) => this.updateIcons(domain, deviceClass, e.detail.value.icon)
                  )}
                  ${this.renderHaForm(
                    "color",
                    { ui_color: { default_color: "state", include_state: true,} },
                    { color: this.config.colors?.[domain]?.[deviceClass] },
                    this.computeLabel.bind(this),
                    (e) => this.updateColors(domain, deviceClass, e.detail.value.color)
                  )}                
                  ${this.renderHaForm(
                    "sortOrder",
                    { number: {} },
                    { sortOrder: this.config.newSortOrder?.[domain]?.[deviceClass] ?? 
                                sortOrder[domain]?.deviceClasses?.[deviceClass] ?? 0 },
                    this.computeLabel.bind(this),
                    (e) => this.updateSortOrder(domain, deviceClass, Number(e.detail.value.sortOrder))
                  )}
                </div>
              </ha-expansion-panel>
            `)}
          </div>
        </ha-expansion-panel>
      `)}
    `;
  }

  manageExtraEntity(
    action: "add" | "update" | "remove",
    index: number | null = null,
    field: keyof ExtraEntity | null = null,
    value: string | number | null = null
  ): void {
    const updatedConfig = { ...this.config };
    updatedConfig.extra_entities = updatedConfig.extra_entities
      ? updatedConfig.extra_entities.map((entity) => ({ ...entity }))
      : [];
    
    if (action === "add") {
      updatedConfig.extra_entities.push({ entity: "", status: "", icon: "", color: "" });
    } else if (action === "update" && index !== null && field !== null) {
      const updatedEntity = { ...updatedConfig.extra_entities[index] };
      
      if (typeof updatedEntity[field] === 'string' && value !== null) {
        updatedEntity[field] = value as string; 
      }
      
      updatedConfig.extra_entities[index] = updatedEntity;
    } else if (action === "remove" && index !== null) {
      updatedConfig.extra_entities.splice(index, 1);
    }
    
    this.configChanged(updatedConfig);
    this.requestUpdate();
  }

  renderExtraEntities(): TemplateResult {
    const extraEntities = this.config.extra_entities || [];
    return html`
      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          ${this.computeLabel.bind(this)({ name: "extra_entities" })}
        </div>
        <div class="content">
          ${extraEntities.map((entity: ExtraEntity, index: number) => html`
            <div class="extra-entity">
              <div class="extra-entity-top">
                <div class="extra-entity-entity">
                  ${this.renderHaForm(
                    "entity",
                    { entity: {} },
                    { entity: entity.entity  || "" },
                    this.computeLabel.bind(this),
                    (e: CustomEvent<{ value: { entity: string } }>) =>
                      this.manageExtraEntity("update", index, "entity", e.detail.value.entity  || "")
                  )}
                </div>
                <div class="extra-entity-remove">
                  <ha-icon-button
                    class="remove-icon"
                    @click=${() => {
                      this.manageExtraEntity("remove", index);
                    }}
                  >
                    <ha-icon class="center" icon="mdi:delete"></ha-icon>
                  </ha-icon-button>
                </div>
              </div>
              <div class="extra-entity-bottom">
                <div class="extra-entity-status">
                  ${this.renderHaForm(
                    "status",
                    { state: { entity_id: entity.entity || "" } },
                    { status: entity.status || "" },
                    this.computeLabel.bind(this),
                    (e: CustomEvent<{ value: { status: string } }>) =>
                      this.manageExtraEntity("update", index, "status", e.detail.value.status || "" )
                  )}                   
                </div>
                <div class="extra-entity-sort">


                    ${this.renderHaForm("sortOrder", { number: {} }, 
                    { sortOrder: this.config.newSortOrder?.['extra']?.[entity.entity] ?? '' }, this.computeLabel.bind(this), 
                    (e) => this.updateSortOrder('extra', entity.entity, Number(e.detail.value.sortOrder)))}
                </div>
              </div>
              <div class="extra-entity-bottom">
                <div class="extra-entity-icon">
                  ${this.renderHaForm(
                    "icon",
                    { icon: {} },
                    { icon: entity.icon || "" },
                    this.computeLabel.bind(this),
                    (e: CustomEvent<{ value: { icon: string } }>) =>
                      this.manageExtraEntity("update", index, "icon", e.detail.value.icon)
                  )}
                </div>
                <div class="extra-entity-color">
                  ${this.renderHaForm(
                    "color",
                    { ui_color: { default_color: "state", include_state: true,} },
                    { color: entity.color || "" },
                    this.computeLabel.bind(this),
                    (e: CustomEvent<{ value: { color: string } }>) =>
                      this.manageExtraEntity("update", index, "color", e.detail.value.color)
                  )}
                </div>
              </div>
            </div>
          `)}
          <ha-button slot="trigger" outlined @click=${() => this.manageExtraEntity("add")}>
            <ha-icon class="button-icon" icon="mdi:plus"></ha-icon>
            <span class="button-text">${this.computeLabel.bind(this)({ name: "add" })}</span>
          </ha-button>
        </div>
      </ha-expansion-panel>
    `;
  }
  
  private showMoreHiddenItems(): void {
    this.showMore = !this.showMore;
  }

  manageHiddenItem(type: "hidden_entities" | "hidden_labels", item: string, action: "add" | "remove"): void {
    const validTypes: ("hidden_entities" | "hidden_labels")[] = ["hidden_entities", "hidden_labels"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}. Expected one of ${validTypes.join(", ")}`);
    }
  
    const updatedConfig = { ...this.config };
    updatedConfig[type] = updatedConfig[type] ? [...updatedConfig[type]] : [];
  
    const list: string[] = updatedConfig[type];
  
    const cleanedItem = typeof item === "string" ? item.trim() : item;
    if (!cleanedItem || cleanedItem === "") {
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

  renderHiddenEntities(): TemplateResult {
    const hiddenEntities: string[] = (this.config.hidden_entities || []).slice().sort();
    const hiddenLabels: string[] = (this.config.hidden_labels || []).slice().sort();
    const combinedItems = [
      ...hiddenEntities.map(entity => ({ type: "entity", value: entity })),
      ...hiddenLabels.map(label => ({ type: "label", value: label }))
    ];  
    const showAll = this.showMore || combinedItems.length <= 5;
    const itemsToShow = showAll ? combinedItems : combinedItems.slice(0, 5);
    const entityLabelOptions = [
      { label: this.computeLabel.bind(this)({ name: "entity" }), value: 'entity' },
      { label: this.computeLabel.bind(this)({ name: "label" }), value: 'label' }
    ];
    const selectedEntityLabel = this.hide_type;
  
    return html`
      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          ${this.computeLabel.bind(this)({ name: "remove" })}
        </div>
        <div class="entity-label-picker">
          ${this.renderHaForm("entityLabelFilter", { select: { options: entityLabelOptions } }, 
            { entityLabelFilter: selectedEntityLabel },
            this.computeLabel.bind(this), 
            (e) => {
              this.hide_type = e.detail.value.entityLabelFilter; 
              this.requestUpdate(); 
            })}
        </div>
        <div class="entity-label-form">
          ${selectedEntityLabel === 'entity' ? this.renderHaForm("entity", { entity: {} }, { entity: null }, this.computeLabel.bind(this), 
            (e) => this.manageHiddenItem("hidden_entities", e.detail.value.entity, "add")) : ''}
          ${selectedEntityLabel === 'label' ? this.renderHaForm("label", { label: {} }, { label: null }, this.computeLabel.bind(this), 
            (e) => this.manageHiddenItem("hidden_labels", e.detail.value.label, "add")) : ''}
        </div>
        ${(combinedItems.length > 0) ? html`
          <h3> ${this.computeLabel.bind(this)({ name: "disabled" })}:</h3>
          <ul>
            ${itemsToShow.map(item => html`
              <li class="hidden-entity">
                <span>
                  ${item.type === "entity"
                    ? `${this.computeLabel.bind(this)({ name: "entity" })}: ${item.value}` 
                    : `${this.computeLabel.bind(this)({ name: "label" })}: ${item.value.charAt(0).toUpperCase() + item.value.slice(1)}`}
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
                  ${this.computeLabel.bind(this)({ name: "show_more" })}
                </mwc-button>
              </li>
            ` : ''}
          </ul>
        ` : ''}
      </ha-expansion-panel>
    `;
  }
  
  
  render() {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }
  
    return html`
    ${this.renderSettings()}
    ${this.renderFilters() }
    <ha-expansion-panel outlined class="main">
      <div slot="header" role="heading" aria-level="3"> ${this.computeLabel.bind(this)({ name: "edit_domains_dc" })}  </div>
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
          .handle {
      margin-right: 8px;
    }
    .feature-content {
      flex-grow: 1;
    }
    .sortable-item {
      display: flex;
      align-items: center;
      padding: 8px;
      margin: 4px 0;
      background: var(--paper-card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      cursor: move;
    }

    `;
  }

}
