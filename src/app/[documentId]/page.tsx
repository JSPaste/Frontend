'use client';

import DocumentScreen from '@/components/screens/DocumentScreen';

export default function DocumentViewPage({
	params: { documentId }
}: Readonly<{ params: { documentId: string } }>) {
	return <DocumentScreen documentId={documentId} enableEdit={true} />;
}
