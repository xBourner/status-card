import { LitElement, html } from "lit";
import { HomeAssistant } from "custom-card-helpers";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { css, CSSResult, nothing } from "lit";
import { mdiClose, mdiPencil } from "@mdi/js";
import {
  fireEvent,
  CustomizationConfig,
  EditorTarget,
  HTMLElementValue,
  SelectOption,
} from "./helpers";

abstract class BaseItemsEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Array }) SelectOptions: SelectOption[] = [];

  protected abstract customizationkey: CustomizationConfig[] | undefined;
  protected abstract customizationChangedEvent: string;

  private _entityKeys = new WeakMap<CustomizationConfig, string>();

  private _getKey(action: CustomizationConfig) {
    if (!this._entityKeys.has(action)) {
      this._entityKeys.set(action, Math.random().toString());
    }
    return this._entityKeys.get(action)!;
  }

  protected render() {
    if (!this.hass) {
      return nothing;
    }

    return html`
      <div class="customization">
        ${this.customizationkey &&
        repeat(
          this.customizationkey,
          (conf) => this._getKey(conf),
          (conf, index) => html`
            <div class="customize-item">
              <ha-select
                label=${this.hass!.localize(
                  "ui.panel.lovelace.editor.common.edit"
                ) +
                " " +
                this.hass!.localize(
                  "ui.panel.lovelace.editor.card.markdown.content"
                )}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${conf.type}
                @closed=${(ev: any) => ev.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map(
                  (option) =>
                    html`<mwc-list-item .value=${option.value}
                      >${option.label}</mwc-list-item
                    >`
                )}
              </ha-select>
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
          <ha-select
            label=${this.hass!.localize(
              "ui.panel.lovelace.editor.common.edit"
            ) +
            " " +
            this.hass!.localize(
              "ui.panel.lovelace.editor.card.markdown.content"
            )}
            name="Customize"
            class="add-customization"
            naturalMenuWidth
            fixedMenuPosition
            @closed=${(ev: any) => ev.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map(
              (option) =>
                html`<mwc-list-item .value=${option.value}
                  >${option.label}</mwc-list-item
                >`
            )}
          </ha-select>
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
    const newCustomization = this.customizationkey.concat();
    newCustomization[index] = { ...newCustomization[index], type: value || "" };
    fireEvent(this, this.customizationChangedEvent, newCustomization);
  }

  private _removeRow(ev: Event): void {
    ev.stopPropagation();
    const index = (ev.currentTarget as EditorTarget).index;
    if (index != undefined) {
      const customization = this.customizationkey!.concat();
      customization.splice(index, 1);
      fireEvent<CustomizationConfig[]>(
        this,
        this.customizationChangedEvent,
        customization
      );
    }
  }

  private _editRow(ev: Event): void {
    ev.stopPropagation();
    const index = (ev.target as EditorTarget).index;
    if (index != undefined) {
      fireEvent<number>(this, "edit-item", index);
    }
  }

  private _addRow(ev: Event): void {
    ev.stopPropagation();
    if (!this.customizationkey || !this.hass) {
      return;
    }
    const selectElement = this.shadowRoot!.querySelector(
      ".add-customization"
    ) as HTMLElementValue;
    if (!selectElement || !selectElement.value) {
      return;
    }
    const preset = selectElement.value;
    const newItem: CustomizationConfig = { type: preset };
    fireEvent<CustomizationConfig[]>(this, this.customizationChangedEvent, [
      ...this.customizationkey,
      newItem,
    ]);
    selectElement.value = "";
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
    `;
  }
}

@customElement("status-items-editor")
export class StatusItemsEditor extends BaseItemsEditor {
  @property({ attribute: false }) customization?: CustomizationConfig[];
  protected customizationChangedEvent = "config-changed";
  protected get customizationkey() {
    return this.customization;
  }
}
