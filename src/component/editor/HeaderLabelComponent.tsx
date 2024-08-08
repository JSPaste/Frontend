import useThemeValues from '@/hook/useThemeValue';
import { ThemePalette } from '@/utils/themes';
import { Flex, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

type HeaderLabelProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => WindowProxy | null;
};

export const HeaderLabelComponent = (props: HeaderLabelProps) => {
	const { getThemeValue } = useThemeValues();

	return (
		<Flex
			className='items-center gap-1 pl-2 pr-2'
			fontSize='12px'
			_hover={
				props.onClick && {
					background: getThemeValue(ThemePalette.HighTransparency),
					cursor: 'pointer'
				}
			}
			onClick={props.onClick}
		>
			{props.icon}
			<Text color={getThemeValue(ThemePalette.TextMuted)}>{props.label}</Text>
		</Flex>
	);
};
