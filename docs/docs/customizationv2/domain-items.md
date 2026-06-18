---
title: Domain Items
---

# Domain Items

Groups entities by domain (light, switch, fan, climate, etc.). Domain-specific icons with on/off states are automatically loaded from `DOMAIN_ICONS`.

- **Detection:** Automatically grouped by domain
- **Toggle:** `toggleDomain()` for on/off switching
- **Icons:** Domain-specific (e.g. mdi:lightbulb / mdi:lightbulb-outline)

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/domain-items.png" alt="Domain Items Feature" width="50%">

---

## Content Selection

Domains can be specified as an ordered list in `content`:

```yaml
content:
  - light
  - switch
  - fan
  - climate
```

---

## Editor Settings (per Domain)

| Option | Description |
|--------|-------------|
| **Name** | Change display name of the domain |
| **Icon** | Change icon of the domain |
| **Color** | Change icon color |
| **Icon Background Color** | Icon background color (RGBA with transparency) |
| **Invert State** | Show "off" instead of "on" (e.g. for locks: open instead of closed) |
| **Enable Total Entities** | Show all entities instead of "on" entities only |
| **Enable Total Number** | Show total count (e.g. 1/7 lights on) |
| **Badge Mode** | Compact display: icon + badge count only |
| **Badge Color** | Set individual badge color |
| **Tap Action** | Action on tap (toggle, more-info, navigate, url, perform-action, none) |
| **Hold Action** | Action on hold |
| **Double Tap Action** | Action on double tap |
| **Styles** | Custom CSS |

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/domain-editor.png" alt="Domain Editor" width="50%">

---

## YAML Example

```yaml
type: custom:status-card
content:
  - light
  - switch
customization:
  - type: light
    name: Lighting
    icon_color: yellow
    badge_color: orange
    invert: false
    show_total_entities: true
    tap_action:
      action: toggle
    styles:
      icon: "animation: pulse 2s ease-in-out infinite"
```
