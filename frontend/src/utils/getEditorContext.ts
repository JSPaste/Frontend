import { useContext } from 'solid-js';
import { ContextEditor, type ContextEditorType } from '#util/contextEditor.ts';

export const getEditorContext = (): ContextEditorType => {
	const ctx = useContext(ContextEditor);

	if (!ctx) {
		throw new Error('getEditorContext: no ContextEditor available');
	}

	return ctx;
};
