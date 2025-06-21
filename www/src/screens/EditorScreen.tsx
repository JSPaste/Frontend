import { JSP } from '@jspaste/library/src';
import { useLocation, useParams } from '@solidjs/router';
import { createEffect, createResource, createSignal, lazy, Match, on, Switch } from 'solid-js';
import SettingsModal from '#component/modals/settings/SettingsModal.tsx';
import Navbar from '#component/Navbar.tsx';
import LoadingScreen from '#screen/LoadingScreen.tsx';
import NotFoundScreen from '#screen/NotFoundScreen.tsx';
import { getEditorContext } from '#util/getEditorContext.ts';
import { client, setClient } from '#util/library.ts';
import { LogSource, logger } from '#util/logger.ts';
import { editorBackendAuthority, themeScheme } from '#util/persistence.ts';
import { type EditorLanguageKeys, editorLanguageExtension, setEditorLanguage } from '../extensions/language.ts';

const Editor = lazy(() => import('#component/Editor.tsx'));

export default function EditorScreen() {
	const ctx = getEditorContext();
	const location = useLocation();
	const params = useParams();

	const [pasteId] = createSignal<string | undefined>(params.documentName);
	const [paste] = createResource(pasteId, (documentName: string) => {
		// FIXME: Handle HTTP errors inside library
		return client().access(documentName);
	});

	const language = location.query.language as string | undefined;

	if (language && language in editorLanguageExtension) {
		setEditorLanguage(language as EditorLanguageKeys);
	}

	createEffect(
		on(themeScheme, (themeScheme) => {
			document.documentElement.setAttribute('data-theme', themeScheme);
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
						logger.debug(LogSource.Backend, 'No paste name provided, skipping API call...');
						ctx.setEditable(true);
					}
				}
			}
		)
	);

	return (
		<Switch
			fallback={
				<>
					<Navbar />
					<div class='h-svh portrait:pb-18 landscape:pl-16'>
						<Editor />
					</div>
					<SettingsModal />
				</>
			}
		>
			<Match when={paste.loading && pasteId()}>
				<LoadingScreen />
			</Match>
			<Match when={paste.error}>
				<NotFoundScreen title='The existing document has expired or has been deleted' />
			</Match>
		</Switch>
	);
}
