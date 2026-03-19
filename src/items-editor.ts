import { LitElement, html, css, CSSResult, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { mdiClose, mdiPencil } from "@mdi/js";
import {
  HomeAssistant,
  LovelaceCardConfig,
  fireEvent,
  SelectOption,
  EditorTarget,
} from "./ha";

interface HTMLElementValue extends HTMLElement {
  value: string;
}

abstract class BaseItemsEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Array }) SelectOptions: SelectOption[] = [];

  protected abstract customizationkey: LovelaceCardConfig[] | undefined;
  protected abstract customizationChangedEvent: string;

  private _entityKeys = new WeakMap<LovelaceCardConfig, string>();

  private _getKey(action: LovelaceCardConfig) {
    if (!this._entityKeys.has(action)) {
      this._entityKeys.set(action, Math.random().toString());
    }
    return this._entityKeys.get(action)!;
  }

  protected render() {
    if (!this.hass) {
      return nothing;
    }
    const selectedTypes = new Set(
      (this.customizationkey || []).map((conf) => conf.type)
    );
    const availableOptions = this.SelectOptions.filter(
      (option) => !selectedTypes.has(option.value)
    );

    return html`
      <div class="customization">
        ${this.customizationkey &&
        repeat(
          this.customizationkey,
          (conf) => this._getKey(conf),
          (conf, index) => html`
            <div class="customize-item">
              <ha-selector
                .hass=${this.hass}
                .label=${this.hass!.localize(
                  "ui.panel.lovelace.editor.common.edit"
                ) +
                " " +
                this.hass!.localize(
                  "ui.panel.lovelace.editor.card.markdown.content"
                )}
                .selector=${{
                  select: {
                    options: this.SelectOptions,
                  },
                }}
                .value=${conf.type}
                .index=${index}
                @value-changed=${this._valueChanged}
              ></ha-selector>
              <ha-icon-button
                .label=${this.hass!.localize("ui.common.remove")}
                .path=${mdiClose}
                class="remove-icon"
                .index=${index}
                @click=${this._removeRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass!.localize("ui.common.edit")}
                .path=${mdiPencil}
                class="edit-icon"
                .index=${index}
                @click=${this._editRow}
              ></ha-icon-button>
            </div>
          `
        )}

        <div class="add-item row">
          <ha-selector
            .hass=${this.hass}
            .label=${this.hass!.localize(
              "ui.panel.lovelace.editor.common.edit"
            ) +
            " " +
            this.hass!.localize(
              "ui.panel.lovelace.editor.card.markdown.content"
            )}
            .selector=${{
              select: {
                options: availableOptions,
              },
            }}
            .value=${""}
            @value-changed=${this._addRow}
          ></ha-selector>
        </div>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this.customizationkey || !this.hass) {
      return;
    }
    const value = ev.detail.value;
    const index = (ev.target as any).index;
    if (index === undefined) return;
    const newCustomization = this.customizationkey.concat();
    newCustomization[index] = { ...newCustomization[index], type: value || "" };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: newCustomization,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _removeRow(ev: Event): void {
    ev.stopPropagation();
    const index = (ev.currentTarget as EditorTarget).index;
    if (index != undefined) {
      const customization = this.customizationkey!.concat();
      customization.splice(index, 1);
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: customization,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _editRow(ev: Event): void {
    ev.stopPropagation();
    const index = (ev.target as EditorTarget).index;
    if (index != undefined) {
      fireEvent(this, "edit-item", index);
    }
  }

  private _addRow(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this.customizationkey || !this.hass) {
      return;
    }
    const preset = ev.detail.value;
    if (!preset) {
      return;
    }
    const newItem: LovelaceCardConfig = { type: preset };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: [...this.customizationkey, newItem],
        bubbles: true,
        composed: true,
      })
    );
    // No need to manually clear value as we don't bind .value to a state that would keep it
  }

  static get styles(): CSSResult {
    return css`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .add-customization,
      .select-customization {
        width: 100%;
        margin-top: 8px;
      }
      .remove-icon,
      .edit-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }
      .customize-item ha-selector,
      .add-item ha-selector {
        flex: 1;
      }
    `;
  }
}

@customElement("status-items-editor")
export class StatusItemsEditor extends BaseItemsEditor {
  @property({ attribute: false }) customization?: LovelaceCardConfig[];
  protected customizationChangedEvent = "config-changed";
  protected get customizationkey() {
    return this.customization;
  }
}
