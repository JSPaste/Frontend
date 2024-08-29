import type { PageContextServer } from 'vike/types';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = (pageContext: PageContextServer) => {
	return {
		documentName: pageContext.routeParams.documentName
	};
};
