import { Box, Spinner } from '@chakra-ui/react';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { memo, useCallback, useEffect, useRef } from 'react';
import { EditorInformation } from '@/components/screens/IndexScreen';
import useThemeValues from '@/hooks/useThemeValues';
import useTheme from '@/hooks/useTheme';

export default memo(function Editor({
	setInformation,
	setValue,
	value,
}: Readonly<{
	setInformation: (info: EditorInformation) => void;
	setValue: (value: string) => void;
	value: string;
}>) {
	const monaco = useMonaco();

	const { getThemeValue } = useThemeValues();

	const [themeId, _setTheme, themes] = useTheme();

	const editorRef = useRef<any>(null);

	const isFirstEditRef = useRef<boolean>(true);

	const defaultCode = `// Start writing here! When you're done, hit the save button to generate a unique URL with your content.`;

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

	const setEditorTheme = useCallback(
		async (customMonaco?: any) => {
			const editorMonaco = customMonaco ?? monaco;

			const { monacoTheme, isCustomMonacoTheme } =
				themes.find((t) => t.id == themeId) ?? themes[0];

			if (isCustomMonacoTheme) {
				const themeData = await import(
					`@/themes/monaco/${monacoTheme}.json`
				);

				editorMonaco?.editor.defineTheme(
					monacoTheme,
					themeData.default,
				);
			}

			editorMonaco?.editor.setTheme(monacoTheme);
		},
		[monaco, themeId, themes],
	);

	useEffect(() => {
		const editor = editorRef.current;

		if (editor) {
			updateInformation(editor);
		}
	}, [editorRef, value, updateInformation]);

	useEffect(() => {
		setEditorTheme();
	}, [monaco, setEditorTheme, themeId, themes,]);

	return (
		<Box h="100%" w="100%" bg="editor">
			<MonacoEditor
				theme="vs-dark"
				defaultLanguage="typescript"
				loading={<Spinner size="xl" color={getThemeValue('primary')} />}
				onMount={async (editor, monaco) => {
					await setEditorTheme(monaco);

					editor.setPosition({
						lineNumber: 1,
						column: defaultCode.length + 1,
					});

					editor.focus();

					editorRef.current = editor;

					updateInformation(editor);
				}}
				defaultValue={defaultCode}
				options={{
					padding: { top: 15, bottom: 15 },
				}}
				onChange={(value, ce) => {
					if (isFirstEditRef.current) {
						isFirstEditRef.current = false;

						const changes = ce.changes.map((c) => c.text).join('');

						editorRef.current?.setValue(changes);

						editorRef.current?.setPosition({
							lineNumber: changes.split('\n').length,
							column: 2,
						});
					}

					setValue(value ?? '');
				}}
			/>
		</Box>
	);
});
