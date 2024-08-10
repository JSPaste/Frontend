'use client';

import FooterComponent from '@/component/editor/FooterComponent';
import HeaderComponent, { type HeaderProps } from '@/component/editor/HeaderComponent';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const EditorComponent = dynamic(() => import('@/component/editor/EditorComponent'));

type EditorScreenProps = {
	documentName?: string;
	enableEdit?: boolean;
};

export default function ({ documentName, enableEdit = false }: EditorScreenProps) {
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
}
