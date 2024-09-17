import Footer from '@x-component/Footer';
import Header from '@x-component/Header';
import GenericFallback from '@x-component/screens/GenericFallback';
import { theme } from '@x-util/store';
import { Suspense, createEffect, createSignal, lazy } from 'solid-js';

const Editor = lazy(() => import('@x-component/Editor'));

type EditorScreenProps = {
	documentName?: string;
	enableEdit?: boolean;
};

export type Cursor = {
	line: number;
	column: number;
};

export const EditorScreen = ({ documentName, enableEdit = false }: EditorScreenProps) => {
	const [cursor, setCursor] = createSignal<Cursor>({
		line: 1,
		column: 1
	});

	const [value, setValue] = createSignal('');

	const [isEditing, setIsEditing] = createSignal(false);

	createEffect(() => document.documentElement.setAttribute('data-theme', theme()));

	return (
		<div class='flex flex-col h-dvh overflow-hidden'>
			<Header cursor={cursor} />
			<Suspense fallback={<GenericFallback />}>
				<Editor
					setCursor={setCursor}
					setValue={setValue}
					value={value}
					isEditing={isEditing}
					enableEdit={enableEdit}
				/>
			</Suspense>
			<Footer
				value={value}
				documentName={documentName}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				enableEdit={enableEdit}
			/>
		</div>
	);
};
