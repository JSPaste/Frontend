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
import { EditorContext } from '@x-component/screens/Editor';
import { editorThemes } from '@x-util/editorThemes';
import { languageStore, themeStore } from '@x-util/store';
import { createEffect, createSignal, on, onCleanup, onMount, useContext } from 'solid-js';

type EditorProps = {
	enableEdit: boolean;
};

export default function Editor({ enableEdit }: EditorProps) {
	const [container, setContainer] = createSignal<HTMLDivElement>();
	const [editorView, setEditorView] = createSignal<EditorView>();

	const { value, setCursor, isEditing, setValue } = useContext(EditorContext);

	const updateCursorInformation = () => {
		const view = editorView();

		if (view) {
			const { from } = view.state.selection.main;
			const cursorPosition = view.state.doc.lineAt(from);

			setCursor({
				line: cursorPosition.number,
				column: from - cursorPosition.from + 1
			});
		}
	};

	const languageState = languageStore();
	const themeState = themeStore();

	createEffect(
		on(container, async (container) => {
			const currentView = new EditorView({
				parent: container,
				state: EditorState.create({
					doc: value(),
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
						editorThemes[themeState().themeId],
						await languageState().getLanguage(),
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

			onMount(() => setEditorView(currentView));

			onCleanup(() => {
				editorView()?.destroy();
				setEditorView(undefined);
			});
		})
	);

	createEffect(
		on(
			editorView,
			(editorView) => {
				if (editorView && editorView?.state.doc.toString() !== value()) {
					editorView.dispatch({
						changes: {
							from: 0,
							to: editorView?.state.doc.length,
							insert: value() ?? ''
						}
					});
				}
			},
			{ defer: true }
		)
	);

	return <div ref={setContainer} class='flex-grow overflow-hidden' />;
}
