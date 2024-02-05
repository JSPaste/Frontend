'use client';

import DocumentScreen from '@/components/screens/DocumentScreen';
import type { ReactElement } from 'react';

interface DocumentViewPageProps {
	params: {
		documentId: string;
	};
}

export default function DocumentViewPage({ params: { documentId } }: Readonly<DocumentViewPageProps>): ReactElement {
	return <DocumentScreen documentId={documentId} enableEdit={true} />;
}
