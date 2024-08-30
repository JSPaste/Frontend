import FooterComponent from '@x-component/Footer';
import HeaderComponent, { type HeaderProps } from '@x-component/Header';
import GenericFallback from '@x-component/screens/GenericFallback.tsx';
import { themeStore } from '@x-util/store.ts';
import { useEffect, useState } from 'react';
import { clientOnly } from 'vike-react/clientOnly';

const EditorComponent = clientOnly(() => import('@x-component/Editor'));

type EditorScreenProps = {
	documentName?: string;
	enableEdit?: boolean;
	overrideDocumentContent?: string;
};

export default function ({ documentName, enableEdit = false, overrideDocumentContent }: EditorScreenProps) {
	const [position, setPosition] = useState<HeaderProps>({
		lineNumber: 1,
		columnNumber: 1
	});

	const [value, setValue] = useState<string>('');

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const { themeId } = themeStore();

	useEffect(() => {
		if (themeId) {
			document.documentElement.setAttribute('data-theme', themeId);
		}
	}, [themeId]);

	return (
		<div className='flex flex-col h-dvh overflow-hidden'>
			<HeaderComponent lineNumber={position.lineNumber} columnNumber={position.columnNumber} />
			<EditorComponent
				fallback={<GenericFallback />}
				setCursorLocation={setPosition}
				setValue={setValue}
				value={overrideDocumentContent ? overrideDocumentContent : value}
				documentName={documentName}
				isEditing={isEditing}
				enableEdit={enableEdit}
			/>
			<FooterComponent
				value={value}
				documentName={documentName}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				enableEdit={enableEdit}
			/>
		</div>
	);
}
