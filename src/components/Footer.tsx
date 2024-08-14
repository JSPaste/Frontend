import { useToast } from '@chakra-ui/react';
import FooterButtonComponent from '@x-component/FooterButton';
import { themeStore } from '@x-util/store';
import { type Dispatch, type SetStateAction, lazy, useState } from 'react';
import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';

const SettingsModal = lazy(() => import('@x-component/modals/settings/Settings'));

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

	const toast = useToast();

	const { getTheme } = themeStore();

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
		<div className='flex gap-3 pt-2 pb-2 pl-2.5 pr-2.5' style={{ backgroundColor: getTheme().palette.information }}>
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
				onClick={() => (document.getElementById('modal_settings') as HTMLDialogElement).showModal()}
			/>
			<SettingsModal />
		</div>
	);
}
