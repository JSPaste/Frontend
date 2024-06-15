'use client';

import { experimental_extendTheme as extendTheme } from '@mui/material';

export const defaultTheme = extendTheme({
	typography: {
		fontFamily: [
			'Red Hat Text',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					light: '#FFE8A0',
					main: '#FFE285',
					dark: '#BEA861',
					contrastText: '#282828'
				},
				secondary: {
					light: '#373634',
					main: '#252422',
					dark: '#191816',
					contrastText: '#D7D7D7'
				},
				background: {
					default: '#252422',
					paper: '#191816'
				},
				text: {
					primary: '#D7D7D7',
					secondary: '#282828',
					disabled: '#C8C8C8'
				},
				error: {
					light: '#FFA0A0',
					main: '#DD7777',
					dark: '#BE6161',
					contrastText: '#282828'
				},
				warning: {
					light: '#E2C58B',
					main: '#DDBB77',
					dark: '#D8B163',
					contrastText: '#282828'
				},
				info: {
					light: '#8BB7E2',
					main: '#77AADD',
					dark: '#639DD8',
					contrastText: '#282828'
				},
				success: {
					light: '#8BE28B',
					main: '#77DD77',
					dark: '#63D863',
					contrastText: '#282828'
				},
				grey: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					300: '#D4D4D4',
					400: '#A3A3A3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717'
				}
			}
		}
	}
});
