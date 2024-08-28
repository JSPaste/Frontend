import GenericLoad from '@x-component/screens/GenericFallback.tsx';
import { themeStore } from '@x-util/store';
import type { ReactElement } from 'react';

type ActionButtonProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
};

export default function ({ label, icon, onClick, isDisabled, isLoading }: ActionButtonProps) {
	const { getTheme } = themeStore();

	return (
		<div
			className='lg:tooltip tooltip-top'
			style={{ backgroundColor: getTheme().palette.tooltip }}
			data-tip={!isDisabled ? label : `${label} (Disabled)`}
		>
			<button
				type='button'
				aria-label={label}
				className='btn btn-sm h-8 min-h-8 w-8 min-w-8'
				style={
					isDisabled
						? {
								backgroundColor: getTheme().palette.lowTransparency,
								color: getTheme().palette.textMuted
							}
						: { backgroundColor: getTheme().palette.highTransparency }
				}
				onClick={onClick}
				disabled={isDisabled ?? false}
			>
				<span style={{ color: isDisabled ? getTheme().palette.highTransparency : getTheme().palette.primary }}>
					{isLoading ? <GenericLoad /> : icon}
				</span>
			</button>
		</div>
	);
}
