export enum LogSource {
	Unknown = 'UNKNOWN',
	Editor = 'EDITOR',
	Backend = 'BACKEND',
	Network = 'NETWORK'
}

export const logger = {
	_build: (source: LogSource, msg: unknown[]): [string, ...unknown[]] => {
		return [`[${source}]`, ...msg];
	},

	debug: (source: LogSource = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.debug(...logger._build(source, msg));
	},

	info: (source: LogSource = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.info(...logger._build(source, msg));
	},

	warn: (source: LogSource = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.warn(...logger._build(source, msg));
	},

	error: (source: LogSource = LogSource.Unknown, ...msg: unknown[]): void => {
		// biome-ignore lint/suspicious/noConsole: Abstract logger
		console.error(...logger._build(source, msg));
	}
};
