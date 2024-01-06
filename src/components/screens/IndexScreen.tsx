'use client';

import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Editor from '../general/Editor';
import Controls from '../general/Controls';
import Information from '../general/Information';

export interface EditorInformation {
	lineNumber: number;
	columnNumber: number;
	languageString: string;
}

export default function IndexScreen() {
	const [information, setInformation] = useState<EditorInformation>({
		lineNumber: 0,
		columnNumber: 0,
		languageString: 'Typescript',
	});

	const [value, setValue] = useState<string>('');

	return (
		<Flex w="100%" h="100%" gap="0px" direction="column">
			<Information
				lineNumber={information.lineNumber}
				columnNumber={information.columnNumber}
				languageString={information.languageString}
			/>
			<Editor
				setInformation={setInformation}
				setValue={setValue}
				value={value}
			/>
			<Controls value={value} />
		</Flex>
	);
}
