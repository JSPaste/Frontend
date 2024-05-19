import { create } from 'zustand';
/*import { persist } from 'zustand/middleware';
persist<{
		themeId: string | undefined;
		setThemeId: (themeId: string) => void;
	}>(*/

const themeStore = create<{
	themeId: string | undefined;
	setThemeId: (themeId: string) => void;
}>((set) => ({
	themeId: undefined,
	setThemeId: (themeId) => set({ themeId })
}));

export default themeStore;
