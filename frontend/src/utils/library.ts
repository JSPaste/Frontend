import { JSP } from '@jspaste/library/src';
import { createSignal } from 'solid-js';
import { editorBackendAuthority } from '#util/persistence.ts';

// FIXME: Normalize URLs

const defaultLibraryOptions: ConstructorParameters<typeof JSP>[0] = {
	// FIXME: Temporary patch for the API URL
	api: `${editorBackendAuthority()}/api`
};

// biome-ignore lint/nursery/useExplicitType: Signals are already typed on creation
export const [client, setClient] = createSignal<JSP>(new JSP(defaultLibraryOptions));
