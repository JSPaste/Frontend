import type { HeaderProps } from '@component/HeaderComponent';
import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { memo, useCallback, useRef } from 'react';

type EditorProps = {
	setCursorLocation: (info: HeaderProps) => void;
	setValue: (value: string) => void;
	value: string;
	documentId?: string;
	isEditing: boolean;
	enableEdit: boolean;
};

export const EditorComponent = memo((props: EditorProps) => {
	const editorRef = useRef<ReactCodeMirrorRef>(null);

	const updateCursorLocation = useCallback(() => {
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
			props.setValue(value);
		},
		[props]
	);

	// FIXME: "onUpdate" could be heavy on performance
	return (
		<ReactCodeMirror
			ref={editorRef}
			onChange={onChange}
			onUpdate={updateCursorLocation}
			height='100%'
			className='overflow-auto'
			style={{ flex: '1 0' }}
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
});
