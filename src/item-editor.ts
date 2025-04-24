import { LitElement, TemplateResult, html, css, CSSResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { Settings, UiAction } from "./helpers";
import { CardConfig } from "./editor";
import memoizeOne from "memoize-one";

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;
  default?: any;
  type?: string;
}

@customElement("status-item-editor")
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: Settings;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) useSensorSchema: boolean = false;
  @property({ type: Number }) index?: number;
  @state() private getSchema?: string;
  @state() private _config?: CardConfig;

  private _schemadomain = memoizeOne(() => {
    const actions: UiAction[] = [
      "more-info",
      "toggle",
      "navigate",
      "url",
      "perform-action",
      "none",
    ];
    return [
      { name: "invert", selector: { boolean: {} } },
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
      { name: "tap_action", selector: { ui_action: { actions } } },
      { name: "double_tap_action", selector: { ui_action: { actions } } },
      { name: "hold_action", selector: { ui_action: { actions } } },
    ];
  });

  private _schemaEntity = memoizeOne(() => {
    const entityId = this.config?.type || "";
    const actions: UiAction[] = [
      "more-info",
      "toggle",
      "navigate",
      "url",
      "perform-action",
      "none",
    ];
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
                    label: this.hass!.localize(
                      "ui.panel.lovelace.editor.condition-editor.condition.state.state_equal"
                    ),
                    value: "false",
                  },
                  {
                    label: this.hass!.localize(
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
            selector: { state: { entity_id: entityId } },
          },
        ],
      },

      { name: "name", selector: { text: {} } },
      { name: "show_entity_picture", selector: { boolean: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        name: "icon_color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
      {
        name: "background_color",
        selector: {
          color_rgb: { default_color: "state", include_state: true },
        },
      },
      { name: "tap_action", selector: { ui_action: { actions } } },
      { name: "double_tap_action", selector: { ui_action: { actions } } },
      { name: "hold_action", selector: { ui_action: { actions } } },
    ];
  });

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    if (!this._config?.invert_state) {
      this._config = {
        ...this._config,
        invert_state: this.config.invert_state || "false",
        icon_color: this.config.icon_color || undefined,
      };
    }

    let schema;
    switch (this.getSchema) {
      case "domain":
        schema = this._schemadomain();
        break;
      case "entity":
        schema = this._schemaEntity();
        break;
    }

    const data = {
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }

  private _computeLabelCallback = (schema: Schema): string => {
    switch (schema.name) {
      case "hide":
        return this.hass!.localize("ui.common.hide");
      case "state":
        return this.hass!.localize(
          "ui.components.entity.entity-state-picker.state"
        );
      case "invert":
      case "invert_state":
        return this.hass!.localize(
          "ui.dialogs.entity_registry.editor.invert.label"
        );
      case "color":
        return this.hass!.localize("ui.panel.lovelace.editor.card.tile.color");
      case "background_color":
        return (
          this.hass!.localize("ui.panel.lovelace.editor.card.generic.icon") +
          " " +
          this.hass!.localize(
            "ui.panel.lovelace.editor.edit_view.tab_background"
          ) +
          " " +
          this.hass!.localize("ui.panel.lovelace.editor.card.tile.color")
        );
      case "show_entity_picture":
        return this.hass!.localize(
          "ui.panel.lovelace.editor.card.tile.show_entity_picture"
        );
      case "name":
      case "icon":
      case "tap_action":
      case "hold_action":
      case "double_tap_action":
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.generic.${schema.name}`
        );
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.area.${schema.name}`
        );
    }
  };

  private _valueChangedSchema(event: CustomEvent): void {
    if (!this.config) {
      return;
    }
    event.stopPropagation();

    const updatedConfig: CardConfig = {
      ...this.config,
      ...event.detail.value,
    };

    this._config = updatedConfig;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: updatedConfig,
      })
    );
  }

  static get styles(): CSSResult {
    return css`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `;
  }
}
