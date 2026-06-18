---
title: Styles
---

# Styles

Custom CSS for individual elements. Works globally and per item.

- **styles.card:** CSS for the entire card
- **styles.button:** CSS for the buttons
- **styles.icon:** CSS for the icons
- **styles.name:** CSS for the names
- **styles.state:** CSS for the states

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/styles.png" alt="Styles" width="50%">

---

## Available Animations

`spin`, `pulse`, `shake`, `blink`, `bounce`

---

## YAML Example

```yaml
styles:
  card: "background-color: rgba(255,0,0,0.1);"
  button: "border: none;"
  icon: "animation: spin 2s linear infinite;"
  name: "font-weight: bold;"
  state: "color: green;"
```
