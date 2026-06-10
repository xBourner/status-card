---
tags:
  - Customization
hide:
  - tags
---



# ⚙️ Configuration & Usage

Once the Status Card is installed, setting it up is a breeze.

!!! info "Main Requirement"
    The card is based on your Home Assistant areas. You must assign your relevant devices and entities to your **areas** beforehand for the card to work.

---

## The GUI Editor

The visual editor is the easiest way to configure the card. No YAML knowledge is required!

1. Open your dashboard and click **Edit Dashboard**.
2. Click **Add Card**.
3. Search for **Status Card**.
4. The GUI editor will guide you through all available options.

You can customize domains, hide entities, define popups, and add custom CSS—all directly from the user interface.

---

## YAML Configuration (For Pros)

For those who prefer editing their dashboard in code, the Status Card naturally supports YAML too.

### Basic Example

```yaml
type: custom:status-card
columns: 4
hide_person: false
list_mode: false
hide_content_name: false
customization: []
content:
  - lock
  - light
  - media_player
  - climate
  - switch - switch
  - switch - outlet
  - vacuum
  - fan
  - cover - shutter
  - binary_sensor - motion
  - remote
  - update
  - calendar
```

### Full YAML Settings

```yaml
type: custom:dev-status-card
hide_person: false  # hide person entities in card
list_mode: false  # enable buk mode for accessing entities as text you can copy (easy to add hidden_entities)
hide_content_name: false  # hide names for domains/device classes/exta entities
show_total_number: false  # lets you show how many entities of a domain are on and how many in total e.g. 1/4 on
square: false # renders card items as a rounded square instaed of a circle
show_total_entities: false # lets you choose between showing only 'on' entities or all entities that belongs to a domain
theme: optional # choose a theme to sytle your card
columns: 4 # defines how much columns are used for more info view (min:1; max:4; default is 4)
no_scroll: false # lets you choose between multine (without scrolling) or single line (with scrolling)
content_layout: vertical/horizonzal # choose between horizontal or vertical layout of the content
color: red # set to color all domains/device_classes and extra_entities
background_color: # choose a background color for all items (works with rgb or rgba)
  - 154
  - 25
  - 25
  - 0.3
tap_action: # lets you choose a custom tap action
  action: more-info
double_tap_action: # lets you choose a custom double tap action
  action: more-info
hold_action: # lets you choose a custom hold action
  action: more-info
filter:  # option to filter for an area/floor (only entities from that area/floor will be shown)
area: living_room #  !only one filter per card!
floor: first_floor #  !only one filter per card!
label_filter: fase # activate to choose a label 
label: motion # set this to only show entities which have this label assigned
extra_entities: # list of entities that will be shown in the card (you can customize them via custimization options)
  - sun.sun
hidden_entities: # entities which will be hidden from card
  - update.0x5c0272fffeae0368
hidden_labels: # entities with these labels will be hidden from card
  - Window
hidden_areas:  # entities from that areas will be hidden from card
  - dev
rulesets: # one or multiple rules for smart groups
  - group_id: Low Batteries    # choose the id/name for the group
    group_icon: mdi:battery-10  # choose the icon for the group
    group_status: low  # choose the state string for the group (for example on, off or any)
    attributes:
      device_class: battery
    state: <10
content: # lists all domains/device_classes to show
  - light
  - switch
  - Binary Sensor - window

customization:  # customize almost everything
  - type: light   # the domain/device_class/extra_entitiy to customize
    invert: true  # if true only off entities will be shown
    show_total_number: false  # lets you show how many entities of a domain are on and how many in total e.g. 1/4 on
    show_total_entities: false # lets you choose between showing only 'on' entities or all entities that belongs to a domain
    invert_state: false # you can invert the extra_entity state filter
    state: "on" | "off" # specify the value that an extra_entity needs to show
    name: test_name    # change the name of domain/device_class/extra_entitiy
    icon: mdi:account  # change the icon of domain/device_class/extra_entitiy
    icon_color: red  # change the icon_color of domain/device_class/extra_entitiy
    tap_action: # lets you choose a custom tap action
      action: more-info
    double_tap_action: # lets you choose a custom double tap action
      action: more-info
    hold_action: # lets you choose a custom hold action
      action: more-info
```