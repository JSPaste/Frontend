import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';
import { type DeviceScheme, deviceScheme } from '#util/deviceScheme.ts';
import type { ThemeKeys, ThemeSchemeMode } from '#util/theme.ts';

export const [editorBackendAuthority, setEditorBackendAuthority] = makePersisted(createSignal('https://jspaste.eu'), {
	storage: localStorage,
	name: 'jspaste-backend-authority-v1'
});

export const [editorContent, setEditorContent] = makePersisted(createSignal(''), {
	storage: localStorage,
	name: 'jspaste-editor-content-v1'
});

export const [theme, setTheme] = makePersisted(createSignal<ThemeKeys>('default'), {
	storage: localStorage,
	name: 'jspaste-theme-v1'
});

export const [themeScheme, setThemeScheme] = makePersisted(createSignal<DeviceScheme>(deviceScheme()), {
	storage: localStorage,
	name: 'jspaste-theme-scheme-v1'
});

export const [themeSchemeMode, setThemeSchemeMode] = makePersisted(createSignal<ThemeSchemeMode>('device'), {
	storage: localStorage,
	name: 'jspaste-theme-scheme-mode-v1'
});
