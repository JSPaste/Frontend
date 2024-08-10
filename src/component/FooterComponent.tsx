import FooterButtonComponent from '@/component/FooterButtonComponent';
import { themeStore } from '@/utils/store';
import { Flex, useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';

const SettingsModal = dynamic(() => import('@/component/modal/settings/SettingsModal.tsx'));

type ControlsProps = {
	documentName?: string;
	value: string;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	enableEdit: boolean;
};

// TODO: Dirty port from stable
export default function (props: ControlsProps) {
	const [isSaveLoading, setIsSaveLoading] = useState(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
	const toast = useToast();

	const { getThemePalette } = themeStore();

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

	return (
		<Flex className='gap-3 pt-2 pb-2 pl-2.5 pr-2.5' bg={getThemePalette().controls}>
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
				onClick={() => (location.href = `/${props.documentName}/raw`)}
				isDisabled={!props.documentName || props.isEditing}
			/>
			<FooterButtonComponent
				icon={<MdSettings fontSize='20px' />}
				label='Settings'
				onClick={() => setIsSettingsModalOpen(true)}
			/>
			{isSettingsModalOpen && (
				<SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
			)}
		</Flex>
	);
}
