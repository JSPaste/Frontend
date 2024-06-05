'use client';

import Controls from '@/components/general/Controls';
import Editor from '@/components/general/Editor';
import Information from '@/components/general/Information';
import type { DocumentScreenProps, InformationProps } from '@/types/Components.ts';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

const DocumentScreen = ({ enableEdit }: DocumentScreenProps) => {
	const documentId = typeof window !== 'undefined' ? location.pathname.split('/')[1] : undefined;

	const [information, setInformation] = useState<InformationProps>({
		lineNumber: 0,
		columnNumber: 0
	});

	const [value, setValue] = useState<string>('');

	const [isEditing, setIsEditing] = useState<boolean>(false);

	return (
		<Flex w='100%' h='100%' maxH='100vh' gap='0px' direction='column'>
			<Information {...information} />
			<Editor
				setInformation={setInformation}
				setValue={setValue}
				value={value}
				documentId={documentId}
				isEditing={isEditing}
				enableEdit={enableEdit}
			/>
			<Controls
				value={value}
				documentId={documentId}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				enableEdit={enableEdit}
			/>
		</Flex>
	);
};

export default DocumentScreen;
