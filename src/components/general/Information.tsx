import LogoIcon from '@/icons/LogoIcon';
import { Flex, Text } from '@chakra-ui/react';

function InformationLabel({
	label,
	icon,
}: Readonly<{ label: string; icon?: React.ReactElement }>) {
	const textElement = (
		<Text size="xs" fontSize="12px" color="textMuted" noOfLines={1}>
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

export default function Information() {
	return (
		<Flex
			w="100%"
			gap={['10px', '15px']}
			bg="information"
			py="2px"
			px="12px"
			direction="row"
			alignItems="center"
		>
			<InformationLabel
				label="JSPaste v10.1.1"
				icon={<LogoIcon fontSize="15px" />}
			/>
			<InformationLabel label="Ln 23 Col 2" />
			<InformationLabel label="Language: Typescript" />
		</Flex>
	);
}
