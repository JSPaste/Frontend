import { EditorScreen } from '@/screen/EditorScreen';

type PageProps = {
	params: {
		documentName: string;
	};
};

export default function (props: PageProps) {
	return <EditorScreen documentName={props.params.documentName} enableEdit />;
}
