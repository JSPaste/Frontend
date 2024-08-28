import FooterButtonComponent from '@x-component/FooterButton';
import SettingsModal from '@x-component/modals/settings/Settings';
import { themeStore } from '@x-util/store';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';

type ControlsProps = {
	documentName?: string;
	value: string;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	enableEdit: boolean;
};

export default function ({ documentName, value, isEditing, setIsEditing, enableEdit }: ControlsProps) {
	const [isSaveLoading, setIsSaveLoading] = useState(false);

	const { getTheme } = themeStore();

	const handleSave = async () => {
		setIsSaveLoading(true);
		const result = null;
		setIsSaveLoading(false);

		location.href = '/abc123';
		console.info(result);
	};

	return (
		<div className='flex gap-3 pt-2 pb-2 pl-2.5 pr-2.5' style={{ backgroundColor: getTheme().palette.information }}>
			<div className='flex-auto' />
			<FooterButtonComponent
				icon={<MdSave fontSize='20px' />}
				label={!value ? 'You need to write something to save!' : 'Save'}
				onClick={handleSave}
				isLoading={isSaveLoading}
				isDisabled={!value}
			/>
			<FooterButtonComponent
				icon={<MdEdit fontSize='20px' />}
				label='Edit'
				onClick={() => setIsEditing(true)}
				isDisabled={isEditing || !enableEdit}
			/>
			<FooterButtonComponent
				icon={<MdSubject fontSize='20px' />}
				label='View Raw'
				onClick={() => (location.href = `/${documentName}/raw`)}
				isDisabled={!documentName || isEditing}
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
