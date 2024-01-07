import LogoIcon from '@/icons/LogoIcon';
import { Flex, Text } from '@chakra-ui/react';
import { EditorInformation } from '@/components/screens/IndexScreen';
import React from 'react';
import useThemeValues from '@/hooks/useThemeValues';

function InformationLabel({
	label,
	icon,
}: Readonly<{ label: string; icon?: React.ReactElement }>) {
	const { getThemeValue } = useThemeValues();

	const textElement = (
		<Text
			size="xs"
			fontSize="12px"
			color={getThemeValue('textMuted')}
			noOfLines={1}
		>
			{label}
		</Text>
	);

	return icon ? (
		<Flex direction="row" alignItems="center" gap="5px">
			{icon}
			{textElement}
		</Flex>
	) : (
		textElement
	);
}

export default function Information({
	lineNumber,
	columnNumber,
	languageString,
}: Readonly<EditorInformation>) {
	const { getThemeValue } = useThemeValues();

	return (
		<Flex
			w="100%"
			gap={['10px', '15px']}
			bg={getThemeValue('information')}
			py="2px"
			px="12px"
			direction="row"
			alignItems="center"
		>
			<InformationLabel
				label="JSPaste v10.1.1"
				icon={<LogoIcon fontSize="15px" />}
			/>
			<InformationLabel label={`Ln ${lineNumber} Col ${columnNumber}`} />
			<InformationLabel label={`Language: ${languageString}`} />
		</Flex>
	);
}
