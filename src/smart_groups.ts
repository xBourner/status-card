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

const DYNAMIC_KEYS = [
  "state",
  "name",
  "attributes",
  "last_changed",
  "last_updated",
  "last_triggered",
  "level",
  "group",
];

export const filterStaticEntities = (
  ruleset: Ruleset,
  entities: EntityRegistryEntry[],
  hiddenEntities: string[],
  entityMap: Map<string, EntityRegistryEntry>,
  deviceMap: Map<string, DeviceRegistryEntry>,
  areaMap: Map<string, AreaRegistryEntry>,
  labels?: StatusCardLike["labels"]
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

  const hidden = new Set(hiddenEntities);
  return entities
    .filter((entry) => {
      if (hidden.has(entry.entity_id)) return false;
      if (!filters.length) return true;

      const fakeEntity = { entity_id: entry.entity_id } as HassEntity;

      return filters.every((rule) =>
        matchesRule({ labels } as StatusCardLike, fakeEntity, rule, {
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
    DYNAMIC_KEYS.forEach((key) => {
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

function match(actual: unknown, expected: unknown): boolean {
  if (Array.isArray(expected)) {
    return expected.some((v) => match(actual, v));
  }
  if (typeof expected === "string" && expected.startsWith("!")) {
    return !match(actual, expected.slice(1));
  }
  const timeCmp =
    typeof expected === "string" &&
    expected.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)([mhd])$/);
  if (timeCmp) {
    const [, op, numStr, , unit] = timeCmp;
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

  const numCmp =
    typeof expected === "string" &&
    expected.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/);
  if (numCmp) {
    const [, op, numStr] = numCmp;
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
    } catch (e) {
      console.debug("status-card: Invalid regex pattern:", expected, e);
      return false;
    }
  }
  return actual === expected;
}

interface MatcherHelpers {
  entityMap?: Map<string, EntityRegistryEntry>;
  deviceMap?: Map<string, DeviceRegistryEntry>;
  areaMap?: Map<string, AreaRegistryEntry>;
  card: StatusCardLike;
}

// Entity area wins, the device area is only the fallback (HA semantics).
const resolveAreaId = (
  entry: EntityRegistryEntry | undefined,
  deviceMap?: Map<string, DeviceRegistryEntry>
): string | null | undefined => {
  if (entry?.area_id) return entry.area_id;
  return entry?.device_id ? deviceMap?.get(entry.device_id)?.area_id : undefined;
};

// "<15" without unit means minutes for last_* filters.
const timeMatcher =
  (get: (entity: HassEntity) => unknown) =>
  (entity: HassEntity, value: unknown) =>
    match(
      get(entity),
      typeof value === "string" && /^[<>]=?\s*\d+$/.test(value)
        ? `${value}m`
        : value
    );

const matchers: {
  [key: string]: (
    entity: HassEntity,
    value: unknown,
    helpers: MatcherHelpers,
    entry?: EntityRegistryEntry
  ) => boolean;
} = {
  area: (entity, value, { deviceMap }, entry) =>
    match(resolveAreaId(entry, deviceMap), value),
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
  floor: (entity, value, { deviceMap, areaMap }, entry) => {
    const areaId = resolveAreaId(entry, deviceMap);
    if (!areaId) return false;
    return match(areaMap?.get(areaId)?.floor_id, value);
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
  last_changed: timeMatcher((e) => e.last_changed),
  last_updated: timeMatcher((e) => e.last_updated),
  last_triggered: timeMatcher((e) => e.attributes.last_triggered),
  group: (entity, value, { card }) => {
    const group = card.hass.states[value as string];
    return !!group?.attributes?.entity_id?.includes(entity.entity_id);
  },
};

function matchesRule(
  card: StatusCardLike,
  entity: HassEntity,
  rule: { key: string; value: unknown },
  helpers: Omit<MatcherHelpers, "card">
): boolean {
  const entry = helpers.entityMap?.get(entity.entity_id);

  const matcher = matchers[rule.key];
  if (matcher) {
    return matcher(entity, rule.value, { ...helpers, card }, entry);
  }

  return true;
}
