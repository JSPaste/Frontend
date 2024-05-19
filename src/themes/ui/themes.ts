import type { Theme } from '@/types/Theme.ts';

export const themes: Theme[] = [
	{
		id: 'default',
		name: 'Default',
		baseTheme: 'dark',
		monacoTheme: 'default',
		isCustomMonacoTheme: true,
		values: {
			primary: '#FFE184',
			primaryDisplay: '#FFE184',
			information: '#232323',
			controls: '#282828',
			editor: '#2E2E2E',
			tooltip: '#202020',
			popup: '#292929',
			text: '#D6D6D6',
			textMuted: '#BBBBBB',
			highTransparency: '#FFFFFF20',
			midTransparency: '#FFFFFF30',
			lowTransparency: '#FFFFFF40',
			highAltTransparency: '#00000020',
			midAltTransparency: '#00000030',
			lowAltTransparency: '#00000040'
		}
	},
	{
		id: 'dark',
		name: 'Dark',
		baseTheme: 'dark',
		monacoTheme: 'vs-dark',
		isCustomMonacoTheme: false,
		values: {
			primary: '#D3D3D3',
			primaryDisplay: '#222222',
			information: '#181818',
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
			lowAltTransparency: '#00000040'
		}
	},
	{
		id: 'light',
		name: 'Light',
		baseTheme: 'light',
		monacoTheme: 'light',
		isCustomMonacoTheme: false,
		values: {
			primary: '#3F3F3F',
			primaryDisplay: '#D3D3D3',
			information: '#D3D3D3',
			controls: '#D1D1D1',
			editor: '#E4E4E4',
			tooltip: '#E7E7E7',
			popup: '#E4E4E4',
			text: '#161616',
			textMuted: '#242424',
			highTransparency: '#00000020',
			midTransparency: '#00000030',
			lowTransparency: '#00000040',
			highAltTransparency: '#ffffff20',
			midAltTransparency: '#ffffff30',
			lowAltTransparency: '#ffffff40'
		}
	},
	{
		id: 'midnight',
		name: 'Midnight',
		baseTheme: 'dark',
		monacoTheme: 'midnight',
		isCustomMonacoTheme: true,
		values: {
			primary: '#7D76DD',
			primaryDisplay: '#5C51F7',
			information: '#05010C',
			controls: '#05010C',
			editor: '#0A0216',
			tooltip: '#18082C',
			popup: '#140922',
			text: '#EBEBEB',
			textMuted: '#949494',
			highTransparency: '#ffffff20',
			midTransparency: '#ffffff30',
			lowTransparency: '#ffffff40',
			highAltTransparency: '#00000020',
			midAltTransparency: '#00000030',
			lowAltTransparency: '#00000040'
		}
	},
	{
		id: 'amoled',
		name: 'Amoled',
		baseTheme: 'dark',
		monacoTheme: 'amoled',
		isCustomMonacoTheme: true,
		values: {
			primary: '#D3D3D3',
			primaryDisplay: '#1B1B1B',
			information: '#070707',
			controls: '#070707',
			editor: '#1A1A1A',
			tooltip: '#161616',
			popup: '#070707',
			text: '#EBEBEB',
			textMuted: '#949494',
			highTransparency: '#ffffff20',
			midTransparency: '#ffffff30',
			lowTransparency: '#ffffff40',
			highAltTransparency: '#00000020',
			midAltTransparency: '#00000030',
			lowAltTransparency: '#00000040'
		}
	}
];
