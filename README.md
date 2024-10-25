# status-card
A status card for home assistant dashboard

This is my first custom card for Home Assistant.
I am not a coder and have no background in coding. I always tried to achieve something like this with different approaches but nothing was the way in wanted to.
So i tried a bit and i was able to create my own custom card.

![image](https://github.com/user-attachments/assets/c3034ed1-2eea-487a-a7d3-d86303b66172)

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

# How does it work?

This card shows every person entity which is present in your HA environment. You can also disable that person entities will be shown.
Also this card goes through a bunch of domains and device classes and looks for the state of all entities inside them.

If the entity is on, home or open (or something else which isn't off) it will show up in the card.
Please keep attention that it will only show entities which are linked to any area. Without this it would be a mess.

# Screenshots
### Graphical Editor
![image](https://github.com/user-attachments/assets/4bf112b5-8375-4d47-831e-e74c7aa89f34)

### Adding Extra Entities
![image](https://github.com/user-attachments/assets/a7e06813-57f1-4378-8b1a-292537a0cb28)

## Customization of Domains or Device Classes
![image](https://github.com/user-attachments/assets/725b83c0-e4fa-4fd5-af5a-04b849e47efb)

## Bulk Mode

![image](https://github.com/user-attachments/assets/1be4b008-dee1-458a-8bb2-0bfba2428c32)

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
| domainColors  | array         | none          |  shows settings for domain icon color |
|  - domain     | color         | none          | will change the icon color of the domain |
| domainNames  | array         | none          |  shows settings for domain names|
|  - domain     | name        | none          | will change the name of the domain |
| domainIcons  | array         | none          |  shows settings for domain icons |
|  - domain     | icon         | none          | will change the icon of the domain |
| newSortorder  | array         | none          |  lets you change the default sorting by domains/device classes |

# To-Do

Change the method in which Icons/Names and Icon Colors are handled. So the Editor Code is not so messy.


