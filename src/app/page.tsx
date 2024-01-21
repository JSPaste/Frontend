'use client';

import DocumentScreen from '@/components/screens/DocumentScreen';
import type { ReactElement } from 'react';

export default function DocumentPage(): ReactElement {
	return <DocumentScreen enableEdit={false} />;
}
