import type { HassEntity } from "home-assistant-js-websocket";
import { isUnavailableState, OFF, UNAVAILABLE } from "../../data/entity/entity";
import { computeDomain } from "./compute_domain";

export function stateActive(stateObj: HassEntity, state?: string): boolean {
  const domain = computeDomain(stateObj.entity_id);
  const compareState = state !== undefined ? state : stateObj?.state;

  if (["button", "event", "input_button", "scene"].includes(domain)) {
    return compareState !== UNAVAILABLE;
  }

  if (isUnavailableState(compareState)) {
    return false;
  }


  if (compareState === OFF && domain !== "alert") {
    return false;
  }


  switch (domain) {
    case "alarm_control_panel":
      return compareState !== "disarmed";
    case "alert":

      return compareState !== "idle";
    case "cover":
      return compareState !== "closed";
    case "device_tracker":
    case "person":
      return compareState !== "not_home";
    case "lawn_mower":
      return ["mowing", "error"].includes(compareState);
    case "lock":
      return compareState !== "locked";
    case "media_player":
      return compareState !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(compareState);
    case "valve":
      return compareState !== "closed";
    case "plant":
      return compareState === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(compareState);
    case "timer":
      return compareState === "active";
    case "camera":
      return compareState === "streaming";
  }

  return true;
}
