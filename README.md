<a name="top"></a>

# Status Card

[![GitHub release](https://img.shields.io/github/release/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/releases/)
[![stars - status-card](https://img.shields.io/github/stars/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/issues)


<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/status-card-header.png" alt="Status Card Header" width="100%">

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
 - 🧠 **GUI Editor** - No code or scripts needed
 - 🔧 **Highly customizable** - almost everything customizable 
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

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=xBourner&repository=status-card&category=plugin)

#### Steps:

1. Make sure **[HACS](https://hacs.xyz)** is installed.
3. Go to **HACS → Custom Repositories**.
4. Add this repository: `https://github.com/xBourner/status-card` as type `Dashboard`
5. Install **Status Card**.
6. **Clear your browser cache** and reload (F5) Home Assistant.

For more info look at [How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/)


<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

# Screenshots & Explanation

<details>
<summary>Show Content</summary>



### More Info/ Popup View

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/popup.png" alt="Status Card Header" width="100%">

- Displays all entities in the domain or device_class you clicked on
- shows controllable cards at default
- list mode for easy copying entities
- you can specify how many columns will be shown in the popup

### Appearance

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/appearance.png" alt="Status Card Header" width="50%">

- Hide Person => will hide all available person entities
- Turn on List Display Mode => will show a list of entities instead of controllable cards
- Hide content name => will hide all names from domains & device_classes and person entities
  <img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/hide-names.png" alt="Status Card Header" width="40%">
 
- Enable Total Number => will show the total number of available entities in the card (for example 1/7 Lights on)
  <img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/total-number.png" alt="Status Card Header" width="40%">
  
- Theme => Choose a theme for the card
- More Info Columns => Specify the amount of columns you will see in the popup
- Render cards as square => will show all domains & device_classes as a rounded square instead of a circle
  <img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/square.png" alt="Status Card Header" width="40%">
  
- Color => change all icon colors for all domains & device_classes at once
- Tap, Double Tap & Hold Behavior => specify which action will happen for all domains & device_classes at once

  ### Filters

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/filter.png" alt="Status Card Header" width="50%">

- Area/Filter => choose which filter you want to set. Only entities from this area/floor will be shown
- Label Filter => enable this and a new selection will show. You can chose multiple labels here. Only entities with the same label will be shown
- Multi Area => enable this and you can select multiple areas/floors. Only entities from that areas/floors will be shown.


### Entities

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/entities.png" alt="Status Card Header" width="50%">

- Extra Entities => choose which entities you want to show next to domains & device_classes
- Hide Entities => you can hide/exclude entities from the card. you can specify them per entity itself or per label

### Content

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/content.png" alt="Status Card Header" width="50%">

- Selector => choose which domains & device_classes you want to show in the card
- Edit Content => you can customize every domain, device_class or extra entity individual

### Customization

<img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/customization.png" alt="Status Card Header" width="50%">

- Invert State => instead showing domain or device_class with the "on" state it will show the "off" state (for example if you want to show closed locks instaed of open locks)
- Name => Change the display name of the domain or device_class
- Icon => Change the icon of the domain or device_class
- Color => Change the icon color of the domain or device_class
- Tap, Double Tap & Hold Behavior => specify which action will happen for individual domain or device_class

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
list_mode: false  # enable buk mode for accessing entities as text you can copy (easy to add hidden_entities)
hide_person: false  # hide person entities in card
hide_content_name: false  # hide names for domains/device classes/exta entities
hide_person_name: false # hide names for person entities
filter:  # option to filter for an area/floor (only entities from that area/floor will be shown)
area: living_room #  !only one filter per card!
floor: first_floor #  !only one filter per card!
label_filter: fase # activate to choose a label 
label: motion # set this to only show entities which have this label assigned
extra_entities: # settings for extra entity that will be shown in card when the state is the same like you configured
  - entity: light.living-room
    status: "off"
    icon: mdi:ceiling-fan-light
    color: lime
hidden_entities: # enttites which will be hidden from card
  - update.0x5c0272fffeae0368
hidden_labels: # labels which will be hidden from card
  - Window
columns: 4 # defines how much columns are used for more info view (min:1; max:4; default is 4)
theme: optional # choose a theme to sytle your card
content: # lists all domains/device_classes to show
  - light
  - switch
  - Binary Sensor - window
color: red # set to color all domains/device_classes and extra_entities
customization:  # customize almost everything
  - type: light   # the domain/device_class/extra_entitiy to customize
    invert: true  # if true only off entities will be shown
    invert_state: false # you can invert the extra_entity state filter
    state: "on" | "off" # specify the value that an extra_entity needs to show
    name: test_name    # change the name of domain/device_class/extra_entitiy
    icon: mdi:account  # change the icon of domain/device_class/extra_entitiy****
    icon_color: red  # change the icon_color of domain/device_class/extra_entitiy**

```

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

# Feedback

Thank you for using my custom cards. Please leave some feedback or a star.
If you have any problems, suggestions for improvements or want to connect with me you can joing my discord: https://discord.gg/RfVx7hmZD3

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>



