import { html, TemplateResult } from "lit";

const IDENTIFIERS: Record<string, string> = {
  card: "Card Container (Background, Border)",
  button: "Item Container (Background, Border)",
  icon: "Item Icon",
  name: "Entity Name",
  state: "Entity State Value",
};

/** Help box for the "styles" object, used by the card and the item editor. */
export function renderStyleGuide(
  identifiers: string[],
  example: string,
): TemplateResult {
  return html`
    <ha-alert alert-type="info" title="Style Guide">
      <p>
        You can use standard CSS per identifier. <br />
        <strong>Identifiers:</strong>
      </p>
      <ul>
        ${identifiers.map(
          (id) => html`<li><b>${id}</b>: ${IDENTIFIERS[id]}</li>`,
        )}
      </ul>
      <p>
        <strong>Animations:</strong> <br />
        spin, pulse, shake, blink, bounce
      </p>
      <p><strong>Example:</strong></p>
      <pre>${example}</pre>
    </ha-alert>
  `;
}
