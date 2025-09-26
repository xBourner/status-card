import { ActionConfig } from "../../../data/lovelace";

export function hasAction(config?: ActionConfig): boolean {
  return config !== undefined && config.action !== "none";
}

export type UiAction = Exclude<ActionConfig["action"], "fire-dom-event">;
