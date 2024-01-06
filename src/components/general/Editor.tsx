import { Box, Fade, Spinner } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import jspasteTheme from '../../themes/jspasteTheme.json';

export default function Editor() {
	return (
		<Box h="100%" w="100%" bg="editor">
			<MonacoEditor
				theme="vs-dark"
				defaultLanguage="typescript"
				loading={<Spinner size="xl" color="primary" />}
				onMount={(editor, monaco) => {
					monaco.editor.defineTheme('jspaste', jspasteTheme as any);

					monaco.editor.setTheme('jspaste');
				}}
				defaultValue={`
// Start writing code here!

`}
			/>
		</Box>
	);
}
