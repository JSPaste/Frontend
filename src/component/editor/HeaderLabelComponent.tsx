import type { ReactElement } from 'react';

export type HeaderLabelProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => WindowProxy | null;
};

export const HeaderLabelComponent = (props: HeaderLabelProps) => (
	<div
		className={`items-center flex gap-1 text-white ${props.onClick ? 'hover:bg-neutral-700 cursor-pointer' : ''}`}
		style={{ fontSize: '12px', padding: '0 5px' }}
		onClick={props.onClick}
	>
		{props.icon}
		{props.label}
	</div>
);
