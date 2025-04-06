import type { JSXElement } from 'solid-js';

type NavbarButtonProps = {
	disabled?: boolean;
	highlight?: boolean;
	icon?: JSXElement;
	label: string;
	onClick?: () => void;
};

export default function NavbarButton(props: NavbarButtonProps) {
	return (
		<div class='flex flex-col items-center cursor-pointer w-16' onClick={props.onClick} aria-label={props.label}>
			<button
				disabled={props.disabled}
				type='button'
				class='btn btn-sm'
				classList={{ 'btn-soft btn-primary': props.highlight, 'btn-ghost': !props.highlight }}
			>
				{props.icon}
			</button>
			<span class='text-xs text-center mt-2 truncate w-full'>{props.label}</span>
		</div>
	);
}
