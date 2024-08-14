import { tags as t } from '@lezer/highlight';
import { hyperLink } from '@uiw/codemirror-extensions-hyper-link';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import createTheme from '@uiw/codemirror-themes';
import ReactCodeMirror, { type Extension, type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import type { HeaderProps } from '@x-component/Header';
import { languageStore, themeStore } from '@x-util/store';
import { ThemeId } from '@x-util/themes.ts';
import { useCallback, useRef } from 'react';

type EditorProps = {
	setCursorLocation: (info: HeaderProps) => void;
	setValue: (value: string) => void;
	value: string;
	documentName?: string;
	isEditing: boolean;
	enableEdit: boolean;
};

export default function ({ setCursorLocation, setValue, value, isEditing, enableEdit }: EditorProps) {
	const editorRef = useRef<ReactCodeMirrorRef>(null);

	const updateCursorInformation = useCallback(() => {
		const editor = editorRef.current;

		if (editor?.view) {
			const { from } = editor.view.state.selection.main;
			const cursorPosition = editor.view.state.doc.lineAt(from);

			setCursorLocation({
				lineNumber: cursorPosition.number,
				columnNumber: from - cursorPosition.from + 1
			});
		}
	}, [setCursorLocation]);

	const { getLanguage } = languageStore();

	const onChange = useCallback(
		(value: string) => {
			updateCursorInformation();
			setValue(value);
		},
		[updateCursorInformation, setValue]
	);

	const { themeId } = themeStore();

	return (
		<ReactCodeMirror
			ref={editorRef}
			onChange={onChange}
			height='100%'
			className='flex-grow overflow-auto'
			extensions={[getLanguage(), hyperLink]}
			theme={editorThemes[themeId]}
			placeholder="Start writing here! When you're done, hit the save button to generate a unique URL with your content."
			value={value}
			readOnly={enableEdit && !isEditing}
			autoFocus={true}
			basicSetup={{
				lineNumbers: true,
				highlightActiveLineGutter: true,
				highlightActiveLine: true,
				autocompletion: true,
				allowMultipleSelections: false,
				syntaxHighlighting: true
			}}
		/>
	);
}

const editorThemes: Record<ThemeId, 'dark' | 'light' | Extension> = {
	[ThemeId.Default]: createTheme({
		settings: {
			background: '#2E2E2E',
			foreground: '#FFF',
			caret: '#FFE184',
			selection: '#FFE18419',
			selectionMatch: '#FFE18433',
			gutterBackground: '#232323',
			gutterForeground: '#838383',
			gutterActiveForeground: '#FFF',
			lineHighlight: '#FFE18407'
		},
		styles: [
			{
				tag: [t.comment],
				color: '#c8c5bb'
			},
			{
				tag: [t.operator],
				color: '#e8b000'
			},
			{
				tag: [t.unit, t.punctuation],
				color: '#c19200'
			},
			{
				tag: [t.propertyName],
				color: '#fcbe00'
			},
			{
				tag: [t.bracket, t.variableName, t.emphasis, t.heading, t.tagName, t.className, t.namespace],
				color: '#dee2e6'
			},
			{
				tag: [t.typeName, t.atom, t.number, t.keyword, t.link, t.attributeName, t.quote],
				color: '#FFE184'
			},
			{
				tag: [t.number],
				color: '#84b6ff'
			},
			{
				tag: [t.string, t.url],
				color: '#84ffb0'
			}
		],
		theme: 'dark'
	}),
	[ThemeId.Dark]: vscodeDark,
	[ThemeId.Light]: vscodeLight,
	[ThemeId.Midnight]: 'dark',
	[ThemeId.Amoled]: 'dark'
};
