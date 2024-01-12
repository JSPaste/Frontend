import { create } from 'zustand';

const languageStore = create<{
	languageId: string | undefined;
	setLanguageId: (languageId: string) => void;
}>((set) => ({
	languageId: undefined,
	setLanguageId: (languageId) => set({ languageId })
}));

export default languageStore;
