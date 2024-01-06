import LogoIcon from '@/icons/LogoIcon';
import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';
import { Flex, IconButton, Spacer, Tooltip, useDisclosure } from '@chakra-ui/react';
import { SettingsModal } from '../modals/SettingsModal';

function ActionButton({
	icon,
	label,
	onClick,
}: Readonly<{ icon: React.ReactElement; label: string, onClick?: () => void }>) {
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
				onClick={onClick}
			/>
		</Tooltip>
	);
}

export default function Controls() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<SettingsModal isOpen={isOpen} onClose={onClose} />
			
			<Flex
				w="100%"
				gap="10px"
				bg="controls"
				py="8px"
				px="12px"
				direction="row"
				alignItems="center"
			>
				<IconButton
					size="sm"
					aria-label="Home"
					color="primary"
					icon={<LogoIcon fontSize="30px" />}
					onClick={() => (location.href = '/')}
				/>
				<Spacer />
				<ActionButton icon={<MdSave fontSize="20px" />} label="Save" />
				<ActionButton icon={<MdEdit fontSize="20px" />} label="Edit" />
				<ActionButton
					icon={<MdSubject fontSize="20px" />}
					label="View Raw"
				/>
				<ActionButton 
					icon={<MdSettings fontSize="20px" />} 
					label="Settings"
					onClick={() => onOpen()}
				/>
			</Flex>
		</>
	);
}
