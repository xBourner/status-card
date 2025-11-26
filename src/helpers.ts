import type { HassEntity } from "home-assistant-js-websocket";
import { caseInsensitiveStringCompare, HomeAssistant } from "./ha";

export interface DomainItem {
  type: "domain";
  domain: string;
  order: number;
}

export interface DeviceClassItem {
  type: "deviceClass";
  domain: string;
  deviceClass: string;
  order: number;
}

export interface ExtraItem {
  type: "extra";
  panel: string;
  entity: HassEntity;
  order: number;
  icon: string;
  name: string;
  color?: string;
  icon_css?: string;
  background_color?: string;
}

export interface GroupItem {
  type: "group";
  group_id: string;
  order: number;
  ruleset: any;
}

export interface SmartGroupItem {
  group_id: string;
  group_icon: string;
  group_status?: string;
  rules: Array<{ key: string; value: any }>;
}

export type AnyItem = DomainItem | DeviceClassItem | ExtraItem | GroupItem;

export interface SubElementEditor {
  index?: number;
}

export interface SubElementConfig {
  index?: number;
  type?: string;
  schemaType?: string;
}

interface DeviceClasses {
  [key: string]: string[];
}

export const DOMAIN_ICONS = {
  alarm_control_panel: { on: "mdi:alarm-light", off: "mdi:alarm-light-off" },
  siren: { on: "mdi:bell-ring", off: "mdi:bell_off" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  light: { on: "mdi:lightbulb", off: "mdi:lightbulb-off" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  climate: { on: "mdi:thermostat", off: "mdi:thermostat-cog" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  switch: {
    on: "mdi:toggle-switch",
    off: "mdi:toggle-switch-off",
    switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
    outlet: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
  },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  lawn_mower: { on: "robot-mower", off: "mdi:robot-mower" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },

  cover: {
    on: "mdi:garage-open",
    off: "mdi:garage",
    garage: { on: "mdi:garage-open", off: "mdi:garage" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    gate: { on: "mdi:gate-open", off: "mdi:gate" },
    blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
    curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
    damper: { on: "mdi:valve-open", off: "mdi:valve-closed" },
    awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" },
    shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
    shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
  },
  binary_sensor: {
    on: "mdi:power-off",
    off: "mdi:power-off",
    motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
    moisture: { on: "mdi:water-alert", off: "mdi:water-off" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    lock: { on: "mdi:lock-open", off: "mdi:lock" },
    presence: { on: "mdi:home-outline", off: "mdi:home-export-outline" },
    occupancy: { on: "mdi:seat", off: "mdi:seat-outline" },
    vibration: { on: "mdi:vibrate", off: "mdi:vibrate-off" },
    opening: { on: "mdi:shield-lock-open", off: "mdi:shield-lock" },
    garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
    problem: {
      on: "mdi:alert-circle-outline",
      off: "mdi:alert-circle-check-outline",
    },
    smoke: {
      on: "mdi:smoke-detector-outline",
      off: "mdi:smoke-detector-off-outline",
    },
    running: { on: "mdi:play", off: "mdi:pause" },
    plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
    power: { on: "mdi:power", off: "mdi:power-off" },
    battery: { on: "mdi:battery-alert", off: "mdi:battery" },
    battery_charging: { on: "mdi:battery-charging", off: "mdi:battery-check" },
    gas: { on: "mdi:gas-station-outline", off: "mdi:gas-station-off-outline" },
    carbon_monoxide: { on: "mdi:molecule-co", off: "mdi:molecule-co" },
    cold: { on: "mdi:snowflake", off: "mdi:snowflake-off" },
    heat: { on: "mdi:weather-sunny", off: "mdi:weather-sunny-off" },
    connectivity: { on: "mdi:connection", off: "mdi:connection" },
    safety: { on: "mdi:shield-alert-outline", off: "mdi:shield-check-outline" },
    sound: { on: "mdi:volume-high", off: "mdi:volume-off" },
    update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
    tamper: { on: "mdi:shield-home", off: "mdi:shield-home" },
    light: { on: "mdi:lightbulb-outline", off: "mdi:lightbulb-off-outline" },
    moving: { on: "mdi:car", off: "mdi:car-off" },
  },
  person: { on: "mdi:account", off: "mdi:account-off" },
  device_tracker: { on: "mdi:account", off: "mdi:account-off" },
  valve: { on: "mdi:valve", off: "mdi:valve-closed" },
  water_heater: { on: "mdi:water-boiler", off: "mdi:water-pump-off" },
  remote: { on: "mdi:remote", off: "mdi:remote-off" },
  update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
  air_quality: { on: "mdi:air-filter", off: "mdi:air-filter" },
  camera: { on: "mdi:camera", off: "mdi:camera-off" },
  calendar: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  scene: { on: "mdi:movie", off: "mdi:movie-off" },
  notifications: { on: "mdi:bell", off: "mdi:bell-off" },
  sensor: { on: "mdi:gauge", off: "mdi:gauge" },
  script: { on: "mdi:script-text", off: "mdi:script-text" },
  tags: { on: "mdi:tag-multiple", off: "mdi:tag-multiple" },
  select: { on: "mdi:format-list-bulleted", off: "mdi:format-list-bulleted" },
  automation: { on: "mdi:robot", off: "mdi:robot-off" },
  button: { on: "mdi:gesture-tap-button", off: "mdi:gesture-tap-button" },
  number: { on: "mdi:numeric", off: "mdi:numeric" },
  conversation: { on: "mdi:comment-multiple", off: "mdi:comment-multiple" },
  assist_satellite: {
    on: "mdi:satellite-variant",
    off: "mdi:satellite-variant",
  },
  counter: { on: "mdi:counter", off: "mdi:counter" },
  event: { on: "mdi:calendar-star", off: "mdi:calendar-star" },
  group: {
    on: "mdi:google-circles-communities",
    off: "mdi:google-circles-communities",
  },
  image: { on: "mdi:image", off: "mdi:image-off" },
  image_processing: {
    on: "mdi:image-filter-center-focus",
    off: "mdi:image-filter-center-focus",
  },
  input_boolean: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  input_datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  input_number: { on: "mdi:numeric", off: "mdi:numeric" },
  input_select: {
    on: "mdi:format-list-bulleted",
    off: "mdi:format-list-bulleted",
  },
  input_text: { on: "mdi:text-box", off: "mdi:text-box" },
  stt: { on: "mdi:record-rec", off: "mdi:record" },
  sun: { on: "mdi:weather-sunny", off: "mdi:weather-night" },
  text: { on: "mdi:text-box", off: "mdi:text-box" },
  date: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  time: { on: "mdi:clock-outline", off: "mdi:clock-off" },
  timer: { on: "mdi:timer-outline", off: "mdi:timer-off" },
  todo: {
    on: "mdi:check-circle-outline",
    off: "mdi:checkbox-blank-circle-outline",
  },
  tts: { on: "mdi:volume-high", off: "mdi:volume-off" },
  wake_word: { on: "mdi:microphone", off: "mdi:microphone-off" },
  weather: { on: "mdi:weather-partly-cloudy", off: "mdi:weather-night" },
  zone: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  geo_location: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
};

export const ALLOWED_DOMAINS = [
  "alarm_control_panel",
  "siren",
  "lock",
  "light",
  "media_player",
  "climate",
  "switch",
  "vacuum",
  "fan",
  "cover",
  "binary_sensor",
  "humidifier",
  "lawn_mower",
  "valve",
  "water_heater",
  "remote",
  "update",
  "device_tracker",
  "input_boolean",
  "timer",
  "counter",
  "calendar",
];

export const deviceClasses: DeviceClasses = {
  binary_sensor: [
    "door",
    "window",
    "lock",
    "motion",
    "presence",
    "occupancy",
    "plug",
    "power",
    "battery",
    "battery_charging",
    "moving",
    "running",
    "gas",
    "carbon_monoxide",
    "vibration",
    "cold",
    "heat",
    "moisture",
    "connectivity",
    "opening",
    "garage_door",
    "light",
    "problem",
    "safety",
    "smoke",
    "sound",
    "tamper",
    "update",
  ],
  cover: [
    "door",
    "window",
    "garage",
    "gate",
    "blind",
    "curtain",
    "damper",
    "awning",
    "shade",
    "shutter",
  ],
  switch: ["switch", "outlet"],
};

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
  const areaSel = filters.area && filters.area.length ? filters.area : null;
  const floorSel = filters.floor && filters.floor.length ? filters.floor : null;
  const labelSel = filters.label && filters.label.length ? filters.label : null;

  const hiddenAreas = filters.hiddenAreas || [];
  const hiddenLabels = filters.hiddenLabels || [];
  const hiddenEntities = filters.hiddenEntities || [];

  const hiddenAreasSet = new Set(hiddenAreas);
  const hiddenLabelsSet = new Set(hiddenLabels);
  const hiddenEntitiesSet = new Set(hiddenEntities);

  const deviceMap = new Map(Object.values(devices).map((d) => [d.id, d]));
  const floorByArea = new Map(
    Object.values(areas).map((a) => [
      a.area_id,
      a.floor_id as string | undefined,
    ])
  );

  const includedEntityIds = Object.values(entities)
    .filter((entry) => {
      const domain = entry.entity_id.split(".")[0];
      if (!allowedDomains.includes(domain)) return false;
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

  const byDomain: { [domain: string]: HassEntity[] } = {};
  for (const eid of includedEntityIds) {
    const domain = eid.split(".")[0];
    const st = states[eid];
    if (!st) continue;
    (byDomain[domain] ||= []).push(st);
  }
  return byDomain;
}

export function _formatDomain(domain: string): string {
  return domain
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
  const setB = new Set(b as any[]);
  for (const x of a as any[]) {
    if (!setB.has(x)) return false;
  }
  return true;
}
