import { HomeAssistant, Schema } from "./ha";
import { ALLOWED_DOMAINS, deviceClasses } from "./const";
import { getTranslation } from "./translations-data";

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
  square: (hass) =>
    getTranslation("square", hass.locale.language),
  hide_content_name: (hass) =>
    getTranslation("hide_content_name", hass.locale.language),
  hide_person: (hass) =>
    `${hass.localize("ui.common.hide")} ${hass.localize(
      "component.person.entity_component._.name"
    )}`,
  list_mode: (hass) =>
    getTranslation("list_mode", hass.locale.language),
  columns: (hass) =>
    getTranslation("columns", hass.locale.language),
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
    getTranslation("hide_filter", hass.locale.language),
  edit_domains_dc: (hass) =>
    getTranslation("edit_domains_dc", hass.locale.language),
  icon: (hass) => hass.localize("ui.components.selectors.selector.types.icon"),
  color: (hass) => hass.localize("ui.panel.lovelace.editor.card.tile.color"),
  background_color: (hass) =>
    getTranslation("background_color", hass.locale.language),
  multiple_areas: (hass) =>
    getTranslation("multiple_areas", hass.locale.language),
  multiple_floors: (hass) =>
    getTranslation("multiple_floors", hass.locale.language),
  show_total_number: (hass) =>
    getTranslation("show_total_number", hass.locale.language),
  show_total_entities: (hass) =>
    getTranslation("show_total_entities", hass.locale.language),
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
    getTranslation("group_id", hass.locale.language),
  group_icon: (hass) =>
    getTranslation("group_icon", hass.locale.language),
  group_status: (hass) =>
    `${getTranslation("group_status", hass.locale.language)} (${hass.localize(
      "ui.panel.lovelace.editor.card.config.optional"
    )})`,
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
    getTranslation("no_scroll", hass.locale.language),
  popup: () => "Popup",
  ungroup_areas: (hass) =>
    getTranslation("ungroup_areas", hass.locale.language),
  popup_sort: (hass) =>
    getTranslation("popup_sort", hass.locale.language),
  state_content: (hass) =>
    hass.localize("ui.panel.lovelace.editor.card.tile.state_content"),
  hide_card_if_empty: (hass) =>
    getTranslation("hide_card_if_empty", hass.locale.language),
  badge_mode: (hass) =>
    getTranslation("badge_mode", hass.locale.language),
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
  no_background: (hass) =>
    getTranslation("no_background", hass.locale.language),
  activate_state_color: (hass) =>
    `${hass.localize(
      "ui.panel.lovelace.editor.card.generic.state_color"
    )}`,
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
