import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, computeDomain } from "custom-card-helpers";
import { computeLabelCallback } from "./translations";
import { ALLOWED_DOMAINS, sortOrder, DataStore } from "./properties";
import memoizeOne from "memoize-one";
import {
  caseInsensitiveStringCompare,
  Settings,
  fireEvent,
  SubElementConfig,
  UiAction,
} from "./helpers";
import { mdiTextBoxEdit } from "@mdi/js";
import "./items-editor";
import "./item-editor";

export interface CardConfig {
  extra_entities?: string[];
  columns?: number;
  hide_person?: boolean;
  list_mode?: boolean;
  hide_content_name?: boolean;
  customization?: any[];
  filter?: string;
  floor?: string[];
  area?: string[];
  label_filter?: boolean;
  label?: string[];
  content?: string[];
  hide_filter?: string;
  state?: string | string[];
  multiple_areas?: boolean;
  multiple_floors?: boolean;
  invert_state?: "true" | "false";
  icon_color?: string;
  background_color?: [number, number, number];
}

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;
  default?: any;
  type?: string;
}

export interface SelectOption {
  value: any;
  label: string;
  type?: "domain" | "entity";
}

interface SubElementEditor {
  index?: number;
}

@customElement("status-card-editor")
export class StatusCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public _config!: CardConfig;
  @state() private _subElementEditorDomain: SubElementConfig | undefined =
    undefined;
  @state() private _subElementEditorEntity: SubElementConfig | undefined =
    undefined;

  private computeLabel = memoizeOne(
    (schema: Schema, domain?: string, deviceClass?: string): string => {
      return computeLabelCallback(this.hass, schema, domain, deviceClass);
    }
  );

  private getAllEntities(): string[] {
    return DataStore.getAllEntities();
  }

  setConfig(config: CardConfig) {
    this._config = {
      ...config,
      columns: config.columns ?? 4,
      hide_person: config.hide_person ?? false,
      list_mode: config.list_mode ?? false,
      hide_content_name: config.hide_content_name ?? false,
      customization: config.customization ?? [],
    };
  }

  private _updateAreaFloorInConfig(): void {
    if (!this._config || !this._config.filter) return;

    const area = this.computeLabel({ name: "area" });
    const floor = this.computeLabel({ name: "floor" });

    if (this._config.filter === area && this._config.floor !== undefined) {
      delete this._config.floor;
      fireEvent(this, "config-changed", { config: { ...this._config } });
    } else if (
      this._config.filter === floor &&
      this._config.area !== undefined
    ) {
      delete this._config.area;
      fireEvent(this, "config-changed", { config: { ...this._config } });
    }
  }

  private _filterInitialized = false;
  private _lastFilter: { area: string[]; floor: string[]; label: string[] } = {
    area: [],
    floor: [],
    label: [],
  };

  protected async updated(
    changedProperties: Map<string | number | symbol, unknown>
  ): Promise<void> {
    super.updated(changedProperties);

    if (!this.hass || !this._config) {
      return;
    }

    if (changedProperties.has("_config")) {
      this._updateAreaFloorInConfig();

      if (
        (this._config.label_filter === false &&
          this._config.label !== undefined) ||
        (Array.isArray(this._config.label) && this._config.label.length === 0)
      ) {
        delete this._config.label;
        fireEvent(this, "config-changed", { config: { ...this._config } });
      }

      const oldConfig = changedProperties.get("_config") as typeof this._config;
      const oldExtraEntities = oldConfig?.extra_entities ?? [];
      const newExtraEntities = this._config.extra_entities ?? [];
      const oldContent = oldConfig?.content ?? [];
      const newContent = this._config.content ?? [];

      const currentArea = Array.isArray(this._config.area)
        ? [...this._config.area]
        : [];
      const currentFloor = Array.isArray(this._config.floor)
        ? [...this._config.floor]
        : [];
      const currentLabel = Array.isArray(this._config.label)
        ? [...this._config.label]
        : [];

      if (!this._filterInitialized) {
        this._lastFilter = {
          area: currentArea,
          floor: currentFloor,
          label: currentLabel,
        };
        this._filterInitialized = true;
      }

      const previousArea = this._lastFilter.area;
      const previousFloor = this._lastFilter.floor;
      const previousLabel = this._lastFilter.label;
      const labelsChanged =
        JSON.stringify(previousLabel) !== JSON.stringify(currentLabel);
      const floorsChanged =
        JSON.stringify(previousFloor) !== JSON.stringify(currentFloor);
      const areasChanged =
        JSON.stringify(previousArea) !== JSON.stringify(currentArea);

      let updated = false;

      if (areasChanged || floorsChanged || labelsChanged) {
        const possibleToggleDomains = this._toggleDomainsForArea(
          currentArea,
          currentFloor,
          currentLabel
        );
        const sortedToggleDomains = possibleToggleDomains.sort(
          (a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
        );

        this._config = {
          ...this._config,
          content: [...sortedToggleDomains],
        };

        this._lastFilter = {
          area: [...currentArea],
          floor: [...currentFloor],
          label: [...currentLabel],
        };

        fireEvent(this, "config-changed", { config: { ...this._config } });
        this.requestUpdate();
        updated = true;
      }

      if (
        JSON.stringify(oldExtraEntities) !== JSON.stringify(newExtraEntities)
      ) {
        let content = [...newContent];

        newExtraEntities.forEach((ent) => {
          if (!content.includes(ent)) {
            content.unshift(ent);
          }
        });

        content = content.filter(
          (content) =>
            !content.includes(".") || newExtraEntities.includes(content)
        );

        if (JSON.stringify(content) !== JSON.stringify(newContent)) {
          this._config = {
            ...this._config,
            content,
          };
          updated = true;
        }
      }

      if (JSON.stringify(oldContent) !== JSON.stringify(newContent)) {
        let extraEntities = [...newExtraEntities];
        extraEntities = extraEntities.filter((ent) => newContent.includes(ent));

        if (
          JSON.stringify(extraEntities) !== JSON.stringify(newExtraEntities)
        ) {
          this._config = {
            ...this._config,
            extra_entities: extraEntities,
          };
          updated = true;
        }
      }

      if (updated) {
        fireEvent(this, "config-changed", { config: { ...this._config } });
        this.requestUpdate();
      }
    }
  }

  private _schema = memoizeOne(
    (
      Filter: string,
      LabelFilter: boolean,
      HideFilter: string,
      MultipleAreas: boolean,
      MultipleFloors: boolean
    ) => {
      const area = this.computeLabel({ name: "area" });
      const floor = this.computeLabel({ name: "floor" });
      const label = this.computeLabel({ name: "label" });
      const entity = this.computeLabel({ name: "entity" });

      const allEntities = this.getAllEntities();

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
          name: "appearance",
          flatten: true,
          type: "expandable",
          icon: "mdi:palette",
          schema: [
            {
              name: "",
              type: "grid",
              schema: [
                { name: "hide_person", selector: { boolean: {} } },
                { name: "list_mode", selector: { boolean: {} } },
                { name: "hide_content_name", selector: { boolean: {} } },
                {
                  name: "show_total_number",
                  selector: { boolean: {} },
                },
              ],
            },
            {
              name: "",
              type: "grid",
              schema: [
                { name: "theme", required: false, selector: { theme: {} } },
                {
                  name: "columns",
                  required: false,
                  selector: { number: { min: 1, max: 4, mode: "box" } },
                },
              ],
            },
            {
              name: "square",
              selector: { boolean: {} },
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
            { name: "tap_action", selector: { ui_action: { actions } } },
            { name: "double_tap_action", selector: { ui_action: { actions } } },
            { name: "hold_action", selector: { ui_action: { actions } } },
          ],
        },
        {
          name: "edit_filters",
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
                  selector: { select: { options: [area, floor] } },
                },
                { name: "label_filter", selector: { boolean: {} } },
              ],
            },
            ...(Filter === area && MultipleAreas === false
              ? ([
                  { name: "multiple_areas", selector: { boolean: {} } },
                  { name: "area", selector: { area: {} } },
                ] as const)
              : []),

            ...(Filter === area && MultipleAreas === true
              ? ([
                  { name: "multiple_areas", selector: { boolean: {} } },
                  { name: "area", selector: { area: { multiple: true } } },
                ] as const)
              : []),

            ...(Filter === floor && MultipleFloors === false
              ? ([
                  { name: "multiple_floors", selector: { boolean: {} } },
                  { name: "floor", selector: { floor: {} } },
                ] as const)
              : []),

            ...(Filter === floor && MultipleFloors === true
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
          name: "entities",
          flatten: true,
          type: "expandable",
          icon: "mdi:invoice-text-edit",
          schema: [
            {
              name: "extra_entities",
              selector: { entity: { multiple: true } },
            },
            {
              name: "",
              type: "grid",
              schema: [
                {
                  name: "hide_filter",
                  selector: { select: { options: [entity, label] } },
                },
              ],
            },
            ...(HideFilter === entity
              ? ([
                  {
                    name: "hidden_entities",
                    selector: {
                      entity: { multiple: true, include_entities: allEntities },
                    },
                  },
                ] as const)
              : []),
            ...(HideFilter === label
              ? ([
                  {
                    name: "hidden_labels",
                    selector: { label: { multiple: true } },
                  },
                ] as const)
              : []),
          ],
        },
      ];
    }
  );

  private _toggleschema = memoizeOne((toggleDomains: SelectOption[]) => {
    return [
      {
        name: "content",
        selector: {
          select: {
            reorder: true,
            multiple: true,
            custom_value: true,
            options: toggleDomains,
          },
        },
      },
    ];
  });

  private _valueChanged(event: CustomEvent) {
    this._config = event.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
      })
    );
  }

  public get toggleSelectOptions(): SelectOption[] {
    return this._buildToggleOptions(
      this._toggleDomainsForArea(
        this._config!.area || [],
        this._config!.floor || [],
        this._config!.label || []
      ),
      this._config?.content ||
        this._toggleDomainsForArea(
          this._config!.area || [],
          this._config!.floor || [],
          this._config!.label || []
        )
    );
  }

  public get contentSelectOptions(): SelectOption[] {
    const content = this._config.content ?? [];
    return this._buildOptions("toggle", content, content);
  }

  private _buildToggleOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("toggle", possibleClasses, currentClasses)
  );

  private _toggleDomainsForArea = memoizeOne(
    (area: string[], floor: string[], label: string[]): string[] => {
      const domains = this._classesForArea(area, floor, label);
      return domains.sort((a, b) => {
        const indexA = sortOrder.findIndex((item) => a.startsWith(item));
        const indexB = sortOrder.findIndex((item) => b.startsWith(item));
        return (
          (indexA === -1 ? sortOrder.length : indexA) -
          (indexB === -1 ? sortOrder.length : indexB)
        );
      });
    }
  );

  private _classesForArea(
    area: string[] | undefined,
    floor: string[] | undefined,
    label: string[] | undefined
  ): string[] {
    const extraEntities = this._config?.extra_entities || [];

    let entities = Object.values(this.hass!.entities).filter(
      (e) => !e.hidden && ALLOWED_DOMAINS.includes(computeDomain(e.entity_id))
    );

    if (area && area.length > 0) {
      entities = entities.filter(
        (e) =>
          area.includes(e.area_id as string) ||
          (e.device_id &&
            area.includes(this.hass!.devices[e.device_id]?.area_id as string))
      );
    } else if (floor && floor.length > 0) {
      const areasInFloor = Object.values(this.hass!.areas)
        .filter(
          (a) =>
            a.floor_id !== undefined && floor.includes(a.floor_id as string)
        )
        .map((a) => a.area_id);
      entities = entities.filter(
        (e) =>
          (e.area_id !== undefined && areasInFloor.includes(e.area_id)) ||
          (e.device_id &&
            this.hass!.devices[e.device_id]?.area_id !== undefined &&
            areasInFloor.includes(
              this.hass!.devices[e.device_id]!.area_id as string
            ))
      );
    }

    if (label && label.length > 0) {
      entities = entities.filter(
        (e) =>
          (e.labels && e.labels.some((l) => label.includes(l))) ||
          (e.device_id &&
            this.hass!.devices[e.device_id]?.labels &&
            this.hass!.devices[e.device_id]?.labels.some((l) =>
              label.includes(l)
            ))
      );
    }

    const domains = new Set(
      entities
        .map((e) => computeDomain(e.entity_id))
        .filter((d) => d !== "binary_sensor" && d !== "cover" && d !== "switch")
    );

    const deviceClassMap = new Map<string, Set<string>>();
    entities
      .filter((e) =>
        ["binary_sensor", "cover", "switch"].includes(
          computeDomain(e.entity_id)
        )
      )
      .forEach((e) => {
        const dom = computeDomain(e.entity_id);
        const deviceClass =
          this.hass!.states[e.entity_id]?.attributes.device_class || "";
        if (deviceClass) {
          if (!deviceClassMap.has(deviceClass)) {
            deviceClassMap.set(deviceClass, new Set());
          }
          deviceClassMap.get(deviceClass)!.add(dom);
        }
      });

    const formattedDeviceClasses = [...deviceClassMap.entries()].map(
      ([deviceClass, doms]) =>
        `${[...doms]
          .map((d) => this._formatDomain(d))
          .join(", ")} - ${deviceClass}`
    );

    return [...domains, ...formattedDeviceClasses, ...extraEntities];
  }

  private _formatDomain(domain: string): string {
    return domain
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private _buildOptions(
    type: "sensor" | "binary_sensor" | "toggle",
    possibleClasses: string[],
    currentClasses: string[]
  ): SelectOption[] {
    const allClasses = [...new Set([...possibleClasses, ...currentClasses])];

    const options = allClasses.map((entry) => {
      const match = entry.match(/^(.+?)\s*-\s*(.+)$/);

      if (match) {
        const domain = match[1].toLowerCase().replace(" ", "_");
        const deviceClass = match[2].toLowerCase();

        // Sonderfall für switch.switch
        if (domain === "switch" && deviceClass === "switch") {
          const translatedSwitch = this.hass!.localize(
            `component.switch.entity_component._.name`
          );
          return {
            value: entry,
            label: `${translatedSwitch} - ${translatedSwitch}`,
          };
        }

        const translatedDomain =
          this.hass!.localize(`component.${domain}.entity_component._.name`) ||
          match[1];

        const translatedDeviceClass =
          this.hass!.localize(
            `ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass}`
          ) || match[2];

        return {
          value: entry,
          label: `${translatedDomain} - ${translatedDeviceClass}`,
        };
      }

      return {
        value: entry,
        label:
          entry === "scene"
            ? "Scene"
            : type === "toggle"
            ? this.hass!.localize(
                `component.${entry}.entity_component._.name`
              ) || entry
            : this.hass!.localize(
                `component.${type}.entity_component.${entry}.name`
              ) || entry,
      };
    });

    options.sort((a, b) => {
      const aIsEntity = a.value.includes(".");
      const bIsEntity = b.value.includes(".");

      if (aIsEntity && !bIsEntity) return -1;
      if (!aIsEntity && bIsEntity) return 1;

      return caseInsensitiveStringCompare(
        a.label,
        b.label,
        this.hass!.locale.language
      );
    });

    return options;
  }

  private _itemChanged(
    ev: CustomEvent<Settings>,
    editorTarget: { index?: number } | undefined,
    customizationKey: "customization"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = editorTarget?.index;
    if (index != undefined) {
      const customization = [...(this._config.customization ?? [])];
      customization[index] = ev.detail;
      fireEvent(this, "config-changed", {
        config: { ...this._config, customization },
      });
    }
  }

  private _editItem(
    ev: CustomEvent<number>,
    editorKey: "Domain" | "Entity"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = ev.detail;

    this[`_subElementEditor${editorKey}`] = { index };
  }

  private _edit_itemDomain(ev: CustomEvent<number>): void {
    const index = ev.detail;
    const customizationArray = this._config.customization ?? [];
    const selectedOption = customizationArray[index];
    let editorKey: "Domain" | "Entity";

    if (
      selectedOption &&
      selectedOption.type &&
      selectedOption.type.includes(".")
    ) {
      editorKey = "Entity";
    } else {
      editorKey = "Domain";
    }

    this._editItem(ev, editorKey);
  }

  private _itemChangedDomain(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorDomain, "customization");
  }

  private _itemChangedEntity(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorEntity, "customization");
  }

  private _renderSubElementEditorDomain() {
    return this._renderSubElementEditor(
      "domain",
      this._goBackDomain,
      this._itemChangedDomain
    );
  }

  private _renderSubElementEditorEntity() {
    return this._renderSubElementEditor(
      "entity",
      this._goBackEntity,
      this._itemChangedEntity
    );
  }

  private _goBackDomain(): void {
    this._subElementEditorDomain = undefined;
  }

  private _goBackEntity(): void {
    this._subElementEditorEntity = undefined;
  }

  private _renderSubElementEditor(
    editorKey: "domain" | "entity",
    goBackHandler: () => void,
    itemChangedHandler: (ev: CustomEvent<Settings>) => void
  ) {
    const editorName = `_subElementEditor${
      editorKey.charAt(0).toUpperCase() + editorKey.slice(1)
    }` as keyof this;
    const editor = this[editorName] as SubElementEditor | undefined;

    const type =
      this._config?.customization?.[editor?.index ?? 0]?.type ?? "unknown";

    const match = type.match(/^(.+?)\s*-\s*(.+)$/);

    let localizedType = type;

    if (match) {
      const domain = match[1].toLowerCase().replace(" ", "_");
      const deviceClass = match[2].toLowerCase();

      // Sonderfall für switch.switch
      if (domain === "switch" && deviceClass === "switch") {
        const translatedSwitch = this.hass!.localize(
          `component.switch.entity_component._.name`
        );
        localizedType = `${translatedSwitch} - ${translatedSwitch}`;
      } else {
        const translatedDomain =
          this.hass!.localize(`component.${domain}.entity_component._.name`) ||
          match[1];

        const translatedDeviceClass =
          this.hass!.localize(
            `ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass}`
          ) || match[2];

        localizedType = `${translatedDomain} - ${translatedDeviceClass}`;
      }
    } else {
      localizedType =
        this.hass!.localize(`component.${type}.entity_component._.name`) ||
        type;
    }

    return html`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${goBackHandler}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title">${localizedType}</span>
        </div>
      </div>
      <status-item-editor
        .hass=${this.hass}
        .config=${this._config?.customization?.[editor?.index ?? 0] ?? {}}
        .getSchema=${editorKey}
        .index=${editor?.index ?? 0}
        @config-changed=${itemChangedHandler}
      >
      </status-item-editor>
    `;
  }

  private _customizationChanged(
    ev: CustomEvent<Settings[]>,
    customizationKey: "domain"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    fireEvent(this, "config-changed", {
      config: {
        ...this._config,
        customization: ev.detail,
      } as CardConfig,
    });
  }

  private _customizationChangedDomain(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, "domain");
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Loading...</div>`;
    }

    const toggleschema = this._toggleschema(this.toggleSelectOptions);

    const schema = this._schema(
      this._config!.filter ?? "",
      this._config!.label_filter ?? false,
      this._config!.hide_filter ?? "",
      this._config!.multiple_areas ?? false,
      this._config!.multiple_floors ?? false
    );

    const possibleToggleDomains = this._toggleDomainsForArea(
      this._config.area || [],
      this._config.floor || [],
      this._config.label || []
    );

    const data = {
      content: possibleToggleDomains,
      ...this._config,
    };

    if (this._subElementEditorDomain)
      return this._renderSubElementEditorDomain();
    if (this._subElementEditorEntity)
      return this._renderSubElementEditorEntity();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon class="secondary" .path=${mdiTextBoxEdit}></ha-svg-icon>
          ${this.computeLabel.bind(this)({ name: "edit_domains_dc" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${toggleschema}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <status-items-editor
            .hass=${this.hass}
            .customization=${this._config.customization}
            .SelectOptions=${this.contentSelectOptions}
            @edit-item=${this._edit_itemDomain}
            @config-changed=${this._customizationChangedDomain}
          >
          </status-items-editor>
        </div>
      </ha-expansion-panel>
    `;
  }

  static get styles() {
    return css`
      .secondary {
        color: var(--secondary-text-color);
      }
      .main {
        margin: 5px 0;
        --ha-card-border-radius: 6px;
        margin-top: 24px;
      }
      .content {
        margin: 10px 0px;
      }
      .title {
        font-size: 18px;
      }
      .back-title {
        display: flex;
        align-items: center;
        font-size: 18px;
        gap: 0.5em;
      }
      ha-icon {
        display: flex;
      }
      .header {
        margin-bottom: 0.5em;
      }
    `;
  }
}
