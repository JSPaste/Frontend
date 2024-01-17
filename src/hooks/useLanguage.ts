import useLanguageStore from '@/store/language';
import { languages } from '@/components/Languages';

export default function useLanguage() {
	const { languageId, autoLanguageId } = useLanguageStore();

	return [languageId, languages, autoLanguageId] as const;
}
