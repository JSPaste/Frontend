import LogoIcon from '@/components/LogoIcon.tsx';
import { welcomeCode } from '@/components/general/Editor.tsx';
import useLanguageStore from '@/store/language';
import type { InformationLabelProps, InformationProps, Language } from '@/types/Components.ts';
import useLanguage from '@/utils/useLanguage';
import useThemeValues from '@/utils/useThemeValues';
import { Box, Flex, Show, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { MdFlag } from 'react-icons/md';
import { SiGitbook, SiGithub } from 'react-icons/si';
import { dependencies as version } from '../../../package.json';
import SelectModal from '../modals/SelectModal';

// Change me from "next" to "@jspaste/library" when package is done
const libraryVersion = 'Library '.concat(version['astro'].replace(/[^0-9.]/g, ''));

const InformationLabel = ({ label, icon, isSelectable, onClick, ...props }: InformationLabelProps): ReactElement => {
	const { getThemeValue } = useThemeValues();

	const textElement = (
		<Text size='xs' fontSize='12px' color={getThemeValue('textMuted')} {...props}>
			{label}
		</Text>
	);

	return (
		<Box
			py='2px'
			px='5px'
			_hover={
				isSelectable
					? {
							background: getThemeValue('highTransparency'),
							cursor: 'pointer'
						}
					: undefined
			}
			onClick={onClick}
		>
			{icon ? (
				<Flex direction='row' alignItems='center' gap='5px'>
					{icon}
					{textElement}
				</Flex>
			) : (
				textElement
			)}
		</Box>
	);
};

const Information = ({ lineNumber, columnNumber }: InformationProps): ReactElement => {
	const { getThemeValue } = useThemeValues();
	const [languageId, languages, autoLanguageId] = useLanguage();
	const { setLanguageId } = useLanguageStore();
	const { isOpen: isLangOpen, onClose: onLangClose, onOpen: onLangOpen } = useDisclosure();

	const {
		name: languageName,
		icon: languageIcon,
		extension: languageExtension
	} = languages.find((l) => l.id === languageId) ?? (languages[0] as Language);

	const { name: autoLanguageName } = languages.find((l) => l.id === autoLanguageId) ?? (languages[0] as Language);

	return (
		<>
			<Flex
				w='100%'
				py='0px'
				px='12px'
				maxH='22px'
				direction='row'
				alignItems='center'
				gap={['5px', '10px']}
				bg={getThemeValue('information')}
			>
				<InformationLabel label={libraryVersion} icon={<LogoIcon fontSize='15px' />} />
				<InformationLabel
					label={`Ln ${(lineNumber || 1).toString().padStart(2, '0')} Col ${(lineNumber
						? columnNumber
						: welcomeCode.length + 1
					)
						.toString()
						.padStart(2, '0')}`}
				/>
				<InformationLabel
					label={
						<>
							<Show above='sm'>Language: </Show>
							{languageId ? languageName : autoLanguageName}
						</>
					}
					icon={
						languageIcon ?? (
							<Text
								size='xs'
								fontSize='10px'
								color={getThemeValue('textMuted')}
								bg={getThemeValue('midTransparency')}
								px='3px'
								borderRadius='2px'
							>
								{languageExtension}
							</Text>
						)
					}
					isSelectable
					onClick={onLangOpen}
					noOfLines={1}
				/>
				<Spacer />
				<Show above='md'>
					<InformationLabel
						label='Docs'
						isSelectable
						icon={<SiGitbook size='12px' />}
						onClick={() => window.open('/docs')}
					/>
					<InformationLabel
						label='Github'
						isSelectable
						icon={<SiGithub size='12px' />}
						onClick={() => window.open('/github')}
					/>
				</Show>
			</Flex>
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
		</>
	);
};

export default Information;
