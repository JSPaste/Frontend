import LogoIcon from '@/icons/LogoIcon';
import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';
import {
	Flex,
	IconButton,
	Spacer,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import { SettingsModal } from '../modals/SettingsModal';
import React, { memo } from 'react';

function ActionButton({
	icon,
	label,
	onClick,
	isDisabled,
}: Readonly<{
	icon: React.ReactElement;
	label: string;
	onClick: () => void;
	isDisabled?: boolean;
}>) {
	return (
		<Tooltip
			label={!isDisabled ? label : `${label} (Disabled)`}
			bg="tooltip"
			color="text"
			placement="top"
			m="5px"
			gutter={5}
			hasArrow
		>
			<IconButton
				size="sm"
				aria-label={label}
				color="primary"
				icon={icon}
				onClick={onClick}
				isDisabled={isDisabled}
			/>
		</Tooltip>
	);
}

export default memo(function Controls({
	documentId,
}: Readonly<{ documentId?: string }>) {
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
				<ActionButton
					icon={<MdSave fontSize="20px" />}
					label="Save"
					onClick={() => null}
				/>
				<ActionButton
					icon={<MdEdit fontSize="20px" />}
					label="Edit"
					onClick={() => null}
					isDisabled={!documentId}
				/>
				<ActionButton
					icon={<MdSubject fontSize="20px" />}
					label="View Raw"
					onClick={() => null}
					isDisabled={!documentId}
				/>
				<ActionButton
					icon={<MdSettings fontSize="20px" />}
					label="Settings"
					onClick={() => onOpen()}
				/>
			</Flex>
		</>
	);
});
