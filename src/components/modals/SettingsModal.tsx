'use client';

import useTheme from '@/hooks/useTheme';
import {
	Box,
	Text,
	Flex,
	Grid,
	Icon,
	Modal,
	Stack,
	Spacer,
	Button,
	Heading,
	GridItem,
	ModalBody,
	FormLabel,
	SlideFade,
	FormControl,
	ModalFooter,
	ModalHeader,
	ModalContent,
	ModalOverlay,
	useDisclosure,
	ModalCloseButton,
} from '@chakra-ui/react';
import SelectModal from './SelectModal';
import useLanguage from '@/hooks/useLanguage';
import useThemeValues from '@/hooks/useThemeValues';
import { MdCheckCircle, MdFlag, MdKeyboardArrowDown } from 'react-icons/md';

export default function SettingModal({
	isOpen,
	onClose,
}: Readonly<{ isOpen: boolean; onClose: any }>) {
	const { getThemeValue } = useThemeValues();
	const [languageId, setLanguageId, languages] = useLanguage();
	const [themeId, setThemeId, themes] = useTheme();
	const {
		isOpen: isLangOpen,
		onClose: onLangClose,
		onOpen: onLangOpen,
	} = useDisclosure();

	return (
		<Modal
			size="md"
			isCentered
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior="inside"
			returnFocusOnClose={false}
			closeOnOverlayClick={false}
		>
			<ModalOverlay />
			<ModalContent bg={getThemeValue('popup')}>
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
								<Heading size="sm">Language</Heading>
							</FormLabel>
							<Button
								id="language"
								rightIcon={<MdKeyboardArrowDown />}
								onClick={onLangOpen}
							>
								{languages.find(
									(lang) => lang.id === languageId,
								)?.name ?? languages[0].name}
							</Button>
							<SelectModal
								isOpen={isLangOpen}
								onClose={onLangClose}
								listItems={languages.map(({ id, name }) => ({
									id,
									name,
									details:
										languageId === id
											? 'Recently used'
											: 'Set language',
									icon: <MdFlag />,
								}))}
								initialSelectedId={languageId}
								onPreview={setLanguageId}
								onSelect={setLanguageId}
							/>
						</FormControl>
						<FormControl
							gap="5px"
							display="flex"
							flexDirection="column"
						>
							<FormLabel htmlFor="theme">
								<Heading size="sm">Theme selector</Heading>
							</FormLabel>
							<Grid
								gap="10px"
								id="theme"
								templateColumns={[
									'repeat(2, 1fr)',
									'repeat(4, 1fr)',
								]}
							>
								{themes.map((theme, i) => (
									<GridItem
										key={theme.id}
										w={['100px', '90px']}
										h={['100px', '90px']}
										bg={theme.values.primaryDisplay}
										borderRadius="10px"
										style={
											theme.id === themeId
												? {
														outline: '3px solid',
														outlineOffset: '-3px',
														outlineColor:
															theme.values
																.midTransparency,
													}
												: undefined
										}
										_hover={{
											outline: '3px solid',
											outlineOffset: '-3px',
											outlineColor:
												theme.values.lowTransparency,
										}}
										onClick={() => setThemeId(theme.id)}
									>
										<Flex
											h="100%"
											w="100%"
											gap="5px"
											direction="column"
											alignItems="center"
										>
											<Spacer />
											<Box
												w="100%"
												borderBottomRadius="10px"
												bg={
													theme.values
														.lowAltTransparency
												}
											>
												<Flex
													w="100%"
													gap="2px"
													p="5px"
													direction="row"
													alignItems="center"
												>
													<Text
														fontSize="15px"
														color={
															theme.values.text
														}
														noOfLines={1}
													>
														{theme.name}
													</Text>
													<Spacer />
													<SlideFade
														in={
															theme.id ===
																themeId ||
															(!themeId &&
																i === 0)
														}
													>
														{(theme.id ===
															themeId ||
															(!themeId &&
																i === 0)) && (
															<Icon
																as={
																	MdCheckCircle
																}
																zIndex={40}
																fontSize={[
																	'20px',
																	'22px',
																]}
															/>
														)}
													</SlideFade>
												</Flex>
											</Box>
										</Flex>
									</GridItem>
								))}
							</Grid>
						</FormControl>
					</Stack>
				</ModalBody>
				<ModalFooter>
				<Button colorScheme='#5256F2' mr={3}> Save changes </Button>
				<Button colorScheme='red' onClick={onClose}>Discard changes</Button> 
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
