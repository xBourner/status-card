<a name="top"></a>

# Status Card




[![(https://hacs.xyz)](https://img.shields.io/badge/hacs-default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/xBourner/status-card/total?style=for-the-badge)
[![GitHub release](https://img.shields.io/github/release/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/releases/)
[![stars - status-card](https://img.shields.io/github/stars/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/issues)


<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/status-card-headerv2.png" alt="Status Card Header" width="100%">

# Support my work

If you like my work it would be nice if you support it. You don't have to but this will keep me motivated and i will appreciate it much! <br>
You can also join my Discord Server to leave a feedback, get help or contribute with ideas :) 

[![Discord](https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da)](https://discord.gg/RfVx7hmZD3)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge)](https://www.buymeacoffee.com/bourner)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20on%20GitHub-30363d?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/xBourner)
[![PayPal](https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge)](https://www.paypal.me/gibgas123)


# Overview

A **Status Card** for Home Assistant Dashboards

I always wanted to make an overview card that shows a lot of entities without the need to change it like everyday. This card will show all relevant data in a quick look.
You only need to assign your entities/devices to your areas and the card will do the rest.

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/status-card-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/status-card-dark.png" width="49%">
</p>

### How it works
 - 🤖 **Auto generating card** - Works when entities/devices are assigned to areas
 - ✅ **Based on entity states** - Shows entities that are in a on/active state (can be inverted)
 - 📚 **Automatic Grouping** - Entities grouped by domain/device_class
 - ◾ **Extra Entities** - Missing some entities in the groups? Just add them via Extra Entities 
 - 🧑‍🤝‍🧑 **Smart Groups** - Make your own groups with custom filters 
 - 📑 **Popup View** - Entities will render as Tile Cards in a new view
 - 🧠 **GUI Editor** - No code or scripts needed
 - 🔧 **Highly customizable** - almost everything customizable
 - 📱 **Optimized for desktop and phones**
 - 🌍 **Available in all HA languages**

<br>

This card i highly influenced by [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard). So now you can use this great idea as a single card in all of your Dashboards

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

## Installation

###  HACS Installation (Recommended)

Click this link to add **Status Card** to your Home Assistant:

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=xBourner&repository=status-card&category=plugin)

#### Steps:

1. Make sure **[HACS](https://hacs.xyz)** is installed.
3. Go to **HACS**.
4. Search for **Status Card**.
5. Download **Status Card**.
6. **Clear your browser cache** and reload (F5) Home Assistant.


#### Usage:

After adding the repository to your HA instance you need to add the card to one of your dashboards. <br>
The card needs to work with your areas so you need to assign your relevant devices/entities to your areas.

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

# Screenshots & Explanation

<details>
<summary>Show Content</summary>


### More Info/ Popup View

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/popup-status.png" alt="Status Card Header" width="100%">

  - **Popup View** - Displays all entities in the domain or device_class you clicked on
  - **Tile Cards** - Shows controllable cards at default
  - **List Mode** - Easy copying entities (e.g. for hiding entities)
  - **Columns** - Specify how many columns will be shown in the popup (still one on mobile view)
  - **Turn off Entities** - Lets you turn off all entities of one domain with one click
  - **Toggle Total Entities** - Toggle between entities with "on" state and all entities

### Appearance

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/appearance.png" alt="Status Card Header" width="50%">

- **Hide Person** - will hide all available person entities
- **Turn on List Display Mode** - will show a list of entities instead of controllable cards
- **Theme** - Choose a theme for the card
- **More Info Columns** - Specify the amount of columns you will see in the popup
- **Wrap Content** - Get a multine view instead of a single line view. You don't need to scroll anymore.
- **Content Layout** - Change between horizontal or vertical layout. 
- **Color** - Change all icon colors for all domains & device_classes at once
- **Icon Background Color** - Change the background color of all icons at once. Default is an rgba value so it has some opactiy.
- **Enable Total Entities** - Shows all entities instead of "on" state entities at default
- **Tap, Double Tap & Hold Behavior** - specify which action will happen for all domains & device_classes at once
  
- **Hide content name** - will hide all names from domains & device_classes and person entities
  <img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/hide-names.png" alt="Status Card Header" width="40%">
 
- **Enable Total Number** - will show the total number of available entities in the card (for example 1/7 Lights on)
  <img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/total-number.png" alt="Status Card Header" width="40%">
  
- **Render cards as square** - will show all domains & device_classes as a rounded square instead of a circle
  <img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/square.png" alt="Status Card Header" width="40%">
  
  ### Filters

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/filter.png" alt="Status Card Header" width="50%">

- **Area/Filter** - choose which filter you want to set. Only entities from this area/floor will be shown
- **Label Filter** - enable this and a new selection will show. You can chose multiple labels here. Only entities with the same label will be shown
- **Multi Area** - enable this and you can select multiple areas/floors. Only entities from that areas/floors will be shown.


### Entities

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/entities.png" alt="Status Card Header" width="50%">

- **Extra Entities** - choose which entities you want to show next to domains & device_classes
- **Hide Entities** - you can hide/exclude entities from the card. you can specify them per entity itself, per label or per area

### Smart Groups

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/smart_groups.png" alt="Status Card Header" width="50%">

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/low_batteries.png" alt="Status Card Header" width="20%">

Smart Groups are groups based on filters. You can add one or more entities that will only be shown if all filters are 'true'.
This allows you to create groups that are not defined by the default domains. For example, you can create a group for low batteries only.
The filters that are included are:

- Area
- Floor
- Label
- Domain
- Entity ID
- State
- Name
- Attributes
- Device
- Integration
- Entity category
- Hidden by
- Device Manufacturer
- Device Model
- Group
- last_changed
- last_updated
- last_triggered

Some of these work with wildcards (*). You can enter a * before and/or after the string to get all matching entities.
Comparisons such as <, <=, > and => also work. For example, entering <10 in the state filter will return all entities with a state below 10.

### Content

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/content.png" alt="Status Card Header" width="50%">

- **Selector** - choose which domains & device_classes you want to show in the card
- **Edit Content** - you can customize every domain, device_class or extra entity individual

### Customization

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/customization.png" alt="Status Card Header" width="50%">

- **Invert State** - instead showing domain or device_class with the "on" state it will show the "off" state (for example if you want to show closed locks instaed of open locks)
- **Name** - Change the display name of the domain or device_class
- **Icon** - Change the icon of the domain or device_class
- **Color** - Change the icon color of the domain or device_class
- **Icon Background Color** - Change the background color of the individual icon. Default is an rgba value so it has some opactiy.
- **Tap, Double Tap & Hold Behavior** - specify which action will happen for individual domain or device_class

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

</details>

# Settings

All settings are optional. The card should work without setting any parameters in yaml or via GUI. 

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

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

# Feedback

To see the latest changes please look at: [Releases](https://github.com/xBourner/status-card/releases)

Thank you for using my custom cards. Please leave some feedback or a star.
If you have any problems, suggestions for improvements or want to connect with me you can joing my discord: https://discord.gg/RfVx7hmZD3

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>



