import type { JSXElement } from 'solid-js';

type HeaderLabelProps = {
	label: string;
	icon?: JSXElement;
	onClick?: () => void;
};

export default function HeaderLabel({ label, icon, onClick }: HeaderLabelProps) {
	return (
		<div
			class={`flex items-center gap-1 pl-2 pr-2 ${onClick && 'hover:bg-base-100 hover:cursor-pointer'}`}
			style={{
				'font-size': '12px'
			}}
			onClick={onClick}
		>
			{icon}
			<p>{label}</p>
		</div>
	);
}
