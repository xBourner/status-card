---
title: Badge Mode
---

# Badge Mode

Compact display: icon + badge count instead of a full content item.

- **Global:** `badge_mode: true` enables badge mode for all items
- **Per Item:** Individually enableable via customization
- **Person Badges:** Show home/away icons

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/badge-mode.png" alt="Badge Mode Feature" width="50%">

---

## Editor Settings

| Option | Description |
|--------|-------------|
| **Badge Mode** | Enable badge mode (global or per item) |
| **Badge Color** | Global badge color |
| **Badge Text Color** | Global badge text color |
| **Badge Color (per Item)** | Individual badge color per domain/device class |

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/badge-editor.png" alt="Badge Mode Editor" width="50%">

---

## YAML Example

```yaml
type: custom:status-card
badge_mode: true
badge_color: red
badge_text_color: white
```
