import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';
import {
	Box,
	Flex,
	IconButton,
	Spacer,
	Tooltip,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { JSP } from 'jspaste';
import LogoIcon from '@/icons/LogoIcon';
import React, { memo, useState } from 'react';
import SettingsModal from '../modals/SettingsModal';
import useThemeValues from '@/hooks/useThemeValues';

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
	const { getThemeValue } = useThemeValues();

	return (
		<Tooltip
			label={!isDisabled ? label : `${label} (Disabled)`}
			bg={getThemeValue('tooltip')}
			color={getThemeValue('text')}
			placement="top"
			m="5px"
			gutter={5}
			hasArrow
		>
			<IconButton
				size="sm"
				aria-label={label}
				color={getThemeValue('primary')}
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
	const { getThemeValue } = useThemeValues();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isSaveLoading, setIsSaveLoading] = useState(false);

	const toast = useToast();

	const jsp = new JSP();

	async function handleSave() {
		setIsSaveLoading(true);
		const result = await jsp.publish(value).catch(() => null);
		setIsSaveLoading(false);

		if (!result)
			toast({
				title: 'An error occurred, please try again.',
				description: 'Check your Internet connection and try again.',
				position: 'top-right',
				status: 'error',
				variant: 'subtle',
				isClosable: true,
				duration: 10000,
			});

		console.log(result);
	}

	return (
		<>
			<SettingsModal isOpen={isOpen} onClose={onClose} />
			<Flex direction="column" w="100%">
				<Box w="100%" h="48px" zIndex={100} />
				<Flex
					bottom="0"
					left="0"
					zIndex={200}
					position="fixed"
					w="100%"
					gap="10px"
					bg={getThemeValue('controls')}
					py="8px"
					px="12px"
					direction="row"
					alignItems="center"
				>
					<IconButton
						size="sm"
						aria-label="Home"
						color={getThemeValue('primary')}
						icon={<LogoIcon fontSize="30px" />}
						onClick={() => (location.href = '/')}
					/>
					<Spacer />
					<ActionButton
						icon={<MdSave fontSize="20px" />}
						label={
							!value
								? 'You need to write something to save!'
								: 'Save'
						}
						onClick={handleSave}
						isLoading={isSaveLoading}
						isDisabled={!value}
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
