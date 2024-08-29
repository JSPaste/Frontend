import chalk from 'chalk';
import log from 'loglevel';

export const logger = {
	set: (level: number | undefined) => {
		switch (level) {
			case 0: {
				log.setLevel('error');
				break;
			}
			case 1: {
				log.setLevel('warn');
				break;
			}
			case 2: {
				log.setLevel('info');
				break;
			}
			case 3: {
				log.setLevel('debug');
				break;
			}
			default: {
				log.setLevel('info');
			}
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: We don't know the type
	error: (...msg: any[]) => {
		log.error(chalk.bgBlack(chalk.red('[ERROR]'), chalk.yellow('[SERVER]'), ...msg));
	},

	// biome-ignore lint/suspicious/noExplicitAny: We don't know the type
	warn: (...msg: any[]) => {
		log.warn(chalk.bgBlack(chalk.yellow('[WARN]'), chalk.yellow('[SERVER]'), ...msg));
	},

	// biome-ignore lint/suspicious/noExplicitAny: We don't know the type
	info: (...msg: any[]) => {
		log.info(chalk.bgBlack(chalk.blue('[INFO]'), chalk.yellow('[SERVER]'), ...msg));
	},

	// biome-ignore lint/suspicious/noExplicitAny: We don't know the type
	debug: (...msg: any[]) => {
		log.debug(chalk.bgBlack(chalk.gray('[DEBUG]'), chalk.yellow('[SERVER]'), ...msg));
	}
} as const;
