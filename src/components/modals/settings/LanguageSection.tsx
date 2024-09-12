import { type LangKeys, langs } from '@x-util/langs';
import { language, setLanguage } from '@x-util/store';

export default function LanguageSection() {
	return (
		<div class='flex flex-col gap-4'>
			<p>Editor lang:</p>
			<select
				name='language-select'
				class='select w-full max-w-xs bg-base-200'
				onChange={(e) => setLanguage(e.target.value as LangKeys)}
				value={language()}
			>
				{Object.keys(langs)
					.sort()
					.map((lang) => (
						<option>{lang}</option>
					))}
			</select>
		</div>
	);
}
