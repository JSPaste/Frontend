import useTheme from '@/hooks/useTheme';
import useLanguage from '@/hooks/useLanguage';
import type { Theme } from '@/themes/ui/themes';
import useThemeValues from '@/hooks/useThemeValues';
import { useCallback, useEffect, useRef } from 'react';
import { type EditorInformation } from './Information';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { Box, Spinner, useBreakpointValue } from '@chakra-ui/react';
import hljs from 'highlight.js/lib/common';
import { welcomeCode } from '@/constants/config';

export default function Editor({
	setInformation,
	setValue,
	value,
	documentId,
	isEditing,
	enableEdit
}: Readonly<{
	setInformation: (info: EditorInformation) => void;
	setValue: (value: string) => void;
	value: string;
	documentId?: string;
	isEditing: boolean;
	enableEdit: boolean;
}>) {
	const monaco = useMonaco();

	const { getThemeValue } = useThemeValues();

	const [themeId, _setTheme, themes] = useTheme();

	const [languageId] = useLanguage();

	const editorRef = useRef<any>(null);

	const isFirstEditRef = useRef<boolean>(true);

	const { minimap } = useBreakpointValue({
		base: { minimap: false },
		sm: { minimap: false },
		md: { minimap: true }
	}) ?? { minimap: true };

	const defaultCode = documentId ? 'blablabla' : welcomeCode;

	const updateInformation = useCallback(
		(editor: any) => {
			const pos = editor.getPosition();

			setInformation({
				lineNumber: pos.lineNumber,
				columnNumber: pos.column
			});

			if (value.length > 20) {
				console.log('h', value);
				const { language: identifiedLanguage } = hljs.highlightAuto(value);

				console.log(identifiedLanguage, value.length);
			}
		},
		[setInformation, value]
	);

	const setEditorTheme = useCallback(
		async (customMonaco?: any) => {
			const editorMonaco = customMonaco ?? monaco;

			const { monacoTheme, isCustomMonacoTheme } =
				themes.find((t) => t.id == themeId) ?? (themes[0] as Theme);

			if (isCustomMonacoTheme) {
				const themeData = await import(`@/themes/monaco/${monacoTheme}.json`);

				editorMonaco?.editor.defineTheme(monacoTheme, themeData.default);
			}

			editorMonaco?.editor.setTheme(monacoTheme);
		},
		[monaco, themeId, themes]
	);

	useEffect(() => {
		const editor = editorRef.current;

		if (editor) updateInformation(editor);
	}, [editorRef, value, updateInformation]);

	useEffect(() => {
		setEditorTheme();
	}, [monaco, setEditorTheme, themeId, themes]);

	return (
		<Box h='100%' w='100%' bg='editor'>
			<MonacoEditor
				theme='jspaste'
				language={languageId ?? 'typescript'}
				defaultLanguage={languageId ?? 'typescript'}
				loading={<Spinner size='xl' color={getThemeValue('primary')} />}
				onMount={async (editor, monaco) => {
					await setEditorTheme(monaco);

					editor.setPosition({
						lineNumber: 1,
						column: defaultCode.length + 1
					});

					editor.focus();

					editorRef.current = editor;

					updateInformation(editor);
				}}
				defaultValue={defaultCode}
				options={{
					padding: { top: 15, bottom: 15 },
					codeLens: true,
					colorDecorators: true,
					contextmenu: true,
					minimap: {
						enabled: minimap
					},
					readOnly: enableEdit && !isEditing,
					cursorBlinking: 'smooth'
				}}
				onChange={(value, ce) => {
					if (isFirstEditRef.current && !enableEdit) {
						isFirstEditRef.current = false;

						const changes = ce.changes.map((c) => c.text).join('');

						editorRef.current?.setValue(changes);

						const changesSlice = changes.split('\n');

						editorRef.current?.setPosition({
							lineNumber: changesSlice.length,
							column: (changesSlice.at(-1)?.length ?? 1) + 1
						});
					}

					setValue(value ?? '');
				}}
			/>
		</Box>
	);
}
