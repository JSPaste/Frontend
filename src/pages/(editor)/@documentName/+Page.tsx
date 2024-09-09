import EditorScreen from '@x-component/screens/Editor';
import type { Data } from '@x-page/(editor)/@documentName/+data.ts';
import { useData } from 'vike-react/useData';

// https://github.com/vikejs/vike/issues/1476
export default function () {
	const data = useData<Data>();

	return <EditorScreen documentName={data.documentName} enableEdit />;
}
