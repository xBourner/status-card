declare global {
  interface HASSDomEvents {}
}

export type ValidHassDomEvent = keyof HASSDomEvents;

export interface HASSDomEvent<T> extends Event {
  detail: T;
}

export const fireEvent = <HassEvent extends ValidHassDomEvent>(
  node: HTMLElement | Window,
  type: HassEvent,
  detail?: HASSDomEvents[HassEvent],
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
) => {
  options = options || {};
  // @ts-ignore
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  (event as any).detail = detail;
  node.dispatchEvent(event);
  return event;
};
