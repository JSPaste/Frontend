'use client';

import { Flex } from '@chakra-ui/react';
import Editor from '../general/Editor';
import Controls from '../general/Controls';

export default function IndexScreen() {
	return (
		<Flex w="100%" h="100%" gap="0px" direction="column">
			<Editor />
			<Controls />
		</Flex>
	);
}
