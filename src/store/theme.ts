import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const themeStore = create(
	persist<{
		themeId: string | undefined;
		setThemeId: (themeId: string) => void;
	}>(
		(set) => ({
			themeId: undefined,
			setThemeId: (themeId) => set({ themeId }),
		}),
		{
			name: 'theme-storage',
		},
	),
);

export default themeStore;
