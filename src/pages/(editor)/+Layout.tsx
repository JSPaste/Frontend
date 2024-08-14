import type { ReactNode } from 'react';

export default function ({ children }: { children: ReactNode }) {
	return <body>{children}</body>;
}
