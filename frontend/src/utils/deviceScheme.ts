import { createSignal } from 'solid-js';

export type DeviceScheme = 'dark' | 'light';

const mediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [deviceScheme, setDeviceScheme] = createSignal<DeviceScheme>(mediaQuery.matches ? 'dark' : 'light');

mediaQuery.addEventListener('change', (event) => {
	setDeviceScheme(event.matches ? 'dark' : 'light');
});
