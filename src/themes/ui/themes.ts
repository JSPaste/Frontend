export interface ThemeValues {
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
}

export interface Theme {
	id: string;
	name: string;
	baseTheme: 'dark' | 'light';
	values: ThemeValues;
}

export const themes: Theme[] = [
	{
		id: 'jspaste',
		name: 'JSPaste',
		baseTheme: 'dark',
		values: {
			primary: '#FFE184',
			primaryDisplay: '#FFE184',
			information: '#272727',
			controls: '#222222',
			editor: '#2E2E2E',
			tooltip: '#464646',
			popup: '#222222',
			text: '#EBEBEB',
			textMuted: '#949494',
			highTransparency: '#ffffff20',
			midTransparency: '#ffffff30',
			lowTransparency: '#ffffff40',
			highAltTransparency: '#00000020',
			midAltTransparency: '#00000030',
			lowAltTransparency: '#00000040',
		},
	},
	{
		id: 'dark',
		name: 'Dark',
		baseTheme: 'dark',
		values: {
			primary: '#D3D3D3',
			primaryDisplay: '#272727',
			information: '#272727',
			controls: '#222222',
			editor: '#2E2E2E',
			tooltip: '#464646',
			popup: '#222222',
			text: '#EBEBEB',
			textMuted: '#949494',
			highTransparency: '#ffffff20',
			midTransparency: '#ffffff30',
			lowTransparency: '#ffffff40',
			highAltTransparency: '#00000020',
			midAltTransparency: '#00000030',
			lowAltTransparency: '#00000040',
		},
	},
	{
		id: 'light',
		name: 'Light',
		baseTheme: 'light',
		values: {
			primary: '#3F3F3F',
			primaryDisplay: '#D3D3D3',
			information: '#D3D3D3',
			controls: '#D1D1D1',
			editor: '#E4E4E4',
			tooltip: '#C9C9C9',
			popup: '#B3B2B2',
			text: '#161616',
			textMuted: '#242424',
			highTransparency: '#00000020',
			midTransparency: '#00000030',
			lowTransparency: '#00000040',
			highAltTransparency: '#ffffff20',
			midAltTransparency: '#ffffff30',
			lowAltTransparency: '#ffffff40',
		},
	},
	{
		id: 'midnight',
		name: 'Midnight',
		baseTheme: 'dark',
		values: {
			primary: '#5C51F7',
			primaryDisplay: '#5C51F7',
			information: '#272727',
			controls: '#222222',
			editor: '#2E2E2E',
			tooltip: '#464646',
			popup: '#222222',
			text: '#EBEBEB',
			textMuted: '#949494',
			highTransparency: '#ffffff20',
			midTransparency: '#ffffff30',
			lowTransparency: '#ffffff40',
			highAltTransparency: '#00000020',
			midAltTransparency: '#00000030',
			lowAltTransparency: '#00000040',
		},
	},
];
