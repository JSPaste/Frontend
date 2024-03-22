import { languages } from '@/components/Languages';
import useLanguageStore from '@/store/language';

export default function useLanguage() {
	const { languageId, autoLanguageId } = useLanguageStore();

	return [languageId, languages, autoLanguageId] as const;
}
