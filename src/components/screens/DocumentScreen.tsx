import Controls from '@/components/general/Controls';
import Editor from '@/components/general/Editor';
import Information, { type InformationProps } from '@/components/general/Information';
import { Flex } from '@chakra-ui/react';
import { type ReactElement, useState } from 'react';

interface DocumentScreenProps {
	documentId?: string;
	enableEdit: boolean;
}

const DocumentScreen = ({ documentId, enableEdit }: DocumentScreenProps): ReactElement => {
	const [information, setInformation] = useState<InformationProps>({
		lineNumber: 0,
		columnNumber: 0
	});

	const [value, setValue] = useState<string>('');

	const [isEditing, setIsEditing] = useState<boolean>(false);

	return (
		<Flex w='100%' h='100%' gap='0px' direction='column'>
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
