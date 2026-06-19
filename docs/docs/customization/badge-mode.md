---
title: Badge Mode
---

# Badge Mode

Compact display: icon + badge count instead of a full content item. Badge mode is disabled at default.

- **Global:** `badge_mode: true` enables badge mode for all items
- **Per Item:** Individually enable per item via customization
- **Person Badges:** Show home/away icons

<img src="./img/badge_mode.png" alt="Badge Mode Feature" width="50%">

---

## Editor Settings

| Option | Description |
|--------|-------------|
| **Badge Mode** | Enable badge mode (global or per item) |
| **Badge Color** | Global badge color |
| **Badge Text Color** | Global badge text color |


<img class="doc-img-responsive" src="./img/badge_editor.png" alt="Badge Mode Editor">

---

## YAML Example

```yaml
type: custom:status-card
badge_mode: true
badge_color: red
badge_text_color: white
```
