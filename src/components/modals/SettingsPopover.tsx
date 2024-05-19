import useLanguageStore from '@/store/language';
import type { SettingPopoverProps } from '@/types/Components.ts';
import useLanguage from '@/utils/useLanguage';
import useServerURL from '@/utils/useServerURL';
import useTheme from '@/utils/useTheme';
import useThemeValues from '@/utils/useThemeValues';
import {
	Box,
	Button,
	Center,
	CloseButton,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	SimpleGrid,
	SlideFade,
	Spacer,
	Stack,
	Text,
	useBreakpointValue,
	useDisclosure
} from '@chakra-ui/react';
import { type ReactElement, useState } from 'react';
import { MdAdd, MdCheckCircle, MdFlag, MdKeyboardArrowDown, MdPalette } from 'react-icons/md';
import SelectModal from './SelectModal';

const SettingsPopover = ({ trigger }: SettingPopoverProps): ReactElement => {
	const { getThemeValue } = useThemeValues();
	const [languageId, languages] = useLanguage();
	const { setLanguageId } = useLanguageStore();
	const [themeId, setThemeId, themes] = useTheme();
	const [serverURL, setServerURL] = useServerURL();

	const { isOpen: isLangOpen, onClose: onLangClose, onOpen: onLangOpen } = useDisclosure();

	const { isOpen: isThemeOpen, onClose: onThemeClose, onOpen: onThemeOpen } = useDisclosure();

	const [serverURLInput, setServerURLInput] = useState(serverURL ?? '');
	const [isServerURLInputFocused, setIsServerURLInputFocused] = useState(false);

	let serverInputError: string | null = null;

	if (serverURLInput) {
		try {
			const u = new URL(serverURLInput);

			if (u.protocol !== 'http:' && u.protocol !== 'https:') {
				serverInputError = 'Please provide a valid server URL';
			}
		} catch {}
	}

	const quickThemeLimit = useBreakpointValue([3, 4]) ?? 4;

	return (
		<>
			<SelectModal
				isOpen={isLangOpen}
				onClose={onLangClose}
				listItems={languages.map(({ id, name, extension }) => ({
					id,
					name,
					details: languageId === id ? 'Recently used' : 'Set language',
					icon: <MdFlag />,
					alias: extension ? [extension] : undefined
				}))}
				initialSelectedId={languageId}
				onPreview={setLanguageId}
				onSelect={setLanguageId}
			/>
			<SelectModal
				isOpen={isThemeOpen}
				onClose={onThemeClose}
				listItems={themes.map(({ id, name }) => ({
					id,
					name,
					details: themeId === id ? 'Recently used' : 'Set theme',
					icon: <MdPalette />
				}))}
				initialSelectedId={themeId}
				onPreview={setThemeId}
				onSelect={setThemeId}
			/>
			<Popover isLazy>
				<PopoverTrigger>{trigger}</PopoverTrigger>
				<Portal>
					<PopoverContent width={['90vw', '430px']} bg={getThemeValue('popup')} margin='5px' mr='20px'>
						<PopoverHeader>Settings</PopoverHeader>
						<PopoverCloseButton />
						<PopoverBody>
							<Stack spacing='15px'>
								<FormControl gap='5px' display='flex' flexDirection='column'>
									<FormLabel htmlFor='language'>
										<Heading size='sm'>Language</Heading>
									</FormLabel>
									<Button
										size='sm'
										id='language'
										rightIcon={<MdKeyboardArrowDown />}
										onClick={onLangOpen}
									>
										{languages.find((lang) => lang.id === languageId)?.name ?? languages[0]?.name}
									</Button>
								</FormControl>
								<FormControl gap='5px' display='flex' flexDirection='column'>
									<FormLabel htmlFor='theme'>
										<Heading size='sm'>Theme selector</Heading>
									</FormLabel>
									<SimpleGrid gap='10px' id='theme' minChildWidth={['100px', '70px']}>
										{themes.slice(0, quickThemeLimit + 1).map((theme, i) => (
											<Center
												key={i === quickThemeLimit ? 'more-themes' : theme.id}
												w='100%'
												h={['70px', '70px']}
												bg={
													i === quickThemeLimit
														? getThemeValue('midTransparency')
														: theme.values.primaryDisplay
												}
												borderRadius='10px'
												style={
													theme.id === themeId && i !== quickThemeLimit
														? {
																outline: '3px solid',
																outlineOffset: '-3px',
																outlineColor: theme.values.midTransparency
															}
														: undefined
												}
												_hover={{
													outline: '3px solid',
													outlineOffset: '-3px',
													outlineColor:
														i === quickThemeLimit
															? getThemeValue('lowTransparency')
															: theme.values.lowTransparency
												}}
												onClick={() =>
													i === quickThemeLimit ? onThemeOpen() : setThemeId(theme.id)
												}
											>
												<Flex
													h='100%'
													w='100%'
													gap='5px'
													direction='column'
													alignItems='center'
												>
													<Spacer />
													<Box
														w='100%'
														borderBottomRadius='10px'
														bg={
															i === quickThemeLimit
																? getThemeValue('lowAltTransparency')
																: theme.values.lowAltTransparency
														}
													>
														<Flex
															w='100%'
															gap='2px'
															p='5px'
															direction='row'
															alignItems='center'
														>
															<Text
																paddingX='5px'
																fontSize='12px'
																color={
																	i === quickThemeLimit
																		? getThemeValue('text')
																		: theme.values.text
																}
																noOfLines={1}
															>
																{i === quickThemeLimit ? (
																	<Flex gap='5px'>
																		More
																		<MdAdd fontSize='20px' />
																	</Flex>
																) : (
																	theme.name
																)}
															</Text>
															<Spacer />
															<SlideFade
																in={
																	(theme.id === themeId && i !== quickThemeLimit) ||
																	(!themeId && i === 0)
																}
															>
																{((theme.id === themeId && i !== quickThemeLimit) ||
																	(!themeId && i === 0)) && (
																	<Icon
																		as={MdCheckCircle}
																		zIndex={40}
																		fontSize={['15px', '15px']}
																	/>
																)}
															</SlideFade>
														</Flex>
													</Box>
												</Flex>
											</Center>
										))}
									</SimpleGrid>
								</FormControl>
								<FormControl gap='5px' display='flex' flexDirection='column'>
									<FormLabel htmlFor='serverURL'>
										<Flex gap='10px' alignItems='center'>
											<Heading size='sm'>Server URL</Heading>
											{!serverInputError && isServerURLInputFocused && (
												<SlideFade in={true} offsetY={-8} unmountOnExit>
													<Text fontSize='xs'>
														Make sure you trust the server you are adding.
													</Text>
												</SlideFade>
											)}
											{serverInputError && (
												<SlideFade in={true} offsetY={-8} delay={0.1} unmountOnExit>
													<Text fontSize='xs' color='red.300'>
														{serverInputError}
													</Text>
												</SlideFade>
											)}
										</Flex>
									</FormLabel>
									<InputGroup>
										<Input
											id='serverURL'
											isInvalid={!!serverInputError}
											value={serverURLInput}
											onChange={(e) => {
												setServerURLInput(e.target.value);
											}}
											focusBorderColor={getThemeValue('primary')}
											placeholder='https://jspaste.eu/api/v2/documents'
											onBlur={() => {
												setIsServerURLInputFocused(false);

												if (!serverInputError) setServerURL(serverURLInput);
											}}
											onFocus={() => setIsServerURLInputFocused(true)}
										/>
										<SlideFade in={!!serverURLInput} offsetX={8} offsetY={0} unmountOnExit>
											<InputRightElement>
												<CloseButton size='md' onClick={() => setServerURLInput('')} />
											</InputRightElement>
										</SlideFade>
									</InputGroup>
								</FormControl>
							</Stack>
						</PopoverBody>
					</PopoverContent>
				</Portal>
			</Popover>
		</>
	);
};

export default SettingsPopover;
