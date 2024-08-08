import { FooterButtonComponent } from '@/component/editor/FooterButtonComponent';
import useThemeValues from '@/hook/useThemeValue';
import { ThemePalette } from '@/utils/themes';
import { Flex, useToast } from '@chakra-ui/react';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { MdEdit, MdSave, MdSubject } from 'react-icons/md';

type ControlsProps = {
	documentName?: string;
	value: string;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	enableEdit: boolean;
};

// TODO: Dirty port from stable
export const FooterComponent = (props: ControlsProps) => {
	const { getThemeValue } = useThemeValues();
	const [isSaveLoading, setIsSaveLoading] = useState(false);
	const toast = useToast();

	const handleSave = async () => {
		setIsSaveLoading(true);
		const result = null;
		setIsSaveLoading(false);

		if (!result) {
			toast({
				title: 'An error occurred, please try again.',
				description: 'Check your Internet connection and try again.',
				position: 'top-right',
				status: 'error',
				variant: 'subtle',
				isClosable: true,
				duration: 10000
			});
		}

		location.href = '/abc123';
		console.info(result);
	};

	const handleNavigation = (url: string) => {
		location.href = url;
	};

	return (
		<Flex className='gap-3 pt-2 pb-2 pl-2.5 pr-2.5' bg={getThemeValue(ThemePalette.Controls)}>
			<div className='flex-auto' />
			<FooterButtonComponent
				icon={<MdSave fontSize='20px' />}
				label={!props.value ? 'You need to write something to save!' : 'Save'}
				onClick={handleSave}
				isLoading={isSaveLoading}
				isDisabled={!props.value}
			/>
			<FooterButtonComponent
				icon={<MdEdit fontSize='20px' />}
				label='Edit'
				onClick={() => props.setIsEditing(true)}
				isDisabled={props.isEditing || !props.enableEdit}
			/>
			<FooterButtonComponent
				icon={<MdSubject fontSize='20px' />}
				label='View Raw'
				onClick={() => handleNavigation(`/documents/${props.documentName}/raw`)}
				isDisabled={Boolean(props.documentName) || props.isEditing}
			/>
		</Flex>
	);
};
