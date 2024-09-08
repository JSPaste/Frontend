import type { ReactElement } from 'react';

type HeaderLabelProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => void;
};

export default function ({ label, icon, onClick }: HeaderLabelProps) {
	return (
		<div
			className={`flex items-center gap-1 pl-2 pr-2 ${onClick && 'hover:bg-base-100 hover:cursor-pointer'}`}
			style={{
				fontSize: '12px'
			}}
			onClick={onClick}
		>
			{icon}
			<p>{label}</p>
		</div>
	);
}
