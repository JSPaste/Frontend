import useThemeValues from '@/hook/useThemeValue';
import { ThemePalette } from '@/utils/themes';
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
export const FooterButtonComponent = (props: ActionButtonProps) => {
	const { getThemeValue } = useThemeValues();

	return (
		<Tooltip
			label={!props.isDisabled ? props.label : `${props.label} (Disabled)`}
			bg={getThemeValue(ThemePalette.Tooltip)}
			color={getThemeValue(ThemePalette.Text)}
			placement='top'
			gutter={5}
			hasArrow
		>
			<IconButton
				size='sm'
				aria-label={props.label}
				color={getThemeValue(ThemePalette.Primary)}
				icon={props.icon}
				onClick={props.onClick}
				isDisabled={props.isDisabled ?? false}
				isLoading={props.isLoading ?? false}
			/>
		</Tooltip>
	);
};
