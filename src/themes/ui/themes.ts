import { extendTheme } from '@chakra-ui/react';

export interface ThemeColors {
	primary: string;
	information: string;
	controls: string;
	editor: string;
	tooltip: string;
	text: string;
	textMuted: string;
	highTransparency: string;
	midTransparency: string;
	lowTransparency: string;
}

export interface Theme {
	id: string;
	name: string;
	baseTheme: 'dark' | 'light';
	chakraTheme: Record<string, any>;
}

const themeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

export const themes: Theme[] = [
	{
		id: 'jspaste',
		name: 'JSPaste',
		baseTheme: 'dark',
		chakraTheme: extendTheme({
			config: themeConfig,
			colors: {
				primary: '#FFE184',
				information: '#272727',
				controls: '#222222',
				editor: '#2E2E2E',
				tooltip: '#464646',
				popup: '#2E2E2E',
				text: '#EBEBEB',
				textMuted: '#949494',
				highTransparency: '#ffffff20',
				midTransparency: '#ffffff30',
				lowTransparency: '#ffffff40',
			},
		}),
	},
	{
		id: 'dark',
		name: 'Dark',
		baseTheme: 'dark',
		chakraTheme: extendTheme({
			config: themeConfig,
			colors: {
				primary: '#8C84FF',
				information: '#272727',
				controls: '#222222',
				editor: '#2E2E2E',
				tooltip: '#464646',
				popup: '#2E2E2E',
				text: '#EBEBEB',
				textMuted: '#949494',
				highTransparency: '#ffffff20',
				midTransparency: '#ffffff30',
				lowTransparency: '#ffffff40',
			},
		}),
	},
	{
		id: 'light',
		name: 'Light',
		baseTheme: 'light',
		chakraTheme: extendTheme({
			config: themeConfig,
			colors: {
				primary: '#FFE184',
				information: '#D3D3D3',
				controls: '#D1D1D1',
				editor: '#E4E4E4',
				tooltip: '#DDDDDD',
				popup: '#CFCFCF',
				text: '#2B2B2B',
				textMuted: '#5F5F5F',
				highTransparency: '#00000020',
				midTransparency: '#00000030',
				lowTransparency: '#00000040',
			},
		}),
	},
];
