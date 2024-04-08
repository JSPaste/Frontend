import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const serverURLStore = create(
	persist<{
		serverURL: string | undefined;
		setServerURL: (serverURL: string) => void;
	}>(
		(set) => ({
			serverURL: undefined,
			setServerURL: (serverURL) => set({ serverURL })
		}),
		{
			name: 'server-store'
		}
	)
);

export default serverURLStore;
