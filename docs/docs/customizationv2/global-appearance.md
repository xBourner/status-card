---
title: Global Appearance
---

# Global Appearance

Global settings that apply to all items.

- **Hide Content Name:** Hide names from domains, device classes and persons
- **List Display Mode:** Text list mode instead of controllers
- **Theme:** HA theme for the card
- **Wrap Content:** Multi-line mode instead of scrolling
- **Square:** Square instead of round items
- **No Background:** Hide background/border
- **No Scroll:** Wrap mode instead of scrolling
- **Hide Card If Empty:** Hide card when no entities are present
- **Color:** Global icon color for all items
- **Background Color:** Global background color (RGB/RGBA)

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/appearance.png" alt="Global Appearance" width="35%">

---

## YAML Example

```yaml
type: custom:status-card
hide_content_name: false
list_mode: false
square: true
no_scroll: true
no_background: false
hide_card_if_empty: false
color: green
background_color:
  - 255
  - 0
  - 0
  - 0.1
```
