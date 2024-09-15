import type { PageContext } from 'vike/types';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = (ctx: PageContext) => {
	return {
		documentName: ctx.routeParams.documentName
	};
};
