import LogoIcon from '@/icons/LogoIcon';
import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';
import {
	Box,
	Flex,
	IconButton,
	Spacer,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import { SettingsModal } from '../modals/SettingsModal';
import React, { memo, useState } from 'react';
import { JSP } from 'jspaste';

function ActionButton({
	icon,
	label,
	onClick,
	isDisabled,
	isLoading,
}: Readonly<{
	icon: React.ReactElement;
	label: string;
	onClick: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
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
				isLoading={isLoading}
			/>
		</Tooltip>
	);
}

export default memo(function Controls({
	documentId,
	value,
}: Readonly<{ documentId?: string; value: string }>) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isSaveLoading, setIsSaveLoading] = useState(false);

	const jsp = new JSP();

	async function handleSave() {
		setIsSaveLoading(true);
		const result = await jsp.publish(value).catch(() => null);
		setIsSaveLoading(false);

		console.log(result);
	}

	return (
		<>
			<SettingsModal isOpen={isOpen} onClose={onClose} />
			<Flex direction="column" w="100%">
				<Box w="100%" h="48px" />
				<Flex
					bottom="0"
					left="0"
					zIndex={2}
					position="fixed"
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
						onClick={handleSave}
						isLoading={isSaveLoading}
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
			</Flex>
		</>
	);
});
