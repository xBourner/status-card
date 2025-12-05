import type {
  Auth,
  Connection,
  HassConfig,
  HassEntities,
  HassEntity,
  HassServices,
  HassServiceTarget,
  MessageBase,
} from "home-assistant-js-websocket";
import type { LocalizeFunc } from "./common/translations/localize";
import type {
  FrontendLocaleData,
  TranslationCategory,
} from "./data/translation";
import type { Themes } from "./data/ws-themes";
import type { LovelaceCardConfig, EntityRegistryEntry } from "../ha";
import { TemplateResult } from "lit";

export interface ConfigChangedEvent {
  config: LovelaceCardConfig;
  _config?: LovelaceCardConfig;
  error?: string;
  guiModeAvailable?: boolean;
}

declare global {
  /* eslint-disable no-var, no-redeclare */
  var __DEV__: boolean;
  var __DEMO__: boolean;
  var __BUILD__: "latest" | "es5";
  var __VERSION__: string;
  var __STATIC_PATH__: string;
  var __BACKWARDS_COMPAT__: boolean;
  var __SUPERVISOR__: boolean;
  /* eslint-enable no-var, no-redeclare */

  interface CustomCardEntry {
    type: string;
    name: string;
    preview?: boolean;
    description?: string;
  }

  interface Window {
    // Custom panel entry point url
    customPanelJS: string;
    customCards: CustomCardEntry[];
    loadCardHelpers?(): Promise<any>;
    ShadyCSS: {
      nativeCss: boolean;
      nativeShadow: boolean;
      prepareTemplate(templateElement, elementName, elementExtension);
      styleElement(element);
      styleSubtree(element, overrideProperties);
      styleDocument(overrideProperties);
      getComputedStyleValue(element, propertyName);
    };
  }
  // for fire event
  interface HASSDomEvents {
    "value-changed": {
      value: unknown;
    };
    "config-changed": ConfigChangedEvent;
    change: undefined;
    "edit-item": number;
  }

  // For loading workers in webpack
  interface ImportMeta {
    url: string;
  }
}

export interface Schema {
  name: string;
  selector?: any;
  required?: boolean;
  default?: any;
  type?: string;
  schema?: Schema[];
}

interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string;
  device_id?: string;
  area_id?: string;
  hidden?: boolean;
  entity_category?: "config" | "diagnostic";
  translation_key?: string;
  platform?: string;
  display_precision?: number;
  labels?: string[];
}

export interface DeviceRegistryEntry {
  id: string;
  config_entries: string[];
  connections: Array<[string, string]>;
  identifiers: Array<[string, string]>;
  manufacturer: string | null;
  model: string | null;
  name: string | null;
  sw_version: string | null;
  hw_version: string | null;
  via_device_id: string | null;
  area_id: string | null;
  name_by_user: string | null;
  entry_type: "service" | null;
  disabled_by: "user" | "integration" | "config_entry" | null;
  configuration_url: string | null;
  labels: string[];
}

export interface AreaRegistryEntry {
  aliases: string[];
  area_id: string;
  floor_id: string | null;
  humidity_entity_id: string | null;
  icon: string | null;
  labels: string[];
  name: string;
  picture: string | null;
  temperature_entity_id: string | null;
}

export interface ThemeSettings {
  theme: string;
  // Radio box selection for theme picker. Do not use in Lovelace rendering as
  // it can be undefined == auto.
  // Property hass.themes.darkMode carries effective current mode.
  dark?: boolean;
  primaryColor?: string;
  accentColor?: string;
}

export interface PanelInfo<T = Record<string, any> | null> {
  component_name: string;
  config: T;
  icon: string | null;
  title: string | null;
  url_path: string;
}

export interface Panels {
  [name: string]: PanelInfo;
}

export interface Resources {
  [language: string]: Record<string, string>;
}

export interface Translation {
  nativeName: string;
  isRTL: boolean;
  hash: string;
}

export interface TranslationMetadata {
  fragments: string[];
  translations: {
    [lang: string]: Translation;
  };
}

export interface Credential {
  auth_provider_type: string;
  auth_provider_id: string;
}

export interface MFAModule {
  id: string;
  name: string;
  enabled: boolean;
}

export interface CurrentUser {
  id: string;
  is_owner: boolean;
  is_admin: boolean;
  name: string;
  credentials: Credential[];
  mfa_modules: MFAModule[];
}

export interface ServiceCallRequest {
  domain: string;
  service: string;
  serviceData?: Record<string, any>;
  target?: HassServiceTarget;
}

export interface Context {
  id: string;
  parent_id?: string;
  user_id?: string | null;
}

export interface ServiceCallResponse {
  context: Context;
}

export interface HomeAssistant {
  auth: Auth;
  connection: Connection;
  connected: boolean;
  states: HassEntities;
  entities: { [id: string]: EntityRegistryDisplayEntry };
  devices: { [id: string]: DeviceRegistryEntry };
  areas: { [id: string]: AreaRegistryEntry };
  services: HassServices;
  config: HassConfig;
  themes: Themes;
  selectedTheme: ThemeSettings | null;
  panels: Panels;
  panelUrl: string;
  // i18n
  // current effective language in that order:
  //   - backend saved user selected language
  //   - language in local app storage
  //   - browser language
  //   - english (en)
  language: string;
  // local stored language, keep that name for backward compatibility
  selectedLanguage: string | null;
  locale: FrontendLocaleData;
  resources: Resources;
  localize: LocalizeFunc;
  translationMetadata: TranslationMetadata;
  suspendWhenHidden: boolean;
  enableShortcuts: boolean;
  vibrate: boolean;
  dockedSidebar: "docked" | "always_hidden" | "auto";
  defaultPanel: string;
  moreInfoEntityId: string | null;
  user?: CurrentUser;
  hassUrl(path?): string;
  callService(
    domain: ServiceCallRequest["domain"],
    service: ServiceCallRequest["service"],
    serviceData?: ServiceCallRequest["serviceData"],
    target?: ServiceCallRequest["target"]
  ): Promise<ServiceCallResponse>;
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T>;
  fetchWithAuth(path: string, init?: Record<string, any>): Promise<Response>;
  sendWS(msg: MessageBase): void;
  callWS<T>(msg: MessageBase): Promise<T>;
  loadBackendTranslation(
    category: TranslationCategory,
    integration?: string | string[],
    configFlow?: boolean
  ): Promise<LocalizeFunc>;
  formatEntityState(stateObj: HassEntity, state?: string): string;
  formatEntityAttributeValue(
    stateObj: HassEntity,
    attribute: string,
    value?: any
  ): string;
  formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
}

export interface StatusCardLike {
  hass: { states: HomeAssistant["states"] };
  entities?: { [key: string]: HassEntity };
  devices?: { [key: string]: DeviceRegistryEntry };
  areas?: { [key: string]: AreaRegistryEntry };
  __registryEntities?: EntityRegistryEntry[];
  __registryDevices?: DeviceRegistryEntry[];
  __registryAreas?: AreaRegistryEntry[];
  hiddenEntities?: string[];
  labels?: { label_id: string; name: string }[];
}

export interface StatusCardInterface extends StatusCardLike {
  _config: LovelaceCardConfig;
  _shouldShowTotalEntities(domain: string, deviceClass?: string): boolean;
  _totalEntities(domain: string, deviceClass?: string): HassEntity[];
  _isOn(domain: string, deviceClass?: string): HassEntity[];
  getCustomizationForType(key: string): LovelaceCardConfig | undefined;
  list_mode: boolean;
  _computeEntityMap(entities: EntityRegistryEntry[]): Map<string, EntityRegistryEntry>;
  _computeDeviceMap(devices: DeviceRegistryEntry[]): Map<string, DeviceRegistryEntry>;
  _computeAreaMap(areas: AreaRegistryEntry[]): Map<string, AreaRegistryEntry>;
}

export interface StatusCardPopupDialogParams {
  title: string;
  hass: HomeAssistant;
  entities: HassEntity[];
  selectedDomain?: string;
  selectedDeviceClass?: string;
  selectedGroup?: number;
  card: StatusCardInterface;
  content?: string | TemplateResult;
}

export interface PopupCardConfigCache {
  hash: string;
  config: LovelaceCardConfig;
}

export interface CardElementCache {
  hash: string;
  el: HTMLElement;
}

export interface FilterConfig {
  area: string[];
  floor: string[];
  label: string[];
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

export type RuleValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | (string | number | boolean)[]
  | Rule[];

export interface Rule {
  key: string;
  value: RuleValue;
}

export interface Ruleset {
  group_id: string;
  group_icon?: string;
  group_status?: string;
  filters?: Rule[];
  area?: RuleValue;
  floor?: RuleValue;
  label?: RuleValue;
  domain?: RuleValue;
  entity_id?: RuleValue;
  state?: RuleValue;
  name?: RuleValue;
  attributes?: Record<string, unknown>;
  device?: RuleValue;
  integration?: RuleValue;
  entity_category?: RuleValue;
  hidden_by?: RuleValue;
  device_manufacturer?: RuleValue;
  device_model?: RuleValue;
  last_changed?: RuleValue;
  last_updated?: RuleValue;
  last_triggered?: RuleValue;
  level?: RuleValue;
  group?: RuleValue;
  [key: string]: RuleValue | Record<string, unknown> | Rule[] | undefined;
}

export interface GroupItem {
  type: "group";
  group_id: string;
  order: number;
  ruleset: Ruleset;
}

export interface SmartGroupItem {
  group_id: string;
  group_icon: string;
  group_status?: string;
  rules: Rule[];
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


export interface IconPair {
  on: string;
  off: string;
}

export type DomainIconDef = {
  on: string;
  off: string;
  [key: string]: string | IconPair;
};

export interface DomainFeatureDef {
  state_content: string[];
  features: Record<string, unknown>[];
}
