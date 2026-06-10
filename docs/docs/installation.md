---
tags:
  - Setup
hide:
  - tags
---

# 🛠️ Installation

There are two ways to install the Status Card in your Home Assistant. We highly recommend using HACS.

!!! tip "Recommended Method"
    Installation via **HACS** (Home Assistant Community Store) is the best way to ensure your Status Card always stays up to date.

---

## Method 1: HACS (Recommended)

With HACS, the card is installed in just a few clicks and ready for updates.

1. Make sure [HACS](https://hacs.xyz/) is installed in your Home Assistant.
2. Open HACS from the Home Assistant sidebar.
3. Search for **Status Card** in Frontend integrations.
4. Click on **Download and Install**.
5. Clear your browser cache and reload the page (`F5`).

---

## Method 2: Manual Installation

If you don't use HACS, you can also add the card manually.

1. Download the `status-card.js` file from the [latest GitHub release](https://github.com/xBourner/status-card/releases).
2. Copy the file into your `/config/www/` folder.
3. Add the resource to your dashboard.

=== "Via UI (Recommended)"
    1. Go to **Settings** → **Dashboards**.
    2. Click the 3-dot menu (top right) → **Resources**.
    3. Click on **Add Resource**.
    4. Set the URL to `/local/status-card.js`.
    5. Choose **JavaScript Module** as the Resource type.

=== "Via YAML"
    Add the following code to your `lovelace` configuration:
    ```yaml
    resources:
      - url: /local/status-card.js
        type: module
    ```

!!! warning "Note on Resource Management"
    If you don't see the "Resources" menu in the UI, you must first enable **Advanced Mode** in your Home Assistant user profile.
