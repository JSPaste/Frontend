import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import {
	EditorView,
	type ViewUpdate,
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
import { debounce } from '@solid-primitives/scheduled';
import { hyperLinkExtension, hyperLinkStyle } from '@uiw/codemirror-extensions-hyper-link';
import createTheme from '@uiw/codemirror-themes';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { extensionLoader } from '#util/extensionLoader.ts';
import { getEditorContext } from '#util/getEditorContext.ts';
import { langs, language } from '#util/langs.ts';
import { lazyExtensionLoader } from '#util/lazyExtensionLoader.ts';
import { editorContent, setEditorContent } from '#util/persistence.ts';
import { editorThemeExtension } from '#util/theme.ts';

export default function Editor() {
	const ctx = getEditorContext();

	const [editorView, setEditorView] = createSignal<EditorView>();

	const updateCursor = debounce((update: ViewUpdate) => {
		if (update.selectionSet) {
			const { from } = update.view.state.selection.main;
			const cursorPosition = update.view.state.doc.lineAt(from);

			ctx.setCursor({
				line: cursorPosition.number,
				column: from - cursorPosition.from + 1
			});
		}
	}, 250);

	const saveEditorContent = debounce((update: ViewUpdate) => {
		if (update.docChanged && ctx.editable()) {
			setEditorContent(update.view.state.doc.toString());
		}
	}, 500);

	extensionLoader(() => createTheme(editorThemeExtension()), editorView);
	extensionLoader(() => EditorState.readOnly.of(!ctx.editable()), editorView);
	extensionLoader(() => EditorView.editable.of(ctx.editable()), editorView);
	lazyExtensionLoader(() => langs[language()](), editorView);

	onMount(() => {
		const state = EditorState.create({
			doc: ctx.content() || editorContent(),
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
				hyperLinkExtension(),
				hyperLinkStyle,
				EditorView.baseTheme({
					'&': {
						height: '100%'
					}
				}),
				EditorView.contentAttributes.of({ 'data-lt-active': 'false' }),
				EditorView.updateListener.of(updateCursor),
				EditorView.updateListener.of(saveEditorContent)
			]
		});

		const view = new EditorView({
			parent: ctx.container(),
			state: state
		});

		setEditorView(view);
	});

	onCleanup(() => {
		editorView()?.destroy();
		setEditorView(undefined);
	});

	return <div ref={ctx.setContainer} class='h-full' />;
}
