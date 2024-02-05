import {
	type Dispatch,
	type ReactElement,
	type SetStateAction,
	useState,
	forwardRef,
	type ForwardedRef
} from 'react';
import { Box, Flex, IconButton, Spacer, Tooltip, useToast } from '@chakra-ui/react';
import LogoIcon from '@/components/LogoIcon';
import SettingsPopover from '../modals/SettingsPopover';
import useThemeValues from '@/hooks/useThemeValues';
import { MdEdit, MdSave, MdSettings, MdSubject } from 'react-icons/md';

interface ActionButtonProps {
	icon: ReactElement;
	label: string;
	onClick?: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
}

const ActionButton = forwardRef(
	(
		{ icon, label, onClick, isDisabled, isLoading }: ActionButtonProps,
		ref: ForwardedRef<any>
	): ReactElement => {
		const { getThemeValue } = useThemeValues();

		return (
			<Tooltip
				label={!isDisabled ? label : `${label} (Disabled)`}
				bg={getThemeValue('tooltip')}
				color={getThemeValue('text')}
				placement='top'
				m='5px'
				gutter={5}
				hasArrow
			>
				<IconButton
					ref={ref}
					size='sm'
					aria-label={label}
					color={getThemeValue('primary')}
					icon={icon}
					onClick={onClick}
					isDisabled={isDisabled ?? false}
					isLoading={isLoading ?? false}
				/>
			</Tooltip>
		);
	}
);

interface ControlsProps {
	documentId?: string;
	value: string;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	enableEdit: boolean;
}

const Controls = ({
	documentId,
	value,
	isEditing,
	setIsEditing,
	enableEdit
}: ControlsProps): ReactElement => {
	const { getThemeValue } = useThemeValues();

	const [isSaveLoading, setIsSaveLoading] = useState(false);

	const toast = useToast();

	async function handleSave() {
		setIsSaveLoading(true);
		const result = null;
		setIsSaveLoading(false);

		if (!result)
			toast({
				title: 'An error occurred, please try again.',
				description: 'Check your Internet connection and try again.',
				position: 'top-right',
				status: 'error',
				variant: 'subtle',
				isClosable: true,
				duration: 10000
			});

		location.href = '/abc123';

		console.log(result);
	}

	return (
		<Flex direction='column' w='100%'>
			<Box w='100%' h='48px' zIndex={100} />
			<Flex
				bottom='0'
				left='0'
				zIndex={200}
				position='fixed'
				w='100%'
				gap='10px'
				bg={getThemeValue('controls')}
				py='8px'
				px='12px'
				direction='row'
				alignItems='center'
			>
				<IconButton
					size='sm'
					aria-label='Home'
					color={getThemeValue('primary')}
					icon={<LogoIcon fontSize='30px' />}
					onClick={() => (location.href = '/')}
				/>
				<Spacer />
				<ActionButton
					icon={<MdSave fontSize='20px' />}
					label={!value ? 'You need to write something to save!' : 'Save'}
					onClick={handleSave}
					isLoading={isSaveLoading}
					isDisabled={!value}
				/>
				{!isEditing && (
					<ActionButton
						icon={<MdEdit fontSize='20px' />}
						label='Edit'
						onClick={() => setIsEditing(true)}
						isDisabled={!enableEdit}
					/>
				)}
				<ActionButton
					icon={<MdSubject fontSize='20px' />}
					label='View Raw'
					onClick={() => (location.href = `/documents/${documentId}/raw`)}
					isDisabled={!documentId || isEditing}
				/>
				<SettingsPopover
					trigger={
						<ActionButton icon={<MdSettings fontSize='20px' />} label='Settings' />
					}
				/>
			</Flex>
		</Flex>
	);
};

export default Controls;
