'use client';

import { Flex } from '@chakra-ui/react';
import Editor from '../general/Editor';
import Footer from '../general/Footer';

export default function IndexScreen() {
	return (
		<Flex w="100%" h="100%" gap="0px" direction="column">
			<Editor />
			<Footer />
		</Flex>
	);
}
