import { langs } from '@uiw/codemirror-extensions-langs';
import type { LangsKey } from '@x-util/langs.ts';
import { languageStore } from '@x-util/store.ts';

export default function () {
	const { language, setLanguage } = languageStore();

	return (
		<div className='flex flex-col gap-4'>
			<p>Editor lang:</p>
			<select
				className='select w-full max-w-xs bg-base-300'
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
