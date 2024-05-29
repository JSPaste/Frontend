import type { EditorProps } from '@/types/Components.ts';
import { Box } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useRef } from 'react';

export const welcomeCode =
	"// Start writing here! When you're done, hit the save button to generate a unique URL with your content.";

const Editor = ({ setInformation, value, setValue, documentId, isEditing, enableEdit }: EditorProps) => {
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
				value={value}
				height='100%'
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
