import LanguageSection from '@x-component/modals/settings/LanguageSection';
import ThemeSection from '@x-component/modals/settings/ThemeSection';

export default function Settings() {
	return (
		<dialog id='modal_settings' class='modal modal-bottom sm:modal-middle'>
			<div class='modal-box flex flex-col bg-base-100'>
				<h3 class='font-bold text-lg'>SETTINGS</h3>
				<div class='divider m-0.5' />
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
