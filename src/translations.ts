import { HomeAssistant } from "custom-card-helpers";
import { ALLOWED_DOMAINS, deviceClasses } from './properties';

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;
  default?: any;
  type?: string;
}

export function translateEntityState(hass: HomeAssistant, state: string, domain: string): string {
  const localized = hass.localize(`component.${domain}.entity_component._.state.${state}`);
  return localized || state; 
}

export function computeLabelCallback(
  hass: HomeAssistant,
  schema: Schema,
  domain?: string,
  deviceClass?: string
): string {
  switch (schema.name) {
    case "header": {
      if (domain && deviceClass) {
        return `${hass.localize("ui.panel.lovelace.editor.card.entities.name")} in ${hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass}`)}`;
      } else if (domain) {
        return `${hass.localize("ui.panel.lovelace.editor.card.entities.name")} in ${hass.localize(`component.${domain}.entity_component._.name`)}`;
      }
      return hass.localize("ui.panel.lovelace.editor.card.entities.name"); 
    }     
    case "hide_person_name":
      return hass!.localize("ui.common.hide")  + " " +  hass!.localize("component.person.entity_component._.name") + " " + hass!.localize("ui.common.name") ;
    case "hide_content_name":
      return hass!.localize("ui.common.hide")  + " " + hass!.localize("ui.panel.lovelace.editor.card.markdown.content") + " " + hass!.localize("ui.common.name") ;       
    case "hide_person":
      return  hass!.localize("ui.common.hide") + " " + hass!.localize("component.person.entity_component._.name") ;       
    case "list_mode":
      return hass!.localize("ui.card.common.turn_on") + " " + hass!.localize("ui.components.media-browser.list") + " " + hass!.localize("ui.dialogs.helper_settings.input_text.mode");
    case "columns":
      return hass!.localize("ui.panel.lovelace.editor.action-editor.actions.more-info") + " " +  hass!.localize("ui.panel.lovelace.editor.card.grid.columns");  
    case "edit_filters":
      return  hass!.localize(`ui.panel.lovelace.editor.common.edit`) + " " + hass!.localize(`ui.components.subpage-data-table.filters`);
    case "area":
      return hass!.localize("ui.panel.lovelace.editor.card.area.name");
    case "floor":
      return hass!.localize("ui.components.selectors.selector.types.floor");
    case "label_filter":
      return hass!.localize("ui.components.label-picker.label") + " " + hass!.localize("ui.components.related-filter-menu.filter");
    case "label":
    case "hidden_labels":
      return hass!.localize("ui.components.label-picker.label");      
    case "entities":
      return hass!.localize("ui.panel.lovelace.editor.card.entities.name");       
    case "extra_entities":
      return "Extra" + " " + hass!.localize("ui.panel.lovelace.editor.card.entities.name");
    case "entity":
      return hass!.localize("ui.components.selectors.selector.types.entity");        
    case "hide_filter":
      return  hass!.localize("ui.common.hide")  + " " + hass!.localize("ui.panel.lovelace.editor.card.entities.name");        
    case "edit_domains_dc":
      return  hass!.localize(`ui.panel.lovelace.editor.common.edit`) + " " +  hass!.localize("ui.panel.lovelace.editor.card.markdown.content"); 
    case "icon":
      return hass!.localize("ui.components.selectors.selector.types.icon");  
    case "color":
      return hass!.localize("ui.panel.lovelace.editor.card.tile.color");    
    case "multiple_areas":
      return "Multi" + " " + hass!.localize("ui.panel.lovelace.editor.card.area.name");
    case "multiple_floors":
      return "Multi" + " " + hass!.localize("ui.components.selectors.selector.types.floor");
    case "show_total_number":
      return hass!.localize("ui.common.enable") + " " +  hass!.localize("component.sensor.entity_component._.state_attributes.state_class.state.total") + " " + hass!.localize("component.number.entity_component._.name");  
    default:
      if (ALLOWED_DOMAINS.includes(schema.name)) {
        return hass!.localize(
          `component.${schema.name}.entity_component._.name`
        ) || schema.name;
      }
      for (const [domain, classes] of Object.entries(deviceClasses)) {
        if (classes.includes(schema.name)) {
          return (
            hass!.localize(
              `ui.dialogs.entity_registry.editor.device_classes.${domain}.${schema.name}`) || schema.name);
        }
      }       
      return hass!.localize(`ui.panel.lovelace.editor.card.area.${schema.name}`);
  }
}

