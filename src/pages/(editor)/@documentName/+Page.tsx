import EditorScreen from '@x-component/screens/Editor';
import type { Data } from '@x-page/(editor)/@documentName/+data.ts';
import { useData } from 'vike-react/useData';

export default function () {
	const data = useData<Data>();

	return <EditorScreen documentName={data.documentName} enableEdit />;
}
