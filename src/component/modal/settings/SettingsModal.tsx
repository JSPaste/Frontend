import { themeStore } from '@/utils/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import ThemeSection from './ThemeSection';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function (props: SettingsModalProps) {
	const { getThemePalette } = themeStore();

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} size='xl'>
			<ModalOverlay bg='none' backdropFilter='auto' backdropBlur='3px' />
			<ModalContent bg={getThemePalette().popup}>
				<ModalHeader>Settings</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<ThemeSection />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
