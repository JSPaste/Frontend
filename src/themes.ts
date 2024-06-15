'use client';

import { createTheme } from '@mui/material';

export const defaultTheme = createTheme({
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
	palette: {
		mode: 'dark',
		primary: {
			light: '#FFE8A0',
			main: '#FFE285',
			dark: '#BEA861',
			contrastText: '#000'
		},
		secondary: {
			light: '#373634',
			main: '#252422',
			dark: '#191816',
			contrastText: '#D6D6D6'
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
			contrastText: '#000'
		},
		warning: {
			light: '#E2C58B',
			main: '#DDBB77',
			dark: '#D8B163',
			contrastText: '#000'
		},
		info: {
			light: '#8BB7E2',
			main: '#77AADD',
			dark: '#639DD8',
			contrastText: '#000'
		},
		success: {
			light: '#8BE28B',
			main: '#77DD77',
			dark: '#63D863',
			contrastText: '#000'
		},
		grey: {
			50: '#fafafa',
			100: '#f5f5f5',
			200: '#e5e5e5',
			300: '#d4d4d4',
			400: '#a3a3a3',
			500: '#737373',
			600: '#525252',
			700: '#404040',
			800: '#262626',
			900: '#171717'
		}
	}
});
