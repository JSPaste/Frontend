import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { Compartment, EditorState } from '@codemirror/state';
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
import { getLanguage, language, theme } from '@x-util/store';
import { createEffect, createSignal, on, onCleanup, onMount, useContext } from 'solid-js';

type EditorProps = {
	enableEdit: boolean;
};

export default function Editor({ enableEdit }: EditorProps) {
	const [container, setContainer] = createSignal<HTMLDivElement>();
	const [editorView, setEditorView] = createSignal<EditorView>();

	const { value, setCursor, isEditing, setValue } = useContext(EditorContext);

	const themeCompartment = new Compartment();
	const languageCompartment = new Compartment();

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

	onMount(async () => {
		const currentView = new EditorView({
			parent: container(),
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
					themeCompartment.of(editorThemes[theme()]),
					languageCompartment.of(await getLanguage()),
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

		setEditorView(currentView);
	});

	createEffect(
		on(
			[editorView, theme],
			([view, theme]) => {
				if (view) {
					editorView()?.dispatch({
						effects: themeCompartment.reconfigure(editorThemes[theme])
					});
				}
			},
			{ defer: true }
		)
	);

	createEffect(
		on(
			[editorView, language],
			async ([view]) => {
				if (view) {
					editorView()?.dispatch({
						effects: languageCompartment.reconfigure(await getLanguage())
					});
				}
			},
			{ defer: true }
		)
	);

	onCleanup(() => {
		editorView()?.destroy();
		setEditorView(undefined);
	});

	return <div ref={setContainer} class='flex-grow overflow-hidden' />;
}
