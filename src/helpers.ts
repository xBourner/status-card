import memoizeOne from "memoize-one";
import { ActionConfig } from "custom-card-helpers";
import { noChange } from "lit";
import {
  AttributePart,
  directive,
  Directive,
  DirectiveParameters,
} from "lit/directive.js";
import type { HassEntity } from "home-assistant-js-websocket";
import "custom-card-helpers";

declare module "custom-card-helpers" {
  interface HomeAssistant {
    // die zusätzlichen Properties
    entities: { [id: string]: EntityRegistryEntry };
    devices: { [id: string]: DeviceRegistryEntry };
    areas: { [id: string]: AreaRegistryEntry };
  }
}

export interface CustomizationConfig {
  type: string;
  invert?: boolean;
  name?: string;
  icon?: string;
  icon_color?: string;
  state?: string;
  state_not?: string;
  invert_state?: "true" | "false";
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  icon_css?: string;
  background_color?: number[];
  show_total_entities?: boolean;
  show_total_number?: boolean;
  show_entity_picture?: boolean;
  card?: any;
}

export interface CardConfig {
  area?: string[];
  extra_entities?: string[];
  hide_person?: boolean;
  list_mode?: boolean;
  hide_content_name?: boolean;
  floor?: string[];
  label?: string[];
  hidden_entities?: string[];
  hidden_labels?: string[];
  hidden_areas?: string[];
  columns?: number;
  invert?: Record<string, Record<string, boolean>>;
  content?: string[];
  customization?: CustomizationConfig[];
  theme?: string;
  color?: string;
  background_color?: number[];
  show_total_number?: boolean;
  show_total_entities?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  square?: boolean;
  filter?: string;
  invert_state?: "true" | "false";
  hide_filter?: string;
  label_filter?: boolean;
  multiple_areas?: boolean;
  multiple_floors?: boolean;
  icon_color?: string;
  rulesets?: any;
  content_layout?: "horizontal" | "vertical";
  no_scroll?: boolean;
  card?: any;
}

export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  area_id?: string;
  hidden_by?: string;
  hidden?: boolean;
  disabled_by?: string;
  labels?: string[];
  entity_category?: string;
  platform?: string;
  config_entry_id?: string;
}

export interface AreaRegistryEntry {
  area_id: string;
  floor_id?: string;
  name: string;
}

export interface DeviceRegistryEntry {
  area_id: string;
  labels?: string[];
  id: string;
  model?: string;
  manufacturer?: string;
}

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

export type UiAction =
  | Exclude<ActionConfig["action"], "fire-dom-event">
  | "perform-action";

export interface Schema {
  name: string;
  selector?: string;
  required?: boolean;
  default?: string;
  type?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  type?: "domain" | "entity";
}

export interface SubElementEditor {
  index?: number;
}

export interface SubElementConfig {
  index?: number;
  type?: string;
  schemaType?: string;
}

export interface EditorTarget extends EventTarget {
  value?: string;
  index?: number;
  checked?: boolean;
  configValue?: string;
  type?: HTMLInputElement["type"];
  config: ActionConfig;
}

export interface HTMLElementValue extends HTMLElement {
  value: string;
}

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
          default:
            return state === "off"
              ? "mdi:toggle-switch-off"
              : "mdi:toggle-switch";
        }
      }
      return state === "off" ? "mdi:toggle-switch-off" : "mdi:toggle-switch";
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

const caseInsensitiveCollator = memoizeOne(
  (language: string | undefined) =>
    new Intl.Collator(language, { sensitivity: "accent" })
);

const fallbackStringCompare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
};

export const caseInsensitiveStringCompare = (
  a: string,
  b: string,
  language: string | undefined = undefined
) => {
  // @ts-ignore
  if (Intl?.Collator) {
    return caseInsensitiveCollator(language).compare(a, b);
  }

  return fallbackStringCompare(a.toLowerCase(), b.toLowerCase());
};

export function fireEvent<T>(
  node: HTMLElement | Window,
  type: string,
  detail: T
): void {
  const event = new CustomEvent(type, {
    bubbles: false,
    composed: false,
    detail: detail,
  });
  node.dispatchEvent(event);
}

interface ActionHandlerType extends HTMLElement {
  holdTime: number;
  bind(element: Element, options?: ActionHandlerOptions): void;
}
interface ActionHandlerElement extends HTMLElement {
  actionHandler?: {
    options: ActionHandlerOptions;
    start?: (ev: Event) => void;
    end?: (ev: Event) => void;
    handleKeyDown?: (ev: KeyboardEvent) => void;
  };
}

export interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
  disabled?: boolean;
}

class ActionHandler extends HTMLElement implements ActionHandlerType {
  public holdTime = 500;

  protected timer?: number;

  protected held = false;

  private cancelled = false;

  private dblClickTimeout?: number;

  public connectedCallback() {
    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll",
    ].forEach((ev) => {
      document.addEventListener(
        ev,
        () => {
          this.cancelled = true;
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
          }
        },
        { passive: true }
      );
    });
  }

  public bind(
    element: ActionHandlerElement,
    options: ActionHandlerOptions = {}
  ) {
    if (
      element.actionHandler &&
      deepEqual(options, element.actionHandler.options)
    ) {
      return;
    }

    if (element.actionHandler) {
      element.removeEventListener("touchstart", element.actionHandler.start!);
      element.removeEventListener("touchend", element.actionHandler.end!);
      element.removeEventListener("touchcancel", element.actionHandler.end!);

      element.removeEventListener("mousedown", element.actionHandler.start!);
      element.removeEventListener("click", element.actionHandler.end!);

      element.removeEventListener(
        "keydown",
        element.actionHandler.handleKeyDown!
      );
    }
    element.actionHandler = { options };

    if (options.disabled) {
      return;
    }

    element.actionHandler.start = (ev: Event) => {
      this.cancelled = false;
      let x: number;
      let y: number;
      if ((ev as TouchEvent).touches) {
        x = (ev as TouchEvent).touches[0].clientX;
        y = (ev as TouchEvent).touches[0].clientY;
      } else {
        x = (ev as MouseEvent).clientX;
        y = (ev as MouseEvent).clientY;
      }

      if (options.hasHold) {
        this.held = false;
        this.timer = window.setTimeout(() => {
          this.held = true;
        }, this.holdTime);
      }
    };

    element.actionHandler.end = (ev: Event) => {
      // Don't respond when moved or scrolled while touch
      if (ev.currentTarget !== ev.target) {
        return;
      }
      if (
        ev.type === "touchcancel" ||
        (ev.type === "touchend" && this.cancelled)
      ) {
        return;
      }
      const target = ev.target as HTMLElement;
      // Prevent mouse event if touch event
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (options.hasHold) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      if (options.hasHold && this.held) {
        fireEvent(target, "action", { action: "hold" });
      } else if (options.hasDoubleClick) {
        if (
          (ev.type === "click" && (ev as MouseEvent).detail < 2) ||
          !this.dblClickTimeout
        ) {
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = undefined;
            fireEvent(target, "action", { action: "tap" });
          }, 250);
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          fireEvent(target, "action", { action: "double_tap" });
        }
      } else {
        fireEvent(target, "action", { action: "tap" });
      }
    };

    element.actionHandler.handleKeyDown = (ev: KeyboardEvent) => {
      if (!["Enter", " "].includes(ev.key)) {
        return;
      }
      (ev.currentTarget as ActionHandlerElement).actionHandler!.end!(ev);
    };

    element.addEventListener("touchstart", element.actionHandler.start, {
      passive: true,
    });
    element.addEventListener("touchend", element.actionHandler.end);
    element.addEventListener("touchcancel", element.actionHandler.end);

    element.addEventListener("mousedown", element.actionHandler.start, {
      passive: true,
    });
    element.addEventListener("click", element.actionHandler.end);

    element.addEventListener("keydown", element.actionHandler.handleKeyDown);
  }
}

customElements.define("action-handler-status-card", ActionHandler);

const getActionHandler = (): ActionHandler => {
  const body = document.body;
  if (body.querySelector("action-handler-status-card")) {
    return body.querySelector("action-handler-status-card") as ActionHandler;
  }

  const actionhandler = document.createElement("action-handler-status-card");
  body.appendChild(actionhandler);

  return actionhandler as ActionHandler;
};

export const actionHandlerBind = (
  element: ActionHandlerElement,
  options?: ActionHandlerOptions
): void => {
  const actionhandler: ActionHandler = getActionHandler();
  if (!actionhandler) {
    return;
  }
  actionhandler.bind(element, options);
};

export const actionHandler = directive(
  class extends Directive {
    update(part: AttributePart, [options]: DirectiveParameters<this>) {
      actionHandlerBind(part.element as ActionHandlerElement, options);
      return noChange;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(_options?: ActionHandlerOptions) {}
  }
);

// From https://github.com/epoberezkin/fast-deep-equal
// MIT License - Copyright (c) 2017 Evgeny Poberezkin
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) {
    return true;
  }

  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let i: number | [any, any];
    let length: number;
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      }
      for (i of a.entries()) {
        if (!b.has(i[0])) {
          return false;
        }
      }
      for (i of a.entries()) {
        if (!deepEqual(i[1], b.get(i[0]))) {
          return false;
        }
      }
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) {
        return false;
      }
      for (i of a.entries()) {
        if (!b.has(i[0])) {
          return false;
        }
      }
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      length = a.length;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if ((a as Uint8Array)[i] !== (b as Uint8Array)[i]) {
          return false;
        }
      }
      return true;
    }

    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }

    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (i = length; i-- !== 0; ) {
      const key = keys[i];

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  // true if both NaN, false otherwise
  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b;
};

export const applyThemesOnElement = (
  element: any,
  themes: any,
  selectedTheme?: string,
  themeSettings?: Partial<{
    dark: boolean;
    primaryColor: string;
    accentColor: string;
  }>,
  main?: boolean
) => {
  const themeToApply = selectedTheme || (main ? themes?.theme : undefined);
  const darkMode =
    themeSettings?.dark !== undefined
      ? themeSettings.dark
      : themes?.darkMode || false;

  if (!element.__themes) {
    element.__themes = { cacheKey: null, keys: new Set<string>() };
  }

  let cacheKey = themeToApply || "";
  let themeRules: Record<string, string> = {};

  // Default theme: only use provided primary/accent colors, do not wipe inline styles
  if (themeToApply === "default") {
    const primaryColor = themeSettings?.primaryColor;
    const accentColor = themeSettings?.accentColor;

    if (primaryColor) {
      cacheKey = `${cacheKey}__primary_${primaryColor}`;
      themeRules["primary-color"] = String(primaryColor);
    }
    if (accentColor) {
      cacheKey = `${cacheKey}__accent_${accentColor}`;
      themeRules["accent-color"] = String(accentColor);
    }

    // If nothing changes and we already applied the same config, skip
    if (
      !primaryColor &&
      !accentColor &&
      element.__themes?.cacheKey === "default"
    ) {
      return;
    }
  }

  // Custom theme: merge base rules with dark/light mode specific overrides if present
  if (
    themeToApply &&
    themeToApply !== "default" &&
    themes?.themes?.[themeToApply]
  ) {
    const { modes, ...base } = themes.themes[themeToApply] || {};
    themeRules = { ...themeRules, ...base };
    if (modes) {
      if (darkMode && modes.dark) {
        themeRules = { ...themeRules, ...modes.dark };
      } else if (!darkMode && modes.light) {
        themeRules = { ...themeRules, ...modes.light };
      }
    }
  } else if (
    !themeToApply &&
    (!element.__themes?.keys ||
      (element.__themes.keys as Set<string>).size === 0)
  ) {
    // No theme to apply and nothing set previously
    return;
  }

  const prevKeys: Set<string> = element.__themes?.keys || new Set<string>();
  const newKeys = new Set<string>(Object.keys(themeRules));

  // If default theme with no explicit colors provided, clear previously set vars
  if (themeToApply === "default" && newKeys.size === 0) {
    for (const key of prevKeys) {
      try {
        element.style.removeProperty(`--${key}`);
      } catch {}
    }
    element.__themes = { cacheKey: "default", keys: new Set<string>() };
    return;
  }

  // If cacheKey unchanged and keys are identical, skip reapplying
  if (element.__themes?.cacheKey === cacheKey) {
    let same = true;
    if (prevKeys.size !== newKeys.size) {
      same = false;
    } else {
      for (const k of prevKeys) {
        if (!newKeys.has(k)) {
          same = false;
          break;
        }
      }
    }
    if (same) return;
  }

  // Remove variables that are no longer present
  for (const key of prevKeys) {
    if (!newKeys.has(key)) {
      try {
        element.style.removeProperty(`--${key}`);
      } catch {}
    }
  }

  // Apply new variables
  for (const [key, value] of Object.entries(themeRules)) {
    element.style.setProperty(`--${key}`, String(value));
  }

  element.__themes.cacheKey = cacheKey || null;
  element.__themes.keys = newKeys;
};

export function computeEntitiesByDomain(
  registryEntities: EntityRegistryEntry[],
  deviceRegistry: DeviceRegistryEntry[],
  areas: AreaRegistryEntry[],
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

  const deviceMap = new Map(deviceRegistry.map((d) => [d.id, d]));
  const floorByArea = new Map(
    areas.map((a) => [a.area_id, a.floor_id as string | undefined])
  );

  const includedEntityIds = registryEntities
    .filter((entry) => {
      const domain = entry.entity_id.split(".")[0];
      if (!allowedDomains.includes(domain)) return false;

      // Special handling for update domain
      if (domain === "update") {
        return !entry.hidden_by && !entry.disabled_by;
      }

      const device = entry.device_id
        ? deviceMap.get(entry.device_id)
        : undefined;

      // Must be in any area (entity or its device)
      const isInAnyArea =
        entry.area_id != null || (device && device.area_id != null);
      if (!isInAnyArea) return false;

      // Label filter
      if (labelSel) {
        const matchesLabel =
          (entry.labels?.some((l) => (labelSel as string[]).includes(l)) ??
            false) ||
          (device?.labels?.some((l) => (labelSel as string[]).includes(l)) ??
            false);
        if (!matchesLabel) return false;
      }

      // Area filter
      if (areaSel) {
        const areaOk =
          (entry.area_id !== undefined &&
            (areaSel as string[]).includes(entry.area_id)) ||
          (device &&
            device.area_id !== undefined &&
            (areaSel as string[]).includes(device.area_id));
        if (!areaOk) return false;
      }

      // Floor filter via area->floor map
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

      // Hidden area filter
      if (hiddenAreasSet.size) {
        const inHiddenArea =
          (entry.area_id && hiddenAreasSet.has(entry.area_id)) ||
          (device && device.area_id && hiddenAreasSet.has(device.area_id));
        if (inHiddenArea) return false;
      }

      // Hidden labels/entities
      if (entry.labels?.some((l) => hiddenLabelsSet.has(l))) return false;
      if (hiddenEntitiesSet.has(entry.entity_id)) return false;

      return !entry.hidden_by && !entry.disabled_by;
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
  return deviceClass ? `${_formatDomain(domain)} - ${deviceClass}` : domain;
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

export const STATES_OFF = [
  "closed",
  "locked",
  "off",
  "docked",
  "idle",
  "standby",
  "paused",
  "auto",
  "not_home",
  "disarmed",
  "0",
];
