import { LovelaceCardConfig } from "../../data/lovelace";
import { HomeAssistant } from "../../types";

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  editMode?: boolean;
  getCardSize(): number | Promise<number>;
  setConfig(config: LovelaceCardConfig): void;
}
