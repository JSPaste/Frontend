import { IconFocusAuto, IconMaximize } from '@tabler/icons-solidjs';
import { createEffect, type JSXElement, on } from 'solid-js';
import Dropdown from '#component/Dropdown.tsx';
import { Theme, type ThemeKeys } from '#extension/theme.ts';
import { deviceScheme } from '#util/deviceScheme.ts';
import {
	setTheme,
	setThemeScheme,
	setThemeSchemeMode,
	theme,
	themeScheme,
	themeSchemeMode
} from '#util/persistence.ts';

export default function ThemeSection(): JSXElement {
	createEffect(
		on([themeSchemeMode, deviceScheme], ([themeSchemeMode, deviceScheme]) => {
			if (themeSchemeMode === 'device') {
				setThemeScheme(deviceScheme);
			}

			(document.getElementById('theme-color-scheme-toggle') as HTMLInputElement).indeterminate =
				themeSchemeMode === 'device';
		})
	);

	return (
		<fieldset class='fieldset p-4 border border-base-300 rounded-box gap-4'>
			<legend class='fieldset-legend'>Theme</legend>
			<div class='flex gap-2 items-center'>
				<label class='swap swap-rotate'>
					<input
						type='checkbox'
						name='theme-device-scheme-swap'
						checked={themeSchemeMode() === 'device'}
						onClick={(e: MouseEvent): void => {
							setThemeSchemeMode(
								(e.currentTarget as HTMLInputElement | null)?.checked ? 'device' : 'manual'
							);
						}}
					/>
					<IconFocusAuto class='swap-on' />
					<IconMaximize class='swap-off' />
				</label>
				<label class='fieldset-label text-base-content gap-2'>
					<input
						type='checkbox'
						id='theme-color-scheme-toggle'
						class='toggle'
						value='light'
						disabled={themeSchemeMode() === 'device'}
						checked={themeScheme() === 'light'}
						onClick={(e: MouseEvent): void => {
							setThemeScheme((e.currentTarget as HTMLInputElement | null)?.checked ? 'light' : 'dark');
						}}
					/>
				</label>
				{themeSchemeMode() === 'device'
					? 'Device color scheme'
					: themeScheme() === 'dark'
						? 'Dark color scheme'
						: 'Light color scheme'}
			</div>
			<Dropdown
				disabled
				dropdownId='theme'
				label='Theme selector'
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
