import type { JSXElement } from 'solid-js';
import Dropdown from '#component/Dropdown.tsx';
import {
	type EditorLanguageKeys,
	editorLanguage,
	editorLanguageExtension,
	setEditorLanguage
} from '../../../extensions/language.ts';

export default function LanguageSection(): JSXElement {
	return (
		<fieldset class='fieldset p-4 border border-base-300 rounded-box gap-4'>
			<legend class='fieldset-legend'>Language</legend>
			<Dropdown
				dropdownId='language'
				label='Language selector'
				listPosition='dropdown-top'
				labelValue={editorLanguage()}
				listValues={Object.keys(editorLanguageExtension).sort()}
				onClick={(e: MouseEvent): void => {
					const target = e.target as HTMLElement | null;
					if (target && target.innerHTML in editorLanguageExtension) {
						setEditorLanguage(target.innerHTML as EditorLanguageKeys);
					}
				}}
			/>
		</fieldset>
	);
}
