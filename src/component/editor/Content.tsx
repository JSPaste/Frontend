'use client';

import type { HeaderProps } from '@/component/editor/Header.tsx';
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

const Content = (props: EditorProps) => {
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
	}, [props.setCursorLocation]);

	const onChange = useCallback(
		(value: string) => {
			props.setValue(value);
		},
		[props.setValue]
	);

	// FIXME: "onUpdate" could be heavy on performance
	return (
		<ReactCodeMirror
			ref={editorRef}
			onChange={onChange}
			onUpdate={updateCursorLocation}
			id='editor-content'
			height='100%'
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
};

export default memo(Content);
