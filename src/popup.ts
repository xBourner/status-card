import { StatusCard } from "./card";
import { filterEntitiesByRuleset } from "./smart_groups";
import type { HassEntity } from "home-assistant-js-websocket";
import {
  stopPropagation,
  _formatDomain,
  STATES_OFF,
  AreaRegistryEntry,
} from "./helpers";
import { html, TemplateResult } from "lit";
import {
  mdiClose,
  mdiDotsVertical,
  mdiSwapHorizontal,
  mdiToggleSwitchOffOutline,
} from "@mdi/js";
import { LovelaceCard } from "custom-card-helpers";
import memoizeOne from "memoize-one";

function _closeDialog(this: StatusCard): void {
  this.selectedDomain = null;
  this.selectedDeviceClass = null;
  this.selectedGroup = null;

  const container = document.querySelector("home-assistant")?.shadowRoot;
  const dialog = container?.querySelector("ha-dialog");

  if (dialog && container?.contains(dialog)) {
    container.removeChild(dialog);
  }
  const tabGroup = this.shadowRoot?.querySelector("sl-tab-group");
  if (tabGroup) {
    (tabGroup as any).activeIndex = -1;
  }
  const tabs = this.shadowRoot?.querySelectorAll("sl-tab") || [];
  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", "false");
    tab.removeAttribute("active");
  });
}

function toggleAllOrOn(card: StatusCard): void {
  card._showAll = !card._showAll;
}

function askToggleDomain(
  card: StatusCard,
  domain?: string,
  deviceClass?: string
) {
  card._confirmParams = {
    domain: domain ?? card.selectedDomain!,
    deviceClass: deviceClass ?? card.selectedDeviceClass!,
  };
  card._confirmOpen = true;
}

function confirmedToggleDomain(card: StatusCard) {
  card._confirmOpen = false;
  const { domain, deviceClass } = card._confirmParams;
  card.toggleDomain(domain, deviceClass);
}

function createCard(
  card: StatusCard,
  cardConfig: { type: string; entity: string; [key: string]: string }
) {
  const cardElement = document.createElement(
    `hui-${cardConfig.type}-card`
  ) as LovelaceCard;
  if (cardElement) {
    cardElement.hass = card.hass;
    cardElement.setConfig(cardConfig);
    return cardElement;
  }
  return html`<p>Invalid Configuration for card type: ${cardConfig.type}</p>`;
}

function getAreaForEntity(card: StatusCard, entity: HassEntity): string {
  const entry = card.entities.find((e) => e.entity_id === entity.entity_id);
  if (entry) {
    if (entry.area_id) {
      return entry.area_id;
    }

    if (entry.device_id) {
      const device = card.devices.find((d) => d.id === entry.device_id);
      if (device && device.area_id) {
        return device.area_id;
      }
    }
  }
  return "unassigned";
}

function handleAskToggleDomain(e: MouseEvent) {
  e.stopPropagation();
  const card = (e.currentTarget as any).card as StatusCard;
  askToggleDomain(card);
}

function handleAskToggleAll(e: MouseEvent) {
  e.stopPropagation();
  const card = (e.currentTarget as any).card as StatusCard;
  toggleAllOrOn(card);
}

const DOMAIN_FEATURES: Record<string, any> = {
  alarm_control_panel: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "alarm-modes",
        modes: [
          "armed_home",
          "armed_away",
          "armed_night",
          "armed_vacation",
          "armed_custom_bypass",
          "disarmed",
        ],
      },
    ],
  },
  light: {
    state_content: ["state", "brightness", "last_changed"],
    features: [{ type: "light-brightness" }],
  },
  cover: {
    state_content: ["state", "position", "last_changed"],
    features: [{ type: "cover-open-close" }, { type: "cover-position" }],
  },
  vacuum: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "vacuum-commands",
        commands: [
          "start_pause",
          "stop",
          "clean_spot",
          "locate",
          "return_home",
        ],
      },
    ],
  },
  climate: {
    state_content: ["state", "current_temperature", "last_changed"],
    features: [
      {
        type: "climate-hvac-modes",
        hvac_modes: [
          "auto",
          "heat_cool",
          "heat",
          "cool",
          "dry",
          "fan_only",
          "off",
        ],
      },
    ],
  },
  water_heater: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "water-heater-operation-modes",
        operation_modes: [
          "electric",
          "gas",
          "heat_pump",
          "eco",
          "performance",
          "high_demand",
          "off",
        ],
      },
    ],
  },
  humidifier: {
    state_content: ["state", "current_humidity", "last_changed"],
    features: [{ type: "target-humidity" }],
  },
  media_player: {
    show_entity_picture: true,
    state_content: ["state", "volume_level", "last_changed"],
    features: [{ type: "media-player-volume-slider" }],
  },
  lock: {
    state_content: ["state", "last_changed"],
    features: [{ type: "lock-commands" }],
  },
  fan: {
    state_content: ["state", "percentage", "last_changed"],
    features: [{ type: "fan-speed" }],
  },
  counter: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "counter-actions",
        actions: ["increment", "decrement", "reset"],
      },
    ],
  },
  lawn_mower: {
    state_content: ["state", "last_changed"],
    features: [
      {
        type: "lawn-mower-commands",
        commands: ["start_pause", "dock"],
      },
    ],
  },
  update: {
    state_content: ["state", "latest_version", "last_changed"],
    features: [{ type: "update-actions", backup: "ask" }],
  },
  switch: {
    state_content: ["state", "last_changed"],
    features: [{ type: "toggle" }],
  },
  input_boolean: {
    state_content: ["state", "last_changed"],
    features: [{ type: "toggle" }],
  },
  calendar: {
    state_content: "message",
  },
  timer: {
    state_content: ["state", "remaining_time"],
  },
  binary_sensor: {
    state_content: ["state", "last_changed"],
  },
  device_tracker: {
    state_content: ["state", "last_changed"],
  },
  remote: {
    state_content: ["state", "last_changed"],
  },
};

const groupAndSortEntities = memoizeOne(
  (
    entities: HassEntity[],
    areas: AreaRegistryEntry[] | undefined,
    areaMap: Map<string, string>,
    sortEntities: (ents: HassEntity[]) => HassEntity[],
    card: StatusCard
  ): Array<[string, HassEntity[]]> => {
    const groups = new Map<string, HassEntity[]>();
    for (const entity of entities) {
      const areaId = getAreaForEntity(card, entity);
      if (!groups.has(areaId)) {
        groups.set(areaId, []);
      }
      groups.get(areaId)!.push(entity);
    }

    const sortedGroups = Array.from(groups.entries()).sort(
      ([areaIdA], [areaIdB]) => {
        const areaObjA = areas?.find((a) => a.area_id === areaIdA);
        const areaObjB = areas?.find((a) => a.area_id === areaIdB);
        const nameA = areaObjA
          ? areaObjA.name.toLowerCase()
          : areaIdA === "unassigned"
          ? "Unassigned"
          : areaIdA;
        const nameB = areaObjB
          ? areaObjB.name.toLowerCase()
          : areaIdB === "unassigned"
          ? "Unassigned"
          : areaIdB;
        return nameA.localeCompare(nameB);
      }
    );

    return sortedGroups.map(([areaId, ents]) => [areaId, sortEntities(ents)]);
  }
);

export function renderPopup(card: StatusCard): TemplateResult {
  const columns = card.list_mode ? 1 : card._config.columns || 4;
  const styleBlock = card._isMobile ? mobileStyles : desktopStyles;
  const initialShowAll = !!card._config.show_total_entities;
  const effectiveShowAll = card._showAll ? !initialShowAll : initialShowAll;
  const areaMap = new Map(card.areas?.map((a) => [a.area_id, a.name]));

  let entities: HassEntity[] | undefined;
  let isNoGroup = false;

  if (
    card.selectedGroup !== null &&
    card._config.content?.[card.selectedGroup]
  ) {
    const groupId = card._config.content[card.selectedGroup];
    const ruleset = card._config.rulesets?.find(
      (g: any) => g.group_id === groupId
    );
    entities = ruleset ? filterEntitiesByRuleset(card, ruleset) : [];
  } else {
    // 1. show_total_entities hat höchste Priorität
    if (
      card._shouldShowTotalEntities(
        card.selectedDomain!,
        card.selectedDeviceClass!
      )
    ) {
      entities = card._totalEntities(
        card.selectedDomain!,
        card.selectedDeviceClass!
      );
    } else {
      // 2. Sonst entscheidet der Toggle
      entities = card._showAll
        ? card._totalEntities(card.selectedDomain!, card.selectedDeviceClass!)
        : card._isOn(card.selectedDomain!, card.selectedDeviceClass!);
    }
    isNoGroup = true;
  }

  const sortEntities = (ents: HassEntity[]) =>
    ents.slice().sort((a, b) => {
      if (effectiveShowAll) {
        const aOn = !STATES_OFF.includes(a.state);
        const bOn = !STATES_OFF.includes(b.state);
        if (aOn !== bOn) {
          return aOn ? -1 : 1;
        }
      }
      const nameA = (a.attributes?.friendly_name || a.entity_id).toLowerCase();
      const nameB = (b.attributes?.friendly_name || b.entity_id).toLowerCase();
      return nameA.localeCompare(nameB);
    });

  const sortedGroups = groupAndSortEntities(
    entities,
    card.areas,
    areaMap,
    sortEntities,
    card
  );

  const maxCardsPerArea = Math.max(
    ...sortedGroups.map(([, ents]) => ents.length)
  );
  const displayColumns = Math.min(columns, maxCardsPerArea);
  const domain = card.selectedDomain!;
  const deviceClass = card.selectedDeviceClass;
  const key = deviceClass
    ? `${_formatDomain(domain)} - ${deviceClass}`
    : domain;
  const customization = card.getCustomizationForType(key);
  const isInverted = customization?.invert === true;

  return html`
    <ha-dialog
      id="more-info-dialog"
      style="--columns: ${displayColumns};"
      open
      @closed="${_closeDialog}"
    >
      <style>
        ${styleBlock}
      </style>
      <div class="dialog-header">
        <ha-icon-button
          slot="trigger"
          .label=${card.hass.localize("ui.common.close")}
          .path=${mdiClose}
          @click=${() => _closeDialog.call(card)}
        ></ha-icon-button>
        <h3>
          ${card.selectedDomain && card.selectedDeviceClass
            ? card.computeLabel(
                { name: "header" },
                card.selectedDomain,
                card.selectedDeviceClass
              )
            : card.computeLabel(
                { name: "header" },
                card.selectedDomain || undefined
              )}
        </h3>
        ${isNoGroup
          ? html`
              <ha-button-menu
                class="menu-button"
                slot="actionItems"
                fixed
                corner="BOTTOM_END"
                menu-corner="END"
                @closed=${stopPropagation}
              >
                <ha-icon-button
                  slot="trigger"
                  .label=${card.hass.localize("ui.common.menu")}
                  .path=${mdiDotsVertical}
                ></ha-icon-button>

                <ha-list-item
                  graphic="icon"
                  @closed=${stopPropagation}
                  .card=${card}
                  @click=${handleAskToggleDomain}
                >
                  ${isInverted
                    ? card.hass.localize("ui.card.common.turn_on")
                    : card.hass.localize("ui.card.common.turn_off")}
                  <ha-svg-icon
                    slot="graphic"
                    .path=${mdiToggleSwitchOffOutline}
                  ></ha-svg-icon>
                </ha-list-item>

                <ha-list-item
                  graphic="icon"
                  @closed=${stopPropagation}
                  .card=${card}
                  @click=${handleAskToggleAll}
                >
                  ${card.hass.localize("ui.card.common.toggle") +
                  " " +
                  card.hass.localize(
                    "component.sensor.entity_component._.state_attributes.state_class.state.total"
                  ) +
                  " " +
                  card.hass.localize(
                    "ui.panel.lovelace.editor.card.entities.name"
                  )}
                  <ha-svg-icon
                    slot="graphic"
                    .path=${mdiSwapHorizontal}
                  ></ha-svg-icon>
                </ha-list-item>
              </ha-button-menu>
            `
          : ""}
      </div>
      ${card.list_mode
        ? html`
            <ul class="entity-list">
              ${sortedGroups.map(([areaId, groupEntities]) => {
                const areaName =
                  areaMap.get(areaId) ??
                  (areaId === "unassigned" ? "Unassigned" : areaId);
                const sortedEntities = sortEntities(groupEntities);
                return html`
                  <li class="entity-item">
                    <h4>${areaName}:</h4>
                    <ul>
                      ${sortedEntities.map(
                        (entity) => html`
                          <li class="entity-item">- ${entity.entity_id}</li>
                        `
                      )}
                    </ul>
                  </li>
                `;
              })}
            </ul>
          `
        : html`
            ${sortedGroups.map(([areaId, groupEntities]) => {
              const areaName =
                areaMap.get(areaId) ??
                (areaId === "unassigned" ? "Unassigned" : areaId);
              const sortedEntities = sortEntities(groupEntities);
              return html`
                <div class="area-group">
                  <h4>${areaName}</h4>
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${sortedEntities.map(
                        (entity) => html`
                          <div class="entity-card">
                            ${createCard(card, {
                              type: "tile",
                              entity: entity.entity_id,
                              ...(card.selectedGroup !== null
                                ? DOMAIN_FEATURES[
                                    entity.entity_id.split(".")[0]
                                  ] ?? {}
                                : DOMAIN_FEATURES[card.selectedDomain!] ?? {}),
                            })}
                          </div>
                        `
                      )}
                    </div>
                  </div>
                </div>
              `;
            })}
          `}
    </ha-dialog>

    <ha-dialog
      heading="              ${isInverted
        ? card.hass.localize("ui.card.common.turn_on") + "?"
        : card.hass.localize("ui.card.common.turn_off") + "?"}"
      ?open=${card._confirmOpen}
      @closed=${() => (card._confirmOpen = false)}
    >
      <div>
        ${card.hass.localize(
          "ui.panel.lovelace.cards.actions.action_confirmation",
          {
            action: isInverted
              ? card.hass.localize("ui.card.common.turn_on")
              : card.hass.localize("ui.card.common.turn_off"),
          }
        )}
      </div>
      <mwc-button slot="secondaryAction" dialogAction="close"
        >${card.hass.localize("ui.common.no")}</mwc-button
      >
      <mwc-button
        slot="primaryAction"
        @click=${() => confirmedToggleDomain(card)}
      >
        ${card.hass.localize("ui.common.yes")}</mwc-button
      >
    </ha-dialog>
  `;
}

const mobileStyles = `
        ha-dialog {
       --dialog-content-padding: 12px;
      }
      .area-group { padding: 0 5px;}
      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px;} 
      .dialog-header ha-icon-button { margin-right: 10px;  }
      ha-dialog#more-info-dialog { --mdc-dialog-max-width: 96vw; --mdc-dialog-min-width: 96vw; }
      .entity-list { list-style: none;  display: flex; flex-direction: column; }
      ul { margin: 0; padding: 5px;  };
      .entity-card { flex-basis: 100%; max-width: 100%; }
      .entity-cards { display: flex; flex-direction: column; gap: 4px; }
      ha-icon { display: flex; }
      h4 { font-size: 1.2em; margin: 0.6em 0.2em;} 
      .menu-button { position: absolute; right: 4px; left: auto; }
  }
`;

const desktopStyles = `
        ha-dialog {
       --dialog-content-padding: 12px;
      }
      .area-group { padding: 0 15px;}
      .dialog-header { display: flex;  justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 12px; min-width: 15vw; } 
      .dialog-header ha-icon-button { margin-right: 10px;  }
      ha-dialog#more-info-dialog { --mdc-dialog-max-width: none; --mdc-min-width: 15vw; width: auto; }
      .entity-card { width: 22.5vw ;  box-sizing: border-box; }
      .entity-list .entity-item { list-style: none;  display: flex; flex-direction: column; }
      ul { margin: 0; padding: 5px;  }
      ha-icon { display: flex; }
      h4 { font-size: 1.2em; margin: 0.8em 0.2em;} 
      .menu-button { position: absolute; right: 4px; left: auto; }
            .cards-wrapper {
        display: flex;
        justify-content: center;          
        box-sizing: border-box;
      }
      .entity-cards {
        display: grid;
        grid-template-columns: repeat(var(--columns), 22.5vw);
        gap: 4px;
      }
`;
