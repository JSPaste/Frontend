import { IconFocusAuto, IconMaximize } from "@tabler/icons-solidjs";
import { createEffect, type JSXElement, on } from "solid-js";
import Dropdown from "#component/Dropdown.tsx";
import { Theme, type ThemeKeys } from "#extension/theme.ts";
import { deviceScheme } from "#util/deviceScheme.ts";
import {
  setTheme,
  setThemeScheme,
  setThemeSchemeMode,
  theme,
  themeScheme,
  themeSchemeMode
} from "#util/persistence.ts";

export default function ThemeSection(): JSXElement {
  const themeSchemeLabel = (): string => {
    if (themeSchemeMode() === "device") {
      return "Device color scheme";
    }

    if (themeScheme() === "dark") {
      return "Dark color scheme";
    }

    return "Light color scheme";
  };

  createEffect(
    on([themeSchemeMode, deviceScheme], ([themeSchemeMode, deviceScheme]) => {
      if (themeSchemeMode === "device") {
        setThemeScheme(deviceScheme);
      }

      (document.getElementById("theme-color-scheme-toggle") as HTMLInputElement).indeterminate =
        themeSchemeMode === "device";
    })
  );

  return (
    <fieldset class="fieldset p-4 border border-base-300 rounded-box gap-4">
      <legend class="fieldset-legend">Theme</legend>
      <div class="flex gap-2 items-center">
        <label class="swap swap-rotate">
          <input
            checked={themeSchemeMode() === "device"}
            name="theme-device-scheme-swap"
            onClick={(e: MouseEvent): void => {
              setThemeSchemeMode((e.currentTarget as HTMLInputElement | null)?.checked ? "device" : "manual");
            }}
            type="checkbox"
          />
          <IconFocusAuto class="swap-on" />
          <IconMaximize class="swap-off" />
        </label>
        <label class="fieldset-label text-base-content gap-2">
          <input
            checked={themeScheme() === "light"}
            class="toggle"
            disabled={themeSchemeMode() === "device"}
            id="theme-color-scheme-toggle"
            onClick={(e: MouseEvent): void => {
              setThemeScheme((e.currentTarget as HTMLInputElement | null)?.checked ? "light" : "dark");
            }}
            type="checkbox"
            value="light"
          />
        </label>
        {themeSchemeLabel()}
      </div>
      <Dropdown
        disabled={true}
        dropdownId="theme"
        label="Theme selector"
        labelValue={theme()}
        listValues={Object.keys(Theme)}
        onClick={(e: MouseEvent): void => {
          const target = e.target as HTMLElement | null;
          if (target && target.innerHTML in Theme) {
            setTheme(target.innerHTML as ThemeKeys);
          }
        }}
      />
    </fieldset>
  );
}
