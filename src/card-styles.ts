import { HassEntity } from "home-assistant-js-websocket";
import { LovelaceCardConfig, HomeAssistant } from "./ha";
import { DOMAIN_ICONS, OPENABLE_DEVICE_CLASSES } from "./const";
import { typeKey } from "./helpers";
import { translateEntityState } from "./translations";

export const customizationIndex = (list?: LovelaceCardConfig[]) => {
  const map = new Map<string, LovelaceCardConfig>();
  (list ?? []).forEach((c) => {
    if (c.type) map.set(c.type.toLowerCase(), c);
  });
  return map;
};

export function getCustomizationForType(
  config: LovelaceCardConfig,
  type: string,
  customizationMap?: Map<string, LovelaceCardConfig>
): LovelaceCardConfig | undefined {
  if (!type) return undefined;
  const map = customizationMap || customizationIndex(config.customization);
  return map.get(type.toLowerCase());
}

export function getResolvedCustomizationValue<T extends keyof LovelaceCardConfig>(
  config: LovelaceCardConfig,
  key: T,
  domain: string,
  deviceClass?: string,
  customizationMap?: Map<string, LovelaceCardConfig>
): LovelaceCardConfig[T] | undefined {
  const customization = getCustomizationForType(
    config,
    typeKey(domain, deviceClass),
    customizationMap
  );
  if (customization && customization[key] !== undefined) {
    return customization[key];
  }
  return undefined;
}

export function getCustomIcon(
  config: LovelaceCardConfig,
  domain: string,
  deviceClass?: string,
  entity?: HassEntity,
  customizationMap?: Map<string, LovelaceCardConfig>
): string {
  const customization = getCustomizationForType(
    config,
    typeKey(domain, deviceClass),
    customizationMap
  );

  if (
    customization?.show_entity_picture === true &&
    entity &&
    entity.attributes &&
    entity.attributes.entity_picture
  ) {
    return entity.attributes.entity_picture;
  }

  if (customization && customization.icon) {
    return customization.icon;
  }

  if (entity && entity.attributes && entity.attributes.icon) {
    return entity.attributes.icon;
  }

  const isInverted = customization?.invert === true;
  const state = isInverted ? "off" : "on";
  let fallbackDomain = domain;
  if (!deviceClass && domain.includes(".")) {
    fallbackDomain = domain.split(".")[0];
  }

  if (DOMAIN_ICONS && DOMAIN_ICONS[fallbackDomain]) {
    const icons = DOMAIN_ICONS[fallbackDomain];
    if (deviceClass && typeof icons === "object") {
      const dc = icons[deviceClass];
      if (dc) {
        if (typeof dc === "string") return dc;
        if (typeof dc === "object" && "on" in dc && "off" in dc)
          return dc[state] || dc["on"] || dc["off"];
      }
    }
    if (typeof icons === "object" && "on" in icons && "off" in icons) {
      return icons[state] || icons["on"] || icons["off"];
    }
    if (typeof icons === "string") return icons;
  }

  return "";
}

export function getBackgroundColor(
  config: LovelaceCardConfig,
  domain: string,
  deviceClass?: string,
  customizationMap?: Map<string, LovelaceCardConfig>
): string {
  const customization = getCustomizationForType(
    config,
    typeKey(domain, deviceClass),
    customizationMap
  );

  const toColor = (arr: number[]): string => {
    if (arr.length === 4)
      return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`;
  };

  if (customization && Array.isArray(customization.background_color)) {
    const arr = customization.background_color as number[];
    if (arr.length >= 3) return toColor(arr);
  }

  if (Array.isArray(config?.background_color)) {
    const arr = config.background_color as number[];
    if (arr.length >= 3) return toColor(arr);
  }

  return "rgba(var(--rgb-primary-text-color), 0.15)";
}

export function getCustomColor(
  config: LovelaceCardConfig,
  domain: string,
  deviceClass?: string,
  customizationMap?: Map<string, LovelaceCardConfig>
): string | undefined {
  return (
    getResolvedCustomizationValue(config, "icon_color", domain, deviceClass, customizationMap) ||
    config.color
  );
}

export function getCustomName(
  config: LovelaceCardConfig,
  domain: string,
  deviceClass?: string,
  entity?: HassEntity,
  customizationMap?: Map<string, LovelaceCardConfig>
): string | undefined {
  return (
    getResolvedCustomizationValue(config, "name", domain, deviceClass, customizationMap) ||
    entity?.attributes.friendly_name
  );
}

export function getCustomCSS(
  config: LovelaceCardConfig,
  domain: string,
  deviceClass?: string,
  customizationMap?: Map<string, LovelaceCardConfig>
): string | undefined {
  return getResolvedCustomizationValue(config, "icon_css", domain, deviceClass, customizationMap);
}

function getStatusForDeviceTracker(
  hass: HomeAssistant,
  isInverted: boolean
): string {
  const normalState = translateEntityState(hass, "home", "device_tracker");
  const invertedState = translateEntityState(hass, "not_home", "device_tracker");
  return isInverted ? invertedState : normalState;
}

function getStatusForLockOrCover(
  hass: HomeAssistant,
  isInverted: boolean
): string {
  const normalState = translateEntityState(hass, "open", "cover");
  const invertedState = translateEntityState(hass, "closed", "cover");
  return isInverted ? invertedState : normalState;
}

function getStatusForPerson(hass: HomeAssistant, state?: string): string {
  if (state === "home") {
    return translateEntityState(hass, "home", "person");
  } else if (state === "not_home") {
    return translateEntityState(hass, "not_home", "person");
  }
  return state ?? "unknown";
}

function getStatusForDefault(
  hass: HomeAssistant,
  isInverted: boolean,
  deviceClass?: string,
  state?: string
): string {
  if (deviceClass && OPENABLE_DEVICE_CLASSES.includes(deviceClass)) {
    return getStatusForLockOrCover(hass, isInverted);
  }
  const normalState = translateEntityState(hass, state ?? "on", "light");
  const invertedState = translateEntityState(hass, state ?? "off", "light");
  return isInverted ? invertedState : normalState;
}

export function getStatusProperty(
  hass: HomeAssistant,
  config: LovelaceCardConfig,
  domain: string,
  deviceClass?: string,
  state?: string,
  showTotalEntities?: boolean,
  showTotalNumbers?: boolean,
  customizationMap?: Map<string, LovelaceCardConfig>
): string {
  if (showTotalEntities && !showTotalNumbers) {
    return "";
  }

  const key = typeKey(domain, deviceClass);
  const customization = getCustomizationForType(config, key, customizationMap);
  const isInverted = customization?.invert === true;

  switch (domain) {
    case "device_tracker":
      return getStatusForDeviceTracker(hass, isInverted);
    case "lock":
    case "cover":
      return getStatusForLockOrCover(hass, isInverted);
    case "person":
      return getStatusForPerson(hass, state);
    default:
      return getStatusForDefault(hass, isInverted, deviceClass, state);
  }
}

export function getIconStyles(
  type: "person" | "extra" | "domain" | "deviceClass",
  options: {
    color?: string;
    background_color?: string;
    square?: boolean;
    isNotHome?: boolean;
  } = {}
) {
  const { color, background_color, square, isNotHome } = options;
  const base: Record<string, string | undefined> = {
    "border-radius": square ? "20%" : "50%",
    "background-color": background_color,
    color: color ? `var(--${color}-color)` : undefined,
  };

  if (type === "person" && isNotHome) {
    base.filter = "grayscale(100%)";
  }

  return base;
}
