import { Flex } from '@chakra-ui/react';
import Image from 'next/image';

export default function Footer() {
	return (
		<Flex
			w="100%"
			direction="row"
			alignItems="center"
			bg="#222222"
			padding="10px"
		>
			<Image
				width={35}
				height={35}
				alt="JSPaste"
				src="/logo.webp"
				style={{ borderRadius: '10px' }}
			/>
		</Flex>
	);
}
