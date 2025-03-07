import { useLocation } from '@solidjs/router';
import { Suspense, createEffect, lazy, on } from 'solid-js';
import Header from '#component/Header.tsx';
import GenericFallback from '#screen/GenericFallback.tsx';
import { type LangKeys, langs, setLanguage } from '#util/langs.ts';
import { themeScheme } from '#util/persistence.ts';

const Editor = lazy(() => import('#component/Editor.tsx'));
const Footer = lazy(() => import('#component/Footer.tsx'));

export default function EditorScreen() {
	const location = useLocation();

	const language = location.query.language as string | undefined;

	if (language && language in langs) {
		setLanguage(language as LangKeys);
	}

	createEffect(
		on(themeScheme, (themeScheme) => {
			document.documentElement.setAttribute('data-theme', themeScheme);
		})
	);

	return (
		/* FIXME: Overflows when width is over 1024px? */
		<div class='flex flex-col h-svh overflow-hidden'>
			<Header />
			<Suspense fallback={<GenericFallback />}>
				<Editor />
				<Footer />
			</Suspense>
		</div>
	);
}
