import Dropdown from '#component/Dropdown.tsx';
import { type LangKeys, langs, language, setLanguage } from '#util/langs.ts';

export default function LanguageSection() {
	return (
		<fieldset class='fieldset p-4 border border-base-300 rounded-box gap-4'>
			<legend class='fieldset-legend'>Language</legend>
			<Dropdown
				dropdownId='language'
				label='Language selector'
				listPosition='dropdown-top'
				labelValue={language()}
				listValues={Object.keys(langs).sort()}
				onClick={(e) =>
					e.currentTarget.innerHTML in langs && setLanguage(e.currentTarget.innerHTML as LangKeys)
				}
			/>
		</fieldset>
	);
}
