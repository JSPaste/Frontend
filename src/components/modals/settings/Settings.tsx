import LanguageSection from '@x-component/modals/settings/LanguageSection.tsx';
import ThemeSection from '@x-component/modals/settings/ThemeSection';

export default function () {
	return (
		<dialog id='modal_settings' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box flex flex-col bg-base-200'>
				<h3 className='font-bold text-lg'>SETTINGS</h3>
				<div className='divider m-0.5' />
				<div className='flex flex-col gap-4'>
					<ThemeSection />
					<LanguageSection />
				</div>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button type='submit' className='cursor-default' />
			</form>
		</dialog>
	);
}
