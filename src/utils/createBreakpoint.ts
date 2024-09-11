import { createEffect, createSignal, onCleanup } from 'solid-js';

export const createBreakpoint = () => {
	const [breakpoint, setBreakpoint] = createSignal(getBreakpoint(window.innerWidth));

	createEffect(() => {
		const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));

		window.addEventListener('resize', handleResize);
		onCleanup(() => window.removeEventListener('resize', handleResize));
	});

	return breakpoint;
};

export const getBreakpoint = (width: number) => {
	if (width < 640) return 'sm';
	if (width < 768) return 'md';
	if (width < 1024) return 'lg';
	if (width < 1280) return 'xl';
	if (width < 1536) return '2xl';
	return 'xl';
};
