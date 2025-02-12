import type { JSXElement } from 'solid-js';

type FooterButtonProps = {
	icon?: JSXElement;
	isDisabled?: boolean;
	label: string;
	onClick?: () => void;
};

export default function FooterButton(props: FooterButtonProps) {
	return (
		<div class='sm:tooltip tooltip-top' data-tip={props.isDisabled ? `${props.label} (Disabled)` : props.label}>
			<button
				disabled={props.isDisabled}
				type='button'
				aria-label={props.label}
				class='btn btn-square btn-sm'
				onClick={props.onClick}
			>
				{props.icon}
			</button>
		</div>
	);
}
