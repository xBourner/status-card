import { HomeAssistant, Schema } from "./ha";
import { ALLOWED_DOMAINS, deviceClasses } from "./const";

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

const LABEL_MAP: Record<string, (hass: HomeAssistant) => string> = {
  square: (hass) => hass.localize("ui.panel.lovelace.editor.card.grid.square"),
  hide_person_name: (hass) =>
    `${hass.localize("ui.common.hide")} ${hass.localize(
      "component.person.entity_component._.name"
    )} ${hass.localize("ui.common.name")}`,
  hide_content_name: (hass) =>
    `${hass.localize("ui.common.hide")} ${hass.localize(
      "ui.panel.lovelace.editor.card.markdown.content"
    )} ${hass.localize("ui.common.name")}`,
  hide_person: (hass) =>
    `${hass.localize("ui.common.hide")} ${hass.localize(
      "component.person.entity_component._.name"
    )}`,
  list_mode: (hass) =>
    `${hass.localize("ui.card.common.turn_on")} ${hass.localize(
      "ui.components.media-browser.list"
    )} ${hass.localize("ui.dialogs.helper_settings.input_text.mode")}`,
  columns: (hass) =>
    `${hass.localize(
      "ui.panel.lovelace.editor.action-editor.actions.more-info"
    )} ${hass.localize("ui.panel.lovelace.editor.card.grid.columns")}`,
  edit_filters: (hass) =>
    `${hass.localize("ui.panel.lovelace.editor.common.edit")} ${hass.localize(
      "ui.components.subpage-data-table.filters"
    )}`,
  area: (hass) => hass.localize("ui.panel.lovelace.editor.card.area.name"),
  floor: (hass) =>
    hass.localize("ui.components.selectors.selector.types.floor"),
  label_filter: (hass) =>
    `${hass.localize("ui.components.label-picker.label")} ${hass.localize(
      "ui.components.related-filter-menu.filter"
    )}`,
  label: (hass) => hass.localize("ui.components.label-picker.label"),
  hidden_labels: (hass) => hass.localize("ui.components.label-picker.label"),
  entities: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.entities.name"),
  extra_entities: (hass) =>
    `Extra ${hass.localize("ui.panel.lovelace.editor.card.entities.name")}`,
  entity: (hass) =>
    hass.localize("ui.components.selectors.selector.types.entity"),
  hide_filter: (hass) =>
    `${hass.localize("ui.common.hide")} ${hass.localize(
      "ui.panel.lovelace.editor.card.entities.name"
    )}`,
  edit_domains_dc: (hass) =>
    `${hass.localize("ui.panel.lovelace.editor.common.edit")} ${hass.localize(
      "ui.panel.lovelace.editor.card.markdown.content"
    )}`,
  icon: (hass) => hass.localize("ui.components.selectors.selector.types.icon"),
  color: (hass) => hass.localize("ui.panel.lovelace.editor.card.tile.color"),
  background_color: (hass) =>
    `${hass.localize(
      "ui.panel.lovelace.editor.card.generic.icon"
    )} ${hass.localize(
      "ui.panel.lovelace.editor.edit_view.tab_background"
    )} ${hass.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  multiple_areas: (hass) =>
    `Multi ${hass.localize("ui.panel.lovelace.editor.card.area.name")}`,
  multiple_floors: (hass) =>
    `Multi ${hass.localize("ui.components.selectors.selector.types.floor")}`,
  show_total_number: (hass) =>
    `${hass.localize("ui.common.enable")} ${hass.localize(
      "component.sensor.entity_component._.state_attributes.state_class.state.total"
    )} ${hass.localize("component.number.entity_component._.name")}`,
  show_total_entities: (hass) =>
    `${hass.localize("ui.common.enable")} ${hass.localize(
      "component.sensor.entity_component._.state_attributes.state_class.state.total"
    )} ${hass.localize("ui.panel.lovelace.editor.card.entities.name")}`,
  appearance: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.tile.appearance") ||
    "Appearance",
  tap_action: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.generic.tap_action"),
  hold_action: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.generic.hold_action"),
  double_tap_action: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.generic.double_tap_action"),
  popup_card: () => "Change Popup Card Type",
  group_id: (hass) =>
    `${hass.localize(
      "component.group.entity_component._.name"
    )} ${hass.localize("ui.common.name")}`,
  group_icon: (hass) =>
    `${hass.localize(
      "component.group.entity_component._.name"
    )} ${hass.localize("ui.panel.lovelace.editor.card.generic.icon")}`,
  group_status: (hass) =>
    `${hass.localize(
      "component.group.entity_component._.name"
    )} ${hass.localize(
      "ui.components.selectors.selector.types.state"
    )} (${hass.localize("ui.panel.lovelace.editor.card.config.optional")})`,
  hide: (hass) => hass.localize("ui.common.hide"),
  state: (hass) =>
    hass.localize("ui.components.entity.entity-state-picker.state"),
  invert: (hass) =>
    hass.localize("ui.dialogs.entity_registry.editor.invert.label"),
  invert_state: (hass) =>
    hass.localize("ui.dialogs.entity_registry.editor.invert.label"),
  show_entity_picture: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.tile.show_entity_picture"),
  name: (hass) => hass.localize("ui.common.name"),
  no_scroll: (hass) =>
    `${hass.localize(
      "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
    )} ${hass.localize("ui.panel.lovelace.editor.card.generic.content")}`,
  popup: () => "Popup",
  ungroup_areas: (hass) =>
    `${hass.localize("ui.common.disable")} ${hass.localize(
      "ui.panel.lovelace.editor.card.area.name"
    )} ${hass.localize("component.group.entity_component._.name")}`,
  popup_sort: () => "Popup Sort",
  state_content: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.tile.state_content"),
  hide_card_if_empty: (hass) =>
    `${hass.localize("ui.common.hide")} Status Card if empty`,
  badge_mode: (hass) => `${hass.localize("ui.common.enable")} Badge `,
  badge_color: (hass) =>
    `Badge ${hass.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  badge_text_color: (hass) =>
    `Badge ${hass.localize(
      "component.text.entity_component._.name"
    )} ${hass.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person: (hass) => hass.localize("component.person.entity_component._.name"),
  person_home_color: (hass) =>
    `${hass.localize(
      "component.person.entity_component._.state.home"
    )} ${hass.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person_away_color: (hass) =>
    `${hass.localize(
      "component.person.entity_component._.state.not_home"
    )} ${hass.localize("ui.panel.lovelace.editor.card.tile.color")}`,
  person_home_icon: (hass) =>
    `${hass.localize(
      "component.person.entity_component._.state.home"
    )} ${hass.localize("ui.components.selectors.selector.types.icon")}`,
  person_away_icon: (hass) =>
    `${hass.localize(
      "component.person.entity_component._.state.not_home"
    )} ${hass.localize("ui.components.selectors.selector.types.icon")}`,
};

function getHeaderLabel(
  hass: HomeAssistant,
  domain?: string,
  deviceClass?: string
): string {
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

function getDefaultLabel(hass: HomeAssistant, name: string): string {
  if (ALLOWED_DOMAINS.includes(name)) {
    return hass.localize(`component.${name}.entity_component._.name`) || name;
  }
  for (const [domain, classes] of Object.entries(deviceClasses)) {
    if (classes.includes(name)) {
      return (
        hass.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${domain}.${name}`
        ) || name
      );
    }
  }
  return hass.localize(`ui.panel.lovelace.editor.card.area.${name}`);
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

  if (schema.name === "header") {
    return getHeaderLabel(hass, domain, deviceClass);
  }

  const mapper = LABEL_MAP[schema.name];
  if (mapper) {
    return mapper(hass);
  }

  return getDefaultLabel(hass, schema.name);
}
