export const newLangs = {
	angular: () => import('@codemirror/lang-angular').then((lang) => lang.angular),
	cpp: () => import('@codemirror/lang-cpp').then((lang) => lang.cpp),
	css: () => import('@codemirror/lang-css').then((lang) => lang.css),
	go: () => import('@codemirror/lang-go').then((lang) => lang.go),
	html: () => import('@codemirror/lang-html').then((lang) => lang.html),
	java: () => import('@codemirror/lang-java').then((lang) => lang.java),
	javascript: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript),
	json: () => import('@codemirror/lang-json').then((lang) => lang.json),
	liquid: () => import('@codemirror/lang-liquid').then((lang) => lang.liquid),
	markdown: () => import('@codemirror/lang-markdown').then((lang) => lang.markdown),
	php: () => import('@codemirror/lang-php').then((lang) => lang.php),
	python: () => import('@codemirror/lang-python').then((lang) => lang.python),
	rust: () => import('@codemirror/lang-rust').then((lang) => lang.rust),
	sass: () => import('@codemirror/lang-sass').then((lang) => lang.sass),
	vue: () => import('@codemirror/lang-vue').then((lang) => lang.vue),
	xml: () => import('@codemirror/lang-xml').then((lang) => lang.xml),
	yaml: () => import('@codemirror/lang-yaml').then((lang) => lang.yaml)
} as const;

export const legacyLangs = {} as const;

export const langs = {
	...newLangs,
	...legacyLangs
} as const;

export type LangKeys = keyof typeof langs;
