import { HomeAssistant, Schema } from "./ha";
import { ALLOWED_DOMAINS, deviceClasses } from "./helpers";

export function translateEntityState(
  hass: HomeAssistant,
  state: string,
  domain: string
): string {
  const localized = hass.localize(
    `component.${domain}.entity_component._.state.${state}`
  );
  return localized || state;
}

export function computeLabelCallback(
  hass: HomeAssistant,
  schema: Schema,
  domain?: string,
  deviceClass?: string
): string {
  if (/^key_\d+$/.test(schema.name)) {
    return (
      hass.localize("ui.components.related-filter-menu.filter") || "Filter"
    );
  }
  switch (schema.name) {
    case "header": {
      if (domain && deviceClass) {
        if (domain === "switch" && deviceClass === "switch") {
          return `${hass.localize(
            "ui.panel.lovelace.editor.card.entities.name"
          )} in ${hass.localize("component.switch.entity_component._.name")}`;
        }
        return `${hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        )} in ${hass.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass}`
        )}`;
      } else if (domain) {
        return `${hass.localize(
          "ui.panel.lovelace.editor.card.entities.name"
        )} in ${hass.localize(`component.${domain}.entity_component._.name`)}`;
      }
      return hass.localize("ui.panel.lovelace.editor.card.entities.name");
    }
    case "square":
      return hass!.localize("ui.panel.lovelace.editor.card.grid.square");
    case "hide_person_name":
      return (
        hass!.localize("ui.common.hide") +
        " " +
        hass!.localize("component.person.entity_component._.name") +
        " " +
        hass!.localize("ui.common.name")
      );
    case "hide_content_name":
      return (
        hass!.localize("ui.common.hide") +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.markdown.content") +
        " " +
        hass!.localize("ui.common.name")
      );
    case "hide_person":
      return (
        hass!.localize("ui.common.hide") +
        " " +
        hass!.localize("component.person.entity_component._.name")
      );
    case "list_mode":
      return (
        hass!.localize("ui.card.common.turn_on") +
        " " +
        hass!.localize("ui.components.media-browser.list") +
        " " +
        hass!.localize("ui.dialogs.helper_settings.input_text.mode")
      );
    case "columns":
      return (
        hass!.localize(
          "ui.panel.lovelace.editor.action-editor.actions.more-info"
        ) +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.grid.columns")
      );
    case "edit_filters":
      return (
        hass!.localize(`ui.panel.lovelace.editor.common.edit`) +
        " " +
        hass!.localize(`ui.components.subpage-data-table.filters`)
      );
    case "area":
      return hass!.localize("ui.panel.lovelace.editor.card.area.name");
    case "floor":
      return hass!.localize("ui.components.selectors.selector.types.floor");
    case "label_filter":
      return (
        hass!.localize("ui.components.label-picker.label") +
        " " +
        hass!.localize("ui.components.related-filter-menu.filter")
      );
    case "label":
    case "hidden_labels":
      return hass!.localize("ui.components.label-picker.label");
    case "entities":
      return hass!.localize("ui.panel.lovelace.editor.card.entities.name");
    case "extra_entities":
      return (
        "Extra" +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.entities.name")
      );
    case "entity":
      return hass!.localize("ui.components.selectors.selector.types.entity");
    case "hide_filter":
      return (
        hass!.localize("ui.common.hide") +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.entities.name")
      );
    case "edit_domains_dc":
      return (
        hass!.localize(`ui.panel.lovelace.editor.common.edit`) +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.markdown.content")
      );
    case "icon":
      return hass!.localize("ui.components.selectors.selector.types.icon");
    case "color":
      return hass!.localize("ui.panel.lovelace.editor.card.tile.color");
    case "background_color":
      return (
        hass!.localize("ui.panel.lovelace.editor.card.generic.icon") +
        " " +
        hass!.localize("ui.panel.lovelace.editor.edit_view.tab_background") +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.tile.color")
      );
    case "multiple_areas":
      return (
        "Multi" +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.area.name")
      );
    case "multiple_floors":
      return (
        "Multi" +
        " " +
        hass!.localize("ui.components.selectors.selector.types.floor")
      );
    case "show_total_number":
      return (
        hass!.localize("ui.common.enable") +
        " " +
        hass!.localize(
          "component.sensor.entity_component._.state_attributes.state_class.state.total"
        ) +
        " " +
        hass!.localize("component.number.entity_component._.name")
      );
    case "show_total_entities":
      return (
        hass!.localize("ui.common.enable") +
        " " +
        hass!.localize(
          "component.sensor.entity_component._.state_attributes.state_class.state.total"
        ) +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.entities.name")
      );
    case "appearance":
      return (
        hass!.localize(`ui.panel.lovelace.editor.card.tile.appearance`) ||
        "Appearance"
      );
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
      return hass!.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`
      );
    case "popup_card":
      return "Change Popup Card Type";
    case "group_id":
      return (
        hass!.localize("component.group.entity_component._.name") +
        " " +
        hass!.localize("ui.common.name")
      );
    case "group_icon":
      return (
        hass!.localize("component.group.entity_component._.name") +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.generic.icon")
      );
    case "group_status":
      return (
        hass!.localize("component.group.entity_component._.name") +
        " " +
        hass!.localize("ui.components.selectors.selector.types.state") +
        " (" +
        hass!.localize("ui.panel.lovelace.editor.card.config.optional") +
        ")"
      );
    case "hide":
      return hass!.localize("ui.common.hide");
    case "state":
      return hass!.localize("ui.components.entity.entity-state-picker.state");
    case "invert":
    case "invert_state":
      return hass!.localize("ui.dialogs.entity_registry.editor.invert.label");
    case "show_entity_picture":
      return hass!.localize(
        "ui.panel.lovelace.editor.card.tile.show_entity_picture"
      );
    case "name":
      return hass!.localize("ui.common.name");
    case "no_scroll":
      return (
        hass!.localize(
          "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
        ) +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.generic.content")
      );
    case "popup":
      return "Popup";
    case "ungroup_areas":
      return (
        hass!.localize("ui.common.disable") +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.area.name") +
        " " +
        hass!.localize("component.group.entity_component._.name")
      );
    case "popup_sort":
      return "Popup Sort";
    case "state_content":
      return hass!.localize("ui.panel.lovelace.editor.card.tile.state_content");
    case "hide_card_if_empty":
      return hass!.localize("ui.common.hide") + " Status Card if empty";
    default:
      if (ALLOWED_DOMAINS.includes(schema.name)) {
        return (
          hass!.localize(`component.${schema.name}.entity_component._.name`) ||
          schema.name
        );
      }
      for (const [domain, classes] of Object.entries(deviceClasses)) {
        if (classes.includes(schema.name)) {
          return (
            hass!.localize(
              `ui.dialogs.entity_registry.editor.device_classes.${domain}.${schema.name}`
            ) || schema.name
          );
        }
      }
      return hass!.localize(
        `ui.panel.lovelace.editor.card.area.${schema.name}`
      );
  }
}
