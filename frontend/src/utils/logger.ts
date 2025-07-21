export const LogSource = {
	Unknown: 'UNKNOWN',
	Editor: 'EDITOR',
	Backend: 'BACKEND',
	Network: 'NETWORK'
} as const;

type LogSourceKeys = keyof typeof LogSource;

export const logger = {
	_build: (source: (typeof LogSource)[LogSourceKeys], msg: unknown[]): [string, ...unknown[]] => {
		return [`[${source}]`, ...msg];
	},

	debug: (source: (typeof LogSource)[LogSourceKeys] = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.debug(...logger._build(source, msg));
	},

	info: (source: (typeof LogSource)[LogSourceKeys] = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.info(...logger._build(source, msg));
	},

	warn: (source: (typeof LogSource)[LogSourceKeys] = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.warn(...logger._build(source, msg));
	},

	error: (source: (typeof LogSource)[LogSourceKeys] = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.error(...logger._build(source, msg));
	}
};
