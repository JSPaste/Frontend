import { create } from 'zustand';

const languageStore = create<{
	languageId: string | undefined;
	autoLanguageId: string | undefined;
	setLanguageId: (languageId?: string) => void;
	setAutoLanguageId: (autoLanguageId?: string) => void;
}>((set) => ({
	languageId: undefined,
	autoLanguageId: undefined,
	setLanguageId: (languageId) => set({ languageId }),
	setAutoLanguageId: (autoLanguageId) => set({ autoLanguageId })
}));

export default languageStore;
