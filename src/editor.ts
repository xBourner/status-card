import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  HomeAssistant,
  computeDomain,
  caseInsensitiveStringCompare,
  LovelaceCardConfig,
  fireEvent,
  SelectOption,
  Schema,
  UiAction,
} from "./ha";
import { computeLabelCallback } from "./translations";
import memoizeOne from "memoize-one";
import {
  SubElementConfig,
  SubElementEditor,
  SmartGroupItem,
  computeEntitiesByDomain,
  arraysEqualUnordered,
  compareByFriendlyName,
  ALLOWED_DOMAINS,
  DOMAIN_ICONS,
} from "./helpers";
import {
  mdiFormatListGroupPlus,
  mdiTextBoxEdit,
  mdiClose,
  mdiChevronLeft,
  mdiEyeOff,
  mdiEye,
} from "@mdi/js";
import "./items-editor";
import "./item-editor";

@customElement("status-card-editor")
export class StatusCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public lovelace?: any;
  @property({ type: Object }) public _config!: LovelaceCardConfig;
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

  setConfig(config: LovelaceCardConfig) {
    this._config = {
      ...config,
      columns: config.columns ?? 4,
      hide_person: config.hide_person ?? false,
      list_mode: config.list_mode ?? false,
      hide_content_name: config.hide_content_name ?? false,
      customization: config.customization ?? [],
    };

    if (Array.isArray(this._config.content)) {
      this._config = {
        ...this._config,
        content: this._config.content.map((v) =>
          this._normalizeContentEntry(v)
        ),
      };
    }

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

  private _groupPreviousIds: Map<number, string> = new Map();

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

      if (
        this._config.hide_filter &&
        !["entity", "label", "area"].includes(this._config.hide_filter)
      ) {
        const map = new Map<string, string>([
          [this.computeLabel({ name: "entity" }), "entity"],
          [this.computeLabel({ name: "label" }), "label"],
          [this.computeLabel({ name: "area" }), "area"],
        ]);
        const mapped = map.get(this._config.hide_filter);
        if (mapped) {
          this._config = { ...this._config, hide_filter: mapped as any };
          updated = true;
        }
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
      const labelsChanged = !arraysEqualUnordered(previousLabel, currentLabel);
      const floorsChanged = !arraysEqualUnordered(previousFloor, currentFloor);
      const areasChanged = !arraysEqualUnordered(previousArea, currentArea);

      if (areasChanged || floorsChanged || labelsChanged) {
        const possibleToggleDomains = this.possibleToggleDomains;
        const dynamicOrder: string[] = [];
        for (const domain of Object.keys(DOMAIN_ICONS)) {
          const icons = DOMAIN_ICONS[domain];
          for (const key of Object.keys(icons)) {
            if (key !== "on" && key !== "off") {
              dynamicOrder.push(`${domain} - ${key}`);
            }
          }
          dynamicOrder.push(domain);
        }
        const sortedToggleDomains = possibleToggleDomains
          .map((a) => this._normalizeContentEntry(a))
          .sort((a, b) => {
            const indexA = dynamicOrder.indexOf(a);
            const indexB = dynamicOrder.indexOf(b);
            return (
              (indexA === -1 ? dynamicOrder.length : indexA) -
              (indexB === -1 ? dynamicOrder.length : indexB)
            );
          });

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

        if (!arraysEqualUnordered(content, this._config.content ?? [])) {
          this._config = {
            ...this._config,
            content,
          };
          updated = true;
        }
      }

      if (!arraysEqualUnordered(oldExtraEntities, newExtraEntities)) {
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

        if (!arraysEqualUnordered(content, newContent)) {
          this._config = {
            ...this._config,
            content,
          };
          updated = true;
        }
      }

      if (!arraysEqualUnordered(oldContent, newContent)) {
        let extraEntities = [...newExtraEntities];
        extraEntities = extraEntities.filter((ent) => newContent.includes(ent));

        if (!arraysEqualUnordered(extraEntities, newExtraEntities)) {
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
      MultipleAreas: boolean,
      MultipleFloors: boolean
    ) => {
      const area = this.computeLabel({ name: "area" });
      const floor = this.computeLabel({ name: "floor" });
      const name = this.computeLabel({ name: "name" });
      const state = this.computeLabel({ name: "state" });

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
              ],
            },
            {
              name: "",
              type: "grid",
              schema: [
                { name: "theme", required: false, selector: { theme: {} } },
              ],
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
          name: "popup",
          flatten: true,
          type: "expandable",
          icon: "mdi:arrange-bring-forward",
          schema: [
            {
              name: "ungroup_areas",
              selector: { boolean: {} },
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
            { name: "list_mode", selector: { boolean: {} } },
            {
              name: "columns",
              required: false,
              selector: { number: { min: 1, max: 4, mode: "box" } },
            },
          ],
        },
      ];
    }
  );

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

  private _entitiesSchema = memoizeOne((HideFilter: string) => {
    const areaLabel = this.computeLabel({ name: "area" });
    const labelLabel = this.computeLabel({ name: "label" });
    const entityLabel = this.computeLabel({ name: "entity" });
    return [
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
            selector: {
              select: {
                options: [
                  { value: "entity", label: entityLabel },
                  { value: "label", label: labelLabel },
                  { value: "area", label: areaLabel },
                ],
              },
            },
          },
        ],
      },
      ...(HideFilter === "label"
        ? ([
            {
              name: "hidden_labels",
              selector: { label: { multiple: true } },
            },
          ] as const)
        : []),
      ...(HideFilter === "area"
        ? ([
            {
              name: "hidden_areas",
              selector: { area: { multiple: true } },
            },
          ] as const)
        : []),
    ];
  });

  private _valueChanged(event: CustomEvent) {
    const next = event.detail.value;
    if (Array.isArray(next?.content)) {
      next.content = next.content.map((v: string) =>
        this._normalizeContentEntry(v)
      );
    }
    this._config = next;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
      })
    );
  }

  private get possibleToggleDomains(): string[] {
    return this._memoizedClassesForArea(
      this._config?.area || [],
      this._config?.floor || [],
      this._config?.label || []
    );
  }

  public get toggleSelectOptions(): SelectOption[] {
    return this._buildToggleOptions(
      this.possibleToggleDomains,
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

  private _parseTypePair(
    type: string
  ): { domain: string; deviceClass?: string } | null {
    const match = type.match(/^(.+?)\s*-\s*(.+)$/);
    if (!match) return null;
    const domain = match[1].toLowerCase().replace(/\s+/g, "_");
    const deviceClass = match[2].toLowerCase();
    return { domain, deviceClass };
  }

  private _normalizeContentEntry(type: string): string {
    if (type.includes(".")) return type;
    const pair = this._parseTypePair(type);
    if (pair) {
      const { domain, deviceClass } = pair;
      if (DOMAIN_ICONS[domain] || ALLOWED_DOMAINS.includes(domain)) {
        return `${domain} - ${deviceClass}`;
      }
      return type;
    }
    const norm = type.trim().toLowerCase().replace(/\s+/g, "_");
    if (DOMAIN_ICONS[norm] || ALLOWED_DOMAINS.includes(norm)) {
      return norm;
    }
    return type;
  }

  private _labelForTypePair(type: string): string {
    if (type.includes(".")) {
      const st = this.hass?.states?.[type];
      return (st?.attributes?.friendly_name as string) || type;
    }

    const pair = this._parseTypePair(type);

    if (pair) {
      const { domain, deviceClass } = pair;
      if (domain === "switch" && deviceClass === "switch") {
        const translatedSwitch = this.hass!.localize(
          `component.switch.entity_component._.name`
        );
        return `${translatedSwitch} - ${translatedSwitch}`;
      }
      const translatedDomain =
        this.hass!.localize(`component.${domain}.entity_component._.name`) ||
        domain;
      const translatedDeviceClass =
        this.hass!.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass}`
        ) || deviceClass;
      return `${translatedDomain} - ${translatedDeviceClass}`;
    }

    if (type === "scene") return "Scene";
    return (
      this.hass!.localize(`component.${type}.entity_component._.name`) || type
    );
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
          e.labels?.some((l) => label.includes(l)) ||
          (e.device_id &&
            Array.isArray(this.hass!.devices[e.device_id]?.labels) &&
            this.hass!.devices[e.device_id]!.labels!.some((l) =>
              label.includes(l)
            ))
      );
    }

    const dynamicOrder: string[] = [];
    for (const domain of Object.keys(DOMAIN_ICONS)) {
      const icons = DOMAIN_ICONS[domain];
      for (const key of Object.keys(icons)) {
        if (key !== "on" && key !== "off") {
          dynamicOrder.push(`${domain} - ${key}`);
        }
      }
      dynamicOrder.push(domain);
    }

    const domains = new Set(
      entities
        .map((e) => computeDomain(e.entity_id))
        .filter((d) => d !== "binary_sensor" && d !== "cover" && d !== "switch")
        .map((d) => d)
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
          deviceClassDomainPairs.add(`${dom} - ${deviceClass}`);
        }
      });

    const formattedDeviceClasses = [...deviceClassDomainPairs];

    return [...domains, ...formattedDeviceClasses, ...extraEntities].sort(
      (a, b) => {
        const indexA = dynamicOrder.indexOf(a);
        const indexB = dynamicOrder.indexOf(b);
        return (
          (indexA === -1 ? dynamicOrder.length : indexA) -
          (indexB === -1 ? dynamicOrder.length : indexB)
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

    const states = this.hass?.states || {};
    const labelCache = new Map<string, string>();
    const options = allClasses.map((entry) => {
      if (labelCache.has(entry)) {
        return { value: entry, label: labelCache.get(entry)! };
      }
      let label: string;
      if (entry.includes(".")) {
        label = (states[entry]?.attributes?.friendly_name as string) || entry;
      } else if (entry === "scene") {
        label = "Scene";
      } else {
        label = this._labelForTypePair(entry);
      }
      labelCache.set(entry, label);
      return { value: entry, label };
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
    ev: CustomEvent<LovelaceCardConfig>,
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

  private _itemChangedDomain(ev: CustomEvent<LovelaceCardConfig>): void {
    this._itemChanged(ev, this._subElementEditorDomain, "customization");
  }

  private _itemChangedEntity(ev: CustomEvent<LovelaceCardConfig>): void {
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
    itemChangedHandler: (ev: CustomEvent<LovelaceCardConfig>) => void
  ) {
    const editorName = `_subElementEditor${
      editorKey.charAt(0).toUpperCase() + editorKey.slice(1)
    }` as keyof this;
    const editor = this[editorName] as SubElementEditor | undefined;

    const type =
      this._config?.customization?.[editor?.index ?? 0]?.type ?? "unknown";

    const localizedType = this._labelForTypePair(type);

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
        .lovelace=${this.lovelace}
        .config=${this._config?.customization?.[editor?.index ?? 0] ?? {}}
        .getSchema=${editorKey}
        .index=${editor?.index ?? 0}
        @config-changed=${itemChangedHandler}
      >
      </status-item-editor>
    `;
  }

  private _customizationChanged(
    ev: CustomEvent<LovelaceCardConfig[]>,
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
      } as LovelaceCardConfig,
    });
  }

  private _customizationChangedDomain(
    ev: CustomEvent<LovelaceCardConfig[]>
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

    this._groupPreviousIds.clear();
    this.rulesets.forEach((g, i) =>
      this._groupPreviousIds.set(i, g.group_id || "")
    );
  }

  private _commitRulesets(): void {
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

    const contentOrig = Array.isArray(this._config?.content)
      ? [...(this._config.content as any[])]
      : [];

    const idMap = new Map<string, string>();
    rulesetsConfig.forEach((rs, idx) => {
      const newId = rs.group_id ?? "";
      const oldId = this._groupPreviousIds.get(idx) ?? "";
      if (oldId && oldId !== newId) {
        idMap.set(oldId, newId);
      }
    });

    const seen = new Set<string>();
    const content: string[] = [];
    for (const c of contentOrig) {
      const replaced = idMap.get(c) ?? c;
      if (!seen.has(replaced)) {
        seen.add(replaced);
        content.push(replaced);
      }
    }

    this._config = {
      ...this._config,
      rulesets: rulesetsConfig,
      content,
    };

    this._groupPreviousIds.clear();
    rulesetsConfig.forEach((rs, i) =>
      this._groupPreviousIds.set(i, rs.group_id ?? "")
    );

    fireEvent(this, "config-changed", { config: this._config });
  }

  private _updateConfigFromRulesets(): void {
    this._commitRulesets();
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

    const newGroup = {
      group_id: value.group_id ?? "",
      group_icon: value.group_icon ?? "",
      group_status: value.group_status ?? "",
      rules,
    };

    this.rulesets = this.rulesets.map((group, groupIndex) =>
      groupIndex === idx ? newGroup : group
    );

    const currentGroup = this.rulesets[idx] ?? {
      group_id: "",
      group_icon: "",
      group_status: "",
      rules: [],
    };
    const currentForm = this._groupFormData(currentGroup as SmartGroupItem);
    const otherFieldsChanged = Object.keys(value).some((k) => {
      if (k === "group_id") return false;
      return value[k] !== (currentForm as any)[k];
    });

    if (!otherFieldsChanged) {
      this._groupDrafts.add(idx);
      return;
    }

    this._groupDrafts.delete(idx);
    this._updateConfigFromRulesets();
  }

  private _groupDrafts: Set<number> = new Set();

  private _groupFormBlur(idx: number) {
    if (this._groupDrafts.has(idx)) {
      this._groupDrafts.delete(idx);
      this._updateConfigFromRulesets();
    }
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

  private _groupAllEntitiesByDomain(): Array<{
    domain: string;
    entities: string[];
  }> {
    const regEntities = Object.values((this.hass as any)?.entities || {});
    const devices = Object.values((this.hass as any)?.devices || {});
    const areas = this.hass?.areas ? Object.values(this.hass.areas) : [];

    const filters = {
      area: Array.isArray(this._config?.area)
        ? (this._config!.area as string[])
        : this._config?.area
        ? [this._config.area]
        : [],
      floor: Array.isArray(this._config?.floor)
        ? (this._config!.floor as string[])
        : this._config?.floor
        ? [this._config.floor]
        : [],
      label: Array.isArray(this._config?.label)
        ? (this._config!.label as string[])
        : [],
      hiddenAreas: this._config?.hidden_areas ?? [],
      hiddenLabels: this._config?.hidden_labels ?? [],
      hiddenEntities: this._config?.hidden_entities ?? [],
    };

    const byDomain = computeEntitiesByDomain(
      regEntities as any,
      devices as any,
      areas as any,
      this.hass?.states || {},
      filters,
      ALLOWED_DOMAINS
    );

    const visible: Record<string, string[]> = Object.fromEntries(
      Object.entries(byDomain).map(([d, ents]) => [
        d,
        ents.map((e) => e.entity_id),
      ])
    );

    const hidden = this._hiddenEntitiesByDomain();
    const states = this.hass?.states || {};

    const domains = Array.from(
      new Set([...Object.keys(visible), ...Object.keys(hidden)])
    ).filter((d) => ALLOWED_DOMAINS.includes(d));

    const cmpByFriendly = compareByFriendlyName(
      states,
      this.hass!.locale.language
    );

    return domains
      .sort((a, b) => a.localeCompare(b))
      .map((domain) => {
        const merged = new Set<string>([
          ...(visible[domain] || []),
          ...(hidden[domain] || []),
        ]);
        return { domain, entities: Array.from(merged).sort(cmpByFriendly) };
      });
  }

  private _domainLabel(domain: string): string {
    return (
      this.hass?.localize?.(`component.${domain}.entity_component._.name`) ||
      domain
    );
  }

  private _isHiddenEntity(entity_id: string): boolean {
    const list = this._config?.hidden_entities ?? [];
    return Array.isArray(list) && list.includes(entity_id);
  }

  private _toggleEntityHidden = (entity_id: string) => {
    const current = new Set(this._config?.hidden_entities ?? []);
    if (current.has(entity_id)) current.delete(entity_id);
    else current.add(entity_id);
    const hidden_entities = Array.from(current);
    this._config = {
      ...(this._config || ({} as any)),
      hidden_entities,
    } as LovelaceCardConfig;
    fireEvent(this, "config-changed", { config: { ...this._config } });
  };

  private _getDeviceClassLabel(domain: string, deviceClass: string): string {
    if (!deviceClass || deviceClass === "other")
      return (
        this.hass.localize("ui.dialogs.helper_settings.generic.other") ??
        "Other"
      );
    const key = `ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass}`;
    return this.hass.localize(key) || deviceClass;
  }

  private _groupByDeviceClass(
    domain: string,
    entities: string[]
  ): Array<{ deviceClass: string; label: string; entities: string[] }> {
    const states = this.hass?.states || {};
    const map: Record<string, string[]> = {};
    for (const id of entities) {
      const dc = (states[id]?.attributes?.device_class as string) || "";
      if (!dc) continue;
      if (!map[dc]) map[dc] = [];
      map[dc].push(id);
    }
    const cmpByFriendly = compareByFriendlyName(
      states,
      this.hass!.locale.language
    );
    const deviceClasses = Object.keys(map).sort((a, b) => a.localeCompare(b));
    return deviceClasses.map((dc) => ({
      deviceClass: dc,
      label: this._getDeviceClassLabel(domain, dc),
      entities: map[dc].slice().sort(cmpByFriendly),
    }));
  }

  private _hiddenEntitiesByDomain(): Record<string, string[]> {
    const res: Record<string, string[]> = {};
    const hidden = Array.isArray(this._config?.hidden_entities)
      ? (this._config!.hidden_entities as string[])
      : [];
    if (hidden.length === 0) return res;

    const entitiesReg = (this.hass as any)?.entities || {};
    const devices = (this.hass as any)?.devices || {};
    const areasArrAll = this.hass?.areas ? Object.values(this.hass.areas) : [];

    const areaFilter = this._config?.area;
    const floorFilter = this._config?.floor;
    const labelFilter = this._config?.label;

    const areasSel = areaFilter
      ? Array.isArray(areaFilter)
        ? areaFilter
        : [areaFilter]
      : [];
    const floorsSel = floorFilter
      ? Array.isArray(floorFilter)
        ? floorFilter
        : [floorFilter]
      : [];
    const labelsSel = labelFilter
      ? Array.isArray(labelFilter)
        ? labelFilter
        : [labelFilter]
      : [];

    for (const id of hidden) {
      const domain = computeDomain(id);
      if (!ALLOWED_DOMAINS.includes(domain)) continue;

      const reg = (entitiesReg as any)[id];
      const dev = reg?.device_id ? (devices as any)[reg.device_id] : undefined;

      const hasAnyArea = reg?.area_id != null || dev?.area_id != null;
      if (!hasAnyArea) continue;

      if (labelsSel.length) {
        const ok =
          (Array.isArray(reg?.labels) &&
            reg.labels.some((l: string) => labelsSel.includes(l))) ||
          (Array.isArray(dev?.labels) &&
            dev.labels.some((l: string) => labelsSel.includes(l)));
        if (!ok) continue;
      }

      if (areasSel.length) {
        const ok =
          (reg?.area_id && areasSel.includes(reg.area_id)) ||
          (dev?.area_id && areasSel.includes(dev.area_id));
        if (!ok) continue;
      }

      if (floorsSel.length) {
        const regAreaOk =
          reg?.area_id &&
          areasArrAll.some(
            (a) =>
              a.area_id === reg.area_id &&
              a.floor_id &&
              floorsSel.includes(a.floor_id as any)
          );
        const devAreaOk =
          dev?.area_id &&
          areasArrAll.some(
            (a) =>
              a.area_id === dev.area_id &&
              a.floor_id &&
              floorsSel.includes(a.floor_id as any)
          );
        if (!regAreaOk && !devAreaOk) continue;
      }

      if (!res[domain]) res[domain] = [];
      res[domain].push(id);
    }

    return res;
  }

  private _domainIcon(
    domain: string,
    state: string = "on",
    deviceClass?: string
  ): string {
    const icons: any = DOMAIN_ICONS as any;
    if (domain in icons) {
      const def = icons[domain];
      if (typeof def === "string") return def;
      if (deviceClass && def[deviceClass])
        return (
          def[deviceClass][state === "off" ? "off" : "on"] || def[deviceClass]
        );
      return def[state === "off" ? "off" : "on"] || Object.values(def)[0];
    }
    return "mdi:help-circle";
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Loading...</div>`;
    }

    const toggleschema = this._toggleschema(this.toggleSelectOptions);

    const schema = this._schema(
      this._config!.filter ?? "",
      this._config!.label_filter ?? false,
      this._config!.multiple_areas ?? false,
      this._config!.multiple_floors ?? false
    );

    const possibleToggleDomains = this.possibleToggleDomains;

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
          ${this.hass.localize("ui.panel.lovelace.editor.card.entities.name") ??
          "Entities"}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${this._entitiesSchema(this._config?.hide_filter ?? "")}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>

          ${(this._config?.hide_filter ?? "") === "entity"
            ? html`
                ${this._groupAllEntitiesByDomain().map(
                  (group) => html`
                    <ha-expansion-panel outlined class="domain-panel">
                      <div slot="header" class="domain-header">
                        <ha-icon
                          .icon=${this._domainIcon(group.domain, "on")}
                        ></ha-icon>
                        <span class="domain-title"
                          >${this._domainLabel(group.domain)}</span
                        >
                      </div>
                      <div class="content">
                        ${["binary_sensor", "cover"].includes(group.domain)
                          ? this._groupByDeviceClass(
                              group.domain,
                              group.entities
                            ).map(
                              (sub) => html`
                                <ha-expansion-panel
                                  outlined
                                  class="domain-panel"
                                >
                                  <div slot="header" class="dc-header">
                                    <ha-icon
                                      .icon=${this._domainIcon(
                                        group.domain,
                                        "on"
                                      )}
                                    ></ha-icon>
                                    <span class="dc-title">${sub.label}</span>
                                  </div>
                                  <div class="content">
                                    ${sub.entities.map(
                                      (id) => html`
                                        <div class="entity-row">
                                          <span class="entity-name">
                                            ${this.hass.states[id]?.attributes
                                              ?.friendly_name || id}
                                          </span>
                                          <ha-icon-button
                                            .path=${this._isHiddenEntity(id)
                                              ? mdiEye
                                              : mdiEyeOff}
                                            .label=${this._isHiddenEntity(id)
                                              ? this.hass.localize(
                                                  "ui.common.show"
                                                ) ?? "Show"
                                              : this.hass.localize(
                                                  "ui.common.hide"
                                                ) ?? "Hide"}
                                            @click=${() =>
                                              this._toggleEntityHidden(id)}
                                          ></ha-icon-button>
                                        </div>
                                      `
                                    )}
                                  </div>
                                </ha-expansion-panel>
                              `
                            )
                          : group.entities.map(
                              (id) => html`
                                <div class="entity-row">
                                  <span class="entity-name">
                                    ${this.hass.states[id]?.attributes
                                      ?.friendly_name || id}
                                  </span>
                                  <ha-icon-button
                                    .path=${this._isHiddenEntity(id)
                                      ? mdiEye
                                      : mdiEyeOff}
                                    .label=${this._isHiddenEntity(id)
                                      ? this.hass.localize("ui.common.show") ??
                                        "Show"
                                      : this.hass.localize("ui.common.hide") ??
                                        "Hide"}
                                    @click=${() => this._toggleEntityHidden(id)}
                                  ></ha-icon-button>
                                </div>
                              `
                            )}
                      </div>
                    </ha-expansion-panel>
                  `
                )}
              `
            : html``}
        </div>
      </ha-expansion-panel>

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
                    @focusout=${() => this._groupFormBlur(i)}
                  ></ha-form>
                </div>
              </ha-expansion-panel>
            `
          )}
          <div class="add-group-row">
            <ha-button raised @click=${this._addRuleset}>
              ${this.hass.localize("ui.common.add")}
            </ha-button>
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
        margin-top: 16px;
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
      .entity-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }
      .entity-name {
        flex: 1 1 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .domain-panel {
        margin-top: 6px;
      }
      .domain-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .domain-header ha-icon {
        --mdc-icon-size: 20px;
      }
      .dc-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .dc-header ha-icon {
        --mdc-icon-size: 20px;
      }
    `;
  }
}
