import { LitElement, TemplateResult, html, css, CSSResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { CardConfig, CustomizationConfig, Schema, UiAction } from "./helpers";
import memoizeOne from "memoize-one";
import { computeLabelCallback } from "./translations";

@customElement("status-item-editor")
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: CustomizationConfig;
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
      { name: "show_total_number", selector: { boolean: {} } },
      { name: "show_total_entities", selector: { boolean: {} } },
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
        tap_action: this.config.tap_action || undefined,
        double_tap_action: this.config.double_tap_action || undefined,
        hold_action: this.config.hold_action || undefined,
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
        .computeLabel=${(schema: any) =>
          computeLabelCallback(this.hass!, schema)}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }

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

  setConfig(config: CardConfig) {
    this._config = {
      ...config,
      customization: config.customization ?? [],
    };
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
