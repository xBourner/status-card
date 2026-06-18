---
title: Global Appearance
---

# Global Appearance

Global settings that apply to all items.

- **Hide Content Name:** Hide names from domains, device classes and persons
- **Enable Total Number:** Will show how many entities are turned on and how much in total you have. This wont change entities in Popup.
- **Render cards as Square:** Square instead of round items
- **Enable Total Entities:** Will show all entities no matter the state. This wilkl also change the Popup behaviour to show all entities.
- **Wrap Content:** Multi-line mode instead of scrolling/swiping
- **Hide Card If Empty:** Hide card completely when no entities are present
- **Hide Background:** Hide background/border
- **Theme:** HA theme for the card
- **Color:** Global icon color for all items
- **Background Color:** Global background color (RGB/RGBA)


<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/appearance.png" alt="Global Appearance" width="35%">

## Content Layout

Determines the orientation of items in the card. Default layout is vertical.

- **vertical:** Icon on top, name/state below
- **horizontal:** Icon on left, name/state on right

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/content_layout.png" alt="Content Layout Feature" width="50%">

---

## YAML Example

```yaml
type: custom:status-card
hide_content_name: false
show_total_number: true
square: true
show_total_entities: true
no_scroll: true
hide_card_if_empty: false
no_background: false
theme: waves
content_layout: horizontal|vertical
color: green
background_color:
  - 255
  - 0
  - 0
  - 0.1
```
