import Image from 'next/image';
import { MdEdit, MdSave, MdSubject } from 'react-icons/md';
import { Flex, IconButton, Spacer, Tooltip } from '@chakra-ui/react';

function ActionButton({
	icon,
	label,
}: Readonly<{ icon: React.ReactElement; label: string }>) {
	return (
		<Tooltip
			label={label}
			bg="#525252"
			color="#FFFFFF"
			placement="top"
			m="5px"
			gutter={5}
			hasArrow
		>
			<IconButton
				size="sm"
				aria-label={label}
				color="#FFE184"
				icon={icon}
			/>
		</Tooltip>
	);
}

export default function Footer() {
	return (
		<Flex
			w="100%"
			gap="10px"
			bg="#222222"
			py="8px"
			px="12px"
			direction="row"
			alignItems="center"
		>
			<Image
				width={35}
				height={35}
				alt="JSPaste"
				src="/logo.webp"
				style={{ cursor: 'pointer' }}
				onClick={() => (location.href = '/')}
			/>
			<Spacer />
			<ActionButton icon={<MdSave fontSize="20px" />} label="Save" />
			<ActionButton icon={<MdEdit fontSize="20px" />} label="Edit" />
			<ActionButton icon={<MdSubject fontSize="20px" />} label="View Raw" />
		</Flex>
	);
}
