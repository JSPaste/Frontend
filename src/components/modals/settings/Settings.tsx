import { themeStore } from '@x-util/store';
import ThemeSection from './ThemeSection';

export default function () {
	const { getTheme } = themeStore();

	return (
		<dialog id='modal_settings' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box flex flex-col' style={{ backgroundColor: getTheme().palette.popup }}>
				<h3 className='font-bold text-lg'>SETTINGS</h3>
				<div className='divider m-0.5' />
				<ThemeSection />
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button type='submit' className='cursor-default' />
			</form>
		</dialog>
	);
}
