interface DeviceClasses {
  [key: string]: string[];
}

export function domainIcon(domain: string, state?: string, deviceClass?: string): string {
  switch (domain) {
    case "alarm_control_panel":
      return state === "off" ? "mdi:alarm-light-off" : "mdi:alarm-light";
    case "siren":
      return state === "off" ? "mdi:bell-off" : "mdi:bell-ring";
    case "lock":
      return state === "off" ? "mdi:lock-open" : "mdi:lock";
    case "light":
      return state === "off" ? "mdi:lightbulb-off" : "mdi:lightbulb";
    case "media_player":
      return state === "off" ? "mdi:cast-off" : "mdi:cast";
    case "climate":
      return state === "off" ? "mdi:thermostat-cog" : "mdi:thermostat";
    case "switch":
      return state === "off" ? "mdi:toggle-switch-off" : "mdi:power";
    case "vacuum":
      return state === "off" ? "mdi:robot-vacuum-off" : "mdi:robot-vacuum";
    case "fan":
      return state === "off" ? "mdi:fan-off" : "mdi:fan";
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
          case "shade":
            return state === "off" ? "mdi:roller-shade-closed" : "mdi:roller-shade";
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
            return state === "off" ? "mdi:motion-sensor-off" : "mdi:motion-sensor";
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
            return state === "off" ? "mdi:battery-alert" : "mdi:battery-charging";
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
            return state === "off" ? "mdi:weather-sunny-off" : "mdi:weather-sunny";
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
            return state === "off" ? "mdi:alert-circle-check" : "mdi:alert-circle";
          case "safety":
            return state === "off" ? "mdi:shield-alert-outline" : "mdi:shield-alert";
          case "smoke":
            return state === "off" ? "mdi:smoke-detector-off" : "mdi:smoke-detector";
          case "sound":
            return state === "off" ? "mdi:volume-off" : "mdi:volume-high";
          case "tamper":
            return state === "off" ? "mdi:shield-home-outline" : "mdi:shield-home";
          case "update":
            return state === "off" ? "mdi:autorenew-off" : "mdi:autorenew";
          default:
            return "mdi:help-circle"; 
        }
      }
      return state === "off" ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
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
    default:
      console.warn(`Unable to find icon for domain ${domain} (${state})`);
      return "mdi:help-circle"; 
  }
}

  export const sortOrder: { [key: string]: any } = {
    alarm_control_panel: 1,
    siren: 2,
    lock: 3,
    light: 4,
    media_player: 5,
    climate: 6,
    switch: 7,
    vacuum: 8,
    fan: 9,
    humidifier: 10,
    lawn_mower: 11,
    valve: 12,
    water_heater: 13,
    remote: 14,
    cover: {
        deviceClasses: {
            door: 15,
            window: 16,
            garage: 17,
            gate: 18,
            blind: 19,
            curtain: 20,
            damper: 21,
            awning: 22,
            shade: 23,
            shutter: 24
        }
    },
    binary_sensor: {
        deviceClasses: {
            door: 25,
            window: 26,
            lock: 27,
            motion: 28,
            presence: 29,
            occupancy: 30,
            vibration: 31,
            plug: 32,
            power: 33,
            battery: 34,
            battery_charging: 35,
            moving: 36,
            running: 37,
            gas: 38,
            carbon_monoxide: 39,
            cold: 40,
            heat: 41,
            moisture: 42,
            connectivity: 43,
            opening: 44,
            garage_door: 45,
            light: 46,
            problem: 47,
            safety: 48,
            smoke: 49,
            sound: 50,
            tamper: 51,
            update: 52
        }
    },
    update: 53,
    device_tracker: 54,
    input_boolean: 55,
    timer: 56,
    counter: 57,
    calendar: 58
};


export const ALLOWED_DOMAINS = [
  "alarm_control_panel", "siren", "lock", "light", "media_player", "climate", 
  "switch", "vacuum", "fan", "cover", "binary_sensor", "humidifier",      
  "lawn_mower", "valve", "water_heater", "remote",
  "update", "device_tracker", "input_boolean", "timer", "counter", "calendar"
];

export const deviceClasses: DeviceClasses = {
  binary_sensor: ["door", "window", "lock", "motion", "presence", "occupancy", 
    "plug", "power", "battery", "battery_charging", "moving", "running", "gas", 
    "carbon_monoxide", "vibration", "cold", "heat", "moisture", "connectivity", "opening", 
    "garage_door", "light", "problem", "safety", "smoke", "sound", "tamper", "update"],
  cover: ["door", "window", "garage", "gate", "blind", "curtain", "damper", "awning", "shade", "shutter"],
};