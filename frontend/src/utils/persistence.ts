import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';
import { type DeviceScheme, deviceScheme } from '#util/deviceScheme.ts';
import type { ThemeKeys, ThemeSchemeMode } from '../extensions/theme.ts';

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [editorBackendAuthority, setEditorBackendAuthority] = makePersisted(createSignal('https://jspaste.eu'), {
	storage: localStorage,
	name: 'jspaste-backend-authority-v1'
});

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [editorContent, setEditorContent] = makePersisted(createSignal(''), {
	storage: localStorage,
	name: 'jspaste-editor-content-v1'
});

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [editorZoom, setEditorZoom] = makePersisted(createSignal(100), {
	storage: localStorage,
	name: 'jspaste-editor-zoom-v1'
});

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [theme, setTheme] = makePersisted(createSignal<ThemeKeys>('default'), {
	storage: localStorage,
	name: 'jspaste-theme-v1'
});

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [themeScheme, setThemeScheme] = makePersisted(createSignal<DeviceScheme>(deviceScheme()), {
	storage: localStorage,
	name: 'jspaste-theme-scheme-v1'
});

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [themeSchemeMode, setThemeSchemeMode] = makePersisted(createSignal<ThemeSchemeMode>('device'), {
	storage: localStorage,
	name: 'jspaste-theme-scheme-mode-v1'
});
