import React from 'react';
import { MdFlag } from 'react-icons/md';
import LogoIcon from '@/icons/LogoIcon';
import useLanguage from '@/hooks/useLanguage';
import SelectModal from '../modals/SelectModal';
import useThemeValues from '@/hooks/useThemeValues';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';

export interface EditorInformation {
	lineNumber: number;
	columnNumber: number;
}

function InformationLabel({
	label,
	icon,
	isSelectable,
	onClick,
}: Readonly<{
	label: string;
	icon?: React.ReactElement;
	isSelectable?: boolean;
	onClick?: () => void;
}>) {
	const { getThemeValue } = useThemeValues();

	const textElement = (
		<Text
			size="xs"
			noOfLines={1}
			fontSize="12px"
			color={getThemeValue('textMuted')}
		>
			{label}
		</Text>
	);

	return (
		<Box
			py="2px"
			px="5px"
			_hover={
				isSelectable
					? {
							background: getThemeValue('highTransparency'),
							cursor: 'pointer',
						}
					: undefined
			}
			onClick={onClick}
		>
			{icon ? (
				<Flex direction="row" alignItems="center" gap="5px">
					{icon}
					{textElement}
				</Flex>
			) : (
				textElement
			)}
		</Box>
	);
}

export default function Information({
	lineNumber,
	columnNumber,
}: Readonly<EditorInformation>) {
	const { getThemeValue } = useThemeValues();
	const [languageId, setLanguageId, languages] = useLanguage();
	const {
		isOpen: isLangOpen,
		onClose: onLangClose,
		onOpen: onLangOpen,
	} = useDisclosure();

	const { name: languageName, icon: languageIcon } =
		languages.find((l) => l.id === languageId) ?? languages[0];

	return (
		<>
			<Flex
				w="100%"
				py="0px"
				px="12px"
				direction="row"
				alignItems="center"
				gap={['5px', '10px']}
				bg={getThemeValue('information')}
			>
				<InformationLabel
					label="JSPaste v10.1.1"
					icon={<LogoIcon fontSize="15px" />}
				/>
				<InformationLabel
					label={`Ln ${lineNumber
						.toString()
						.padStart(2, '0')} Col ${columnNumber
						.toString()
						.padStart(2, '0')}`}
				/>
				<InformationLabel
					label={`Language: ${languageName}`}
					icon={languageIcon}
					isSelectable
					onClick={onLangOpen}
				/>
			</Flex>
			<SelectModal
				isOpen={isLangOpen}
				onClose={onLangClose}
				listItems={languages.map(({ id, name }) => ({
					id,
					name,
					details:
						languageId === id ? 'Recently used' : 'Set language',
					icon: <MdFlag />,
				}))}
				initialSelectedId={languageId}
				onPreview={setLanguageId}
				onSelect={setLanguageId}
			/>
		</>
	);
}
