import type { EditorProps } from '@/types/Components.ts';
import { Box } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useRef } from 'react';
import './Editor.css';

const Editor = ({ setInformation, value, setValue, isEditing, enableEdit }: EditorProps) => {
	const editorRef = useRef<any>(null);

	const updateInformation = useCallback(
		(editor: any) => {
			const pos = editor.getPosition();

			setInformation({
				lineNumber: pos.lineNumber,
				columnNumber: pos.column
			});
		},
		[setInformation]
	);

	useEffect(() => {
		const editor = editorRef.current;

		if (editor) updateInformation(editor);
	}, [updateInformation]);

	return (
		<Box h='100%' w='100%' bg='editor'>
			<CodeMirror
				placeholder="// Start writing here! When you're done, hit the save button to generate a unique URL with your content."
				value={value}
				height='100%'
				maxWidth='100%'
				readOnly={enableEdit && !isEditing}
				autoFocus
				basicSetup={{
					lineNumbers: true,
					highlightActiveLine: true,
					autocompletion: true,
					syntaxHighlighting: true
				}}
				onChange={(value) => {
					setValue(value);
				}}
				theme='dark'
				style={{
					height: '100%'
				}}
			/>
		</Box>
	);
};

export default Editor;
