import { EditorComponent } from '@component/EditorComponent';
import { HeaderComponent, type HeaderProps } from '@component/HeaderComponent';
import { useState } from 'react';

type EditorScreenProps = {
	documentName?: string;
	enableEdit: boolean;
};

export const EditorScreen = (props: EditorScreenProps) => {
	const [position, setPosition] = useState<HeaderProps>({
		lineNumber: 1,
		columnNumber: 1
	});

	const [value, setValue] = useState<string>('');

	// @ts-ignore: TODO: remove "this" when adding footer
	const [isEditing, setIsEditing] = useState<boolean>(false);

	return (
		<div className='flex flex-col h-lvh'>
			<header>
				<HeaderComponent lineNumber={position.lineNumber} columnNumber={position.columnNumber} />
			</header>
			<EditorComponent
				setCursorLocation={setPosition}
				setValue={setValue}
				value={value}
				documentId={props.documentName}
				isEditing={isEditing}
				enableEdit={props.enableEdit}
			/>
		</div>
	);
};
