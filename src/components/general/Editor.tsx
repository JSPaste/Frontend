import useLanguage from '@/hooks/useLanguage';
import useTheme from '@/hooks/useTheme';
import useThemeValues from '@/hooks/useThemeValues';
import useLanguageStore from '@/store/language';
import amoledTheme from '@/themes/monaco/amoled.json';
import defaultTheme from '@/themes/monaco/default.json';
import midnightTheme from '@/themes/monaco/midnight.json';
import type { EditorProps } from '@/types/Components.ts';
import type { Theme } from '@/types/Theme.ts';
import { Box, Spinner, useBreakpointValue } from '@chakra-ui/react';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import hljs from 'highlight.js/lib/common';
import { useCallback, useEffect, useRef } from 'react';

export const welcomeCode =
	"// Start writing here! When you're done, hit the save button to generate a unique URL with your content.";

const Editor = ({ setInformation, setValue, documentId, isEditing, enableEdit }: EditorProps) => {
	const monaco = useMonaco();

	const { getThemeValue } = useThemeValues();
	const [themeId, _setTheme, themes] = useTheme();

	const { setAutoLanguageId } = useLanguageStore();
	const [languageId, languages, autoLanguageId] = useLanguage();

	const editorRef = useRef<any>(null);
	const isFirstEditRef = useRef<boolean>(true);
	const lastLangTimestampRef = useRef<number>(0);

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
		},
		[setInformation]
	);

	const setEditorTheme = useCallback(
		async (customMonaco?: any) => {
			const editorMonaco = customMonaco ?? monaco;

			const { monacoTheme, isCustomMonacoTheme } = themes.find((t) => t.id === themeId) ?? (themes[0] as Theme);

			// FIXME
			if (isCustomMonacoTheme) {
				if (monacoTheme === 'default') editorMonaco?.editor.defineTheme(monacoTheme, defaultTheme);
				if (monacoTheme === 'amoled') editorMonaco?.editor.defineTheme(monacoTheme, amoledTheme);
				if (monacoTheme === 'midnight') editorMonaco?.editor.defineTheme(monacoTheme, midnightTheme);
			}

			editorMonaco?.editor.setTheme(monacoTheme);
		},
		[monaco, themeId, themes]
	);

	useEffect(() => {
		const editor = editorRef.current;

		if (editor) updateInformation(editor);
	}, [updateInformation]);

	useEffect(() => {
		setEditorTheme();
	}, [setEditorTheme]);

	return (
		<Box h='100%' w='100%' bg='editor'>
			<MonacoEditor
				theme='default'
				language={languageId ?? autoLanguageId ?? 'typescript'}
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
					if (isFirstEditRef.current) {
						if (!enableEdit) {
							isFirstEditRef.current = false;
							const changes = ce.changes.map((c) => c.text).join('');

							editorRef.current?.setValue(changes);

							const changesSlice = changes.split('\n');

							editorRef.current?.setPosition({
								lineNumber: changesSlice.length,
								column: (changesSlice.at(-1)?.length ?? 1) + 1
							});
						}
					} else if (value?.length ?? 0 > 15) {
						if (!lastLangTimestampRef?.current || lastLangTimestampRef.current + 2_000 < Date.now()) {
							lastLangTimestampRef.current = Date.now();

							const { language: identifiedLanguage } = hljs.highlightAuto(value ?? '');

							const lang = languages.find(
								(l) =>
									l.id === identifiedLanguage ||
									l.name.toLowerCase() === identifiedLanguage ||
									l.extension === identifiedLanguage
							);

							if (lang) setAutoLanguageId(lang.id);
						}
					}

					setValue(value ?? '');
				}}
			/>
		</Box>
	);
};

export default Editor;
