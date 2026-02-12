import { LitElement, TemplateResult, html, css, CSSResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, Schema } from "./ha";
import { computeLabelCallback } from "./translations";
import {
  getItemAppearanceSchema,
  getItemActionsSchema,
  getItemStyleSchema,
} from "./editor-schema";

@customElement("status-card-item-editor")
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: LovelaceCardConfig;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) lovelace?: unknown;
  @property({ type: Boolean }) useSensorSchema: boolean = false;
  @property({ type: Number }) index?: number;
  @property() public getSchema?: "domain" | "entity";
  @property({ type: Boolean }) public isGroup = false;
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
    if (this._activeTab === "appearance") {
      schema = getItemAppearanceSchema(
        this.getSchema!,
        this.config?.type,
        this.hass,
        this._config?.badge_mode ?? false,
        this.isGroup
      );
    } else if (this._activeTab === "actions") {
      schema = getItemActionsSchema(
        this.getSchema!,
        this.config?.type,
        this.hass,
        this._config?.badge_mode ?? false
      );
    } else if (this._activeTab === "style") {
      schema = getItemStyleSchema();
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
          ${this.hass.localize("ui.panel.lovelace.editor.card.map.appearance")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => (this._activeTab = "actions")}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "style"}
          @click=${() => (this._activeTab = "style")}
        >
          Style
        </ha-tab-group-tab>
        ${this.getSchema === "domain"
          ? html`
              <ha-tab-group-tab
                .active=${this._activeTab === "popup"}
                @click=${() => (this._activeTab = "popup")}
              >
                Popup Card
              </ha-tab-group-tab>
            `
          : ""}
      </ha-tab-group>
      ${this._activeTab === "style"
        ? html`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>button</b>: Item Container (Background, Border)</li>
                <li><b>icon</b>: Item Icon</li>
                <li><b>name</b>: Entity Name</li>
                <li><b>state</b>: Entity State Value</li>
                ${this.getSchema === "entity"
                  ? html`<li><b>name</b>: Item Name (Label)</li>`
                  : html``}
              </ul>
              <p>
                <strong>Animations:</strong> <br />
                spin, pulse, shake, blink, bounce
              </p>
              <p><strong>Example:</strong></p>
              <pre>
button:
  --mdc-icon-size: 24px;
  border: none;
  color: green;            
icon:
  animation: spin 2s linear infinite;
  --mdc-icon-size: 40px;
  color: var(--primary-color);
name:
  font-size: 15px;    </pre
              >
            </ha-alert>
          `
        : ""}
      ${this._activeTab === "popup"
        ? this._renderPopupTab()
        : html`
            <ha-form
              .hass=${this.hass}
              .data=${data}
              .schema=${schema}
              .computeLabel=${(schema: Schema) => {
                if (schema.name === "styles") return "Styles";
                return computeLabelCallback(this.hass!, schema);
              }}
              @value-changed=${this._valueChangedSchema}
            ></ha-form>
          `}
    `;
  }

  private _renderPopupTab(): TemplateResult {
    const popupCard = this._config?.popup_card;

    if (!popupCard) {
      return html`
        <div class="card-picker">
          <hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${this._cardPicked}
          ></hui-card-picker>
        </div>
      `;
    }

    return html`
      <div class="card-editor">
        <div class="card-header">
          <h3>
            Popup
            ${this.hass!.localize(
              "ui.panel.lovelace.editor.edit_card.tab_config"
            )}
          </h3>
          <ha-button
            class="warning"
            @click=${this._removePopupCard}
            .disabled=${!popupCard}
          >
            ${this.hass!.localize("ui.common.delete")}
          </ha-button>
        </div>
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${popupCard}
          @config-changed=${this._popupCardChanged}
        ></hui-card-element-editor>
      </div>
    `;
  }

  private _cardPicked(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = ev.detail.config;
    this._updatePopupCard(config);
  }

  private _popupCardChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = ev.detail.config;
    this._updatePopupCard(config);
  }

  private _updatePopupCard(popup_card: LovelaceCardConfig): void {
    if (!this._config) return;
    const updatedConfig = {
      ...this._config,
      popup_card,
    };
    this._config = updatedConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: updatedConfig,
      })
    );
  }

  private _removePopupCard(): void {
    if (!this._config) return;
    const { popup_card, ...rest } = this._config;
    this._config = rest as LovelaceCardConfig;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: this._config,
      })
    );
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
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .card-editor {
        border: 1px solid var(--divider-color);
        padding: 12px;
        border-radius: 4px;
        margin-top: 16px;
      }
      .warning {
        --mdc-theme-primary: var(--error-color);
      }
    `;
  }
}
