import type { JSXElement } from 'solid-js';
import LanguageSection from '#component/modals/settings/LanguageSection.tsx';
import ThemeSection from '#component/modals/settings/ThemeSection.tsx';

export default function SettingsModal(): JSXElement {
	return (
		<dialog id='modal_settings' class='modal modal-bottom sm:modal-middle select-none'>
			<div class='modal-box flex flex-col'>
				<h3 class='font-bold text-lg mb-2'>SETTINGS</h3>
				<div class='flex flex-col gap-4'>
					<ThemeSection />
					<LanguageSection />
				</div>
			</div>
			<form method='dialog' class='modal-backdrop'>
				<button type='submit' class='cursor-default' />
			</form>
		</dialog>
	);
}
