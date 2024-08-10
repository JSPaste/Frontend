import type { HeaderProps } from '@/component/editor/HeaderComponent';
import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useCallback, useRef } from 'react';

type EditorProps = {
	setCursorLocation: (info: HeaderProps) => void;
	setValue: (value: string) => void;
	value: string;
	documentName?: string;
	isEditing: boolean;
	enableEdit: boolean;
};

export default function (props: EditorProps) {
	const editorRef = useRef<ReactCodeMirrorRef>(null);

	const updateCursorInformation = useCallback(() => {
		const editor = editorRef.current;

		if (editor?.view) {
			const { from } = editor.view.state.selection.main;
			const cursorPosition = editor.view.state.doc.lineAt(from);

			props.setCursorLocation({
				lineNumber: cursorPosition.number,
				columnNumber: from - cursorPosition.from + 1
			});
		}
	}, [props]);

	const onChange = useCallback(
		(value: string) => {
			updateCursorInformation();
			props.setValue(value);
		},
		[props, updateCursorInformation]
	);

	return (
		<ReactCodeMirror
			ref={editorRef}
			onChange={onChange}
			height='100%'
			className='flex-grow overflow-auto'
			theme='dark'
			placeholder="Start writing here! When you're done, hit the save button to generate a unique URL with your content."
			value={props.value}
			readOnly={props.enableEdit && !props.isEditing}
			autoFocus={true}
			basicSetup={{
				lineNumbers: true,
				highlightActiveLine: true,
				autocompletion: true,
				syntaxHighlighting: true
			}}
		/>
	);
}
