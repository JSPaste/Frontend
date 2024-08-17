import type { Data } from '@x-page/(editor)/@documentName/+data.ts';
import { useData } from 'vike-react/useData';
import { redirect } from 'vike/abort';

export default function () {
	const data = useData<Data>();

	// TODO: Expose Backend API route location
	throw redirect(`/api/document/${data.documentName}/raw`);
}
