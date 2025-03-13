import { IconCaretDownFilled } from '@tabler/icons-solidjs';
import { clsx } from 'clsx/lite';
import { For, type JSX } from 'solid-js';

type DropdownProps = {
	disabled?: boolean;
	dropdownId: string;
	label: string;
	labelValue: string;
	listPosition?:
		| 'dropdown-bottom'
		| 'dropdown-center'
		| 'dropdown-end'
		| 'dropdown-left'
		| 'dropdown-right'
		| 'dropdown-start'
		| 'dropdown-top';
	listValues: string[];
	onClick?: JSX.EventHandlerUnion<HTMLLIElement, MouseEvent, JSX.EventHandler<HTMLLIElement, MouseEvent>>;
};

export default function Dropdown(props: DropdownProps) {
	return (
		<>
			<button
				disabled={props.disabled}
				type='button'
				name={props.dropdownId}
				// FIXME: cursor-not-allowed not working
				class={clsx('btn', props.disabled && 'cursor-not-allowed')}
				style={`anchor-name:--${props.dropdownId}-dropdown-list-anchor`}
				popovertarget={`${props.dropdownId}-dropdown-list`}
			>
				{props.label}
				<span class='grow' />
				{props.labelValue}
				<IconCaretDownFilled class='size-4' />
			</button>
			<ul
				popover
				id={`${props.dropdownId}-dropdown-list`}
				class={clsx(
					'dropdown',
					props.listPosition && props.listPosition,
					'menu bg-base-200 w-52 max-h-54 rounded-box shadow-sm'
				)}
				style={`position-anchor:--${props.dropdownId}-dropdown-list-anchor`}
			>
				<For each={props.listValues}>
					{(val) => (
						<li onClick={props.onClick}>
							{/* biome-ignore lint/a11y/useValidAnchor: needed for style */}
							<a>{val}</a>
						</li>
					)}
				</For>
			</ul>
		</>
	);
}
