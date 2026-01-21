import { Schema, HomeAssistant, UiAction } from "./ha";
import { computeLabelCallback } from "./translations";

export function getConfigSchema(
  hass: HomeAssistant,
  Filter: string,
  LabelFilter: boolean,
  MultipleAreas: boolean,
  MultipleFloors: boolean
): Schema[] {
  const computeLabel = (
    schema: Schema,
    domain?: string,
    deviceClass?: string
  ) => computeLabelCallback(hass, schema, domain, deviceClass);

  const area = computeLabel({ name: "area" });
  const floor = computeLabel({ name: "floor" });
  const name = computeLabel({ name: "name" });
  const state = computeLabel({ name: "state" });

  return [
    {
      name: "edit_filters",
      // @ts-ignore
      flatten: true,
      type: "expandable",
      icon: "mdi:filter-cog",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "filter",
              selector: {
                select: {
                  options: [
                    { value: "area", label: area },
                    { value: "floor", label: floor },
                  ],
                },
              },
            },
            { name: "label_filter", selector: { boolean: {} } },
          ],
        },
        ...(Filter === "area" && MultipleAreas === false
          ? ([
            { name: "multiple_areas", selector: { boolean: {} } },
            { name: "area", selector: { area: {} } },
          ] as const)
          : []),

        ...(Filter === "area" && MultipleAreas === true
          ? ([
            { name: "multiple_areas", selector: { boolean: {} } },
            { name: "area", selector: { area: { multiple: true } } },
          ] as const)
          : []),

        ...(Filter === "floor" && MultipleFloors === false
          ? ([
            { name: "multiple_floors", selector: { boolean: {} } },
            { name: "floor", selector: { floor: {} } },
          ] as const)
          : []),

        ...(Filter === "floor" && MultipleFloors === true
          ? ([
            { name: "multiple_floors", selector: { boolean: {} } },
            { name: "floor", selector: { floor: { multiple: true } } },
          ] as const)
          : []),

        ...(LabelFilter
          ? ([
            { name: "label", selector: { label: { multiple: true } } },
          ] as const)
          : []),
      ],
    },
    {
      name: "popup",
      // @ts-ignore
      flatten: true,
      type: "expandable",
      icon: "mdi:arrange-bring-forward",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "ungroup_areas",
              selector: { boolean: {} },
            },
            { name: "list_mode", selector: { boolean: {} } },
          ],
        },
        {
          name: "popup_sort",
          selector: {
            select: {
              options: [
                { value: "name", label: name },
                { value: "state", label: state },
              ],
            },
          },
        },

        {
          name: "columns",
          required: false,
          selector: { number: { min: 1, max: 4 } },
        },
      ],
    },
  ];
}

export function getAppearanceSchema(
  hass: HomeAssistant,
  BadgeMode: boolean
): Schema[] {
  return [
    {
      name: "",
      type: "grid",
      schema: [
        { name: "hide_content_name", selector: { boolean: {} } },
        {
          name: "show_total_number",
          selector: { boolean: {} },
        },
        {
          name: "square",
          selector: { boolean: {} },
        },
        {
          name: "show_total_entities",
          selector: { boolean: {} },
        },
        {
          name: "no_scroll",
          selector: { boolean: {} },
        },
        {
          name: "hide_card_if_empty",
          selector: { boolean: {} },
        },
        { name: "badge_mode", selector: { boolean: {} } },
        { name: "no_background", selector: { boolean: {} } },
      ],
    },
    ...(BadgeMode
      ? [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "badge_color",
              selector: {
                ui_color: { default_color: "state", include_state: true },
              },
            },
            {
              name: "badge_text_color",
              selector: {
                ui_color: { default_color: "state", include_state: true },
              },
            },
          ],
        },
      ]
      : []),
    {
      name: "",
      type: "grid",
      schema: [{ name: "theme", required: false, selector: { theme: {} } }],
    },

    {
      name: "content_layout",
      required: true,
      selector: {
        select: {
          mode: "box",
          options: ["vertical", "horizontal"].map((value) => ({
            label: hass.localize(
              `ui.panel.lovelace.editor.card.tile.content_layout_options.${value}`
            ),
            value,
            image: {
              src: `/static/images/form/tile_content_layout_${value}.svg`,
              src_dark: `/static/images/form/tile_content_layout_${value}_dark.svg`,
              flip_rtl: true,
            },
          })),
        },
      },
    },
    {
      name: "color",
      selector: {
        ui_color: { default_color: "state", include_state: true },
      },
    },
    {
      name: "background_color",
      selector: {
        color_rgb: {},
      },
    },
  ];
}

export function getActionsSchema(hass: HomeAssistant): Schema[] {
  const actions: UiAction[] = [
    "more-info",
    "toggle",
    "navigate",
    "url",
    "perform-action",
    "none",
  ];
  return [
    { name: "tap_action", selector: { ui_action: { actions } } },
    { name: "double_tap_action", selector: { ui_action: { actions } } },
    { name: "hold_action", selector: { ui_action: { actions } } },
  ];
}

export const getItemAppearanceSchema = (
  type: "domain" | "entity",
  entityId?: string,
  hass?: HomeAssistant,
  badgeMode?: boolean
): Schema[] => {
  if (type === "domain") {
    return [
      {
        name: "",
        type: "grid",
        schema: [
          { name: "invert", selector: { boolean: {} } },
          { name: "badge_mode", selector: { boolean: {} } },
          ...(badgeMode
            ? ([
              {
                name: "badge_color",
                selector: {
                  ui_color: { default_color: "state", include_state: true },
                },
              },
              {
                name: "badge_text_color",
                selector: {
                  ui_color: { default_color: "state", include_state: true },
                },
              },
            ] as const)
            : []),
          { name: "show_total_number", selector: { boolean: {} } },
          { name: "show_total_entities", selector: { boolean: {} } },
        ],
      },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        name: "icon_color",
        selector: {
          ui_color: { default_color: "state", include_state: true },
        },
      },
      {
        name: "background_color",
        selector: {
          color_rgb: { default_color: "state", include_state: true },
        },
      },
    ];
  }

  return [
    {
      name: "",
      type: "grid",
      schema: [
        {
          name: "invert_state",
          required: true,
          selector: {
            select: {
              mode: "dropdown",
              options: [
                {
                  label: hass!.localize(
                    "ui.panel.lovelace.editor.condition-editor.condition.state.state_equal"
                  ),
                  value: "false",
                },
                {
                  label: hass!.localize(
                    "ui.panel.lovelace.editor.condition-editor.condition.state.state_not_equal"
                  ),
                  value: "true",
                },
              ],
            },
          },
        },
        {
          name: "state",
          selector: { state: { entity_id: entityId || "" } },
        },
      ],
    },
    {
      name: "state_content",
      selector: { ui_state_content: { entity_id: entityId } },
    },
    { name: "name", selector: { text: {} } },
    { name: "show_entity_picture", selector: { boolean: {} } },
    { name: "icon", selector: { icon: {} } },
    { name: "activate_state_color", selector: { boolean: {} } },
    {
      name: "icon_color",
      selector: {
        ui_color: { default_color: "state", include_state: true },
      },
    },
    {
      name: "background_color",
      selector: {
        color_rgb: { default_color: "state", include_state: true },
      },
    },
  ];
};

export const getItemActionsSchema = (
  type: "domain" | "entity",
  entityId?: string,
  hass?: HomeAssistant,
  badgeMode?: boolean
): Schema[] => {
  const actions: UiAction[] = [
    "more-info",
    "toggle",
    "navigate",
    "url",
    "perform-action",
    "none",
  ];

  return [
    { name: "tap_action", selector: { ui_action: { actions } } },
    { name: "double_tap_action", selector: { ui_action: { actions } } },
    { name: "hold_action", selector: { ui_action: { actions } } },
  ];
};

export const getItemStyleSchema = (): Schema[] => {
  return [
    {
      name: "styles",
      selector: {
        object: {},
      },
    },
  ];
};

export const getStyleSchema = (): Schema[] => {
  return [
    {
      name: "styles",
      selector: {
        object: {},
      },
    },
  ];
};
