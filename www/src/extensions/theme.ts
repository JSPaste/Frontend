import { tags as t } from '@lezer/highlight';
import type { CreateThemeOptions } from '@uiw/codemirror-themes';
import { deviceScheme } from '#util/deviceScheme.ts';
import { theme, themeScheme, themeSchemeMode } from '#util/persistence.ts';

export enum EditorTheme {
	default = 'Default'
}

export type EditorThemeKeys = keyof typeof EditorTheme;

type EditorThemeScheme = {
	dark: CreateThemeOptions;
	light: CreateThemeOptions;
};

export type EditorThemeSchemeMode = 'device' | 'manual';

const defaultThemeSyntaxDark = {
	invalid: 'oklch(70% 0.1 20)',
	heading: 'oklch(70% 0.1 333)',
	comment: 'oklch(65% 0 0)',
	tag: 'oklch(80% 0.1 85)',
	keyword: 'oklch(75% 0.1 50)',
	type: 'oklch(75% 0.1 50)',
	constant: 'oklch(70% 0.1 333)',
	function: 'oklch(70% 0.1 333)',
	variable: 'oklch(80% 0 0)',
	class: 'oklch(80% 0 0)',
	string: 'oklch(70% 0.1 150)',
	number: 'oklch(70% 0.1 200)',
	regexp: 'oklch(80% 0.1 200)'
} as const;

const defaultThemeSyntaxLight = {
	invalid: 'oklch(70% 0.2 20)',
	heading: 'oklch(40% 0.2 333)',
	comment: 'oklch(50% 0 0)',
	tag: 'oklch(40% 0.2 250)',
	keyword: 'oklch(40% 0.2 250)',
	type: 'oklch(40% 0.2 250)',
	constant: 'oklch(40% 0.2 333)',
	function: 'oklch(40% 0.2 333)',
	variable: 'oklch(10% 0 0)',
	class: 'oklch(10% 0 0)',
	string: 'oklch(40% 0.2 150)',
	number: 'oklch(40% 0.2 250)',
	regexp: 'oklch(50% 0.2 250)'
} as const;

export const editorTheme: Record<EditorThemeKeys, EditorThemeScheme> = {
	default: {
		light: {
			theme: 'light',
			settings: {
				background: 'oklch(100% 0 0)',
				foreground: 'oklch(25% 0 0)',
				caret: 'oklch(0% 0 0)',
				selection: 'oklch(91% 0.1175 92 / 20%)',
				selectionMatch: 'oklch(91% 0.1175 92 / 30%)',
				lineHighlight: 'oklch(0% 0 0 / 3%)',
				gutterBackground: 'oklch(97% 0 0)',
				gutterForeground: 'oklch(60% 0 0)',
				gutterActiveForeground: 'oklch(25% 0 0)'
			},
			styles: [
				{
					tag: t.invalid,
					color: defaultThemeSyntaxLight.invalid
				},
				{
					tag: t.heading,
					fontWeight: 'bold',
					color: defaultThemeSyntaxLight.heading
				},
				{
					tag: [t.comment, t.meta],
					color: defaultThemeSyntaxLight.comment
				},
				{
					tag: [t.annotation, t.tagName],
					color: defaultThemeSyntaxLight.tag
				},
				{
					tag: [t.bool, t.keyword],
					color: defaultThemeSyntaxLight.keyword
				},
				{
					tag: [t.changed, t.modifier, t.namespace, t.self, t.typeName],
					color: defaultThemeSyntaxLight.type
				},
				{
					tag: [t.constant(t.name), t.standard(t.name)],
					color: defaultThemeSyntaxLight.constant
				},
				{
					tag: [t.function(t.variableName), t.labelName, t.propertyName],
					color: defaultThemeSyntaxLight.function
				},
				{
					tag: [
						t.atom,
						t.character,
						t.deleted,
						t.definition(t.name),
						t.macroName,
						t.name,
						t.special(t.variableName)
					],
					color: defaultThemeSyntaxLight.variable
				},
				{
					tag: t.className,
					color: defaultThemeSyntaxLight.class
				},
				{
					tag: [t.docComment, t.inserted, t.processingInstruction, t.special(t.string), t.string],
					color: defaultThemeSyntaxLight.string
				},
				{
					tag: [t.color, t.number],
					color: defaultThemeSyntaxLight.number
				},
				{
					tag: [t.escape, t.link, t.regexp, t.url],
					color: defaultThemeSyntaxLight.regexp
				},
				{
					tag: t.strong,
					fontWeight: 'bold'
				},
				{
					tag: t.emphasis,
					fontStyle: 'italic'
				},
				{
					tag: t.link,
					textDecoration: 'underline'
				},
				{
					tag: t.strikethrough,
					textDecoration: 'line-through'
				}
			]
		},
		dark: {
			theme: 'dark',
			settings: {
				background: 'oklch(24% 0 0)',
				foreground: 'oklch(85% 0 0)',
				caret: 'oklch(91% 0.1175 92)',
				selection: 'oklch(91% 0.1175 92 / 10%)',
				selectionMatch: 'oklch(91% 0.1175 92 / 20%)',
				lineHighlight: 'oklch(100% 0 0 / 3%)',
				gutterBackground: 'oklch(20% 0 0)',
				gutterForeground: 'oklch(60% 0 0)',
				gutterActiveForeground: 'oklch(85% 0 0)'
			},
			styles: [
				{
					tag: t.invalid,
					color: defaultThemeSyntaxDark.invalid
				},
				{
					tag: t.heading,
					fontWeight: 'bold',
					color: defaultThemeSyntaxDark.heading
				},
				{
					tag: [t.comment, t.meta],
					color: defaultThemeSyntaxDark.comment
				},
				{
					tag: [t.annotation, t.tagName],
					color: defaultThemeSyntaxDark.tag
				},
				{
					tag: [t.bool, t.keyword],
					color: defaultThemeSyntaxDark.keyword
				},
				{
					tag: [t.changed, t.modifier, t.namespace, t.self, t.typeName],
					color: defaultThemeSyntaxDark.type
				},
				{
					tag: [t.constant(t.name), t.standard(t.name)],
					color: defaultThemeSyntaxDark.constant
				},
				{
					tag: [t.function(t.variableName), t.labelName, t.propertyName],
					color: defaultThemeSyntaxDark.function
				},
				{
					tag: [
						t.atom,
						t.character,
						t.deleted,
						t.definition(t.name),
						t.macroName,
						t.name,
						t.special(t.variableName)
					],
					color: defaultThemeSyntaxDark.variable
				},
				{
					tag: t.className,
					color: defaultThemeSyntaxDark.class
				},
				{
					tag: [t.docComment, t.inserted, t.processingInstruction, t.special(t.string), t.string],
					color: defaultThemeSyntaxDark.string
				},
				{
					tag: [t.color, t.number],
					color: defaultThemeSyntaxDark.number
				},
				{
					tag: [t.escape, t.link, t.regexp, t.url],
					color: defaultThemeSyntaxDark.regexp
				},
				{
					tag: t.strong,
					fontWeight: 'bold'
				},
				{
					tag: t.emphasis,
					fontStyle: 'italic'
				},
				{
					tag: t.link,
					textDecoration: 'underline'
				},
				{
					tag: t.strikethrough,
					textDecoration: 'line-through'
				}
			]
		}
	}
} as const;

export const editorThemeExtension = () =>
	themeSchemeMode() === 'device' ? editorTheme[theme()][deviceScheme()] : editorTheme[theme()][themeScheme()];
