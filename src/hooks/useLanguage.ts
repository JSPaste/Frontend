import useLanguageStore from '@/store/language';
import { languages } from '@/constants/languages';

export default function useLanguage() {
	const { languageId, setLanguageId } = useLanguageStore();

	return [
		languageId,
		(langId: string) => {
			const selectedLanguage = languages.find((l) => l.id === langId);

			if (!selectedLanguage) return;

			setLanguageId(selectedLanguage.id);
		},
		languages
	] as const;
}
