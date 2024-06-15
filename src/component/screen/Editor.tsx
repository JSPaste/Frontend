import Header from '@/component/editor/Header.tsx';

type EditorProps = {
	enableEdit?: boolean;
};

const Editor = ({ enableEdit = false }: EditorProps) => (
	<>
		<header>
			<Header />
		</header>
		<h1>Hi, I'm {enableEdit ? 'hot' : 'not hot'}</h1>
	</>
);

export default Editor;
