import useLanguageStore from '@/store/language';
import { languages } from '@/constants/languages';

export default function useLanguage() {
	const { languageId, autoLanguageId } = useLanguageStore();

	return [languageId, languages, autoLanguageId] as const;
}
