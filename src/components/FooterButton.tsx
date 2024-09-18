import GenericFallback from '@x-component/screens/GenericFallback';
import type { JSXElement } from 'solid-js';

type FooterButtonProps = {
	icon?: JSXElement;
	isDisabled?: boolean;
	isLoading?: boolean;
	label: string;
	onClick?: () => void;
};

export default function FooterButton(props: FooterButtonProps) {
	return (
		<div class='lg:tooltip tooltip-top' data-tip={!props.isDisabled ? props.label : `${props.label} (Disabled)`}>
			<button
				type='button'
				aria-label={props.label}
				class='btn btn-square btn-sm bg-base-100'
				onClick={props.onClick}
				disabled={props.isDisabled ?? false}
			>
				{props.isLoading ? <GenericFallback /> : props.icon}
			</button>
		</div>
	);
}
