'use client';

import DocumentScreen from '@/components/screens/DocumentScreen';

type DocumentViewPageProps = {
	params: {
		documentId: string;
	};
};

export default function DocumentViewPage({ params: { documentId } }: Readonly<DocumentViewPageProps>) {
	return <DocumentScreen documentId={documentId} enableEdit={true} />;
}
