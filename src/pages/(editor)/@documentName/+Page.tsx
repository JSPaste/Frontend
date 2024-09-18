import { EditorScreen } from '@x-component/screens/Editor';
import type { Data } from '@x-page/(editor)/@documentName/+data';
import { useData } from 'vike-solid/useData';

// https://github.com/vikejs/vike/issues/1476
export default function () {
	const data = useData<Data>();

	return <EditorScreen documentName={data.documentName} enableEdit />;
}
