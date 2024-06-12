type EditorProps = {
	enableEdit?: boolean;
};

export default function Editor({ enableEdit = false }: EditorProps) {
	return <h1>Hi, I'm {enableEdit ? 'hot' : 'not hot'}</h1>;
}
