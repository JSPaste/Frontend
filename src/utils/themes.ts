// TODO: Delete this file or use it as an index of available themes
export type Theme = {
	id: ThemeId;
	name: string;
};

export enum ThemeId {
	Default = 'default',
	Dark = 'dark',
	Light = 'light'
}

export const themes: Theme[] = [
	{
		id: ThemeId.Default,
		name: 'Default'
	}
] as const;
