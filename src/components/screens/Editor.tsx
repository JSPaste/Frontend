import Footer from '@x-component/Footer';
import Header from '@x-component/Header';
import GenericFallback from '@x-component/screens/GenericFallback';
import { Suspense, createSignal, lazy } from 'solid-js';

const Editor = lazy(() => import('@x-component/Editor'));

type EditorScreenProps = {
	documentName?: string;
	enableEdit?: boolean;
};

export type Cursor = {
	line: number;
	column: number;
};

export const EditorScreen = (props: EditorScreenProps) => {
	props.enableEdit = props.enableEdit ?? false;

	const [cursor, setCursor] = createSignal<Cursor>({
		line: 1,
		column: 1
	});

	const [value, setValue] = createSignal('');

	const [isEditing, setIsEditing] = createSignal(false);

	return (
		<div class='flex flex-col h-dvh overflow-hidden'>
			<Header cursor={cursor} />
			<Suspense fallback={<GenericFallback />}>
				<Editor
					setCursor={setCursor}
					setValue={setValue}
					value={value}
					isEditing={isEditing}
					enableEdit={props.enableEdit}
				/>
			</Suspense>
			<Footer
				value={value}
				documentName={props.documentName}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				enableEdit={props.enableEdit}
			/>
		</div>
	);
};
