import { themeStore } from '@/utils/store';
import { Flex, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

type HeaderLabelProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => WindowProxy | null;
};

export default function (props: HeaderLabelProps) {
	const { getThemePalette } = themeStore();

	return (
		<Flex
			className='items-center gap-1 pl-2 pr-2'
			fontSize='12px'
			_hover={
				props.onClick && {
					background: getThemePalette().highTransparency,
					cursor: 'pointer'
				}
			}
			onClick={props.onClick}
		>
			{props.icon}
			<Text color={getThemePalette().textMuted}>{props.label}</Text>
		</Flex>
	);
}
