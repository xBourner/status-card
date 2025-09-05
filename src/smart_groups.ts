import type { HassEntity } from "home-assistant-js-websocket";
import { computeDomain } from "custom-card-helpers";
import {
  AreaRegistryEntry,
  EntityRegistryEntry,
  DeviceRegistryEntry,
} from "./helpers";
import type { StatusCard } from "./card";

export function filterEntitiesByRuleset(
  card: StatusCard,
  ruleset: any
): HassEntity[] {
  let filters: { key: string; value: any }[] = [];
  if (Array.isArray(ruleset.filters)) {
    filters = ruleset.filters;
  } else {
    [
      "area",
      "floor",
      "label",
      "domain",
      "entity_id",
      "state",
      "name",
      "attributes",
      "device",
      "integration",
      "entity_category",
      "hidden_by",
      "device_manufacturer",
      "device_model",
      "last_changed",
      "last_updated",
      "last_triggered",
      "level",
      "group",
    ].forEach((key) => {
      if (ruleset[key] !== undefined) {
        filters.push({ key, value: ruleset[key] });
      }
    });
  }

  const entityMap = new Map((card.entities || []).map((e) => [e.entity_id, e]));
  const deviceMap = new Map((card.devices || []).map((d) => [d.id, d]));
  const areaMap = new Map((card.areas || []).map((a) => [a.area_id, a]));

  return Object.values(card.hass.states).filter((entity) => {
    if (card.hiddenEntities.includes(entity.entity_id)) return false;
    if (!filters.length) return true;
    return filters.every((rule) =>
      matchesRule(card, entity, rule, {
        areas: card.areas,
        devices: card.devices,
        entities: card.entities,
        entityMap,
        deviceMap,
        areaMap,
      })
    );
  });
}
function match(actual: any, expected: any): boolean {
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
    const actualTime = new Date(actual).getTime();
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

  if (typeof expected === "string" && /^([<>]=?)?\s*\d+$/.test(expected)) {
    const [, op, numStr] = expected.match(/^([<>]=?)?\s*(\d+)$/) || [];
    const num = parseFloat(numStr);
    const actualTime = new Date(actual).getTime();
    if (!isNaN(actualTime)) {
      const diffMinutes = (Date.now() - actualTime) / 60000;
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
  }
  if (
    typeof expected === "string" &&
    /^([<>]=?)\s*(-?\d+(\.\d+)?)$/.test(expected)
  ) {
    const [, op, numStr] = expected.match(/^([<>]=?)\s*(-?\d+(\.\d+)?)$/) || [];
    const num = parseFloat(numStr);
    const val = parseFloat(actual);
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

function matchesRule(
  card: StatusCard,
  entity: HassEntity,
  rule: { key: string; value: any },
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

  switch (rule.key) {
    case "area": {
      let areaId = entry?.area_id;
      if (!areaId && entry?.device_id) {
        const device =
          (helpers.deviceMap && entry?.device_id
            ? helpers.deviceMap.get(entry.device_id)
            : undefined) ||
          helpers.devices?.find((d) => d.id === entry.device_id);
        areaId = device?.area_id;
      }
      return match(areaId, rule.value);
    }
    case "domain":
      return match(computeDomain(entity.entity_id), rule.value);

    case "entity_id":
      return match(entity.entity_id, rule.value);

    case "state":
      return match(entity.state, rule.value);

    case "name": {
      const name = entity.attributes.friendly_name ?? "";
      return match(name, rule.value);
    }

    case "attributes": {
      if (!rule.value || typeof rule.value !== "object") return false;
      return Object.entries(rule.value).every(([attrKey, expected]) => {
        const attrPath = attrKey.split(":");
        let attrValue = entity.attributes;
        for (const key of attrPath) {
          attrValue = attrValue?.[key];
          if (attrValue === undefined) break;
        }
        if (attrValue === undefined) return false;
        return match(attrValue, expected);
      });
    }

    case "device":
      return match(entry?.device_id, rule.value);

    case "integration":
      if (!entry) return false;
      return (
        match(entry.platform, rule.value) ||
        match(entry.config_entry_id, rule.value)
      );

    case "entity_category":
      return match(entry?.entity_category, rule.value);

    case "label": {
      const allLabels = (helpers as any).labels as
        | { label_id: string; name: string }[]
        | undefined;
      const match_label = (lbl: string) => {
        if (match(lbl, rule.value)) return true;
        if (allLabels) {
          const labelObj = allLabels.find((l) => l.label_id === lbl);
          if (labelObj && match(labelObj.name, rule.value)) return true;
        }
        return false;
      };

      if (entry?.labels && entry.labels.some(match_label)) return true;

      if (entry?.device_id) {
        const device =
          (helpers.deviceMap && entry?.device_id
            ? helpers.deviceMap.get(entry.device_id)
            : undefined) ||
          helpers.devices?.find((d) => d.id === entry.device_id);
        if (device?.labels && device.labels.some(match_label)) return true;
      }
      return false;
    }

    case "floor": {
      let areaId = entry?.area_id;
      if (!areaId && entry?.device_id) {
        const device =
          (helpers.deviceMap && entry?.device_id
            ? helpers.deviceMap.get(entry.device_id)
            : undefined) ||
          helpers.devices?.find((d) => d.id === entry.device_id);
        areaId = device?.area_id;
      }
      if (!areaId) return false;
      const areaObj =
        (helpers.areaMap ? helpers.areaMap.get(areaId) : undefined) ||
        helpers.areas?.find((a) => a.area_id === areaId);
      return match(areaObj?.floor_id, rule.value);
    }

    case "hidden_by":
      return match(entry?.hidden_by, rule.value);

    case "device_manufacturer": {
      if (entry?.device_id) {
        const device =
          (helpers.deviceMap && entry?.device_id
            ? helpers.deviceMap.get(entry.device_id)
            : undefined) ||
          helpers.devices?.find((d) => d.id === entry.device_id);
        return match(device?.manufacturer, rule.value);
      }
      return false;
    }

    case "device_model": {
      if (entry?.device_id) {
        const device =
          (helpers.deviceMap && entry?.device_id
            ? helpers.deviceMap.get(entry.device_id)
            : undefined) ||
          helpers.devices?.find((d) => d.id === entry.device_id);
        return match(device?.model, rule.value);
      }
      return false;
    }

    case "last_changed":
      return match(entity.last_changed, rule.value);

    case "last_updated":
      return match(entity.last_updated, rule.value);

    case "last_triggered":
      return match(entity.attributes.last_triggered, rule.value);

    case "group": {
      const group = card.hass.states[rule.value];
      if (!group || !Array.isArray(group.attributes?.entity_id)) return false;
      return group.attributes.entity_id.includes(entity.entity_id);
    }

    default:
      return true;
  }
}
