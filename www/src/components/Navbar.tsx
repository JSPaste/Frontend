import { createScrollPosition } from '@solid-primitives/scroll';
import { useNavigate } from '@solidjs/router';
import { IconFileFilled, IconSettingsFilled, IconUpload } from '@tabler/icons-solidjs';
import { createEffect, createSignal, on } from 'solid-js';
import NavbarButton from '#component/NavbarButton.tsx';
import { getEditorContext } from '#util/getEditorContext.ts';
import { client } from '#util/library.ts';
import { editorContent } from '#util/persistence.ts';

export default function Navbar() {
	const navigate = useNavigate();
	const ctx = getEditorContext();

	const [visible, setVisible] = createSignal(true);
	const [isUploading, setIsUploading] = createSignal(false);

	const editorScroll = createScrollPosition(() => {
		return ctx.container()?.querySelector('.cm-scroller') || undefined;
	});

	createEffect(
		on(
			() => editorScroll.y,
			(current, previous) => {
				// biome-ignore lint/style/noNonNullAssertion: We don't care if previous is undefined
				if (current < previous!) {
					setVisible(true);
					// biome-ignore lint/style/noNonNullAssertion: We don't care if previous is undefined
				} else if (current > 10 && current > previous!) {
					setVisible(false);
				}
			},
			{ defer: true }
		)
	);

	const handleUpload = async () => {
		const content = editorContent();

		if (content.trim() === '') {
			alert('Nothing to upload.');
			return;
		}

		const confirmed = confirm(
			'Uploading a document from the editor is considered experimental and its contents may be corrupted. Want to proceed?'
		);

		if (confirmed) {
			setIsUploading(true);

			try {
				// FIXME: Handle HTTP errors inside library
				const result = await client().publish(content);

				if (result) {
					alert(`OK!\nKey: ${result.key}\nSecret: ${result.secret}`);
					navigate(`/${result.key}`);
				} else {
					alert('Failed to upload document.');
				}
			} catch (error) {
				alert('Failed to upload document.');
				console.error(error);
			} finally {
				setIsUploading(false);
			}
		}
	};

	return (
		<div
			class='fixed bottom-0 left-0 right-0 portrait:w-full landscape:w-fit landscape:rounded-t-sm landscape:mx-auto landscape:gap-4 flex justify-around bg-base-100 z-10 p-2 transition-all duration-200'
			classList={{ 'translate-y-full': !visible() }}
		>
			<NavbarButton icon={<IconFileFilled size={20} />} label='New' onClick={() => navigate('/')} />
			<NavbarButton
				disabled={isUploading() && !ctx.editable()}
				highlight={true}
				icon={<IconUpload size={20} />}
				label={isUploading() ? '...' : 'Upload'}
				onClick={handleUpload}
			/>
			<NavbarButton
				icon={<IconSettingsFilled size={20} />}
				label='Settings'
				onClick={() => (document.getElementById('modal_settings') as HTMLDialogElement).showModal()}
			/>
		</div>
	);
}
