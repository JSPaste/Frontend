import { useEffect, useMemo, useState } from 'react';

export const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

	useEffect(() => {
		const handleResize = () => {
			setBreakpoint(getBreakpoint(window.innerWidth));
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return useMemo(() => breakpoint, [breakpoint]);
};

export const getBreakpoint = (width: number) => {
	if (width < 640) return 'sm';
	if (width < 768) return 'md';
	if (width < 1024) return 'lg';
	if (width < 1280) return 'xl';
	if (width < 1536) return '2xl';
	return 'xl';
};
