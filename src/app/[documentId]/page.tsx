import DocumentScreen from '@/components/screens/DocumentScreen';

export const dynamic = 'force-static';

export default function DocumentViewPage() {
	return <DocumentScreen enableEdit={true} />;
}
