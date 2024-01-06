import { Box, Spinner } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import jspasteTheme from '../../themes/jspasteTheme.json';
import { EditorInformation } from '../screens/IndexScreen';

export default function Editor({
	setInformation,
}: Readonly<{
	setInformation: (info: EditorInformation) => void;
}>) {
	const defaultCode = `// Start writing code here!

`;

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

					console.log(editor);
				}}
				defaultValue={defaultCode}
				options={{
					padding: { top: 15, bottom: 15 },
				}}
			/>
		</Box>
	);
}
