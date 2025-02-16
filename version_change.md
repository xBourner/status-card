New Config

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
    name: test_name    # change the name of domain/device_class/extra_entitiy
    icon: mdi:account  # change the icon of domain/device_class/extra_entitiy****
    icon_color: red  # change the icon_color of domain/device_class/extra_entitiy**

```

Old Config
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
invert:  # will show closed garages instaed of opened
  cover:
    garage: true
newSortOrder: # change the sort order of a domain/device class/extra entity
  light: 10
  extra:
    light.living-room: 4
extra_entities: # settings for extra entity that will be shown in card when the state is the same like you configured
  - entity: light.living-room
    status: "off"
hidden_entities: # enttites which will be hidden from card
  - update.0x5c0272fffeae0368
hidden_labels: # labels which will be hidden from card
  - Window
moreInfoColumns: 4 # defines how much columns are used for more info view (min:1; max:4; default is 4)
```
