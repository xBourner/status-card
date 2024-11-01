# status-card
A status card for home assistant dashboard

This is my first custom card for Home Assistant.
I am not a coder and have no background in coding. I always tried to achieve something like this with different approaches but nothing was the way in wanted to.
So i tried a bit and i was able to create my own custom card.

![image](https://github.com/user-attachments/assets/47737116-74d8-4e38-ac47-62c3442277b0)

This card i highly influenced by [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard).
I tried to to have this in every dashboard i want and dont want to be restricted by Dwains Dashboard.

I also made some tweaks so it has some more functions.
I added a graphical Interface to edit the card. Everything is managable from GUI :)

# Features
 - shows person entities
 - shows all entities which aren't off grouped by domain or deivce class
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
![image](https://github.com/user-attachments/assets/b5d15fc9-25c1-4470-a90c-73f917d06155)

### Adding Extra Entities
![image](https://github.com/user-attachments/assets/4c48eed1-b348-4151-9a41-fc4705b1bcd5) ![image](https://github.com/user-attachments/assets/794319c1-1204-4369-9137-b8e7993eb005)


## Customization of Domains or Device Classes
![image](https://github.com/user-attachments/assets/87291197-6e72-494e-8707-1503021f9b80) ![image](https://github.com/user-attachments/assets/d59d0feb-54db-473e-86c3-d3c23ce904a8)


## Bulk Mode

![image](https://github.com/user-attachments/assets/11f1ac3b-7463-4302-a90f-47a4b8d76649)


## Installation

### Hacs

Add this repository via HACS Custom repositories

https://github.com/xBourner/status-card

([How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))


# Settings

| Name          | Type          | Default       |   Description |
| ------------- | ------------- | ------------- | ------------- |
| extra_entities| Array         | none          | will show an extra entity |
|   -entity     | entity_id     | none          | which entity will be shown |
|   - status    | state         | none          | entity will only be shown if it has this state |
|   - icon      | mdi:icon      | none          | custom mdi:icon |
|   - color     | color         | none          | custom color |
| showPerson    | bool          | true          | choose if you want to see person entities or not |
| hidden_entities| string         | none         | choose which entities will not be shown in the card  |
| bulkMode      | bool          | false         | toggles a mode in which you get a list instead of cards which can be copy pasted  |
| colors        | array         | none          |  shows settings for domain icon color |
|  - domain     | color         | none          | will change the icon color of the domain |
| names  | array         | none          |  shows settings for domain names|
|  - domain     | name        | none          | will change the name of the domain |
| icons  | array         | none          |  shows settings for domain icons |
|  - domain     | icon         | none          | will change the icon of the domain |
| newSortorder  | array         | none          |  lets you change the default sorting by domains/device classes |



