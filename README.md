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
![image](https://github.com/user-attachments/assets/bab6c931-9a37-41ba-80b2-3ef868257c46)


### Area/ Floor Filter
![image](https://github.com/user-attachments/assets/7066112b-e883-40d2-85ef-464cff43f725)


### Adding Extra Entities
![image](https://github.com/user-attachments/assets/4c48eed1-b348-4151-9a41-fc4705b1bcd5) ![image](https://github.com/user-attachments/assets/794319c1-1204-4369-9137-b8e7993eb005)


## Customization of Domains or Device Classes
![image](https://github.com/user-attachments/assets/87291197-6e72-494e-8707-1503021f9b80) ![image](https://github.com/user-attachments/assets/d59d0feb-54db-473e-86c3-d3c23ce904a8)

## Hiding Names for Person, Domains, Device Classes & Extra Entities

![image](https://github.com/user-attachments/assets/b2b42de3-1d26-47f9-ba84-801dd088ead9)


## Bulk Mode

![image](https://github.com/user-attachments/assets/11f1ac3b-7463-4302-a90f-47a4b8d76649)


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
```






