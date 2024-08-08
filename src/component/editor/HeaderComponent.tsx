import { HeaderLabelComponent } from '@/component/editor/HeaderLabelComponent';
import useThemeValues from '@/hook/useThemeValue';
import { ThemePalette } from '@/utils/themes';
import { Flex, Show } from '@chakra-ui/react';
import { MdClass } from 'react-icons/md';
import { PiGithubLogoFill } from 'react-icons/pi';

export type HeaderProps = {
	lineNumber: number;
	columnNumber: number;
};

export const HeaderComponent = (props: HeaderProps) => {
	const { getThemeValue } = useThemeValues();

	return (
		<Flex className='gap-2 h-6 pl-2 pr-2' bg={getThemeValue(ThemePalette.Information)}>
			<HeaderLabelComponent
				label={`Ln ${props.lineNumber.toString().padStart(2, '0')} Col
            ${props.columnNumber.toString().padStart(2, '0')}`}
			/>
			<HeaderLabelComponent label={'Lang (TODO)'} />
			<div className='flex-auto' />
			<Show breakpoint='(min-width: 500px)'>
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
			</Show>
		</Flex>
	);
};