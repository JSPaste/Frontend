'use client';

import { 
    Stack,
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    ModalCloseButton
} from '@chakra-ui/react';

export const SettingsModal = (
    { isOpen, onClose }: 
    Readonly<{ isOpen: boolean; onClose: () => any }>
) => {
    return (
        <Modal
            size='md'
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior='inside'
        >
            <ModalOverlay backdropFilter='blur(4px);' />

            <ModalContent bg='controls'>
                <ModalHeader> Settings </ModalHeader>
                <ModalCloseButton />
            </ModalContent>
        </Modal>
    )
}