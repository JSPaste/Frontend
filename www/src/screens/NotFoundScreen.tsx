import type { RouteSectionProps } from '@solidjs/router';

type NotFoundScreenProps = {
	title?: string;
} & Partial<RouteSectionProps>;

export default function NotFoundScreen(props: NotFoundScreenProps) {
	return (
		<div class='flex justify-center items-center h-lvh'>
			<p>404 — {props.title ?? 'Not found'}</p>
		</div>
	);
}
