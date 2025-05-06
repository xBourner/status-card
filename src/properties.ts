interface DeviceClasses {
  [key: string]: string[];
}

export function domainIcon(
  domain: string,
  state?: string,
  deviceClass?: string
): string {
  switch (domain) {
    case "alarm_control_panel":
      return state === "off" ? "mdi:alarm-light-off" : "mdi:alarm-light";
    case "siren":
      return state === "off" ? "mdi:bell-off" : "mdi:bell-ring";
    case "lock":
      return state === "off" ? "mdi:lock" : "mdi:lock-open";
    case "light":
      return state === "off" ? "mdi:lightbulb-off" : "mdi:lightbulb";
    case "media_player":
      return state === "off" ? "mdi:cast-off" : "mdi:cast";
    case "climate":
      return state === "off" ? "mdi:thermostat-cog" : "mdi:thermostat";
    case "vacuum":
      return state === "off" ? "mdi:robot-vacuum-off" : "mdi:robot-vacuum";
    case "fan":
      return state === "off" ? "mdi:fan-off" : "mdi:fan";
    case "switch":
      if (deviceClass) {
        switch (deviceClass) {
          case "outlet":
            return state === "off" ? "mdi:power-plug-off" : "mdi:power-plug";
          case "switch":
            return state === "off"
              ? "mdi:toggle-switch-off"
              : "mdi:toggle-switch";
        }
      }
    case "cover":
      if (deviceClass) {
        switch (deviceClass) {
          case "door":
            return state === "off" ? "mdi:door-closed" : "mdi:door-open";
          case "garage":
            return state === "off" ? "mdi:garage" : "mdi:garage-open";
          case "gate":
            return state === "off" ? "mdi:gate" : "mdi:gate-open";
          case "blind":
            return state === "off" ? "mdi:blinds" : "mdi:blinds-open";
          case "curtain":
            return state === "off" ? "mdi:curtains-closed" : "mdi:curtains";
          case "damper":
            return state === "off" ? "mdi:valve-closed" : "mdi:valve";
          case "awning":
            return state === "off" ? "mdi:awning-outline" : "mdi:awning";
          case "shutter":
            return state === "off"
              ? "mdi:window-shutter"
              : "mdi:window-shutter-open";
          case "shade":
            return state === "off"
              ? "mdi:roller-shade-closed"
              : "mdi:roller-shade";
          case "window":
            return state === "off" ? "mdi:window-closed" : "mdi:window-open";
          default:
            return "mdi:help-circle";
        }
      }
      return state === "off" ? "mdi:window-closed" : "mdi:window-open";
    case "binary_sensor":
      if (deviceClass) {
        switch (deviceClass) {
          case "door":
            return state === "off" ? "mdi:door-closed" : "mdi:door-open";
          case "window":
            return state === "off" ? "mdi:window-closed" : "mdi:window-open";
          case "lock":
            return state === "off" ? "mdi:lock-open" : "mdi:lock";
          case "motion":
            return state === "off"
              ? "mdi:motion-sensor-off"
              : "mdi:motion-sensor";
          case "presence":
            return state === "off" ? "mdi:home-off" : "mdi:home";
          case "occupancy":
            return state === "off" ? "mdi:seat-outline" : "mdi:seat";
          case "vibration":
            return state === "off" ? "mdi:vibrate-off" : "mdi:vibrate";
          case "plug":
            return state === "off" ? "mdi:power-plug-off" : "mdi:power-plug";
          case "power":
            return state === "off" ? "mdi:power-off" : "mdi:power";
          case "battery":
            return state === "off" ? "mdi:battery-off" : "mdi:battery";
          case "battery_charging":
            return state === "off"
              ? "mdi:battery-alert"
              : "mdi:battery-charging";
          case "moving":
            return state === "off" ? "mdi:car-off" : "mdi:car";
          case "running":
            return state === "off" ? "mdi:play-pause" : "mdi:play";
          case "gas":
            return state === "off" ? "mdi:gas-cylinder" : "mdi:gas-cylinder";
          case "carbon_monoxide":
            return state === "off" ? "mdi:molecule-co" : "mdi:molecule-co";
          case "cold":
            return state === "off" ? "mdi:snowflake-off" : "mdi:snowflake";
          case "heat":
            return state === "off"
              ? "mdi:weather-sunny-off"
              : "mdi:weather-sunny";
          case "moisture":
            return state === "off" ? "mdi:water-off" : "mdi:water";
          case "connectivity":
            return state === "off" ? "mdi:connection" : "mdi:connection";
          case "opening":
            return state === "off" ? "mdi:shield-lock" : "mdi:shield-lock-open";
          case "garage_door":
            return state === "off" ? "mdi:garage" : "mdi:garage-open";
          case "light":
            return state === "off" ? "mdi:lightbulb-off" : "mdi:lightbulb-on";
          case "problem":
            return state === "off"
              ? "mdi:alert-circle-check"
              : "mdi:alert-circle";
          case "safety":
            return state === "off"
              ? "mdi:shield-alert-outline"
              : "mdi:shield-alert";
          case "smoke":
            return state === "off"
              ? "mdi:smoke-detector-off"
              : "mdi:smoke-detector";
          case "sound":
            return state === "off" ? "mdi:volume-off" : "mdi:volume-high";
          case "tamper":
            return state === "off"
              ? "mdi:shield-home-outline"
              : "mdi:shield-home";
          case "update":
            return state === "off" ? "mdi:autorenew-off" : "mdi:autorenew";
          default:
            return "mdi:help-circle";
        }
      }
      return state === "off"
        ? "mdi:radiobox-blank"
        : "mdi:checkbox-marked-circle";
    case "humidifier":
      return state === "off" ? "mdi:water-off" : "mdi:air-humidifier";
    case "lawn_mower":
      return state === "off" ? "mdi:lawn-mower" : "mdi:robot-mower";
    case "valve":
      return state === "off" ? "mdi:valve" : "mdi:valve";
    case "water_heater":
      return state === "off" ? "mdi:water-pump-off" : "mdi:water-boiler";
    case "remote":
      return state === "off" ? "mdi:remote-off" : "mdi:remote";
    case "device_tracker":
      return state === "off" ? "mdi:account-off" : "mdi:cellphone";
    case "update":
      return state === "off" ? "mdi:autorenew-off" : "mdi:autorenew";
    case "input_boolean":
      return state === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
    case "timer":
      return state === "off" ? "mdi:timer-off" : "mdi:timer-outline";
    case "counter":
      return state === "off" ? "mdi:numeric" : "mdi:counter";
    case "calendar":
      return state === "off" ? "mdi:calendar-off" : "mdi:calendar";
    case "person":
      return "mdi:account";
    default:
      console.warn(`Unable to find icon for domain ${domain} (${state})`);
      return "mdi:help-circle";
  }
}

export const sortOrder = [
  "alarm_control_panel",
  "siren",
  "lock",
  "light",
  "media_player",
  "climate",
  "Switch - switch",
  "Switch - outlet",
  "vacuum",
  "fan",
  "humidifier",
  "lawn_mower",
  "valve",
  "water_heater",
  "remote",
  "Cover - door",
  "Cover - window",
  "Cover - garage",
  "Cover - gate",
  "Cover - blind",
  "Cover - curtain",
  "Cover - damper",
  "Cover - awning",
  "Cover - shade",
  "Cover - shutter",
  "Binary Sensor - door",
  "Binary Sensor - window",
  "Binary Sensor - lock",
  "Binary Sensor - motion",
  "Binary Sensor - presence",
  "Binary Sensor - occupancy",
  "Binary Sensor - vibration",
  "Binary Sensor - plug",
  "Binary Sensor - power",
  "Binary Sensor - battery",
  "Binary Sensor - battery_charging",
  "Binary Sensor - moving",
  "Binary Sensor - running",
  "Binary Sensor - gas",
  "Binary Sensor - carbon_monoxide",
  "Binary Sensor - cold",
  "Binary Sensor - heat",
  "Binary Sensor - moisture",
  "Binary Sensor - connectivity",
  "Binary Sensor - opening",
  "Binary Sensor - garage_door",
  "Binary Sensor - light",
  "Binary Sensor - problem",
  "Binary Sensor - safety",
  "Binary Sensor - smoke",
  "Binary Sensor - sound",
  "Binary Sensor - tamper",
  "Binary Sensor - update",
  "update",
  "device_tracker",
  "input_boolean",
  "timer",
  "counter",
  "calendar",
];

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

export const TOGGLE_DOMAINS = [
  "light",
  "switch",
  "fan",
  "climate",
  "humidifier",
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

export class DataStore {
  private static _entitiesByDomain: { [domain: string]: string[] } = {};

  static setEntitiesByDomain(entities: { [domain: string]: string[] }): void {
    this._entitiesByDomain = entities;
  }

  static getEntitiesByDomain(): { [domain: string]: string[] } {
    return this._entitiesByDomain;
  }

  static getAllEntities(): string[] {
    return Object.values(this._entitiesByDomain).flat();
  }
}
