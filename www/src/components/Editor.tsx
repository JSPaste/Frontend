import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import {
	crosshairCursor,
	drawSelection,
	dropCursor,
	EditorView,
	highlightActiveLine,
	highlightActiveLineGutter,
	highlightSpecialChars,
	keymap,
	lineNumbers,
	placeholder,
	rectangularSelection,
	type ViewUpdate
} from '@codemirror/view';
import { debounce } from '@solid-primitives/scheduled';
import { hyperLinkExtension, hyperLinkStyle } from '@uiw/codemirror-extensions-hyper-link';
import createTheme from '@uiw/codemirror-themes';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { extensionLoader } from '#util/extensionLoader.ts';
import { getEditorContext } from '#util/getEditorContext.ts';
import { lazyExtensionLoader } from '#util/lazyExtensionLoader.ts';
import { LogSource, logger } from '#util/logger.ts';
import { editorContent, setEditorContent } from '#util/persistence.ts';
import { editorLanguage, editorLanguageExtension } from '../extensions/language.ts';
import { editorThemeExtension } from '../extensions/theme.ts';
import { zoomExtension, zoomKeymap } from '../extensions/zoom.ts';

export default function Editor() {
	const ctx = getEditorContext();

	const [editorView, setEditorView] = createSignal<EditorView>();

	const eventUpdateCursor = debounce((update: ViewUpdate) => {
		const { from } = update.view.state.selection.main;
		const cursorPosition = update.view.state.doc.lineAt(from);

		ctx.setCursor({
			line: cursorPosition.number,
			column: from - cursorPosition.from + 1
		});
	}, 250);

	const eventSaveContent = debounce((update: ViewUpdate) => {
		if (ctx.editable()) {
			logger.debug(LogSource.Editor, 'Saving editor content...');

			setEditorContent(update.view.state.doc.toString());
		}
	}, 500);

	extensionLoader(() => createTheme(editorThemeExtension()), editorView);
	extensionLoader(() => EditorState.readOnly.of(!ctx.editable()), editorView);
	extensionLoader(() => EditorView.editable.of(ctx.editable()), editorView);
	extensionLoader(() => zoomExtension(), editorView);

	lazyExtensionLoader(() => editorLanguageExtension[editorLanguage()](), editorView);

	// TODO: Move heavy extensions to lazyExtensionLoader

	onMount(() => {
		const state = EditorState.create({
			doc: ctx.content() || editorContent(),
			extensions: [
				placeholder('...'),
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
				keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, ...zoomKeymap]),
				hyperLinkExtension(),
				hyperLinkStyle,
				EditorView.theme({
					'&': {
						height: '100%'
					}
				}),
				EditorView.contentAttributes.of({ 'data-lt-active': 'false' }),
				EditorView.updateListener.of((update) => {
					// Prevent multiple updates shadowing possible document changes on debouncer
					if (update.docChanged) {
						eventSaveContent(update);
					}

					if (update.selectionSet) {
						eventUpdateCursor(update);
					}
				})
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
