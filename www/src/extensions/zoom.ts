import type { Extension } from '@codemirror/state';
import { EditorView, type KeyBinding } from '@codemirror/view';
import { editorZoom, setEditorZoom } from '#util/persistence.ts';

export const resetZoom = () => {
	setEditorZoom(100);
};

export const increaseZoom = () => {
	if (editorZoom() >= 400) return;

	setEditorZoom((prev) => prev + 15);
};

export const decreaseZoom = () => {
	if (editorZoom() <= 25) return;

	setEditorZoom((prev) => prev - 15);
};

// TODO: Handle mouse shortcuts (CTRL+Scroll)

export const zoomKeymap: KeyBinding[] = [
	{
		key: 'Ctrl-=',
		mac: 'Cmd-=',
		run: () => {
			resetZoom();
			return true;
		}
	},
	{
		key: 'Ctrl-+',
		mac: 'Cmd-+',
		run: () => {
			increaseZoom();
			return true;
		}
	},
	{
		key: 'Ctrl--',
		mac: 'Cmd--',
		run: () => {
			decreaseZoom();
			return true;
		}
	}
];

export const zoomExtension = (): Extension => {
	return EditorView.theme({
		'.cm-scroller .cm-line, .cm-gutter': {
			fontSize: `${editorZoom() / 100}em !important`
		}
	});
};
