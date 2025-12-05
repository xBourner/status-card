export const applyThemesOnElement = (
  element: any,
  themes: any,
  selectedTheme?: string,
  themeSettings?: Partial<{
    dark: boolean;
    primaryColor: string;
    accentColor: string;
  }>,
  main?: boolean
) => {
  const themeToApply = selectedTheme || (main ? themes?.theme : undefined);
  const darkMode =
    themeSettings?.dark !== undefined
      ? themeSettings.dark
      : themes?.darkMode || false;

  if (!element.__themes) {
    element.__themes = { cacheKey: null, keys: new Set<string>() };
  }

  let cacheKey = themeToApply || "";
  let themeRules: Record<string, string> = {};

  if (themeToApply === "default") {
    const primaryColor = themeSettings?.primaryColor;
    const accentColor = themeSettings?.accentColor;

    if (primaryColor) {
      cacheKey = `${cacheKey}__primary_${primaryColor}`;
      themeRules["primary-color"] = String(primaryColor);
    }
    if (accentColor) {
      cacheKey = `${cacheKey}__accent_${accentColor}`;
      themeRules["accent-color"] = String(accentColor);
    }

    if (
      !primaryColor &&
      !accentColor &&
      element.__themes?.cacheKey === "default"
    ) {
      return;
    }
  }

  if (
    themeToApply &&
    themeToApply !== "default" &&
    themes?.themes?.[themeToApply]
  ) {
    const { modes, ...base } = themes.themes[themeToApply] || {};
    themeRules = { ...themeRules, ...base };
    if (modes) {
      if (darkMode && modes.dark) {
        themeRules = { ...themeRules, ...modes.dark };
      } else if (!darkMode && modes.light) {
        themeRules = { ...themeRules, ...modes.light };
      }
    }
  } else if (
    !themeToApply &&
    (!element.__themes?.keys ||
      (element.__themes.keys as Set<string>).size === 0)
  ) {
    return;
  }
  const prevKeys: Set<string> = element.__themes?.keys || new Set<string>();
  const newKeys = new Set<string>(Object.keys(themeRules));
  if (themeToApply === "default" && newKeys.size === 0) {
    for (const key of prevKeys) {
      try {
        element.style.removeProperty(`--${key}`);
      } catch { }
    }
    element.__themes = { cacheKey: "default", keys: new Set<string>() };
    return;
  }

  if (element.__themes?.cacheKey === cacheKey) {
    let same = true;
    if (prevKeys.size !== newKeys.size) {
      same = false;
    } else {
      for (const k of prevKeys) {
        if (!newKeys.has(k)) {
          same = false;
          break;
        }
      }
    }
    if (same) return;
  }

  for (const key of prevKeys) {
    if (!newKeys.has(key)) {
      try {
        element.style.removeProperty(`--${key}`);
      } catch { }
    }
  }

  for (const [key, value] of Object.entries(themeRules)) {
    element.style.setProperty(`--${key}`, String(value));
  }
  element.__themes.cacheKey = cacheKey || null;
  element.__themes.keys = newKeys;
};
