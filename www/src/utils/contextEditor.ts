import { type Accessor, type Setter, createContext } from 'solid-js';

export type Container = HTMLDivElement | undefined;

export type Content = string | null;

export type Cursor = {
	column: number;
	line: number;
};

export type ContextEditorType = {
	container: Accessor<Container>;
	content: Accessor<Content>;
	cursor: Accessor<Cursor>;
	editable: Accessor<boolean>;
	writing: Accessor<boolean>;
	setContainer: Setter<Container>;
	setContent: Setter<Content>;
	setCursor: Setter<Cursor>;
	setEditable: Setter<boolean>;
	setWriting: Setter<boolean>;
};

export const ContextEditor = createContext<ContextEditorType>();
