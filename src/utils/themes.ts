import { tags as t } from '@lezer/highlight';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import createTheme from '@uiw/codemirror-themes';
import type { Extension } from '@uiw/react-codemirror';

export type Theme = {
	id: ThemeId;
	name: string;
	baseTheme: 'dark' | 'light';
	codemirrorTheme: 'dark' | 'light' | Extension;
	palette: ThemePaletteKey;
};

export enum ThemeId {
	Default = 'default',
	Dark = 'dark',
	Light = 'light',
	Midnight = 'midnight',
	Amoled = 'amoled'
}

export type ThemePaletteKey = {
	[key in ThemePalette]: string;
};

export enum ThemePalette {
	Primary = 'primary',
	PrimaryDisplay = 'primaryDisplay',
	Information = 'information',
	Controls = 'controls',
	Editor = 'editor',
	Tooltip = 'tooltip',
	Popup = 'popup',
	Text = 'text',
	TextMuted = 'textMuted',
	HighTransparency = 'highTransparency',
	MidTransparency = 'midTransparency',
	LowTransparency = 'lowTransparency',
	HighAltTransparency = 'highAltTransparency',
	MidAltTransparency = 'midAltTransparency',
	LowAltTransparency = 'lowAltTransparency'
}

export const themes: Theme[] = [
	{
		id: ThemeId.Default,
		name: 'Default',
		baseTheme: 'dark',
		codemirrorTheme: createTheme({
			settings: {
				background: '#2E2E2E',
				foreground: '#FFF',
				caret: '#FFE184',
				selection: '#FFE18419',
				selectionMatch: '#FFE18433',
				gutterBackground: '#232323',
				gutterForeground: '#838383',
				gutterActiveForeground: '#FFF',
				lineHighlight: '#FFE18407'
			},
			styles: [
				{
					tag: [t.comment],
					color: '#c8c5bb'
				},
				{
					tag: [t.operator],
					color: '#e8b000'
				},
				{
					tag: [t.unit, t.punctuation],
					color: '#c19200'
				},
				{
					tag: [t.propertyName],
					color: '#fcbe00'
				},
				{
					tag: [t.bracket, t.variableName, t.emphasis, t.heading, t.tagName, t.className, t.namespace],
					color: '#dee2e6'
				},
				{
					tag: [t.typeName, t.atom, t.number, t.keyword, t.link, t.attributeName, t.quote],
					color: '#FFE184'
				},
				{
					tag: [t.number],
					color: '#84b6ff'
				},
				{
					tag: [t.string, t.url],
					color: '#84ffb0'
				}
			],
			theme: 'dark'
		}),
		palette: {
			[ThemePalette.Primary]: '#FFE184',
			[ThemePalette.PrimaryDisplay]: '#FFE184',
			[ThemePalette.Information]: '#232323',
			[ThemePalette.Controls]: '#282828',
			[ThemePalette.Editor]: '#2E2E2E',
			[ThemePalette.Tooltip]: '#202020',
			[ThemePalette.Popup]: '#292929',
			[ThemePalette.Text]: '#D6D6D6',
			[ThemePalette.TextMuted]: '#BBBBBB',
			[ThemePalette.HighTransparency]: '#FFFFFF20',
			[ThemePalette.MidTransparency]: '#FFFFFF30',
			[ThemePalette.LowTransparency]: '#FFFFFF40',
			[ThemePalette.HighAltTransparency]: '#00000020',
			[ThemePalette.MidAltTransparency]: '#00000030',
			[ThemePalette.LowAltTransparency]: '#00000040'
		}
	},
	{
		id: ThemeId.Dark,
		name: 'Dark',
		baseTheme: 'dark',
		codemirrorTheme: vscodeDark,
		palette: {
			[ThemePalette.Primary]: '#D3D3D3',
			[ThemePalette.PrimaryDisplay]: '#222222',
			[ThemePalette.Information]: '#181818',
			[ThemePalette.Controls]: '#222222',
			[ThemePalette.Editor]: '#2E2E2E',
			[ThemePalette.Tooltip]: '#464646',
			[ThemePalette.Popup]: '#222222',
			[ThemePalette.Text]: '#EBEBEB',
			[ThemePalette.TextMuted]: '#949494',
			[ThemePalette.HighTransparency]: '#ffffff20',
			[ThemePalette.MidTransparency]: '#ffffff30',
			[ThemePalette.LowTransparency]: '#ffffff40',
			[ThemePalette.HighAltTransparency]: '#00000020',
			[ThemePalette.MidAltTransparency]: '#00000030',
			[ThemePalette.LowAltTransparency]: '#00000040'
		}
	},
	{
		id: ThemeId.Light,
		name: 'Light',
		baseTheme: 'light',
		codemirrorTheme: vscodeLight,
		palette: {
			[ThemePalette.Primary]: '#3F3F3F',
			[ThemePalette.PrimaryDisplay]: '#D3D3D3',
			[ThemePalette.Information]: '#D3D3D3',
			[ThemePalette.Controls]: '#D1D1D1',
			[ThemePalette.Editor]: '#E4E4E4',
			[ThemePalette.Tooltip]: '#E7E7E7',
			[ThemePalette.Popup]: '#E4E4E4',
			[ThemePalette.Text]: '#161616',
			[ThemePalette.TextMuted]: '#242424',
			[ThemePalette.HighTransparency]: '#00000020',
			[ThemePalette.MidTransparency]: '#00000030',
			[ThemePalette.LowTransparency]: '#00000040',
			[ThemePalette.HighAltTransparency]: '#ffffff20',
			[ThemePalette.MidAltTransparency]: '#ffffff30',
			[ThemePalette.LowAltTransparency]: '#ffffff40'
		}
	},
	{
		id: ThemeId.Midnight,
		name: 'Midnight',
		baseTheme: 'dark',
		codemirrorTheme: 'dark',
		palette: {
			[ThemePalette.Primary]: '#7D76DD',
			[ThemePalette.PrimaryDisplay]: '#5C51F7',
			[ThemePalette.Information]: '#05010C',
			[ThemePalette.Controls]: '#05010C',
			[ThemePalette.Editor]: '#0A0216',
			[ThemePalette.Tooltip]: '#18082C',
			[ThemePalette.Popup]: '#140922',
			[ThemePalette.Text]: '#EBEBEB',
			[ThemePalette.TextMuted]: '#949494',
			[ThemePalette.HighTransparency]: '#ffffff20',
			[ThemePalette.MidTransparency]: '#ffffff30',
			[ThemePalette.LowTransparency]: '#ffffff40',
			[ThemePalette.HighAltTransparency]: '#00000020',
			[ThemePalette.MidAltTransparency]: '#00000030',
			[ThemePalette.LowAltTransparency]: '#00000040'
		}
	},
	{
		id: ThemeId.Amoled,
		name: 'Amoled',
		baseTheme: 'dark',
		codemirrorTheme: 'dark',
		palette: {
			[ThemePalette.Primary]: '#D3D3D3',
			[ThemePalette.PrimaryDisplay]: '#1B1B1B',
			[ThemePalette.Information]: '#070707',
			[ThemePalette.Controls]: '#070707',
			[ThemePalette.Editor]: '#1A1A1A',
			[ThemePalette.Tooltip]: '#161616',
			[ThemePalette.Popup]: '#070707',
			[ThemePalette.Text]: '#EBEBEB',
			[ThemePalette.TextMuted]: '#949494',
			[ThemePalette.HighTransparency]: '#ffffff20',
			[ThemePalette.MidTransparency]: '#ffffff30',
			[ThemePalette.LowTransparency]: '#ffffff40',
			[ThemePalette.HighAltTransparency]: '#00000020',
			[ThemePalette.MidAltTransparency]: '#00000030',
			[ThemePalette.LowAltTransparency]: '#00000040'
		}
	}
] as const;
