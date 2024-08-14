import { Text } from '@chakra-ui/react';
import { themeStore } from '@x-util/store';
import type { ReactElement } from 'react';

type HeaderLabelProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => WindowProxy | null;
};

export default function (props: HeaderLabelProps) {
	const { getTheme } = themeStore();

	return (
		<div
			className='flex items-center gap-1 pl-2 pr-2'
			style={{
				fontSize: '12px'
			}}
			onMouseEnter={(e) => {
				if (!props.onClick) return;

				e.currentTarget.style.background = getTheme().palette.highTransparency;
				e.currentTarget.style.cursor = 'pointer';
			}}
			onMouseLeave={(e) => {
				if (!props.onClick) return;

				e.currentTarget.style.background = '';
				e.currentTarget.style.cursor = '';
			}}
			onClick={props.onClick}
		>
			{props.icon}
			<Text color={getTheme().palette.textMuted}>{props.label}</Text>
		</div>
	);
}
