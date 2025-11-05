import type { JSXElement } from "solid-js";
import InformationCard from "#component/InformationCard.tsx";
import { editorLanguage } from "#extension/language.ts";
import { getEditorContext } from "#util/getEditorContext.ts";

export default function Information(): JSXElement {
  const ctx = getEditorContext();

  return (
    <div class="fixed top-0 w-full bg-base-100 pt-1 pb-1 pl-2 pr-2 flex gap-4">
      <span class="grow" />
      <InformationCard label={`${ctx.cursor().line}:${ctx.cursor().column}`} />
      <InformationCard label={`${editorLanguage().toUpperCase()}`} />
    </div>
  );
}
