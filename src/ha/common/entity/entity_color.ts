import { HassEntity } from "home-assistant-js-websocket";
import { computeDomain } from "./compute_domain";

export const computeEntityColor = (entity: HassEntity): string | undefined => {
    const domain = computeDomain(entity.entity_id);
    const state = entity.state;

    if (domain === "light") {
        if (state === "on") {
            const rgb = entity.attributes.rgb_color;
            if (rgb) {
                return `rgb(${rgb.join(",")})`;
            }
        }
    }

    return undefined;
};
