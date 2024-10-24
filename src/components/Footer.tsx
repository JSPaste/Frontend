import { IconAlignJustified, IconDeviceFloppy, IconPencil, IconSettings } from '@tabler/icons-solidjs';
import FooterButton from '@x-component/FooterButton';
import Settings from '@x-component/modals/settings/Settings';
import { type Accessor, type Setter, createSignal } from 'solid-js';

type FooterProps = {
	documentName?: string;
	enableEdit: boolean;
	isEditing: Accessor<boolean>;
	setIsEditing: Setter<boolean>;
	value: Accessor<string>;
};

export default function Footer(props: FooterProps) {
	const [isSaveLoading, setIsSaveLoading] = createSignal(false);

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
				label={props.value() ? 'Save' : 'You need to write something to save!'}
				onClick={handleSave}
				isLoading={isSaveLoading()}
				isDisabled={!props.value()}
			/>
			<FooterButton
				icon={<IconPencil size={20} />}
				label='Edit'
				onClick={() => props.setIsEditing(true)}
				isDisabled={props.isEditing() || !props.enableEdit}
			/>
			<FooterButton
				icon={<IconAlignJustified size={20} />}
				label='View Raw'
				onClick={() => window.open(`/${props.documentName}/raw`)}
				isDisabled={!props.documentName || props.isEditing()}
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
