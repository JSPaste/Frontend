import GenericFallback from '@x-component/screens/GenericFallback';
import type { JSXElement } from 'solid-js';

type FooterButtonProps = {
	icon?: JSXElement;
	isDisabled?: boolean;
	isLoading?: boolean;
	label: string;
	onClick?: () => void;
};

export default function FooterButton({ icon, isDisabled, isLoading, label, onClick }: FooterButtonProps) {
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
