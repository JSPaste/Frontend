'use client';

import {
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
} from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

// TODO: Add working theme and lang selection
export const SettingsModal = ({
	isOpen,
	onClose,
}: Readonly<{ isOpen: boolean; onClose: any }>) => {
	return (
		<Modal
			size="md"
			isCentered
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior="inside"
		>
			<ModalOverlay backdropFilter="blur(4px);" />

			<ModalContent bg="controls">
				<ModalHeader> Settings </ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Stack spacing="15px">
						<FormControl
							gap="5px"
							display="flex"
							flexDirection="column"
						>
							<FormLabel htmlFor="language">
								<Heading size="sm" mb="10px">
									Language
								</Heading>

								<Select
									id="language"
									onClick={() => {}}
									placeholder="Select language..."
									icon={<MdKeyboardArrowDown />}
								>
									<option value="typescript">
										TypeScript
									</option>
									<option value="rust">Rust</option>
								</Select>
							</FormLabel>
						</FormControl>

						<Heading size="sm" mb="10px">
							Theme
						</Heading>

						<Grid gap="10px" templateColumns="repeat(3, 1fr)">
							<GridItem w="100%" h="150px" bg="red"></GridItem>
							<GridItem w="100%" h="150px" bg="red"></GridItem>
							<GridItem w="100%" h="150px" bg="red"></GridItem>
						</Grid>
					</Stack>
				</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
};
