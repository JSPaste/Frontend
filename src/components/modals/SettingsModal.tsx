'use client';

import useTheme from '@/hooks/useTheme';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SlideFade,
	Spacer,
	Stack,
	Text,
	useDisclosure,
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
								gap="20px"
								id="theme"
								templateColumns={[
									'repeat(2, 1fr)',
									'repeat(4, 1fr)',
								]}
							>
								{themes.map((theme, i) => (
									<GridItem
										key={theme.id}
										w={['100px', '85px']}
										h={['70px', '70px']}
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
														paddingX="5px"
														fontSize="12px"
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
																	'15px',
																	'15px',
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
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
}
