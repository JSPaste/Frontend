import Information from '@/component/editor/Information.tsx';
import '@/app/default.theme.css';

type EditorProps = {
	enableEdit?: boolean;
};

export default function Editor({ enableEdit = false }: EditorProps) {
	return (
		<>
			<header>
				<Information />
			</header>
			<h1>Hi, I'm {enableEdit ? 'hot' : 'not hot'}</h1>
		</>
	);
}
