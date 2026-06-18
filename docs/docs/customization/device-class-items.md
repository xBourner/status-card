---
title: Device-Class Items
---

# Device-Class Items

For `binary_sensor`, `cover` and `switch`, entities are split by device class. Format in `content`: `"binary_sensor - motion"`, `"cover - window"`.

- **Detection:** Automatically split by device class within the domain
- **Domains:** binary_sensor, cover, switch
- **Format:** `domain - device_class`

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/device-class.png" alt="Device-Class Feature" width="50%">

---

## Content Selection

```yaml
content:
  - binary_sensor - motion
  - binary_sensor - window
  - cover - window
  - switch - outlet
```

---

## Editor Settings (per Device-Class)

Same options as Domain Items, plus:

| Option | Description |
|--------|-------------|
| **Name** | Change display name of the device class |
| **Icon** | Change icon |
| **Color** | Change icon color |
| **Invert State** | Invert state |
| **Tap / Hold / Double Tap** | Individual actions |
| **Styles** | Custom CSS |

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/device-class-editor.png" alt="Device-Class Editor" width="50%">

---

## YAML Example

```yaml
content:
  - binary_sensor - motion
customization:
  - type: binary_sensor - motion
    icon: mdi:motion-sensor
    badge_mode: true
```
