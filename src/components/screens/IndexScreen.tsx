'use client';

import { Flex } from '@chakra-ui/react';
import Editor from '../general/Editor';
import Controls from '../general/Controls';
import Information from '../general/Information';

export default function IndexScreen() {
	return (
		<Flex w="100%" h="100%" gap="0px" direction="column">
			<Information />
			<Editor />
			<Controls />
		</Flex>
	);
}
