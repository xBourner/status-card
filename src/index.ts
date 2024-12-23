import packageJson from '../package.json';
import "./card";
import "./editor";


console.info(
    `%c STATUS-CARD %c ${packageJson.version} `,
    'color: steelblue; background: black; font-weight: bold;',
    'color: white ; background: dimgray; font-weight: bold;'
  );

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "status-card",
  name: "Status Card",
  preview: true, 
  description:  "A custom card that displays active entities grouped by domain/device class.", 
});