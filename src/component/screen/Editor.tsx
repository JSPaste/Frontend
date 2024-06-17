'use client';

import Content from '@/component/editor/Content.tsx';
import Header, { type HeaderProps } from '@/component/editor/Header.tsx';
import { useState } from 'react';

type EditorProps = {
	enableEdit?: boolean;
};

const Editor = ({ enableEdit = false }: EditorProps) => {
	const documentName = typeof window !== 'undefined' ? location.pathname.split('/')[1] : undefined;

	const [position, setPosition] = useState<HeaderProps>({
		lineNumber: 1,
		columnNumber: 1
	});

	const [value, setValue] = useState<string>('');

	// @ts-ignore: TODO: remove "this" when adding footer
	const [isEditing, setIsEditing] = useState<boolean>(false);

	return (
		<div id='screen-editor'>
			<header>
				<Header lineNumber={position.lineNumber} columnNumber={position.columnNumber} />
			</header>
			<Content
				setCursorLocation={setPosition}
				setValue={setValue}
				value={value}
				documentId={documentName}
				isEditing={isEditing}
				enableEdit={enableEdit}
			/>
		</div>
	);
};

export default Editor;
