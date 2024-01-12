import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Information, { type EditorInformation } from '@/components/general/Information';
import Editor from '@/components/general/Editor';
import Controls from '@/components/general/Controls';

export default function DocumentScreen({
	documentId,
	enableEdit
}: Readonly<{
	documentId?: string;
	enableEdit: boolean;
}>) {
	const [information, setInformation] = useState<EditorInformation>({
		lineNumber: 0,
		columnNumber: 0
	});

	const [value, setValue] = useState<string>('');
	const [isEditing, setIsEditing] = useState<boolean>(false);

	return (
		<Flex w='100%' h='100%' gap='0px' direction='column'>
			<Information
				lineNumber={information.lineNumber}
				columnNumber={information.columnNumber}
			/>
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
}
