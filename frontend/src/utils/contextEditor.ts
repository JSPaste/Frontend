import { type Accessor, type Context, createContext, type Setter } from 'solid-js';

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
	setContainer: Setter<Container>;
	setContent: Setter<Content>;
	setCursor: Setter<Cursor>;
	setEditable: Setter<boolean>;
};

export const ContextEditor: Context<ContextEditorType | undefined> = createContext<ContextEditorType>();
