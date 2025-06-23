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
}

export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  area_id?: string;
  hidden_by?: string;
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

export type UiAction = Exclude<ActionConfig["action"], "fire-dom-event">;

export type EntityFilter = (
  entity: HassEntity,
  helpers: {
    areas?: AreaRegistryEntry[];
    devices?: DeviceRegistryEntry[];
    entities?: EntityRegistryEntry[];
  }
) => boolean;

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

const collator = memoizeOne(
  (language: string | undefined) => new Intl.Collator(language)
);

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

export const stringCompare = (
  a: string,
  b: string,
  language: string | undefined = undefined
) => {
  // @ts-ignore
  if (Intl?.Collator) {
    return collator(language).compare(a, b);
  }

  return fallbackStringCompare(a, b);
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

export async function await_element(el: any, hard = false) {
  if (el.localName?.includes("-"))
    await customElements.whenDefined(el.localName);
  if (el.updateComplete) await el.updateComplete;
  if (hard) {
    if (el.pageRendered) await el.pageRendered;
    if (el._panelState) {
      let rounds = 0;
      while (el._panelState !== "loaded" && rounds++ < 5)
        await new Promise((r) => setTimeout(r, 100));
    }
  }
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

export const stopPropagation = (ev: any) => ev.stopPropagation();

export const applyThemesOnElement = (
  element: any,
  themes: any,
  localTheme: any
) => {
  const selected = localTheme || themes.theme;

  if (!element.__themes) {
    element.__themes = { cacheKey: null, keys: {} };
  }

  if (!selected || selected === "default") {
    // Default-Theme → alle Inline-CSS entfernen
    element.removeAttribute("style");
    element.__themes.cacheKey = "default";
    return;
  }

  const themeDef = themes.themes?.[selected];
  if (!themeDef) {
    console.warn(`Theme "${selected}" not found.`);
    element.removeAttribute("style");
    element.__themes.cacheKey = "default";
    return;
  }

  // Nur neu anwenden, wenn sich das Theme geändert hat
  if (element.__themes.cacheKey === selected) {
    return;
  }

  // Setze CSS-Variablen
  for (const [key, value] of Object.entries(themeDef)) {
    element.style.setProperty(`--${key}`, String(value));
  }

  // Cache aktualisieren
  element.__themes.cacheKey = selected;
};

export function _formatDomain(domain: string): string {
  return domain
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
