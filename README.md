<h1 id="top" align="center">Status Card</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/status-card-headerv2.png" alt="Status Card Header" width="100%">
</p>

<p align="center">
  <a href="https://github.com/hacs/integration">
    <img src="https://img.shields.io/badge/hacs-default-orange.svg?style=for-the-badge" alt="HACS">
  </a>
  <a href="https://github.com/xBourner/status-card/releases">
    <img src="https://img.shields.io/github/downloads/xBourner/status-card/total?style=for-the-badge" alt="GitHub Downloads">
  </a>
  <a href="https://github.com/xBourner/status-card/releases/">
    <img src="https://img.shields.io/github/release/xBourner/status-card?style=for-the-badge" alt="GitHub release">
  </a>
  <a href="https://github.com/xBourner/status-card">
    <img src="https://img.shields.io/github/stars/xBourner/status-card?style=for-the-badge" alt="Stars">
  </a>
  <a href="https://github.com/xBourner/status-card/issues">
    <img src="https://img.shields.io/github/issues/xBourner/status-card?style=for-the-badge" alt="Issues">
  </a>
</p>

## Overview

**Status Card** is a powerful custom card for Home Assistant Dashboards that provides a comprehensive overview of your entities without the need for constant updates.

I always wanted to make an overview card that shows a lot of entities without the need to change it almost every day. This card will show all relevant data in a quick look. You only need to assign your entities/devices to your areas and the card will do the rest.

<p align="center">
  <img width="49%" alt="Light Mode" src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/status-card-light.png">
&nbsp; 
  <img width="49%" alt="Dark Mode" src="https://raw.githubusercontent.com/xbourner/status-card/main/.github/img/status-card-dark.png">
</p>

**Note:** This card is highly influenced by [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard). Now you can use this great idea as a single card in all of your Dashboards.

## ✨ Features

- 🤖 **Zero-Configuration Magic** - Automatically generates your dashboard simply by reading the entities and devices assigned to your Home Assistant Areas.
- 📊 **Smart State Filtering** - Intelligently displays only the entities that are currently active or "on" (with the option to invert logic for custom use-cases).
- 📚 **Dynamic Grouping** - Neatly organizes your active entities by their `domain` (lights, switches, media players) or `device_class` (doors, windows, motion sensors).
- 🧑‍🤝‍🧑 **Powerful Smart Groups** - Build custom, intelligent groups with advanced, multi-layered filters (by state, domain, and more) to perfectly tailor your overview.
- ➕ **Extra & Ignored Entities** - Full control over your view: manually add missing entities or hide specific ones you don't want to see.
- 📑 **Interactive Detail Popups** - Tap any group to open a beautiful, native-feeling popup that renders all containing entities as interactive Tile Cards.
- 🎨 **Extensive Customization & Styling** - Modify colors, configure custom actions (tap, hold, double-tap), and style your headers directly within the UI.
- 🌗 **Seamless Theme Support** - Looks gorgeous in both Light and Dark mode, adapting perfectly to your Home Assistant theme.
- 🧠 **100% GUI Editor Ready** - A fully-featured visual editor means absolutely no YAML editing is required to set up or process the card!
- 📱 **Fully Responsive** - Carefully optimized layouts ensure the optimal viewing experience on both desktop monitors and mobile devices.
- 🌍 **Native Localization** - Automatically translates perfectly into all Home Assistant supported languages.

## 📥 Installation

### Method 1: HACS (Recommended)

The easiest way to install and keep **Status Card** updated is via HACS.

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=xBourner&repository=status-card&category=plugin)

1. Ensure [HACS](https://hacs.xyz) is installed.
2. Open HACS in Home Assistant.
3. Search for **Status Card**.
4. Download and Install.
5. **Clear your browser cache** and refresh (F5) the page.

### Method 2: Manual Install

1. Download **status-card.js** file from the latest release.
2. Put **status-card.js** file into your `config/www` folder.
3. Add reference to **status-card.js** in Dashboard. There are two ways to do that:
   - **Using UI:** Settings → Dashboards → More Options icon → Resources → Add Resource → Set Url as `/local/status-card.js` → Set Resource type as JavaScript Module. *(Note: If you do not see the Resources menu, you will need to enable Advanced Mode in your User Profile)*
   - **Using YAML:** Add the following code to your lovelace section.
     ```yaml
      resources:
      - url: /local/status-card.js
        type: module
     ```

## ⚙️ Configuration & Usage

Once installed, simply edit your dashboard, click **Add Card**, and search for **Status Card**. The visual editor will guide you through all options!

The card needs to work with your areas so you need to assign your relevant devices/entities to your areas beforehand.

For advanced configuration and YAML examples, please visit the [Wiki](https://github.com/xBourner/status-card/wiki).

### 🎥 Video Tutorial

Want to see the Status Card in action? Check out this excellent showcase and tutorial video (🇩🇪 German language):

[![Status Card Tutorial](https://img.youtube.com/vi/z4j6qpBgrYU/0.jpg)](https://www.youtube.com/watch?v=z4j6qpBgrYU)

## ❤️ Support My Work

Developing and maintaining custom cards takes a lot of time and coffee. If you enjoy using Status Card and want to support its ongoing development, I would greatly appreciate it!

<p align="center">
  <a href="https://discord.gg/RfVx7hmZD3">
    <img src="https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da" alt="Discord">
  </a>
  <a href="https://www.buymeacoffee.com/bourner">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge" alt="Buy Me A Coffee">
  </a>
  <a href="https://github.com/sponsors/xBourner">
    <img src="https://img.shields.io/badge/Sponsor%20on%20GitHub-30363d?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Sponsors">
  </a>
  <a href="https://www.paypal.me/gibgas123">
    <img src="https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge" alt="PayPal">
  </a>
</p>

Join the <a href="https://discord.gg/RfVx7hmZD3">**community Discord server**</a> to leave feedback, request features, or get help with your configuration.

---

[🔝 Back to top](#top)
