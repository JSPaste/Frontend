import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';

type ActionButtonProps = {
	icon: ReactElement;
	label: string;
	onClick?: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
};

type ControlsProps = {
	documentId?: string;
	value: string;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	enableEdit: boolean;
};

type EditorProps = {
	setInformation: (info: InformationProps) => void;
	setValue: (value: string) => void;
	value: string;
	documentId?: string;
	isEditing: boolean;
	enableEdit: boolean;
};

type InformationLabelProps = {
	label: ReactElement | string;
	icon?: ReactElement;
	isSelectable?: boolean;
	onClick?: () => void;

	[props: string]: any;
};

type InformationProps = {
	lineNumber: number;
	columnNumber: number;
};

type SelectModelItems = {
	id: string | undefined;
	name: string;
	details?: string;
	icon?: ReactNode;
	alias?: string[];
};

type SelectModalProps = {
	isOpen: boolean;
	onClose: () => void;
	listItems: SelectModelItems[];
	initialSelectedId?: string;
	onSelect: (id: string | undefined) => void;
	onPreview?: (id: string | undefined) => void;
	showIcons?: boolean;
};

type SettingPopoverProps = {
	trigger: ReactElement;
};

type DocumentScreenProps = {
	enableEdit: boolean;
};

type Language = {
	id: string | undefined;
	name: string;
	icon?: ReactElement;
	extension?: string;
};

export type {
	ActionButtonProps,
	ControlsProps,
	EditorProps,
	InformationLabelProps,
	InformationProps,
	SelectModalProps,
	SettingPopoverProps,
	DocumentScreenProps,
	Language
};
