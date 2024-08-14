import HeaderLabelComponent from '@x-component/HeaderLabel';
import { themeStore } from '@x-util/store';
import { MdClass } from 'react-icons/md';
import { PiGithubLogoFill } from 'react-icons/pi';

export type HeaderProps = {
	lineNumber: number;
	columnNumber: number;
};

export default function ({ lineNumber, columnNumber }: HeaderProps) {
	const { getTheme } = themeStore();

	return (
		<div className='flex min-h-6 pl-2 pr-2' style={{ backgroundColor: getTheme().palette.information }}>
			<HeaderLabelComponent
				label={`Ln ${lineNumber.toString().padStart(2, '0')} Col
            ${columnNumber.toString().padStart(2, '0')}`}
			/>
			<HeaderLabelComponent label={'Lang (TODO)'} />
			<span className='flex-auto' />
			<div className='flex max-sm:hidden'>
				{/* TODO: Expose Backend API route location */}
				<HeaderLabelComponent
					label='Docs'
					icon={<MdClass size='12' />}
					onClick={() => window.open('/api/docs')}
				/>
				<HeaderLabelComponent
					label='GitHub'
					icon={<PiGithubLogoFill size='12' />}
					onClick={() => window.open('https://github.com/jspaste')}
				/>
			</div>
		</div>
	);
}
