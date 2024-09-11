import { IconAlignJustified, IconDeviceFloppy, IconPencil, IconSettings } from '@tabler/icons-solidjs';
import FooterButton from '@x-component/FooterButton';
import Settings from '@x-component/modals/settings/Settings';
import { EditorContext } from '@x-component/screens/Editor';
import { createSignal, useContext } from 'solid-js';

type ControlsProps = {
	documentName?: string;
	enableEdit: boolean;
};

export default function Footer({ documentName, enableEdit }: ControlsProps) {
	const [isSaveLoading, setIsSaveLoading] = createSignal(false);

	const { value, setIsEditing, isEditing } = useContext(EditorContext);

	const handleSave = async () => {
		setIsSaveLoading(true);
		const result = null;
		setIsSaveLoading(false);

		location.href = '/abc123';
		console.info(result);
	};

	return (
		<div class='flex gap-3 pt-2 pb-2 pl-2.5 pr-2.5 bg-base-200'>
			<div class='flex-auto' />
			<FooterButton
				icon={<IconDeviceFloppy size={20} />}
				label={!value ? 'You need to write something to save!' : 'Save'}
				onClick={handleSave}
				isLoading={isSaveLoading()}
				isDisabled={!value()}
			/>
			<FooterButton
				icon={<IconPencil size={20} />}
				label='Edit'
				onClick={() => setIsEditing(true)}
				isDisabled={isEditing() || !enableEdit}
			/>
			<FooterButton
				icon={<IconAlignJustified size={20} />}
				label='View Raw'
				onClick={() => (location.href = `/${documentName}/raw`)}
				isDisabled={!documentName || isEditing()}
			/>
			<FooterButton
				icon={<IconSettings size={20} />}
				label='Settings'
				onClick={() => (document.getElementById('modal_settings') as HTMLDialogElement).showModal()}
			/>
			<Settings />
		</div>
	);
}
