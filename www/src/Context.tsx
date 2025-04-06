import type { RouteSectionProps } from '@solidjs/router';
import { createSignal } from 'solid-js';
import {
	type Container,
	type Content,
	ContextEditor,
	type ContextEditorType,
	type Cursor
} from '#util/contextEditor.ts';

export default function Context(props: RouteSectionProps) {
	const [content, setContent] = createSignal<Content>(null);
	const [cursor, setCursor] = createSignal<Cursor>({ line: 1, column: 1 });
	const [editable, setEditable] = createSignal(false);
	const [container, setContainer] = createSignal<Container>(undefined);
	const [writing, setWriting] = createSignal(false);

	const contextEditorWrapper: ContextEditorType = {
		content,
		cursor,
		editable,
		container,
		writing,
		setContent,
		setCursor,
		setEditable,
		setContainer,
		setWriting
	};

	return <ContextEditor.Provider value={contextEditorWrapper}>{props.children}</ContextEditor.Provider>;
}
