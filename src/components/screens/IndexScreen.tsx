import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';
import { EditorInformation } from '@/components/general/Information';

const Information = dynamic(() => import('@/components/general/Information'));
const Editor = dynamic(() => import('@/components/general/Editor'));
const Controls = dynamic(() => import('@/components/general/Controls'));

export default function IndexScreen() {
	const [information, setInformation] = useState<EditorInformation>({
		lineNumber: 0,
		columnNumber: 0,
	});

	const [value, setValue] = useState<string>('');

	return (
		<Flex w="100%" h="100%" gap="0px" direction="column">
			<Information
				lineNumber={information.lineNumber}
				columnNumber={information.columnNumber}
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
