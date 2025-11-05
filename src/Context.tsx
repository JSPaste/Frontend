import type { RouteSectionProps } from "@solidjs/router";
import { createSignal, type JSXElement } from "solid-js";
import {
  type Container,
  type Content,
  ContextEditor,
  type ContextEditorType,
  type Cursor
} from "#util/contextEditor.ts";

export default function Context(props: RouteSectionProps): JSXElement {
  const [container, setContainer] = createSignal<Container>(undefined);
  const [content, setContent] = createSignal<Content>(null);
  const [cursor, setCursor] = createSignal<Cursor>({ line: 1, column: 1 });
  const [editable, setEditable] = createSignal(false);

  const contextEditorWrapper: ContextEditorType = {
    container: container,
    content: content,
    cursor: cursor,
    editable: editable,
    setContainer: setContainer,
    setContent: setContent,
    setCursor: setCursor,
    setEditable: setEditable
  };

  return <ContextEditor.Provider value={contextEditorWrapper}>{props.children}</ContextEditor.Provider>;
}
