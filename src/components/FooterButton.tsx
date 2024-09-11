import GenericFallback from '@x-component/screens/GenericFallback';
import type { JSXElement } from 'solid-js';

type ActionButtonProps = {
	label: string;
	icon?: JSXElement;
	onClick?: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
};

export default function FooterButton({ label, icon, onClick, isDisabled, isLoading }: ActionButtonProps) {
	return (
		<div class='lg:tooltip tooltip-top' data-tip={!isDisabled ? label : `${label} (Disabled)`}>
			<button
				type='button'
				aria-label={label}
				class='btn btn-square btn-sm bg-base-100'
				onClick={onClick}
				disabled={isDisabled ?? false}
			>
				{isLoading ? <GenericFallback /> : icon}
			</button>
		</div>
	);
}
