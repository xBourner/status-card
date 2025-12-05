import type { HassEntity } from "home-assistant-js-websocket";
import {
  AreaRegistryEntry,
  EntityRegistryEntry,
  DeviceRegistryEntry,
  computeDomain,
} from "./ha";
import { Ruleset, Rule, RuleValue, StatusCardLike } from "./ha/types";

const STATIC_KEYS = [
  "area",
  "floor",
  "label",
  "domain",
  "entity_id",
  "device",
  "integration",
  "entity_category",
  "hidden_by",
  "device_manufacturer",
  "device_model",
];

export const filterStaticEntities = (
  ruleset: Ruleset,
  entities: EntityRegistryEntry[],
  devices: DeviceRegistryEntry[],
  areas: AreaRegistryEntry[],
  hiddenEntities: string[],
  entityMap: Map<string, EntityRegistryEntry>,
  deviceMap: Map<string, DeviceRegistryEntry>,
  areaMap: Map<string, AreaRegistryEntry>
): string[] => {
  let filters: Rule[] = [];
  if (Array.isArray(ruleset.filters)) {
    filters = ruleset.filters.filter((f) => STATIC_KEYS.includes(f.key));
  } else {
    const rulesetAsRecord = ruleset as Record<string, unknown>;
    STATIC_KEYS.forEach((key) => {
      if (rulesetAsRecord[key] !== undefined) {
        filters.push({ key, value: rulesetAsRecord[key] as RuleValue });
      }
    });
  }

  if (!filters.length && !hiddenEntities.length) {
    return entities.map((e) => e.entity_id);
  }

  return entities
    .filter((entry) => {
      if (hiddenEntities.includes(entry.entity_id)) return false;
      if (!filters.length) return true;

      const fakeEntity = { entity_id: entry.entity_id } as HassEntity;

      return filters.every((rule) =>
        matchesRule({} as StatusCardLike, fakeEntity, rule, {
          areas,
          devices,
          entities,
          entityMap,
          deviceMap,
          areaMap,
        })
      );
    })
    .map((e) => e.entity_id);
};

export const filterDynamicEntities = (
  card: StatusCardLike,
  ruleset: Ruleset,
  candidateIds: string[],
  states: { [entity_id: string]: HassEntity },
  entityMap: Map<string, EntityRegistryEntry>,
  deviceMap: Map<string, DeviceRegistryEntry>,
  areaMap: Map<string, AreaRegistryEntry>
): HassEntity[] => {
  let filters: Rule[] = [];
  if (Array.isArray(ruleset.filters)) {
    filters = ruleset.filters.filter((f) => !STATIC_KEYS.includes(f.key));
  } else {
    const rulesetAsRecord = ruleset as Record<string, unknown>;
    [
      "state",
      "name",
      "attributes",
      "last_changed",
      "last_updated",
      "last_triggered",
      "level",
      "group",
    ].forEach((key) => {
      if (rulesetAsRecord[key] !== undefined) {
        filters.push({ key, value: rulesetAsRecord[key] as RuleValue });
      }
    });
  }

  if (!filters.length) {
    return candidateIds
      .map((id) => states[id])
      .filter((e): e is HassEntity => !!e);
  }

  return candidateIds
    .map((id) => states[id])
    .filter((entity): entity is HassEntity => {
      if (!entity) return false;
      return filters.every((rule) =>
        matchesRule(card, entity, rule, {
          entityMap,
          deviceMap,
          areaMap,
        })
      );
    });
};

export function filterEntitiesByRuleset(
  card: StatusCardLike,
  ruleset: Ruleset,
  entityMap?: Map<string, EntityRegistryEntry>,
  deviceMap?: Map<string, DeviceRegistryEntry>,
  areaMap?: Map<string, AreaRegistryEntry>
): HassEntity[] {
  const entitiesArr = card.__registryEntities || [];
  const devicesArr = card.__registryDevices || [];
  const areasArr = card.__registryAreas || [];

  const eMap = entityMap || new Map(entitiesArr.map((e) => [e.entity_id, e]));
  const dMap = deviceMap || new Map(devicesArr.map((d) => [d.id, d]));
  const aMap = areaMap || new Map(areasArr.map((a) => [a.area_id, a]));

  const candidateIds = filterStaticEntities(
    ruleset,
    entitiesArr,
    devicesArr,
    areasArr,
    card.hiddenEntities || [],
    eMap,
    dMap,
    aMap
  );

  return filterDynamicEntities(
    card,
    ruleset,
    candidateIds,
    card.hass?.states || {},
    eMap,
    dMap,
    aMap
  );
}
function compareMinutesAgo(dateStr: string, filter: string): boolean {
  if (!dateStr) return false;
  const match = filter.match(/^([<>]=?)?\s*(\d+)$/);
  if (!match) return false;
  const [, op, numStr] = match;
  const num = parseInt(numStr, 10);
  const now = new Date();
  const date = new Date(dateStr);
  const diffMinutes = (now.getTime() - date.getTime()) / 60000;

  switch (op) {
    case ">":
      return diffMinutes > num;
    case ">=":
      return diffMinutes >= num;
    case "<":
      return diffMinutes < num;
    case "<=":
      return diffMinutes <= num;
    default:
      return Math.round(diffMinutes) === num;
  }
}

function match(actual: unknown, expected: unknown): boolean {
  if (Array.isArray(expected)) {
    return expected.some((v) => match(actual, v));
  }
  if (typeof expected === "string" && expected.startsWith("!")) {
    return !match(actual, expected.slice(1));
  }
  if (
    typeof expected === "string" &&
    /^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/.test(expected)
  ) {
    const [, op, numStr, , unit] =
      expected.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/) || [];
    const num = parseFloat(numStr);
    const now = Date.now();
    const actualTime = new Date(actual as string | number | Date).getTime();
    if (isNaN(actualTime)) return false;
    let diff = (now - actualTime) / 60000;
    if (unit === "h") diff /= 60;
    if (unit === "d") diff /= 60 * 24;
    switch (op) {
      case ">":
        return diff > num;
      case ">=":
        return diff >= num;
      case "<":
        return diff < num;
      case "<=":
        return diff <= num;
    }
  }

  if (
    typeof expected === "string" &&
    /^([<>]=?)\s*(-?\d+(\.\d+)?)$/.test(expected)
  ) {
    const [, op, numStr] = expected.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/) || [];
    const num = parseFloat(numStr);
    const val = parseFloat(actual as string);
    switch (op) {
      case ">":
        return val > num;
      case ">=":
        return val >= num;
      case "<":
        return val < num;
      case "<=":
        return val <= num;
    }
  }
  if (typeof expected === "string" && expected.includes("*")) {
    const pattern =
      "^" +
      expected
        .split("*")
        .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*") +
      "$";
    const regex = new RegExp(pattern, "i");
    return regex.test(String(actual));
  }
  if (
    typeof expected === "string" &&
    expected.length > 2 &&
    expected.startsWith("/") &&
    expected.endsWith("/")
  ) {
    try {
      const regex = new RegExp(expected.slice(1, -1), "i");
      return regex.test(String(actual));
    } catch {
      return false;
    }
  }
  return actual === expected;
}

interface MatcherHelpers {
  areas?: AreaRegistryEntry[];
  devices?: DeviceRegistryEntry[];
  entities?: EntityRegistryEntry[];
  entityMap?: Map<string, EntityRegistryEntry>;
  deviceMap?: Map<string, DeviceRegistryEntry>;
  areaMap?: Map<string, AreaRegistryEntry>;
  card: StatusCardLike;
}

const matchers: {
  [key: string]: (
    entity: HassEntity,
    value: unknown,
    helpers: MatcherHelpers,
    entry?: EntityRegistryEntry
  ) => boolean;
} = {
  area: (entity, value, { entityMap, deviceMap }, entry) => {
    let areaId = entry?.area_id;
    if (!areaId && entry?.device_id) {
      const device = deviceMap?.get(entry.device_id);
      areaId = device?.area_id;
    }
    if (Array.isArray(value)) {
      return value.includes(areaId);
    }
    return areaId === value;
  },
  domain: (entity, value) => match(computeDomain(entity.entity_id), value),
  entity_id: (entity, value) => match(entity.entity_id, value),
  state: (entity, value) => match(entity.state, value),
  name: (entity, value) => match(entity.attributes.friendly_name ?? "", value),
  attributes: (entity, value) => {
    if (!value || typeof value !== "object") return false;
    return Object.entries(value).every(([attrKey, expected]) => {
      const attrPath = attrKey.split(":");
      let attrValue = entity.attributes;
      for (const key of attrPath) {
        if (attrValue === undefined) break;
        attrValue = attrValue[key];
      }
      return attrValue !== undefined ? match(attrValue, expected) : false;
    });
  },
  device: (entity, value, _, entry) => match(entry?.device_id, value),
  integration: (entity, value, _, entry) =>
    !!entry &&
    (match(entry.platform, value) || match(entry.config_entry_id, value)),
  entity_category: (entity, value, _, entry) =>
    match(entry?.entity_category, value),
  label: (entity, value, { deviceMap, card }, entry) => {
    const allLabels = card.labels;
    const match_label = (lbl: string) => {
      if (match(lbl, value)) return true;
      if (allLabels) {
        const labelObj = allLabels.find((l) => l.label_id === lbl);
        if (labelObj && match(labelObj.name, value)) return true;
      }
      return false;
    };
    if (entry?.labels?.some(match_label)) return true;
    if (entry?.device_id) {
      const device = deviceMap?.get(entry.device_id);
      if (device?.labels?.some(match_label)) return true;
    }
    return false;
  },
  floor: (entity, value, { entityMap, deviceMap, areaMap }, entry) => {
    let areaId = entry?.area_id;
    if (!areaId && entry?.device_id) {
      areaId = deviceMap?.get(entry.device_id)?.area_id;
    }
    if (!areaId) return false;
    const areaObj = areaMap?.get(areaId);
    return match(areaObj?.floor_id, value);
  },
  hidden_by: (entity, value, _, entry) => match(entry?.hidden_by, value),
  device_manufacturer: (entity, value, { deviceMap }, entry) => {
    if (!entry?.device_id) return false;
    const device = deviceMap?.get(entry.device_id);
    return match(device?.manufacturer, value);
  },
  device_model: (entity, value, { deviceMap }, entry) => {
    if (!entry?.device_id) return false;
    const device = deviceMap?.get(entry.device_id);
    return match(device?.model, value);
  },
  last_changed: (entity, value) => {
    if (typeof value === "string" && /^[<>]=?\s*\d+$/.test(value)) {
      return compareMinutesAgo(entity.last_changed, value);
    }
    return match(entity.last_changed, value);
  },
  last_updated: (entity, value) => {
    if (typeof value === "string" && /^[<>]=?\s*\d+$/.test(value)) {
      return compareMinutesAgo(entity.last_updated, value);
    }
    return match(entity.last_updated, value);
  },
  last_triggered: (entity, value) => {
    if (typeof value === "string" && /^[<>]=?\s*\d+$/.test(value)) {
      return compareMinutesAgo(entity.attributes.last_triggered, value);
    }
    return match(entity.attributes.last_triggered, value);
  },
  group: (entity, value, { card }) => {
    const group = card.hass.states[value as string];
    return !!group?.attributes?.entity_id?.includes(entity.entity_id);
  },
};

function matchesRule(
  card: StatusCardLike,
  entity: HassEntity,
  rule: { key: string; value: unknown },
  helpers: {
    areas?: AreaRegistryEntry[];
    devices?: DeviceRegistryEntry[];
    entities?: EntityRegistryEntry[];
    entityMap?: Map<string, EntityRegistryEntry>;
    deviceMap?: Map<string, DeviceRegistryEntry>;
    areaMap?: Map<string, AreaRegistryEntry>;
  }
): boolean {
  const entry =
    helpers.entityMap?.get(entity.entity_id) ||
    helpers.entities?.find((e) => e.entity_id === entity.entity_id);

  const matcher = matchers[rule.key];
  if (matcher) {
    return matcher(entity, rule.value, { ...helpers, card }, entry);
  }

  return true;
}
