import { HeaderLabelComponent } from '@/component/editor/HeaderLabelComponent';
import { Show } from '@chakra-ui/media-query';
import { MdClass } from 'react-icons/md';
import { PiGithubLogoFill } from 'react-icons/pi';

export type HeaderProps = {
	lineNumber: number;
	columnNumber: number;
};

export const HeaderComponent = (props: HeaderProps) => (
	<div className='flex bg-neutral-800 gap-3' style={{ height: '22px', padding: '0 10px' }}>
		<HeaderLabelComponent
			label={`Ln ${props.lineNumber.toString().padStart(2, '0')} Col
            ${props.columnNumber.toString().padStart(2, '0')}`}
		/>
		<HeaderLabelComponent label={'Lang (TODO)'} />
		<div className='flex-auto' />
		<Show breakpoint='(min-width: 500px)'>
			{/* TODO: Expose Backend API route location */}
			<HeaderLabelComponent label='Docs' icon={<MdClass size='12' />} onClick={() => window.open('/api/docs')} />
			<HeaderLabelComponent
				label='GitHub'
				icon={<PiGithubLogoFill size='12' />}
				onClick={() => window.open('https://github.com/jspaste')}
			/>
		</Show>
	</div>
);
