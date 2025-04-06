import { useLocation, useParams } from '@solidjs/router';
import { Match, Switch, createEffect, createResource, createSignal, lazy, on } from 'solid-js';
import Navbar from '#component/Navbar.tsx';
import SettingsModal from '#component/modals/settings/SettingsModal.tsx';
import LoadingGenericScreen from '#screen/LoadingGenericScreen.tsx';
import NotFoundScreen from '#screen/NotFoundScreen.tsx';
import { getEditorContext } from '#util/getEditorContext.ts';
import { type LangKeys, langs, setLanguage } from '#util/langs.ts';
import { client } from '#util/library.ts';
import { themeScheme } from '#util/persistence.ts';

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

	if (language && language in langs) {
		setLanguage(language as LangKeys);
	}

	createEffect(
		on(themeScheme, (themeScheme) => {
			document.documentElement.setAttribute('data-theme', themeScheme);
		})
	);

	createEffect(
		on(
			() => (paste.loading ? undefined : paste()),
			(pasteData) => {
				if (!paste.loading) {
					if (pasteData) {
						console.debug('Paste name provided.');
						ctx.setEditable(false);
						ctx.setContent(pasteData.data);
					} else {
						console.debug('No paste name provided, skipping API call...');
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
					<div class='h-svh'>
						<Editor />
					</div>
					<Navbar />
					<SettingsModal />
				</>
			}
		>
			<Match when={paste.loading && pasteId()}>
				<LoadingGenericScreen />
			</Match>
			<Match when={paste.error}>
				<NotFoundScreen title='The existing document has expired or has been deleted' />
			</Match>
		</Switch>
	);
}
