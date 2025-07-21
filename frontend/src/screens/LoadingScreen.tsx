import type { JSXElement } from 'solid-js';

export default function LoadingScreen(): JSXElement {
	return (
		<div class='flex justify-center items-center h-lvh'>
			<span class='loading loading-bars loading-xl bg-primary' />
		</div>
	);
}
