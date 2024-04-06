type Theme = {
	id: string;
	name: string;
	baseTheme: 'dark' | 'light';
	monacoTheme: string;
	isCustomMonacoTheme: boolean;
	values: ThemeValues;
};

type ThemeValues = {
	primary: string;
	primaryDisplay: string;
	information: string;
	controls: string;
	editor: string;
	tooltip: string;
	popup: string;
	text: string;
	textMuted: string;
	highTransparency: string;
	midTransparency: string;
	lowTransparency: string;
	highAltTransparency: string;
	midAltTransparency: string;
	lowAltTransparency: string;
};

export type { Theme, ThemeValues };
