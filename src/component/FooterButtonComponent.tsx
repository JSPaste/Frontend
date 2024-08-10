import { themeStore } from '@/utils/store';
import { IconButton, Tooltip } from '@chakra-ui/react';
import type { ReactElement } from 'react';

type ActionButtonProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
};

// TODO: Dirty port from stable
export default function (props: ActionButtonProps) {
	const { getThemePalette } = themeStore();

	return (
		<Tooltip
			label={!props.isDisabled ? props.label : `${props.label} (Disabled)`}
			bg={getThemePalette().tooltip}
			color={getThemePalette().text}
			placement='top'
			gutter={5}
			hasArrow
		>
			<IconButton
				size='sm'
				aria-label={props.label}
				color={getThemePalette().primary}
				icon={props.icon}
				onClick={props.onClick}
				isDisabled={props.isDisabled ?? false}
				isLoading={props.isLoading ?? false}
			/>
		</Tooltip>
	);
}
