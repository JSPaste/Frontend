import { themeStore } from '@x-util/store';

export default function () {
	const { getTheme } = themeStore();

	return (
		<div
			className='flex justify-center items-center h-lvh'
			style={{
				backgroundColor: getTheme().palette.editor
			}}
		>
			<span
				className='loading loading-bars loading-lg'
				style={{ backgroundColor: getTheme().palette.primaryDisplay }}
			/>
		</div>
	);
}
