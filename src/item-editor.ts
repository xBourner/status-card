import { LitElement, TemplateResult, html, css, CSSResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, Schema } from "./ha";
import { computeLabelCallback } from "./translations";
import { getItemAppearanceSchema, getItemActionsSchema } from "./editor-schema";

@customElement("status-card-item-editor")
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: LovelaceCardConfig;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) lovelace?: unknown;
  @property({ type: Boolean }) useSensorSchema: boolean = false;
  @property({ type: Number }) index?: number;
  @property() public getSchema?: "domain" | "entity";
  @state() private _config?: LovelaceCardConfig;
  @state() private _activeTab = "appearance";

  protected willUpdate(
    changedProps: Map<string | number | symbol, unknown>
  ): void {
    if (changedProps.has("config") && this.config) {
      this._config = {
        ...this.config,
        invert_state: this.config.invert_state || "false",
      };
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    let schema;
    if (this.getSchema) {
      if (this._activeTab === "appearance") {
        schema = getItemAppearanceSchema(
          this.getSchema,
          this.config?.type,
          this.hass,
          this._config?.badge_mode ?? false
        );
      } else {
        schema = getItemActionsSchema(
          this.getSchema,
          this.config?.type,
          this.hass,
          this._config?.badge_mode ?? false
        );
      }
    }

    const data = {
      ...this._config,
    };

    return html`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "appearance"}
          @click=${() => (this._activeTab = "appearance")}
        >
          ${this.hass.localize(
            "ui.panel.lovelace.editor.card.tile.appearance"
          ) || "Appearance"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => (this._activeTab = "actions")}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.tile.actions") ||
          "Actions"}
        </ha-tab-group-tab>
      </ha-tab-group>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(schema: Schema) =>
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

    const updatedConfig: LovelaceCardConfig = {
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

  setConfig(config: LovelaceCardConfig) {
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
        align-items: center;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
      ha-tab-group {
        display: block;
        margin-bottom: 16px;
        padding: 0 1em;
      }
      ha-tab-group-tab {
        flex: 1;
      }
      ha-tab-group-tab::part(base) {
        width: 100%;
        justify-content: center;
      }
    `;
  }
}
