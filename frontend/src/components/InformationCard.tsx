import type { JSXElement } from 'solid-js';

type InformationCardProps = {
	disabled?: boolean;
	highlight?: boolean;
	icon?: JSXElement;
	label: string;
	onClick?: () => void;
};

export default function InformationCard(props: InformationCardProps): JSXElement {
	return (
		<div class='flex items-center'>
			{props.icon}
			<span class='text-xs'>{props.label}</span>
		</div>
	);
}
