import DocumentScreen from '@/components/screens/DocumentScreen';

export function generateStaticParams() {
	return [{ documentId: 'document' }];
}

export default function DocumentViewPage() {
	return <DocumentScreen enableEdit={true} />;
}
