import Header from '@/component/editor/Header.tsx';
import '@/default.theme.css';

type EditorProps = {
	enableEdit?: boolean;
};

export default function Editor({ enableEdit = false }: EditorProps) {
	return (
		<>
			<header>
				<Header />
			</header>
			<h1>Hi, I'm {enableEdit ? 'hot' : 'not hot'}</h1>
		</>
	);
}
