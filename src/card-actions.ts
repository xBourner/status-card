import {
  HomeAssistant,
  ActionConfig,
  ActionHandlerEvent,
  handleAction,
  computeDomain,
  LovelaceCardConfig,
} from "./ha";
import { HassEntity } from "home-assistant-js-websocket";
import { ENTITY_TOGGLE_SERVICES, TOGGLEABLE_DOMAINS } from "./const";
import { isEntityActive } from "./helpers";
import { getResolvedCustomizationValue } from "./card-styles";

export function toggleDomain(
  hass: HomeAssistant,
  entities: HassEntity[],
  domain: string
): void {
  if (entities.length === 0) {
    console.warn(`No active entities found for domain: ${domain}`);
    return;
  }

  if (TOGGLEABLE_DOMAINS.includes(domain)) {
    hass.callService(domain, "toggle", {
      entity_id: entities.map((e) => e.entity_id),
    });
    return;
  }

  const services = ENTITY_TOGGLE_SERVICES[domain];
  if (!services) return;

  for (const entity of entities) {
    const [whenActive, whenInactive] = services;
    hass.callService(
      domain,
      isEntityActive(entity, domain) ? whenActive : whenInactive,
      { entity_id: entity.entity_id }
    );
  }
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
    (typeof actionConfig === "object" && actionConfig?.action === "more-info");

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
