[![stars - status-card](https://img.shields.io/github/stars/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card)
[![forks - status-card](https://img.shields.io/github/forks/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card)
[![GitHub release](https://img.shields.io/github/release/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/releases/)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/issues)

[![Discord](https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da)](https://discord.gg/RfVx7hmZD3)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge)](https://www.buymeacoffee.com/bourner)
[![PayPal](https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge)](https://www.paypal.me/gibgas123)



# status-card

A status card for home assistant dashboard

This is my first custom card for Home Assistant.
I am not a coder and have no background in coding. I always tried to achieve something like this with different approaches but nothing was the way in wanted to.
So i tried a bit and i was able to create my own custom card.

![image](https://github.com/user-attachments/assets/32335d69-4286-4b92-9bb4-eccf0730ff87)

This card i highly influenced by [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard).
I tried to to have this in every dashboard i want and dont want to be restricted by Dwains Dashboard.

I also made some tweaks so it has some more functions.
I added a graphical Interface to edit the card. Everything is managable from GUI :)

# Features
 - shows person entities
 - shows all entities which aren't off grouped by domain or deivce class
 - filter for areas/floors
 - customization of domains and device classes
 - can show extra entities
 - you can hide certain entities
 - graphical editor
 - should work in all available HA languages

# How does it work?

This card shows every person entity which is present in your HA environment. You can also disable that person entities will be shown.
Also this card goes through a bunch of domains and device classes and looks for the state of all entities inside them.

If the entity is on, home or open (or something else which isn't off) it will show up in the card.
Please keep attention that it will only show entities which are linked to any area. Without this it would be a mess.

# Screenshots
### Graphical Editor
![image](https://github.com/user-attachments/assets/fba1e0c8-9025-4b2d-9de7-ad2e178b5bbf)


### Area/Floor & Label Filter
Use this to only show entities linked to an area/floor. You can combine this with the Label Filter. Only entities with this label will be shown. Area/Floor can be combined with the Label Filter.  
![image](https://github.com/user-attachments/assets/e9b002c2-80bf-4b44-8c14-ccb78ac3ab03)


### Adding Extra Entities/Hiding Entities from card
Choose an extra Entity which you want to see in your status card.
Add an extra entity to the card, or remove unwanted entities by the entity itself or labels.

![image](https://github.com/user-attachments/assets/71856bae-a8a4-49b7-bbeb-326968a1636d)


## Customization of Domains or Device Classes
You can specify the look of the domains and device classes. You can change the icon, icon color and sort order. You can also completly hide them and now you can invert them. If you only want to show closed garage, doors or locks for example.

![image](https://github.com/user-attachments/assets/24737f78-f48b-4239-8023-314b20f0ea7b)


![image](https://github.com/user-attachments/assets/473553ea-1a4b-46d5-9ea1-96b371bafcbe)



## Hiding Names for Person, Domains, Device Classes & Extra Entities
![image](https://github.com/user-attachments/assets/01acf476-c8f0-427a-a556-8eecde03a7c9)


![image](https://github.com/user-attachments/assets/66c191af-31c6-4c33-a603-f576d524916b)

## More Info View
For Extra Entities you have the default More Info View for your entity. If you click on a group (domain/deviceclass) you will get a list of all entities in the desired state.
![image](https://github.com/user-attachments/assets/e64901ac-58bb-48c2-b2b3-7448eca3569c)


You can set the columns of entities next together from 1 to 4 with this:

![image](https://github.com/user-attachments/assets/2a138f2c-f147-44ba-9bfe-cbafe047af6d)

so it will look like this:

![image](https://github.com/user-attachments/assets/9e925bdd-d852-4c6d-a1d9-58095cad4135)



## List Mode (former known as Bulk Mode)
List Mode will list all entities instead of showing entity cards. You can use this to have a quick access to copy all unwanted entities and paste them into hidden_entities via yaml.

![image](https://github.com/user-attachments/assets/b8aec0a0-eee5-4f79-a86d-94c91814a825)



## Installation

### Hacs

Add this repository via HACS Custom repositories

https://github.com/xBourner/status-card

([How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))


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

# Feedback

Thank you for using my custom cards. Please leave some feedback or a star.
If you have any problems, suggestions for improvements or want to connect with me you can joing my discord: https://discord.gg/RfVx7hmZD3




