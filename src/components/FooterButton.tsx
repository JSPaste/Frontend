import GenericLoad from '@x-component/screens/GenericFallback.tsx';
import type { ReactElement } from 'react';

type ActionButtonProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
};

export default function ({ label, icon, onClick, isDisabled, isLoading }: ActionButtonProps) {
	return (
		<div className='lg:tooltip tooltip-top' data-tip={!isDisabled ? label : `${label} (Disabled)`}>
			<button
				type='button'
				aria-label={label}
				className='btn btn-sm h-8 min-h-8 w-8 min-w-8 bg-base-100'
				onClick={onClick}
				disabled={isDisabled ?? false}
			>
				<span>{isLoading ? <GenericLoad /> : icon}</span>
			</button>
		</div>
	);
}
