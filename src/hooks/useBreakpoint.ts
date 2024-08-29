import { useEffect, useState } from 'react';

export const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

	useEffect(() => {
		const handleResize = () => {
			setBreakpoint(getBreakpoint(window.innerWidth));
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return breakpoint;
};

export const getBreakpoint = (width: number) => {
	if (width < 480) return 'sm';
	if (width < 768) return 'md';
	if (width < 1024) return 'lg';
	return 'xl';
};
