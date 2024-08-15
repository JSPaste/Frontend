import FooterComponent from '@x-component/Footer';
import HeaderComponent, { type HeaderProps } from '@x-component/Header';
import { useState } from 'react';
import EditorComponent from '@x-component/Editor';

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

	return (
		<div className='flex flex-col h-lvh overflow-hidden'>
			<HeaderComponent lineNumber={position.lineNumber} columnNumber={position.columnNumber} />
			<EditorComponent
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
