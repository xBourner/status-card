import packageJson from '../package.json' assert { type: 'json' };
import { StatusCard } from './card.js';
import { StatusCardEditor } from './editor.js';


customElements.define('status-card', StatusCard);
customElements.define('status-card-editor', StatusCardEditor);

console.info(
    `%c STATUS-CARD %c ${packageJson.version} `,
    'color: steelblue; background: black; font-weight: bold;',
    'color: white ; background: dimgray; font-weight: bold;'
  );
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "status-card",
    name: "Status Card",
    preview: true, 
    description: "A custom card that displays active entities grouped by domain.", 
    documentationURL: "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card", 
  });