import { makePersisted } from "@solid-primitives/storage";
import { createSignal, type Signal } from "solid-js";
import type { ThemeKeys, ThemeSchemeMode } from "#extension/theme.ts";
import { type DeviceScheme, deviceScheme } from "#util/deviceScheme.ts";

export const [editorBackendAuthority, setEditorBackendAuthority] = makePersisted<string, Signal<string>>(
  createSignal("https://jspaste.eu"),
  {
    storage: localStorage,
    name: "jspaste-backend-authority-v1"
  }
);

export const [editorContent, setEditorContent] = makePersisted<string, Signal<string>>(createSignal(""), {
  storage: localStorage,
  name: "jspaste-editor-content-v1"
});

export const [editorZoom, setEditorZoom] = makePersisted<number, Signal<number>>(createSignal(100), {
  storage: localStorage,
  name: "jspaste-editor-zoom-v1"
});

export const [theme, setTheme] = makePersisted<ThemeKeys, Signal<ThemeKeys>>(createSignal<ThemeKeys>("default"), {
  storage: localStorage,
  name: "jspaste-theme-v1"
});

export const [themeScheme, setThemeScheme] = makePersisted<DeviceScheme, Signal<DeviceScheme>>(
  createSignal<DeviceScheme>(deviceScheme()),
  {
    storage: localStorage,
    name: "jspaste-theme-scheme-v1"
  }
);

export const [themeSchemeMode, setThemeSchemeMode] = makePersisted<ThemeSchemeMode, Signal<ThemeSchemeMode>>(
  createSignal<ThemeSchemeMode>("device"),
  {
    storage: localStorage,
    name: "jspaste-theme-scheme-mode-v1"
  }
);
