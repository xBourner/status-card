---
title: Popup / Dialog
---

# Popup / Dialog

Displays all entities of a domain or device class in a popup with tile cards.

- **Display:** `<ha-adaptive-dialog>` with tile cards
- **Area Grouping:** Toggle-all buttons per area
- **Sorting:** By name or state
- **Columns:** Responsive layout (1-4 columns)
- **Browser History:** Back button closes popup
- **Per-Domain:** Individual `popup_card` configuration per domain

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/popup-status.png" alt="Popup Feature" width="50%">

---

## Editor Settings

| Option | Description |
|--------|-------------|
| **Columns** | Number of columns in the popup (1-4) |
| **Popup Sort** | Sort by name or state |
| **Disable Area Group** | Disable area grouping |
| **Show All** | Toggle between active and all entities |
| **Turn off all** | Turn off all entities of a domain |
| **Toggle total entities** | Switch between "on" and all entities |
| **Popup Card (per Domain)** | Individual HA card configuration |

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/popup-settings-status.png" alt="Popup Editor" width="50%">

---

## YAML Example

```yaml
type: custom:status-card
columns: 3
popup_sort: name
ungroup_areas: false
```
