import { IconFocusAuto, IconFocusCentered } from '@tabler/icons-solidjs';
import { createEffect, on } from 'solid-js';
import Dropdown from '#component/Dropdown.tsx';
import { deviceScheme } from '#util/deviceScheme.ts';
import {
	setTheme,
	setThemeScheme,
	setThemeSchemeMode,
	theme,
	themeScheme,
	themeSchemeMode
} from '#util/persistence.ts';
import { Theme, type ThemeKeys } from '#util/theme.ts';

export default function ThemeSection() {
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
			<div class='flex gap-2'>
				<label class='swap swap-rotate'>
					<input
						type='checkbox'
						name='theme-device-scheme-swap'
						checked={themeSchemeMode() === 'device'}
						onClick={(e) => setThemeSchemeMode(e.currentTarget.checked ? 'device' : 'manual')}
					/>
					<IconFocusAuto class='swap-on' />
					<IconFocusCentered class='swap-off' />
				</label>
				<label class='fieldset-label text-base-content gap-2'>
					<input
						type='checkbox'
						id='theme-color-scheme-toggle'
						class='toggle'
						value='light'
						disabled={themeSchemeMode() === 'device'}
						checked={themeScheme() === 'light'}
						onClick={(e) => setThemeScheme(e.currentTarget.checked ? 'light' : 'dark')}
					/>
					{themeSchemeMode() === 'device'
						? 'Device color scheme'
						: themeScheme() === 'dark'
							? 'Dark color scheme'
							: 'Light color scheme'}
				</label>
			</div>
			<Dropdown
				disabled
				dropdownId='theme'
				label='Theme selector'
				labelValue={theme()}
				listValues={Object.keys(Theme)}
				onClick={(e) => e.currentTarget.innerHTML in Theme && setTheme(e.currentTarget.innerHTML as ThemeKeys)}
			/>
		</fieldset>
	);
}
