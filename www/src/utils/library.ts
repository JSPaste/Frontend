import { JSP } from '@jspaste/library/src';
import { createEffect, createSignal, on } from 'solid-js';
import { editorBackendAuthority } from '#util/persistence.ts';

// FIXME: Normalize URLs

const defaultLibraryOptions: ConstructorParameters<typeof JSP>[0] = {
	// FIXME: Temporary patch for the API URL
	api: `${editorBackendAuthority()}/api`
};

export const [client, setClient] = createSignal<JSP>(new JSP(defaultLibraryOptions));

createEffect(
	on(editorBackendAuthority, (editorBackendAuthority) => {
		const jsp = new JSP({
			// FIXME: Temporary patch for the API URL
			api: `${editorBackendAuthority}/api`
		});

		setClient(jsp);
	})
);
