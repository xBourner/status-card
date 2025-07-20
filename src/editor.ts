import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, computeDomain } from "custom-card-helpers";
import { computeLabelCallback } from "./translations";
import { ALLOWED_DOMAINS, sortOrder, DataStore } from "./properties";
import memoizeOne from "memoize-one";
import {
  caseInsensitiveStringCompare,
  fireEvent,
  _formatDomain,
  CardConfig,
  CustomizationConfig,
  Schema,
  SubElementConfig,
  UiAction,
  SelectOption,
  SubElementEditor,
  SmartGroupItem,
} from "./helpers";
import {
  mdiFormatListGroupPlus,
  mdiTextBoxEdit,
  mdiClose,
  mdiChevronLeft,
} from "@mdi/js";
import "./items-editor";
import "./item-editor";

@customElement("status-card-editor")
export class StatusCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public _config!: CardConfig;
  @state() private _subElementEditorDomain: SubElementConfig | undefined =
    undefined;
  @state() private _subElementEditorEntity: SubElementConfig | undefined =
    undefined;
  @state() private rulesets: Array<{
    group_id: string;
    group_icon: string;
    group_status?: string;
    rules: Array<{ key: string; value: any }>;
  }> = [
    {
      group_id: "",
      group_icon: "",
      group_status: "",
      rules: [{ key: "", value: "" }],
    },
  ];

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
    this._loadRulesetsFromConfig();
  }

  private _updateAreaFloorInConfig(): void {
    if (!this._config || !this._config.filter) return;

    const area = "area";
    const floor = "floor";

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

    let updated = false;

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
        updated = true;
      }

      const oldConfig = changedProperties.get("_config") as typeof this._config;
      const oldExtraEntities = oldConfig?.extra_entities ?? [];
      const newExtraEntities = this._config.extra_entities ?? [];
      const oldContent = oldConfig?.content ?? [];
      const newContent = this._config.content ?? [];

      const currentArea = Array.isArray(this._config.area)
        ? [...this._config.area]
        : this._config.area
        ? [this._config.area]
        : [];

      const currentFloor = Array.isArray(this._config.floor)
        ? [...this._config.floor]
        : this._config.floor
        ? [this._config.floor]
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
      const labelsChanged = !this.arraysEqual(previousLabel, currentLabel);
      const floorsChanged = !this.arraysEqual(previousFloor, currentFloor);
      const areasChanged = !this.arraysEqual(previousArea, currentArea);

      if (areasChanged || floorsChanged || labelsChanged) {
        const possibleToggleDomains = this._memoizedClassesForArea(
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

        updated = true;
      }

      if (this._config.rulesets && Array.isArray(this._config.rulesets)) {
        const validGroupIds = this._config.rulesets
          .filter((g) =>
            Object.keys(g).some(
              (key) =>
                key !== "group_id" &&
                key !== "group_icon" &&
                key !== "group_status" &&
                g[key] !== undefined &&
                g[key] !== ""
            )
          )
          .map((g) => g.group_id)
          .filter((id) => id && id.length > 1);

        let content = Array.isArray(this._config.content)
          ? [...this._config.content]
          : [];

        content = content.filter((entry) => !validGroupIds.includes(entry));

        const extraEntities = this._config.extra_entities ?? [];
        let insertPos = 0;
        for (let i = 0; i < content.length; i++) {
          if (!extraEntities.includes(content[i])) {
            insertPos = i;
            break;
          }
          insertPos = i + 1;
        }

        content = [
          ...content.slice(0, insertPos),
          ...validGroupIds.filter((id) => !content.includes(id)),
          ...content.slice(insertPos),
        ];

        if (!this.arraysEqual(content, this._config.content ?? [])) {
          this._config = {
            ...this._config,
            content,
          };
          updated = true;
        }
      }

      if (!this.arraysEqual(oldExtraEntities, newExtraEntities)) {
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

        if (!this.arraysEqual(content, newContent)) {
          this._config = {
            ...this._config,
            content,
          };
          updated = true;
        }
      }

      if (!this.arraysEqual(oldContent, newContent)) {
        let extraEntities = [...newExtraEntities];
        extraEntities = extraEntities.filter((ent) => newContent.includes(ent));

        if (!this.arraysEqual(extraEntities, newExtraEntities)) {
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
                {
                  name: "square",
                  selector: { boolean: {} },
                },
                {
                  name: "show_total_entities",
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
              name: "no_scroll",
              selector: { boolean: {} },
            },
            {
              name: "content_layout",
              required: true,
              selector: {
                select: {
                  mode: "box",
                  options: ["vertical", "horizontal"].map((value) => ({
                    label: this.hass!.localize(
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
                  selector: { select: { options: [entity, label, area] } },
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
            ...(HideFilter === area
              ? ([
                  {
                    name: "hidden_areas",
                    selector: { area: { multiple: true } },
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
      this._memoizedClassesForArea(
        this._config!.area || [],
        this._config!.floor || [],
        this._config!.label || []
      ),
      this._config?.content || []
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

  private arraysEqual<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && new Set(a).size === new Set(b).size;
  }

  private _memoizedClassesForArea = memoizeOne(
    (area: string[], floor: string[], label: string[]): string[] => {
      return this._classesForArea(area, floor, label);
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

   const deviceClassDomainPairs = new Set<string>();
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
          deviceClassDomainPairs.add(`${_formatDomain(dom)} - ${deviceClass}`);
        }
      });

    const formattedDeviceClasses = [...deviceClassDomainPairs];

    return [...domains, ...formattedDeviceClasses, ...extraEntities].sort(
      (a, b) => {
        const indexA = sortOrder.findIndex((item) => a.startsWith(item));
        const indexB = sortOrder.findIndex((item) => b.startsWith(item));
        return (
          (indexA === -1 ? sortOrder.length : indexA) -
          (indexB === -1 ? sortOrder.length : indexB)
        );
      }
    );
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
    ev: CustomEvent<CustomizationConfig>,
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

  private _itemChangedDomain(ev: CustomEvent<CustomizationConfig>): void {
    this._itemChanged(ev, this._subElementEditorDomain, "customization");
  }

  private _itemChangedEntity(ev: CustomEvent<CustomizationConfig>): void {
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
    itemChangedHandler: (ev: CustomEvent<CustomizationConfig>) => void
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
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${mdiChevronLeft}
            @click=${goBackHandler}
          ></ha-icon-button>
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
    ev: CustomEvent<CustomizationConfig[]>,
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

  private _customizationChangedDomain(
    ev: CustomEvent<CustomizationConfig[]>
  ): void {
    this._customizationChanged(ev, "domain");
  }

  private _loadRulesetsFromConfig(): void {
    this.rulesets = (this._config.rulesets ?? []).map((group: any) => {
      const rules = Object.keys(group)
        .filter(
          (key) =>
            key !== "group_id" &&
            key !== "group_icon" &&
            key !== "group_status" &&
            group[key] !== undefined
        )
        .map((key) => ({
          key,
          value: group[key] ?? "",
        }));

      if (rules.length === 0 || rules[rules.length - 1]?.key !== "") {
        rules.push({ key: "", value: "" });
      }

      return {
        group_id: group.group_id ?? "",
        group_icon: group.group_icon ?? "",
        group_status: group.group_status ?? "",
        rules,
      };
    });
  }

  private _saveRulesetsToConfig(): void {
    const rulesetsConfig = this.rulesets.map((group) => {
      const rules = group.rules.reduce((acc, rule) => {
        if (rule.key && rule.key !== "") {
          acc[rule.key] = rule.value ?? "";
        }
        return acc;
      }, {} as Record<string, any>);

      return {
        group_id: group.group_id ?? "",
        group_icon: group.group_icon ?? "",
        group_status: group.group_status ?? "",
        ...rules,
      };
    });

    this._config = {
      ...this._config,
      rulesets: rulesetsConfig,
    };

    fireEvent(this, "config-changed", { config: this._config });
  }

  private _updateConfigFromRulesets(): void {
    this._saveRulesetsToConfig();
  }

  private get ruleKeySelector() {
    const options: [string, string][] = [
      [
        "area",
        this.hass.localize("ui.components.selectors.selector.types.area"),
      ],
      [
        "attributes",
        this.hass.localize("ui.components.selectors.selector.types.attribute"),
      ],
      [
        "device",
        this.hass.localize("ui.components.selectors.selector.types.device"),
      ],
      [
        "domain",
        this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain"),
      ],
      [
        "entity_category",
        this.hass.localize("ui.components.category-picker.category"),
      ],
      [
        "entity_id",
        this.hass.localize("ui.dialogs.entity_registry.editor.entity_id"),
      ],
      ["floor", this.hass.localize("ui.components.floor-picker.floor")],
      ["group", this.hass.localize("component.group.entity_component._.name")],
      ["hidden_by", "Hidden by"],
      [
        "integration",
        this.hass.localize("ui.components.related-items.integration"),
      ],
      ["label", this.hass.localize("ui.components.label-picker.label")],
      [
        "last_changed",
        this.hass.localize("ui.components.state-content-picker.last_changed"),
      ],
      [
        "last_triggered",
        this.hass.localize(
          "component.automation.entity_component._.state_attributes.last_triggered.name"
        ),
      ],
      [
        "last_updated",
        this.hass.localize("ui.components.state-content-picker.last_updated"),
      ],
      ["device_manufacturer", "Manufacturer"],
      ["device_model", "Model"],
      ["name", this.hass.localize("ui.common.name")],
      [
        "state",
        this.hass.localize("ui.components.selectors.selector.types.state"),
      ],
    ];

    options.sort((a, b) => a[1].localeCompare(b[1], this.hass.locale.language));

    return {
      type: "select",
      options,
    };
  }

  private filterValueSelector: { [key: string]: any } = {
    attributes: { object: {} },
    area: { area: {} },
    device: { device: {} },
    entity_id: { entity: {} },
    entity_category: {
      select: { options: ["config", "diagnostic"], mode: "dropdown" },
    },
    floor: { floor: {} },
    group: { entity: { filter: { domain: "group" } } },
    hidden_by: {
      select: { options: ["user", "integration"], mode: "dropdown" },
    },
    integration: { config_entry: {} },
    label: { label: {} },
  };

  private getGroupSchema(group: SmartGroupItem) {
    return [
      {
        name: "group_id",
        selector: { text: {} },
      },
      {
        name: "group_icon",
        selector: { icon: {} },
      },
      {
        name: "group_status",
        selector: { text: {} },
      },
      ...group.rules.map((rule, idx) => {
        const usedKeys = group.rules
          .map((r, i) => (i !== idx ? r.key : null))
          .filter((k) => k);

        const availableOptions = this.ruleKeySelector.options.filter(
          ([key]) => !usedKeys.includes(key) || key === rule.key
        );

        return {
          type: "grid",
          schema: [
            {
              type: "select",
              name: `key_${idx}`,
              options: availableOptions,
            },
            {
              name: `value_${idx}`,
              selector: this.filterValueSelector[rule.key] ?? { text: {} },
            },
          ],
        };
      }),
    ];
  }

  private _groupFormData(group: SmartGroupItem) {
    const data: Record<string, any> = {
      group_id: group.group_id,
      group_icon: group.group_icon,
      group_status: group.group_status ?? "",
    };
    group.rules.forEach((rule, idx) => {
      data[`key_${idx}`] = rule.key;
      data[`value_${idx}`] = rule.value;
    });
    return data;
  }

  private _groupValueChanged(ev: CustomEvent, idx: number): void {
    const { value } = ev.detail;

    const rules = Object.keys(value)
      .filter((key) => key.startsWith("key_"))
      .map((key) => {
        const index = key.split("_")[1];
        return {
          key: value[`key_${index}`] ?? "",
          value: value[`value_${index}`] ?? "",
        };
      });

    if (rules.length === 0 || rules[rules.length - 1]?.key !== "") {
      rules.push({ key: "", value: "" });
    }

    this.rulesets = this.rulesets.map((group, groupIndex) =>
      groupIndex === idx
        ? {
            group_id: value.group_id ?? "",
            group_icon: value.group_icon ?? "",
            group_status: value.group_status ?? "",
            rules,
          }
        : group
    );

    this._updateConfigFromRulesets();
  }

  private _addRuleset = () => {
    this.rulesets = [
      ...this.rulesets,
      { group_id: "", group_icon: "", rules: [{ key: "", value: "" }] },
    ];
  };

  private _removeRuleset = (idx: number) => {
    this.rulesets = this.rulesets.filter((_, i) => i !== idx);
    this._updateConfigFromRulesets();
  };

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

    const possibleToggleDomains = this._memoizedClassesForArea(
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
          <ha-svg-icon
            class="secondary"
            .path=${mdiFormatListGroupPlus}
          ></ha-svg-icon>
          Smart Groups
        </div>
        <div class="content">
          ${this.rulesets.map(
            (group, i) => html`
              <ha-expansion-panel class="group-panel main" outlined>
                <div slot="header" class="group-header">
                  ${group.group_id
                    ? group.group_id
                    : `${this.hass.localize(
                        "component.group.entity_component._.name"
                      )} ${i + 1}`}
                  <span class="group-actions">
                    <ha-icon-button
                      slot="trigger"
                      .label=${this.hass.localize("ui.common.remove")}
                      .path=${mdiClose}
                      @click=${() => this._removeRuleset(i)}
                    ></ha-icon-button>
                  </span>
                </div>
                <div class="content">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._groupFormData(group)}
                    .schema=${this.getGroupSchema(group)}
                    .computeLabel=${this.computeLabel}
                    @value-changed=${(ev: CustomEvent) =>
                      this._groupValueChanged(ev, i)}
                  ></ha-form>
                </div>
              </ha-expansion-panel>
            `
          )}
          <div class="add-group-row">
            <ha-button
              slot="trigger"
              .label=${this.hass.localize("ui.common.add")}
              raised
              @click=${this._addRuleset}
            ></ha-button>
          </div>
        </div>
      </ha-expansion-panel>

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
      .group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .group-actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .add-group-row {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }
    `;
  }
}
