import { JSP } from "@jspaste/library/src";
import { useLocation, useParams } from "@solidjs/router";
import { createEffect, createResource, type JSXElement, lazy, Match, on, Switch } from "solid-js";
import Information from "#component/Information.tsx";
import SettingsModal from "#component/modals/settings/SettingsModal.tsx";
import Navbar from "#component/Navbar.tsx";
import { type EditorLanguageKeys, editorLanguageExtension, setEditorLanguage } from "#extension/language.ts";
import LoadingScreen from "#screen/LoadingScreen.tsx";
import NotFoundScreen from "#screen/NotFoundScreen.tsx";
import { getEditorContext } from "#util/getEditorContext.ts";
import { client, setClient } from "#util/library.ts";
import { LogSource, logger } from "#util/logger.ts";
import { editorBackendAuthority, themeScheme } from "#util/persistence.ts";

const Editor: () => JSXElement = lazy(() => import("#component/Editor.tsx"));

export default function EditorScreen(): JSXElement {
  const ctx = getEditorContext();
  const location = useLocation();
  const params = useParams();

  const [paste] = createResource(params.documentName, (documentName: string) => {
    // FIXME: Handle HTTP errors inside library
    return client().access(documentName);
  });

  const language = location.query.language as string | undefined;

  if (language && language in editorLanguageExtension) {
    setEditorLanguage(language as EditorLanguageKeys);
  }

  createEffect(
    on(themeScheme, (themeScheme) => {
      document.documentElement.setAttribute("data-theme", themeScheme);
    })
  );

  createEffect(
    on(editorBackendAuthority, (editorBackendAuthority) => {
      const jsp = new JSP({
        // FIXME: Temporary patch for the API URL
        api: `${editorBackendAuthority}/api`
      });

      setClient(jsp);
    })
  );

  createEffect(
    on(
      () => (paste.loading ? undefined : paste()),
      (pasteData) => {
        if (!paste.loading) {
          if (pasteData) {
            ctx.setEditable(false);
            ctx.setContent(pasteData.data);
          } else {
            logger.debug(LogSource.Backend, "No paste name provided, skipping API call...");
            ctx.setEditable(true);
          }
        }
      }
    )
  );

  return (
    <Switch fallback={<LoadingScreen />}>
      <Match when={paste.state === "ready" || !params.documentName}>
        <div class="flex flex-col h-svh overflow-hidden">
          <Information />
          <div class="landscape:pt-6">
            <Navbar />
          </div>
          <div class="flex-grow overflow-auto portrait:pb-18 landscape:pl-20 portrait:pt-6">
            <Editor />
          </div>
          <SettingsModal />
        </div>
      </Match>
      <Match when={paste.state === "errored"}>
        <NotFoundScreen title="The existing document has expired or has been deleted" />
      </Match>
    </Switch>
  );
}
