---
title: FAQ
tags:
  - FAQ
hide:
  - tags  
---

# ❓ FAQ

Please read the FAQ before opening an issue. If your question isn't answered here you can open an issue [here](https://github.com/xBourner/status-card/issues).

!!! info "Attention"
    Issues with a question will be closed with a link to this page. New FAQs will be added frequently.
    
---


## Why can't I see entities?

Be sure to assign the entities to any area in your HA environment. Also if the status is "off" or "idle" the entities won't show up in default.

---

## How does the card work?

The card searches through all devices and entities in your HA. The ones that are assigned to any area will be used for further calculation. There is a filter that only shows entities that are not in any of these states:

`["closed", "locked", "off", "docked", "idle", "standby", "paused", "auto", "not_home", "disarmed", "0"]`

---

## What domains are supported?

The following domains are supported:

`["alarm_control_panel", "siren", "lock", "light", "media_player", "climate", "switch", "vacuum", "fan", "cover", "binary_sensor", "humidifier", "lawn_mower", "valve", "water_heater", "remote", "update", "device_tracker", "input_boolean", "timer", "counter", "calendar"]`

---

## Why can't I see binary_sensor or cover as a domain tab?

Binary_sensor, Cover and Switch are special domains that can be grouped into their device classes. With this it can be better to see that 4 windows are open instead 17 binary_sensors are on.

---

## How to add entities that aren't assignable to an area?

You can add Extra Entities or a Smart Group to the card. Extra Entities will be already existing entities in HA (can be groups also) or Smart Groups which will create a Group in the Status Card based on Filters.
