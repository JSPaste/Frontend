'use client';

import useTheme from '@/hooks/useTheme';
import {
	Text,
	Center,
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
	Stack,
	useDisclosure,
	Box,
	Spacer,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import SelectModal from './SelectModal';
import useThemeValues from '@/hooks/useThemeValues';

export default function SettingModal({
	isOpen,
	onClose,
}: Readonly<{ isOpen: boolean; onClose: any }>) {
	const { getThemeValue } = useThemeValues();
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
								<Heading size="sm" mb="10px">
									Language
								</Heading>

								{/*<Button
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
								/>*/}
							</FormLabel>
						</FormControl>

						<Heading size="sm" mb="10px">
							Theme selector
						</Heading>

						<Grid gap="10px" templateColumns="repeat(4, 1fr)">
							{themes.map((theme) => (
								<GridItem
									key={theme.id}
									w="90px"
									h="90px"
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
											bg={theme.values.lowAltTransparency}
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
													color={theme.values.text}
													noOfLines={1}
												>
													{theme.name}
												</Text>
												<Spacer />
												<SlideFade
													in={theme.id === themeId}
												>
													{theme.id === themeId && (
														<Icon
															as={MdCheckCircle}
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
					</Stack>
				</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
}
