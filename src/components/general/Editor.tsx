import { Box } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import jspasteTheme from '../../themes/jspasteTheme.json';

export default function Editor() {
	return (
		<Box h="100%" w="100%" bg="#2E2E2E">
			<MonacoEditor
				theme="vs-dark"
				defaultLanguage="typescript"
				loading="Loading JSPaste editor..."
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
