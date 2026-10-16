import type { HassEntity } from "home-assistant-js-websocket";
import {
  caseInsensitiveStringCompare,
  computeDomain,
  HomeAssistant,
  LovelaceCard,
  STATES_OFF,
} from "./ha";
import type { Ruleset } from "./ha/types";

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

/** Accepts a single value or a list (YAML allows both) and always returns a list. */
export function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

export interface LocationFilter {
  area: string[];
  floor: string[];
  label: string[];
}

type RegistryEntry = HomeAssistant["entities"][string];
type RegistryDevice = HomeAssistant["devices"][string];

/**
 * Card level area/floor/label filter. An entity must be assigned to an area
 * (directly or through its device); entity and device both count for each
 * filter. Empty filter lists are ignored.
 */
export function matchesLocationFilter(
  entry: RegistryEntry | undefined,
  device: RegistryDevice | undefined,
  floorByArea: Map<string, string | null | undefined>,
  filter: LocationFilter
): boolean {
  if (entry?.area_id == null && device?.area_id == null) return false;

  if (filter.label.length) {
    const hasLabel = (labels?: string[]) =>
      !!labels?.some((l) => filter.label.includes(l));
    if (!hasLabel(entry?.labels) && !hasLabel(device?.labels)) return false;
  }

  if (filter.area.length) {
    const inArea = (areaId?: string | null) =>
      !!areaId && filter.area.includes(areaId);
    if (!inArea(entry?.area_id) && !inArea(device?.area_id)) return false;
  }

  if (filter.floor.length) {
    const onFloor = (areaId?: string | null) => {
      const floorId = areaId ? floorByArea.get(areaId) : undefined;
      return !!floorId && filter.floor.includes(floorId);
    };
    if (!onFloor(entry?.area_id) && !onFloor(device?.area_id)) return false;
  }

  return true;
}

export function floorByAreaMap(
  areas: HomeAssistant["areas"]
): Map<string, string | null | undefined> {
  return new Map(Object.values(areas).map((a) => [a.area_id, a.floor_id]));
}

export function getIncludedEntityIds(
  entities: HomeAssistant["entities"],
  devices: HomeAssistant["devices"],
  areas: HomeAssistant["areas"],
  filters: {
    area?: string | string[] | null;
    floor?: string | string[] | null;
    label?: string | string[] | null;
    hiddenAreas?: string[];
    hiddenLabels?: string[];
    hiddenEntities?: string[];
  },
  allowedDomains: string[]
): string[] {
  const location: LocationFilter = {
    area: toArray(filters.area),
    floor: toArray(filters.floor),
    label: toArray(filters.label),
  };

  const hiddenAreasSet = new Set(filters.hiddenAreas || []);
  const hiddenLabelsSet = new Set(filters.hiddenLabels || []);
  const hiddenEntitiesSet = new Set(filters.hiddenEntities || []);
  const allowedDomainsSet = new Set(allowedDomains);
  const floorByArea = floorByAreaMap(areas);

  return Object.values(entities)
    .filter((entry) => {
      const domain = entry.entity_id.split(".")[0];
      if (!allowedDomainsSet.has(domain)) return false;
      if (domain === "update") {
        return !entry.hidden;
      }

      const device = entry.device_id ? devices[entry.device_id] : undefined;

      if (!matchesLocationFilter(entry, device, floorByArea, location))
        return false;

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
    area?: string | string[] | null;
    floor?: string | string[] | null;
    label?: string | string[] | null;
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

const GROUP_META_KEYS = ["group_id", "group_icon", "group_status"];

/** A smart group only counts once it has at least one real filter. */
export function rulesetHasFilters(ruleset: Ruleset): boolean {
  return Object.keys(ruleset).some(
    (key) =>
      !GROUP_META_KEYS.includes(key) &&
      ruleset[key] !== undefined &&
      ruleset[key] !== ""
  );
}

export function typeKey(domain: string, deviceClass?: string): string {
  return deviceClass ? `${domain} - ${deviceClass}` : domain;
}

export function normalizeDomain(domain: string): string {
  return domain.trim().toLowerCase().replace(/\s+/g, "_");
}

/** Inverse of typeKey: "Binary Sensor - Door" -> { domain: "binary_sensor", deviceClass: "door" }. */
export function parseTypeKey(type: string): {
  domain: string;
  deviceClass?: string;
} {
  const match = type.match(/^(.+?)\s*-\s*(.+)$/);
  if (!match) return { domain: normalizeDomain(type) };
  return {
    domain: normalizeDomain(match[1]),
    deviceClass: match[2].trim().toLowerCase(),
  };
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

/**
 * The one definition of "active" used for counting, filtering and sorting:
 * climate/humidifier use their current action, everything else STATES_OFF.
 * Colors use HA's own stateActive (entity_color) on purpose.
 */
export function isEntityActive(
  entity: HassEntity,
  domain?: string,
  _deviceClass?: string,
  isInverted = false
): boolean {
  const effectiveDomain = domain || computeDomain(entity.entity_id);

  if (effectiveDomain === "climate") {
    const hvacAction = entity.attributes.hvac_action;
    if (hvacAction !== undefined) {
      const active = !["idle", "off"].includes(hvacAction);
      return isInverted ? !active : active;
    }
  }

  if (effectiveDomain === "humidifier") {
    const humAction = entity.attributes.action;
    if (humAction !== undefined) {
      const active = !["idle", "off"].includes(humAction);
      return isInverted ? !active : active;
    }
  }

  const isOn = !STATES_OFF.includes(entity.state);
  return isInverted ? !isOn : isOn;
}

let cachedHelpers: { createCardElement?: (config: unknown) => LovelaceCard | Promise<LovelaceCard> } | null = null;

export function createCardElementSynchronous(
  hass: HomeAssistant,
  cardConfig: { type: string; entity?: string; [key: string]: unknown }
): LovelaceCard | undefined {
  try {
    const type = cardConfig.type || "tile";
    const isCustom = typeof type === "string" && type.startsWith("custom:");
    const tag = isCustom ? type.slice(7) : `hui-${type}-card`;

    if (customElements.get(tag)) {
      const el = document.createElement(tag) as LovelaceCard;
      if (typeof el.setConfig === "function") {
        el.setConfig(cardConfig);
      }
      el.hass = hass;
      el.setAttribute?.("data-hui-card", "");
      return el;
    }
  } catch (e) {
    console.debug("status-card: Failed to create card element via customElements", e);
  }

  if (cachedHelpers?.createCardElement) {
    try {
      const el = cachedHelpers.createCardElement(cardConfig) as LovelaceCard;
      if (el instanceof Promise) return undefined;

      el.hass = hass;
      el.setAttribute?.("data-hui-card", "");
      return el;
    } catch (e) {
      console.debug("status-card: Failed to create card element via helpers", e);
      return undefined;
    }
  }

  return undefined;
}

export async function createCardElement(
  hass: HomeAssistant,
  cardConfig: { type: string; entity?: string; [key: string]: unknown },
  isFallback = false
): Promise<LovelaceCard | HTMLElement> {
  try {
    if (!cachedHelpers) {
      cachedHelpers = await window.loadCardHelpers?.();
    }
    const helpers = cachedHelpers;
    if (helpers?.createCardElement) {
      const el = helpers.createCardElement(cardConfig) as LovelaceCard;
      el.hass = hass;
      el.setAttribute?.("data-hui-card", "");
      return el;
    }
  } catch (e) {
    console.debug("status-card: Failed to load card helpers", e);
  }

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
  } catch (e) {
    console.debug("status-card: Failed to create card element for type:", cardConfig.type, e);
    if (!isFallback) {
      return createCardElement(hass, toTileConfig(cardConfig), true);
    }
    const empty = document.createElement("div");
    empty.setAttribute("data-hui-card", "");
    return empty;
  }
}

export async function ensureHelpersLoaded(): Promise<void> {
  if (cachedHelpers) return;
  try {
    cachedHelpers = await window.loadCardHelpers?.();
  } catch (e) {
    console.debug("status-card: Failed to load card helpers", e);
  }
}
