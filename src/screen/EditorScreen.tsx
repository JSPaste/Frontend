'use client';

import EditorComponent from '@/component/EditorComponent';
import FooterComponent from '@/component/FooterComponent';
import HeaderComponent, { type HeaderProps } from '@/component/HeaderComponent';
import { frontendStore, themeStore } from '@/utils/store.ts';
import { Heading, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

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

	const { storageHydrated } = frontendStore();

	const { getThemePalette } = themeStore();

	if (!storageHydrated) {
		return (
			<div
				className='flex flex-col h-lvh justify-center items-center gap-6'
				style={{
					backgroundColor: getThemePalette().editor
				}}
			>
				<Spinner size='xl' color={getThemePalette().primaryDisplay} />
				<Heading as='h1' size='lg' color={getThemePalette().text}>
					JSPaste
				</Heading>
			</div>
		);
	}

	return (
		<div className='flex flex-col h-lvh'>
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
