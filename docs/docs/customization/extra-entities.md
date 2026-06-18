---
title: Extra Entities
---

# Extra Entities

Manually added individual entities displayed alongside domains and device classes.

- **Detection:** Manually defined in `extra_entities`
- **Display:** Image URLs as `<img>`, SVG paths, HA state icons
- **Custom CSS:** Possible via `icon_css`

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/entities.png" alt="Extra Entities Feature" width="50%">

---

## Editor Settings (per Extra Entity)

| Option | Description |
|--------|-------------|
| **Name** | Change display name |
| **Icon** | Change icon |
| **Color** | Change icon color |
| **Invert State** | Invert state |
| **State** | Force a specific state |
| **State Content** | Change state content |
| **Show Entity Picture** | Show entity picture |
| **Activate State Color** | Enable color based on state |
| **Tap / Hold / Double Tap** | Individual actions |
| **Styles** | Custom CSS |

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/entities-editor.png" alt="Extra Entities Editor" width="50%">

---

## YAML Example

```yaml
extra_entities:
  - weather.home
  - sensor.temperature
customization:
  - type: sun.sun
    state: "above_horizon"
    show_entity_picture: true
    state_content: "state"
```
