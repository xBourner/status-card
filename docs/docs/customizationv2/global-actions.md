---
title: Global Actions
---

# Global Actions

Actions that apply to all domains and device classes (can be overridden per item).

- **tap\_action:** Action on tap (default: more-info)
- **hold\_action:** Action on hold (default: more-info)
- **double\_tap\_action:** Action on double tap (default: more-info)

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/actions.png" alt="Global Actions" width="50%">

---

## Supported Actions

`more-info`, `toggle`, `navigate`, `url`, `perform-action`, `none`

---

## YAML Example

```yaml
type: custom:status-card
tap_action:
  action: toggle
hold_action:
  action: more-info
double_tap_action:
  action: none
```
