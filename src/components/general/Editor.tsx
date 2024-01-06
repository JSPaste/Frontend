import { Box, Spinner } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import jspasteTheme from '@/themes/jspasteTheme.json';
import { EditorInformation } from '@/components/screens/IndexScreen';
import { memo, useCallback, useEffect, useRef } from 'react';

export default memo(function Editor({
	setInformation,
	setValue,
	value,
}: Readonly<{
	setInformation: (info: EditorInformation) => void;
	setValue: (value: string) => void;
	value: string;
}>) {
	const editorRef = useRef<any>(null);

	const defaultCode = `// Start writing here! When you're done, hit the save button to generate a unique URL with your content.

`;

	const updateInformation = useCallback(
		(editor: any) => {
			const pos = editor.getPosition();

			setInformation({
				lineNumber: pos.lineNumber,
				columnNumber: pos.column,
				languageString: 'Typescript',
			});
		},
		[setInformation],
	);

	useEffect(() => {
		const editor = editorRef.current;

		if (editor) {
			updateInformation(editor);
		}
	}, [editorRef, value, updateInformation]);

	return (
		<Box h="100%" w="100%" bg="editor">
			<MonacoEditor
				theme="vs-dark"
				defaultLanguage="typescript"
				loading={<Spinner size="xl" color="primary" />}
				onMount={(editor, monaco) => {
					monaco.editor.defineTheme('jspaste', jspasteTheme as any);

					monaco.editor.setTheme('jspaste');

					editor.setPosition({ lineNumber: 3, column: 0 });

					editor.focus();

					editorRef.current = editor;

					updateInformation(editor);
				}}
				defaultValue={defaultCode}
				options={{
					padding: { top: 15, bottom: 15 },
				}}
				onChange={(value) => setValue(value ?? '')}
			/>
		</Box>
	);
});
