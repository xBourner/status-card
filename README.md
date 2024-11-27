[![stars - status-card](https://img.shields.io/github/stars/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card)
[![forks - status-card](https://img.shields.io/github/forks/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card)
[![GitHub release](https://img.shields.io/github/release/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/releases/)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/status-card?style=for-the-badge)](https://github.com/xBourner/status-card/issues)
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
![image](https://github.com/user-attachments/assets/34ab32ea-7e3a-4d60-b904-f8e400e7ae4c)


### Area/Floor & Label Filter
Use this to only show entities linked to an area/floor. You can combine this with the Label Filter. Only entities with this label will be shown. Area/Floor can be combined with the Label Filter.  
![image](https://github.com/user-attachments/assets/2872ecea-baeb-4276-b594-a71b7632a2e9)


### Adding Extra Entities
Choose an extra Entity which you want to see in your status card. Choose the entity, after that you can pick the state and choose an icon and color to show it. You can also change the sort order to display it somewhere else in the card.
![image](https://github.com/user-attachments/assets/147cce6f-0da2-4d35-aa60-9a194dabd9b9)


## Customization of Domains or Device Classes
You can specify the look of the domains and device classes. You can change the icon, icon color and sort order. You can also completly hide them.

![image](https://github.com/user-attachments/assets/932d00f2-07cf-4d90-b4e7-0e6924395ab5)


## Hiding Names for Person, Domains, Device Classes & Extra Entities
![image](https://github.com/user-attachments/assets/05fa0be6-6d43-4f7b-9366-6f1894f9e38f)



## Bulk Mode
Bulk Mode will list all entities instead of showing entity cards. You can use this to have a quick access to copy all unwanted entities and paste them into hidden_entities via yaml.

![image](https://github.com/user-attachments/assets/3ae9712e-2430-4b8f-b358-4303f5379a15)



## Installation

### Hacs

Add this repository via HACS Custom repositories

https://github.com/xBourner/status-card

([How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))


# Settings

All settings are optional. The card should work without setting any parameters in yaml or via GUI. 

```yaml
type: custom:dev-status-card
bulkMode: false  # enable buk mode for accessing entities as text you can copy (easy to add hidden_entities)
showPerson: true  # show person entities in card
showBadgeName: false  # show names for domains/device classes/exta entities
showPersonName: false # show names for person entities
area_filter:  # option to filter for an area/floor (only entities from that area/floor will be shown)
  area: living_room #  !only one filter per card!
  floor: first_floor #  !only one filter per card!
label_filter: window # set this to only show entities which have this label assigned
hide:  # domains/device classes which are hidden from card
  light: false
names:  # domain/device classes that will show another name
  light: asd
icons:  # domain/device classes that will show another icon
  light: mdi:account-plus
colors:  # domain/device classes that will show another icon color
  light: dark-grey
newSortOrder: # change the sort order of a domain/device class/extra entity
  light: 10
  extra:
    light.living-room: 4
extra_entities: # settings for extra entity that will be shown in card when the state is the same like you configured
  - entity: light.living-room
    status: "off"
    icon: mdi:ceiling-fan-light
    color: lime
hidden_entities: # enttites which will be hidden from card
  - update.0x5c0272fffeae0368
hidden_labels: # labels which will be hidden from card
  - Window
```






