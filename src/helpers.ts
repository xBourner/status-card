import type { HassEntity } from "home-assistant-js-websocket";
import {
  caseInsensitiveStringCompare,
  HomeAssistant,
  LovelaceCard,
} from "./ha";

export function cacheByProperty<T>(
  hass: HomeAssistant,
  type: string,
  property: keyof T
): Promise<Record<string, T>> {
  return hass
    .callWS<T[]>({ type: `config/${type}_registry/list` })
    .then((items) => {
      return items.reduce((acc, item) => {
        const key = item[property];
        if (typeof key === "string" || typeof key === "number") {
          acc[String(key)] = item;
        }
        return acc;
      }, {} as Record<string, T>);
    });
}

export function getIncludedEntityIds(
  entities: HomeAssistant["entities"],
  devices: HomeAssistant["devices"],
  areas: HomeAssistant["areas"],
  filters: {
    area?: string[] | null;
    floor?: string[] | null;
    label?: string[] | null;
    hiddenAreas?: string[];
    hiddenLabels?: string[];
    hiddenEntities?: string[];
  },
  allowedDomains: string[]
): string[] {
  const areaSel =
    filters.area && filters.area.length > 0
      ? Array.isArray(filters.area)
        ? filters.area
        : [filters.area]
      : null;
  const floorSel =
    filters.floor && filters.floor.length > 0
      ? Array.isArray(filters.floor)
        ? filters.floor
        : [filters.floor]
      : null;
  const labelSel =
    filters.label && filters.label.length > 0
      ? Array.isArray(filters.label)
        ? filters.label
        : [filters.label]
      : null;

  const hiddenAreas = filters.hiddenAreas || [];
  const hiddenLabels = filters.hiddenLabels || [];
  const hiddenEntities = filters.hiddenEntities || [];

  const hiddenAreasSet = new Set(hiddenAreas);
  const hiddenLabelsSet = new Set(hiddenLabels);
  const hiddenEntitiesSet = new Set(hiddenEntities);
  const allowedDomainsSet = new Set(allowedDomains);

  const deviceMap = new Map(Object.values(devices).map((d) => [d.id, d]));
  const floorByArea = new Map(
    Object.values(areas).map((a) => [
      a.area_id,
      a.floor_id as string | undefined,
    ])
  );

  return Object.values(entities)
    .filter((entry) => {
      const domain = entry.entity_id.split(".")[0];
      if (!allowedDomainsSet.has(domain)) return false;
      if (domain === "update") {
        return !entry.hidden;
      }

      const device = entry.device_id
        ? deviceMap.get(entry.device_id)
        : undefined;

      const isInAnyArea =
        entry.area_id != null || (device && device.area_id != null);

      if (!isInAnyArea) return false;
      if (labelSel) {
        const matchesLabel =
          (entry.labels?.some((l) => (labelSel as string[]).includes(l)) ??
            false) ||
          (device?.labels?.some((l) => (labelSel as string[]).includes(l)) ??
            false);
        if (!matchesLabel) return false;
      }

      if (areaSel) {
        const areaOk =
          (entry.area_id !== undefined &&
            entry.area_id !== null &&
            (areaSel as string[]).includes(entry.area_id)) ||
          (device &&
            device.area_id !== undefined &&
            device.area_id !== null &&
            (areaSel as string[]).includes(device.area_id));
        if (!areaOk) return false;
      }

      if (floorSel) {
        const entryFloor = entry.area_id
          ? floorByArea.get(entry.area_id)
          : undefined;
        const deviceFloor = device?.area_id
          ? floorByArea.get(device.area_id)
          : undefined;
        const floorOk =
          (entryFloor && (floorSel as string[]).includes(entryFloor)) ||
          (deviceFloor && (floorSel as string[]).includes(deviceFloor));
        if (!floorOk) return false;
      }

      if (hiddenAreasSet.size) {
        const inHiddenArea =
          (entry.area_id && hiddenAreasSet.has(entry.area_id)) ||
          (device && device.area_id && hiddenAreasSet.has(device.area_id));
        if (inHiddenArea) return false;
      }

      if (entry.labels?.some((l) => hiddenLabelsSet.has(l))) return false;
      if (hiddenEntitiesSet.has(entry.entity_id)) return false;

      return !entry.hidden;
    })
    .map((e) => e.entity_id);
}

export function mapIdsToStates(
  includedEntityIds: string[],
  states: { [entity_id: string]: HassEntity }
): { [domain: string]: HassEntity[] } {
  const byDomain: { [domain: string]: HassEntity[] } = {};
  for (const eid of includedEntityIds) {
    const domain = eid.split(".")[0];
    const st = states[eid];
    if (!st) continue;
    (byDomain[domain] ||= []).push(st);
  }
  return byDomain;
}

export function computeEntitiesByDomain(
  entities: HomeAssistant["entities"],
  devices: HomeAssistant["devices"],
  areas: HomeAssistant["areas"],
  states: { [entity_id: string]: HassEntity },
  filters: {
    area?: string[] | null;
    floor?: string[] | null;
    label?: string[] | null;
    hiddenAreas?: string[];
    hiddenLabels?: string[];
    hiddenEntities?: string[];
  },
  allowedDomains: string[]
): { [domain: string]: HassEntity[] } {
  const includedEntityIds = getIncludedEntityIds(
    entities,
    devices,
    areas,
    filters,
    allowedDomains
  );

  return mapIdsToStates(includedEntityIds, states);
}

export function typeKey(domain: string, deviceClass?: string): string {
  return deviceClass ? `${domain} - ${deviceClass}` : domain;
}

export function getFriendlyName(
  states: { [entity_id: string]: HassEntity },
  entityId: string
): string {
  return (states?.[entityId]?.attributes?.friendly_name as string) || entityId;
}

export function compareByFriendlyName(
  states: { [entity_id: string]: HassEntity },
  language?: string
): (a: string, b: string) => number {
  return (a: string, b: string) =>
    caseInsensitiveStringCompare(
      getFriendlyName(states, a),
      getFriendlyName(states, b),
      language
    );
}

export function arraysEqualUnordered<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  for (const x of a) {
    if (!setB.has(x)) return false;
  }
  return true;
}

export function toTileConfig(cardConfig: {
  type: string;
  entity?: string;
  [k: string]: unknown;
}) {
  return {
    type: "tile",
    entity: cardConfig.entity,
  };
}

export async function createCardElement(
  hass: HomeAssistant,
  cardConfig: { type: string; entity?: string; [key: string]: unknown },
  isFallback = false
): Promise<LovelaceCard | HTMLElement> {
  try {
    const helpers = await window.loadCardHelpers?.();
    if (helpers?.createCardElement) {
      const el = helpers.createCardElement(cardConfig) as LovelaceCard;
      el.hass = hass;
      el.setAttribute?.("data-hui-card", "");
      return el;
    }
  } catch {}

  try {
    const type = cardConfig.type || "tile";
    const isCustom = typeof type === "string" && type.startsWith("custom:");
    const tag = isCustom ? type.slice(7) : `hui-${type}-card`;

    if (isCustom && !customElements.get(tag)) {
      await customElements.whenDefined(tag).catch(() => {});
    }

    const el = document.createElement(tag) as LovelaceCard;

    if (typeof el.setConfig === "function") {
      el.setConfig(cardConfig);
    }

    el.hass = hass;
    el.setAttribute?.("data-hui-card", "");
    return el;
  } catch {
    if (!isFallback) {
      return createCardElement(hass, toTileConfig(cardConfig), true);
    }
    const empty = document.createElement("div");
    empty.setAttribute("data-hui-card", "");
    return empty;
  }
}
