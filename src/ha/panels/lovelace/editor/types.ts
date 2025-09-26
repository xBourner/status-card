import type { ActionConfig } from "../../../data/lovelace";
import type { LovelaceCardConfig } from "../../../data/lovelace";
import type {
  LovelaceViewConfig,
  ShowViewConfig,
} from "../../../data/lovelace";
import type { LovelaceBadgeConfig } from "../../../data/lovelace";

export interface YamlChangedEvent extends Event {
  detail: {
    yaml: string;
  };
}

export interface GUIModeChangedEvent {
  guiMode: boolean;
  guiModeAvailable: boolean;
}

export interface ViewEditEvent extends Event {
  detail: {
    config: LovelaceViewConfig;
    valid?: boolean;
  };
}

export interface ViewVisibilityChangeEvent {
  visible: ShowViewConfig[];
}

export interface ConfigValue {
  format: "json" | "yaml";
  value?: string | LovelaceCardConfig;
}

export interface ConfigError {
  type: string;
  message: string;
}

export interface EditorTarget extends EventTarget {
  value?: string;
  index?: number;
  checked?: boolean;
  configValue?: string;
  type?: HTMLInputElement["type"];
  config: ActionConfig;
}

export interface Card {
  type: string;
  name?: string;
  description?: string;
  showElement?: boolean;
  isCustom?: boolean;
  isSuggested?: boolean;
}

export interface Badge {
  type: string;
  name?: string;
  description?: string;
  showElement?: boolean;
  isCustom?: boolean;
  isSuggested?: boolean;
}

export interface CardPickTarget extends EventTarget {
  config: LovelaceCardConfig;
}

export interface BadgePickTarget extends EventTarget {
  config: LovelaceBadgeConfig;
}

export interface SubElementEditorConfig {
  index?: number;
  saveElementConfig?: (elementConfig: any) => void;
  context?: any;
  type: "header" | "footer" | "row" | "feature" | "element" | "heading-badge";
}

export interface EditSubElementEvent<T = any, C = any> {
  type: SubElementEditorConfig["type"];
  context?: C;
  config: T;
  saveConfig: (config: T) => void;
}

export interface EditDetailElementEvent {
  subElementConfig: SubElementEditorConfig;
}
