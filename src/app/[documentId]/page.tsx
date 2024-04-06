'use client';

import DocumentScreen from '@/components/screens/DocumentScreen';
import type { ReactElement } from 'react';

type DocumentViewPageProps = {
	params: {
		documentId: string;
	};
};

export default function DocumentViewPage({ params: { documentId } }: Readonly<DocumentViewPageProps>): ReactElement {
	return <DocumentScreen documentId={documentId} enableEdit={true} />;
}
