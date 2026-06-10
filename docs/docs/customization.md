---
title: Customization
tags:
  - Customization
hide:
  - tags
---

# 🎨 Customization 

All of the customization options are optional.

!!! info "Info"
    Some customizations may not work in combinations with others. I tried to make almost everything customizable but this can easily break due to HA updates.
---

## More Info / Popup View

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/popup-settings-status.png" alt="Status Card Header" width="30%">
<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/popup-status.png" alt="Status Card Header" width="50%">

| Option | Beschreibung |
|--------|--------------|
| **Popup View** | Displays all entities in the domain or device_class you clicked on |
| **Tile Cards** | Shows controllable cards at default |
| **List Mode** | Easy copying entities (e.g. for hiding entities) |
| **Columns** | Specify how many columns will be shown in the popup (still one on mobile view) |
| **Turn off Entities** | Lets you turn off all entities of one domain with one click |
| **Toggle Total Entities** | Toggle between entities with "on" state and all entities |
| **Disable Area Group** | Show one group for all entities instead of entities that are grouped by Area |
| **Popup Sort** | Sort Entities inside the popup (and groups) by name or state |

---

## Appearance

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/appearance.png" alt="Status Card Header" width="35%">

| Option | Beschreibung |
|--------|--------------|
| **Hide Person** | Will hide all available person entities |
| **Turn on List Display Mode** | Will show a list of entities instead of controllable cards |
| **Theme** | Choose a theme for the card |
| **Wrap Content** | Get a multi-line view instead of a single line view. You don't need to scroll anymore. |
| **Content Layout** | Change between horizontal or vertical layout. |
| **Color** | Change all icon colors for all domains & device_classes at once |
| **Icon Background Color** | Change the background color of all icons at once. Default is an rgba value so it has some opacity. |
| **Enable Total Entities** | Shows all entities instead of "on" state entities at default |
| **Tap, Double Tap & Hold Behavior** | Specify which action will happen for all domains & device_classes at once |
| **Hide content name** | Will hide all names from domains & device_classes and person entities |
| **Enable Total Number** | Will show the total number of available entities in the card (for example 1/7 Lights on) |
| **Render cards as square** | Will show all domains & device_classes as a rounded square instead of a circle |

---

## Filters

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/filter.png" alt="Status Card Header" width="50%">

| Option | Beschreibung |
|--------|--------------|
| **Area/Filter** | Choose which filter you want to set. Only entities from this area/floor will be shown |
| **Label Filter** | Enable this and a new selection will show. You can chose multiple labels here. Only entities with the same label will be shown |
| **Multi Area** | Enable this and you can select multiple areas/floors. Only entities from that areas/floors will be shown. |

---

## Entities

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/entities.png" alt="Status Card Header" width="50%">

| Option | Beschreibung |
|--------|--------------|
| **Extra Entities** | Choose which entities you want to show next to domains & device_classes. You can customize the extra entities to only show in a certain state or change color, icons etc. |
| **Hide Entities** | You can hide/exclude entities from the card. You can specify them per entity itself, per label or per area. The entities will be grouped into their domain to give easy access from the editor. |

---

## Smart Groups

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/smart_groups.png" alt="Status Card Header" width="50%">

Smart Groups are groups based on filters. You can add one or more entities that will only be shown if all filters are 'true'. This allows you to create groups that are not defined by the default domains. For example, you can create a group for low batteries only.

**Available Filters:** Area, Floor, Label, Domain, Entity ID, State, Name, Attributes, Device, Integration, Entity category, Hidden by, Device Manufacturer, Device Model, Group, last_changed, last_updated, last_triggered

!!! info "Wildcards & Comparisons"
    Some of these work with wildcards (`*`). You can enter a `*` before and/or after the string to get all matching entities. Comparisons such as `<`, `<=`, `>` and `>=` also work. For example, entering `<10` in the state filter will return all entities with a state below 10.

!!! warning "Important"
    Please be sure to not use the same name as a domain that is already included in your status card. Double entries in content will make HA crash.

---

## Content

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/content.png" alt="Status Card Header" width="50%">

| Option | Beschreibung |
|--------|--------------|
| **Selector** | Choose which domains & device_classes you want to show in the card |
| **Edit Content** | You can customize every domain, device_class or extra entity individual |

---

## Customization

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/customization.png" alt="Status Card Header" width="50%">

| Option | Beschreibung |
|--------|--------------|
| **Invert State** | Instead showing domain or device_class with the "on" state it will show the "off" state (for example if you want to show closed locks instead of open locks) |
| **Enable Total Entities** | Shows all entities of the domain instead of "on" state entities at default |
| **Enable Total Number** | Will show the total number of available entities for the domain (for example 1/7 Lights on) |
| **Name** | Change the display name of the domain or device_class |
| **Icon** | Change the icon of the domain or device_class |
| **Color** | Change the icon color of the domain or device_class |
| **Icon Background Color** | Change the background color of the individual icon. Default is an rgba value so it has some opacity. |
| **Tap, Double Tap & Hold Behavior** | Specify which action will happen for individual domain or device_class |
