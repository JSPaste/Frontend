import { Box, Spinner } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import jspasteTheme from '../../themes/jspasteTheme.json';

export default function Editor() {
	const defaultCode = `
// Start writing code here!

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

					editor.setPosition({ lineNumber: 4, column: 0 });

					editor.focus();
				}}
				defaultValue={defaultCode}
			/>
		</Box>
	);
}
