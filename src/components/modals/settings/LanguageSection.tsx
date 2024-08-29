import { langs } from '@uiw/codemirror-extensions-langs';
import type { LangsKey } from '@x-util/langs.ts';
import { languageStore, themeStore } from '@x-util/store.ts';

export default function () {
	const { getTheme } = themeStore();
	const { language, setLanguage } = languageStore();

	return (
		<div className='flex flex-col gap-4'>
			<p>Editor lang:</p>
			<select
				className='select w-full max-w-xs'
				style={{
					backgroundColor: getTheme().palette.editor
				}}
				onChange={(e) => setLanguage(e.target.value as LangsKey)}
				value={language}
			>
				{Object.keys(langs).map((lang) => (
					<option key={lang} selected={lang === language} disabled={lang === language}>
						{lang}
					</option>
				))}
			</select>
		</div>
	);
}
