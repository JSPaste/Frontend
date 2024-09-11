import Footer from '@x-component/Footer';
import Header from '@x-component/Header';
import GenericFallback from '@x-component/screens/GenericFallback';
import { themeStore } from '@x-util/store';
import {
	type Accessor,
	type Setter,
	Suspense,
	createContext,
	createEffect,
	createSignal,
	lazy,
	onMount
} from 'solid-js';

const Editor = lazy(() => import('@x-component/Editor'));

type EditorScreenProps = {
	documentName?: string;
	enableEdit?: boolean;
};

type EditorContext = {
	cursor: Accessor<{ line: number; column: number }>;
	setCursor: Setter<{ line: number; column: number }>;
	value: Accessor<string>;
	setValue: Setter<string>;
	isEditing: Accessor<boolean>;
	setIsEditing: Setter<boolean>;
};

export const EditorContext = createContext<EditorContext>({
	cursor: () => ({ line: 1, column: 1 }),
	setCursor: () => {},
	value: () => '',
	setValue: () => {},
	isEditing: () => false,
	setIsEditing: () => {}
});

export const EditorScreen = ({ documentName, enableEdit = false }: EditorScreenProps) => {
	const [cursor, setCursor] = createSignal({
		line: 1,
		column: 1
	});

	const [value, setValue] = createSignal('');

	const [isEditing, setIsEditing] = createSignal(false);

	createEffect(() => console.info(cursor()));

	onMount(() => {
		const themeState = themeStore();

		if (themeState().themeId) {
			document.documentElement.setAttribute('data-theme', themeState().themeId);
		}
	});

	return (
		<EditorContext.Provider
			value={{
				cursor,
				setCursor,
				value,
				setValue,
				isEditing,
				setIsEditing
			}}
		>
			<div class='flex flex-col h-dvh overflow-hidden'>
				<Header />
				<Suspense fallback={<GenericFallback />}>
					<Editor enableEdit={enableEdit} />
				</Suspense>
				<Footer documentName={documentName} enableEdit={enableEdit} />
			</div>
		</EditorContext.Provider>
	);
};
