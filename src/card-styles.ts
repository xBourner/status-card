import { HassEntity } from "home-assistant-js-websocket";
import { LovelaceCardConfig, HomeAssistant } from "./ha";
import { DOMAIN_ICONS, OPENABLE_DEVICE_CLASSES } from "./const";
import { typeKey } from "./helpers";
import { translateEntityState } from "./translations";
import { css } from "lit";

export const parseCss = (
  css?: string | Record<string, any>,
  styleCache?: Map<string, Record<string, string>>
): Record<string, string> => {
  if (!css) return {};

  if (typeof css === "object") {
    return Object.entries(css).reduce((acc, [key, value]) => {
      const finalKey = key.startsWith("--")
        ? key
        : key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[finalKey] = String(value);
      return acc;
    }, {} as Record<string, string>);
  }

  const key = css.trim();
  if (styleCache && styleCache.has(key)) return styleCache.get(key)!;

  const normalized = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, " ");

  const obj = normalized
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s && s.includes(":"))
    .reduce((acc: Record<string, string>, rule: string) => {
      const parts = rule.split(":");
      const keyPart = parts[0];
      const valuePart = parts.slice(1).join(":");

      if (keyPart && valuePart !== undefined) {
        const trimmed = keyPart.trim();
        const finalKey = trimmed.startsWith("--")
          ? trimmed
          : trimmed.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        acc[finalKey] = valuePart.trim();
      }
      return acc;
    }, {} as Record<string, string>);

  if (styleCache) {
    styleCache.set(key, obj);
  }
  return obj;
};

export const getParsedCss = (
  source?: string | Record<string, any>,
  customization?: any,
  styleCache?: Map<string, Record<string, string>>
): Record<string, string> => {
  if (customization && customization._parsedCss)
    return customization._parsedCss;
  if (!source) return {};
  return parseCss(source, styleCache);
};

export const cardStyles = css`
  :host-context(hui-badge[preview]) {
    max-width: 500px;
    overflow: hidden;
    display: block;
  }
  ha-card {
    overflow: hidden;
    position: relative;
    height: 100%;
    align-content: center;
    max-width: 100%;
  }
  ha-card.no-background {
    background: none;
    border: none;
    box-shadow: none;
  }
  ha-tab-group {
    --track-width: unset !important;
    padding: 6px 4px;
  }
  ha-tab-group.badge-mode {
    padding: 2px;
  }
  ha-tab-group-tab[active],
  ha-tab-group-tab.active {
    font-size: var(--ha-font-size-m);
    --wa-color-brand-on-quiet: var(
      --ha-tab-active-text-color,
      var(--primary-color)
    );
    --wa-color-neutral-on-quiet: var(--wa-color-brand-on-quiet);
    opacity: 0.8;
    color: inherit;
    --wa-space-l: 16px;
  }
  ha-tab-group-tab[active]:hover,
  ha-tab-group-tab.active:hover {
    color: var(--wa-color-brand-on-quiet) !important;
  }
  ha-tab-group::part(nav) {
    padding: 0 !important;
  }
  ha-tab-group-tab {
    pointer-events: auto;
  }
  ha-tab-group-tab * {
    pointer-events: none;
  }
  ha-tab-group-tab::part(base) {
    padding: 0 8px !important;
  }
  ha-tab-group-tab.badge-mode::part(base) {
    padding: 0 4px !important;
  }
  ha-tab-group.no-scroll::part(tabs) {
    display: flex;
    flex-wrap: wrap;
    overflow-x: visible !important;
    max-width: 100%;
    border-bottom: none !important;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .entity.horizontal,
  .extra-entity.horizontal {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .entity,
  .extra-entity {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .entity.horizontal .entity-icon,
  .extra-entity.horizontal .entity-icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: rgba(var(--rgb-primary-text-color), 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }
  .entity-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(var(--rgb-primary-text-color), 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }
  ha-tab-group-tab {
    position: relative;
    overflow: visible;
  }
  ha-tab-group-tab[data-badge]::after {
    content: attr(data-badge);
    position: absolute;
    top: 0;
    right: 0;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--status-card-badge-color, var(--primary-color));
    color: var(--status-card-badge-text-color, var(--text-primary-color));
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-sizing: border-box;
    z-index: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  .person-badge {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--status-card-badge-color, var(--primary-color));
    color: var(--status-card-badge-text-color, var(--text-primary-color));
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-sizing: border-box;
    z-index: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  .person-badge ha-icon {
    --mdc-icon-size: 14px;
  }
  .entity-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .entity.horizontal .entity-info,
  .extra-entity.horizontal .entity-info {
    text-align: left;
    margin-top: 3px;
    padding-left: 8px;
  }
  .entity-info {
    text-align: center;
    margin-top: 7px;
  }
  .entity-name {
    font-weight: bold;
  }
  .entity-state {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to { transform: rotate(360deg);}
  }
  @keyframes pulse { 0% { transform: scale(1);}
    50% { transform: scale(1.1);}
    100% { transform: scale(1);
    }
  }
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg);}
    10% { transform: translate(-1px, -2px) rotate(-1deg);}
    20% { transform: translate(-3px, 0px) rotate(1deg);}
    30% { transform: translate(3px, 2px) rotate(0deg);}
    40% { transform: translate(1px, -1px) rotate(1deg);}
    50% { transform: translate(-1px, 2px) rotate(-1deg);}
    60% { transform: translate(-3px, 1px) rotate(0deg);}
    70% { transform: translate(3px, 1px) rotate(-1deg);}
    80% { transform: translate(-1px, -1px) rotate(1deg);}
    90% { transform: translate(1px, 2px) rotate(0deg);}
    100% { transform: translate(1px, -2px) rotate(-1deg);}
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
    60% { transform: translateY(-3px); }
    }
  }
`;

export const customizationIndex = (list?: LovelaceCardConfig[]) => {
  const map = new Map<string, LovelaceCardConfig>();
  (list ?? []).forEach((c) => {
    if (c.type) {
      const copy = { ...c };
      if (copy.styles?.card) copy._parsedCss = parseCss(copy.styles.card);
      if (copy.styles?.button) {
        const buttonStyles = parseCss(copy.styles.button);
        copy._parsedCss = { ...copy._parsedCss, ...buttonStyles };
      }
      if (copy.styles?.icon) copy._parsedIconCss = parseCss(copy.styles.icon);
      map.set(copy.type.toLowerCase(), copy);
    }
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

export function getResolvedCustomizationValue<
  T extends keyof LovelaceCardConfig
>(
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
    getResolvedCustomizationValue(
      config,
      "icon_color",
      domain,
      deviceClass,
      customizationMap
    ) || config.color
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
    getResolvedCustomizationValue(
      config,
      "name",
      domain,
      deviceClass,
      customizationMap
    ) || entity?.attributes.friendly_name
  );
}

export function getCustomCSS(
  config: LovelaceCardConfig,
  domain: string,
  deviceClass?: string,
  customizationMap?: Map<string, LovelaceCardConfig>
): string | undefined {
  return getResolvedCustomizationValue(
    config,
    "icon_css",
    domain,
    deviceClass,
    customizationMap
  );
}

function getStatusForDeviceTracker(
  hass: HomeAssistant,
  isInverted: boolean
): string {
  const normalState = translateEntityState(hass, "home", "device_tracker");
  const invertedState = translateEntityState(
    hass,
    "not_home",
    "device_tracker"
  );
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
    color: color
      ? color.startsWith("rgb") ||
        color.startsWith("#") ||
        color.startsWith("hsl") ||
        color.startsWith("var")
        ? color
        : `var(--${color}-color)`
      : undefined,
  };

  if (type === "person" && isNotHome) {
    base.filter = "grayscale(100%)";
  }

  return base;
}
