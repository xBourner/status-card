import {
  HomeAssistant,
  ActionConfig,
  ActionHandlerEvent,
  handleAction,
  STATES_OFF,
  computeDomain,
  LovelaceCardConfig
} from "./ha";
import { HassEntity } from "home-assistant-js-websocket";
import { TOGGLEABLE_DOMAINS } from "./const";
import { getResolvedCustomizationValue } from "./card-styles";

export function toggleDomain(
  hass: HomeAssistant,
  entities: HassEntity[],
  domain: string,
  deviceClass?: string
): void {
  if (entities.length === 0) {
    console.warn(`Keine aktiven Entitäten für ${domain} gefunden.`);
    return;
  }

  if (TOGGLEABLE_DOMAINS.includes(domain)) {
    hass.callService(domain, "toggle", {
      entity_id: entities.map((e) => e.entity_id),
    });
    return;
  }

  for (const entity of entities) {
    let isOn = !STATES_OFF.includes(entity.state);

    if (domain === "media_player") {
      hass.callService(domain, isOn ? "media_pause" : "media_play", {
        entity_id: entity.entity_id,
      });
    } else if (domain === "lock") {
      hass.callService(domain, isOn ? "lock" : "unlock", {
        entity_id: entity.entity_id,
      });
    } else if (domain === "vacuum") {
      hass.callService(domain, isOn ? "stop" : "start", {
        entity_id: entity.entity_id,
      });
    } else if (domain === "alarm_control_panel") {
      hass.callService(
        domain,
        isOn ? "alarm_arm_away" : "alarm_disarm",
        { entity_id: entity.entity_id }
      );
    } else if (domain === "lawn_mower") {
      hass.callService(domain, isOn ? "pause" : "start_mowing", {
        entity_id: entity.entity_id,
      });
    } else if (domain === "water_heater") {
      hass.callService(domain, isOn ? "turn_off" : "turn_on", {
        entity_id: entity.entity_id,
      });
    } else if (domain === "update") {
      hass.callService(domain, isOn ? "skip" : "install", {
        entity_id: entity.entity_id,
      });
    }
  }
  return;
}

export function getResolvedAction(
  config: LovelaceCardConfig,
  actionType: "tap" | "hold" | "double_tap",
  domain: string,
  deviceClass?: string
): ActionConfig | undefined {
  const actionKey = `${actionType}_action` as const;
  return (
    getResolvedCustomizationValue(config, actionKey, domain, deviceClass) ||
    config[actionKey]
  );
}

export function handleDomainAction(
  element: HTMLElement,
  hass: HomeAssistant,
  config: LovelaceCardConfig,
  domain: string,
  deviceClass: string | undefined,
  ev: ActionHandlerEvent,
  callbacks: {
    showMoreInfo: (entityId: string) => void;
    toggleDomain: (domain: string, deviceClass?: string) => void;
    selectDomain: (domain: string, deviceClass?: string) => void;
  }
): void {
  ev.stopPropagation();

  const action = ev.detail.action!;
  const actionConfig = getResolvedAction(config, action, domain, deviceClass);

  const isMoreInfo =
    (typeof actionConfig === "string" && actionConfig === "more-info") ||
    (typeof actionConfig === "object" &&
      actionConfig?.action === "more-info");

  const isToggle =
    (typeof actionConfig === "string" && actionConfig === "toggle") ||
    (typeof actionConfig === "object" && actionConfig?.action === "toggle");

  if (domain.includes(".")) {
    const entityId = domain;
    const baseDomain = computeDomain(entityId);

    if (isToggle) {
      hass.callService(baseDomain, "toggle", { entity_id: entityId });
      return;
    }

    if (isMoreInfo) {
      callbacks.showMoreInfo(entityId);
      return;
    }
  }

  if (isMoreInfo || actionConfig === undefined) {
    callbacks.selectDomain(domain, deviceClass);
    return;
  }

  if (isToggle) {
    callbacks.toggleDomain(domain, deviceClass);
    return;
  }

  handleAction(
    element,
    hass,
    {
      tap_action: getResolvedAction(config, "tap", domain, deviceClass),
      hold_action: getResolvedAction(config, "hold", domain, deviceClass),
      double_tap_action: getResolvedAction(
        config,
        "double_tap",
        domain,
        deviceClass
      ),
    },
    action
  );
}
