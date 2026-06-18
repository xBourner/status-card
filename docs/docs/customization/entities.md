---
title: Entities
---

# Entities

Used to add single or multiple entities (extra entities) or to hide specific entities inside the status card.
If you hide an entity using the 'Hide Entity' function, you will see some tabs where your entities are grouped, making it easier to find and hide them.

- **Extra Entities:** - Choose the entities you want to add to status card from an entity picker
- **Hide Entities:** - Choose which entity you want to hide by entity, ara or label

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/entities.png" alt="Extra Entities Feature" width="50%">

---

## Editor Settings (per Extra Entity Customization)

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

### Editor Settings (per Extra Entity Customization)

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
  - sun.sun
hide_filter: entity
hidden_entities:
  - cover.test
customization:
  - type: sun.sun
    state: "above_horizon"
    show_entity_picture: true
    state_content: "state"
```
