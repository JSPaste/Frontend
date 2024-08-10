'use client';

import { EditorComponent } from '@/component/editor/EditorComponent';
import { FooterComponent } from '@/component/editor/FooterComponent';
import { HeaderComponent, type HeaderProps } from '@/component/editor/HeaderComponent';
import { useState } from 'react';

type EditorScreenProps = {
	documentName?: string;
	enableEdit?: boolean;
};

export const EditorScreen = ({ documentName, enableEdit = false }: EditorScreenProps) => {
	const [position, setPosition] = useState<HeaderProps>({
		lineNumber: 1,
		columnNumber: 1
	});

	const [value, setValue] = useState<string>('');

	const [isEditing, setIsEditing] = useState<boolean>(false);

	return (
		<div className='flex flex-col h-lvh'>
			<HeaderComponent lineNumber={position.lineNumber} columnNumber={position.columnNumber} />
			<EditorComponent
				setCursorLocation={setPosition}
				setValue={setValue}
				value={value}
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
};
