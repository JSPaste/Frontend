'use client';

import useTheme from '@/hooks/useTheme';
import {
	Button,
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
	Stack,
	useDisclosure,
} from '@chakra-ui/react';
import { MdAutoAwesome, MdKeyboardArrowDown } from 'react-icons/md';
import SelectModal from './SelectModal';

export default function SettingModal({
	isOpen,
	onClose,
}: Readonly<{ isOpen: boolean; onClose: any }>) {
	const [themeId, setThemeId, themes] = useTheme();
	const {
		isOpen: isThemeOpen,
		onClose: onThemeClose,
		onOpen: onThemeOpen,
	} = useDisclosure();

	return (
		<Modal
			size="md"
			isCentered
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior="inside"
			returnFocusOnClose={false}
		>
			<ModalOverlay />
			<ModalContent bg="popup">
				<ModalHeader>Settings</ModalHeader>
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

								<Button
									id="theme"
									rightIcon={<MdKeyboardArrowDown />}
									onClick={onThemeOpen}
								>
									{themes.find(
										(theme) => theme.id === themeId,
									)?.name ?? themes[0].name}
								</Button>
								<SelectModal
									isOpen={isThemeOpen}
									onClose={onThemeClose}
									listItems={themes.map(({ id, name }) => ({
										id,
										name,
										details:
											themeId === id
												? 'Recently used'
												: 'Set theme',
										icon: <MdAutoAwesome />,
									}))}
									initialSelectedId={themeId}
									onPreview={setThemeId}
									onSelect={setThemeId}
								/>
							</FormLabel>
						</FormControl>

						<Heading size="sm" mb="10px">
							Theme selector
						</Heading>

						<Grid gap="10px" templateColumns="repeat(3, 1fr)">
							<GridItem
								w="100%"
								h="150px"
								bg="#7289DA"
							></GridItem>
							<GridItem
								w="100%"
								h="150px"
								bg="#DFEBEB"
							></GridItem>
							<GridItem
								w="100%"
								h="150px"
								bg="#FFFFFF"
							></GridItem>
						</Grid>
					</Stack>
				</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
}
