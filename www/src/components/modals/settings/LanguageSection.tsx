import Dropdown from '#component/Dropdown.tsx';
import { type EditorLanguageKeys, editorLanguage, setEditorLanguage } from '../../../extensions/language.ts';

export default function LanguageSection() {
	return (
		<fieldset class='fieldset p-4 border border-base-300 rounded-box gap-4'>
			<legend class='fieldset-legend'>Language</legend>
			<Dropdown
				dropdownId='language'
				label='Language selector'
				listPosition='dropdown-top'
				labelValue={editorLanguage()}
				listValues={Object.keys(editorLanguage).sort()}
				onClick={(e) =>
					e.target.innerHTML in editorLanguage && setEditorLanguage(e.target.innerHTML as EditorLanguageKeys)
				}
			/>
		</fieldset>
	);
}
