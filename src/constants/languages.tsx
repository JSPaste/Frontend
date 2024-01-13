import { MdAutoAwesome } from 'react-icons/md';
import {
	SiC,
	SiClojure,
	SiCoffeescript,
	SiCplusplus,
	SiCsharp,
	SiCss3,
	SiDocker,
	SiDotnet,
	SiFsharp,
	SiGnubash,
	SiGo,
	SiGraphql,
	SiHandlebarsdotjs,
	SiHtml5,
	SiJavascript,
	SiJson,
	SiKotlin,
	SiLess,
	SiLua,
	SiMarkdown,
	SiMicrosoftazure,
	SiMysql,
	SiPerl,
	SiPhp,
	SiPostgresql,
	SiPowershell,
	SiPug,
	SiPython,
	SiR,
	SiRedis,
	SiRuby,
	SiRust,
	SiSass,
	SiSqlite,
	SiSwift,
	SiTypescript,
	SiVisualbasic,
	SiXaml,
	SiYaml
} from 'react-icons/si';

export interface Language {
	id: string | undefined;
	name: string;
	icon?: JSX.Element;
	extension?: string;
}

export const languages: Language[] = [
	{
		id: undefined,
		name: 'Auto-detect',
		icon: <MdAutoAwesome size='12px' />
	},
	{
		id: 'typescript',
		name: 'TypeScript',
		icon: <SiTypescript size='12px' />,
		extension: 'ts'
	},
	{
		id: 'javascript',
		name: 'JavaScript',
		icon: <SiJavascript size='12px' />,
		extension: 'js'
	},
	{
		id: 'json',
		name: 'JSON',
		icon: <SiJson size='12px' />,
		extension: 'json'
	},
	{
		id: 'html',
		name: 'HTML',
		icon: <SiHtml5 size='12px' />,
		extension: 'html'
	},
	{
		id: 'css',
		name: 'CSS',
		icon: <SiCss3 size='12px' />,
		extension: 'css'
	},
	{
		id: 'apex',
		name: 'Apex',
		extension: 'page'
	},
	{
		id: 'azcli',
		name: 'Azure CLI',
		icon: <SiMicrosoftazure size='12px' />
	},
	{
		id: 'bat',
		name: 'Batch',
		icon: <SiGnubash size='12px' />,
		extension: 'bat'
	},
	{
		id: 'c',
		name: 'C',
		icon: <SiC size='12px' />,
		extension: 'c'
	},
	{
		id: 'clojure',
		name: 'Clojure',
		icon: <SiClojure size='12px' />,
		extension: 'clj'
	},
	{
		id: 'coffeescript',
		name: 'CoffeeScript',
		icon: <SiCoffeescript size='12px' />,
		extension: 'coffee'
	},
	{
		id: 'cpp',
		name: 'C++',
		icon: <SiCplusplus size='12px' />,
		extension: 'cpp'
	},
	{
		id: 'csharp',
		name: 'C#',
		icon: <SiCsharp size='12px' />,
		extension: 'cs'
	},
	{
		id: 'csp',
		name: 'CSP',
		extension: 'csp'
	},
	{
		id: 'dockerfile',
		name: 'Dockerfile',
		icon: <SiDocker size='12px' />,
		extension: 'Dockerfile'
	},
	{
		id: 'fsharp',
		name: 'F#',
		icon: <SiFsharp size='12px' />,
		extension: 'fsx'
	},
	{
		id: 'go',
		name: 'Go',
		icon: <SiGo size='12px' />,
		extension: 'go'
	},
	{
		id: 'graphql',
		name: 'GraphQL',
		icon: <SiGraphql size='12px' />
	},
	{
		id: 'handlebars',
		name: 'Handlebars',
		icon: <SiHandlebarsdotjs size='12px' />
	},
	{
		id: 'ini',
		name: 'INI',
		extension: 'ini'
	},
	{
		id: 'java',
		name: 'Java',
		extension: 'java'
	},
	{
		id: 'kotlin',
		name: 'Kotlin',
		icon: <SiKotlin size='12px' />,
		extension: 'kt'
	},
	{
		id: 'less',
		name: 'Less',
		icon: <SiLess size='12px' />
	},
	{
		id: 'lua',
		name: 'Lua',
		icon: <SiLua size='12px' />,
		extension: 'lua'
	},
	{
		id: 'markdown',
		name: 'Markdown',
		icon: <SiMarkdown size='12px' />,
		extension: 'md'
	},
	{
		id: 'msdax',
		name: 'Msdax',
		extension: 'msdax'
	},
	{
		id: 'mysql',
		name: 'MySQL',
		icon: <SiMysql size='12px' />,
		extension: 'mysql'
	},
	{
		id: 'objective-c',
		name: 'Objective-C',
		extension: 'm'
	},
	{
		id: 'pascal',
		name: 'Pascal',
		extension: 'pas'
	},
	{
		id: 'perl',
		name: 'Perl',
		icon: <SiPerl size='12px' />,
		extension: 'perl'
	},
	{
		id: 'pgsql',
		name: 'PostgreSQL',
		icon: <SiPostgresql size='12px' />
	},
	{
		id: 'php',
		name: 'PHP',
		icon: <SiPhp size='12px' />,
		extension: 'php'
	},
	{
		id: 'plaintext',
		name: 'Plaintext',
		extension: 'txt'
	},
	{
		id: 'postiats',
		name: 'Postiats',
		extension: 'ats'
	},
	{
		id: 'powerquery',
		name: 'Power Query',
		extension: 'pq'
	},
	{
		id: 'powershell',
		name: 'PowerShell',
		icon: <SiPowershell size='12px' />,
		extension: 'ps1'
	},
	{
		id: 'pug',
		name: 'Pug',
		icon: <SiPug size='12px' />,
		extension: 'pug'
	},
	{
		id: 'python',
		name: 'Python',
		icon: <SiPython size='12px' />,
		extension: 'py'
	},
	{
		id: 'r',
		name: 'R',
		icon: <SiR size='12px' />,
		extension: 'r'
	},
	{
		id: 'razor',
		name: 'Razor',
		icon: <SiDotnet size='12px' />,
		extension: 'cshtml'
	},
	{
		id: 'redis',
		name: 'Redis',
		icon: <SiRedis size='12px' />,
		extension: 'rdb'
	},
	{
		id: 'redshift',
		name: 'Redshift'
	},
	{
		id: 'ruby',
		name: 'Ruby',
		icon: <SiRuby size='12px' />,
		extension: 'rb'
	},
	{
		id: 'rust',
		name: 'Rust',
		icon: <SiRust size='12px' />,
		extension: 'rs'
	},
	{
		id: 'sb',
		name: 'SB',
		extension: 'sb'
	},
	{
		id: 'scheme',
		name: 'Scheme',
		extension: 'scm'
	},
	{
		id: 'scss',
		name: 'SCSS',
		icon: <SiSass size='12px' />,
		extension: 'scss'
	},
	{
		id: 'shell',
		name: 'Shell',
		icon: <SiGnubash size='12px' />,
		extension: 'sh'
	},
	{
		id: 'sol',
		name: 'SOL',
		extension: 'sol'
	},
	{
		id: 'sql',
		name: 'SQL',
		icon: <SiSqlite size='12px' />
	},
	{
		id: 'st',
		name: 'ST',
		extension: 'st'
	},
	{
		id: 'swift',
		name: 'Swift',
		icon: <SiSwift size='12px' />,
		extension: 'swift'
	},
	{
		id: 'tcl',
		name: 'Tcl',
		extension: 'tcl'
	},
	{
		id: 'vb',
		name: 'Visual Basic',
		icon: <SiVisualbasic size='12px' />,
		extension: 'vb'
	},
	{
		id: 'xml',
		name: 'XML',
		icon: <SiXaml size='12px' />,
		extension: 'xml'
	},
	{
		id: 'yaml',
		name: 'YAML',
		icon: <SiYaml size='12px' />,
		extension: 'yaml'
	}
];
