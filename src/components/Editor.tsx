import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import {
	EditorView,
	crosshairCursor,
	drawSelection,
	dropCursor,
	highlightActiveLine,
	highlightActiveLineGutter,
	highlightSpecialChars,
	keymap,
	lineNumbers,
	placeholder,
	rectangularSelection
} from '@codemirror/view';
import { hyperLinkExtension, hyperLinkStyle } from '@uiw/codemirror-extensions-hyper-link';
import type { HeaderProps } from '@x-component/Header';
import { editorThemes } from '@x-util/editorThemes.ts';
import { languageStore, themeStore } from '@x-util/store';
import { useCallback, useEffect, useRef, useState } from 'react';

type EditorProps = {
	setCursorLocation: (info: HeaderProps) => void;
	setValue: (value: string) => void;
	value: string;
	documentName?: string;
	isEditing: boolean;
	enableEdit: boolean;
};

export default function ({ setCursorLocation, setValue, value, isEditing, enableEdit }: EditorProps) {
	const container = useRef<HTMLDivElement>(null);
	const view = useRef<EditorView>();
	const [initialValue] = useState(value);

	const updateCursorInformation = useCallback(() => {
		if (view.current) {
			const { from } = view.current.state.selection.main;
			const cursorPosition = view.current.state.doc.lineAt(from);

			setCursorLocation({
				lineNumber: cursorPosition.number,
				columnNumber: from - cursorPosition.from + 1
			});
		}
	}, [setCursorLocation]);

	const { getLanguage } = languageStore();
	const { themeId } = themeStore();

	useEffect(() => {
		if (!container.current) return;

		view.current = new EditorView({
			parent: container.current,
			state: EditorState.create({
				doc: initialValue,
				extensions: [
					placeholder(
						"Start writing here! When you're done, hit the save button to generate a unique URL with your content."
					),
					lineNumbers(),
					highlightActiveLineGutter(),
					highlightSpecialChars(),
					history(),
					drawSelection(),
					dropCursor(),
					indentOnInput(),
					syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
					bracketMatching(),
					closeBrackets(),
					rectangularSelection(),
					crosshairCursor(),
					highlightActiveLine(),
					keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
					editorThemes[themeId],
					getLanguage(),
					hyperLinkExtension(),
					hyperLinkStyle,
					EditorState.readOnly.of(enableEdit && !isEditing),
					EditorView.theme({
						'&': {
							height: '100%'
						},
						'& .cm-scroller': {
							height: '100% !important'
						},
						'& .cm-lineNumbers .cm-gutterElement': {
							padding: '0 5px'
						}
					}),
					EditorView.contentAttributes.of({ 'data-lt-active': 'false' }),
					EditorView.updateListener.of((vu) => {
						if (vu.docChanged) {
							updateCursorInformation();
							setValue(vu.state.doc.toString());
						}
					})
				]
			})
		});

		return () => {
			view.current?.destroy();
			view.current = undefined;
		};
	}, [themeId, getLanguage, initialValue, enableEdit, isEditing, setValue, updateCursorInformation]);

	return <div ref={container} className='flex-grow overflow-hidden' />;
}
