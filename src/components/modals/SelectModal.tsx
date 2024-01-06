'use client';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Flex,
	Stack,
	Text,
	Spacer,
	useEventListener,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';

export default function SelectModal({
	isOpen,
	onClose,
	listItems,
	initialSelectedId,
	onSelect,
	onPreview,
	showIcons,
}: Readonly<{
	isOpen: boolean;
	onClose: any;
	listItems: { id: string; name: string; details?: string; icon?: any }[];
	initialSelectedId?: string;
	onSelect: any;
	onPreview?: any;
	showIcons?: boolean;
}>) {
	const [searchInput, setSearchInput] = useState('');
	const [selectedIndex, setSelectedIndex] = useState(0);

	const results = listItems.filter(
		(e) =>
			e.name
				.toLowerCase()
				.trim()
				.includes(searchInput.toLowerCase().trim()) ||
			e.id
				.toLowerCase()
				.trim()
				.includes(searchInput.toLowerCase().trim()),
	);

	useEffect(() => {
		if (!isOpen) {
			// TODO: Revert previews
			//	onSelect(initialSelectedId);
			setSearchInput('');
		}

		const initialSelectedIndex = results.findIndex(
			(i) => i.id === initialSelectedId,
		);

		if (initialSelectedIndex !== -1 && !searchInput.trim())
			setSelectedIndex(initialSelectedIndex);
	}, [initialSelectedId, isOpen]);

	// FIXME: Firing after component unmount
	useEventListener('keydown', (e) => {
		if (isOpen && results.length) {
			switch (e.key) {
				case 'ArrowUp': {
					e.preventDefault();

					const res = selectedIndex - 1;

					const finalIndex = res < 0 ? results.length - 1 : res;

					setSelectedIndex(finalIndex);

					onPreview?.(results[finalIndex].id);

					setTimeout(() => {
						document
							.getElementById('select-active')
							?.scrollIntoView({
								block: 'center',
								behavior: 'smooth',
							});
					}, 10);

					break;
				}

				case 'ArrowDown': {
					e.preventDefault();

					const res = selectedIndex + 1;

					const finalIndex = res >= results.length ? 0 : res;

					setSelectedIndex(finalIndex);

					onPreview?.(results[finalIndex].id);

					setTimeout(() => {
						document
							.getElementById('select-active')
							?.scrollIntoView({
								block: 'center',
								behavior: 'smooth',
							});
					}, 10);

					break;
				}

				case 'Enter': {
					const item = results[selectedIndex];

					onClose();

					onSelect(item.id);

					break;
				}
			}
		}
	});

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="lg" autoFocus={false}>
			<ModalOverlay />
			<ModalContent margin="10px 5px" color="text" bg="popup">
				<ModalHeader px={['15px', '24px']}>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<MdSearch fontSize="20px" color="textMuted" />
						</InputLeftElement>
						<Input
							pr="25px"
							variant="filled"
							bg="transparent"
							borderRadius="0px"
							value={searchInput}
							_hover={{ background: 'transparent' }}
							onChange={(e) => {
								setSelectedIndex(0);
								setSearchInput(e.target.value);
							}}
							focusBorderColor="transparent"
							placeholder="Search... (Select with arrow keys)"
						/>
					</InputGroup>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody px={['15px', '20px']}>
					<Stack
						spacing="5px"
						maxH={['60vh', '50vh', '45vh', '40vh', '35vh']}
						w="100%"
						overflowY="auto"
						p="5px"
						pb="15px"
					>
						{results.length ? (
							results.map((item, i) => {
								const isActive = i === selectedIndex;

								return (
									<Flex
										id={
											isActive
												? 'select-active'
												: undefined
										}
										key={item.id}
										bg={
											isActive
												? 'lowTransparency'
												: 'transparent'
										}
										gap={['3px', '8px']}
										py="5px"
										px="10px"
										alignItems={['left', 'center']}
										borderRadius="5px"
										direction={[
											item.details && isActive
												? 'column'
												: 'row',
											'row',
										]}
										_hover={{
											bg: 'midTransparency',
										}}
										onClick={() => {
											onClose();

											onSelect(item.id);
										}}
									>
										<Text>{item.name}</Text>
										<Spacer />

										<Flex gap="8px" alignItems="center">
											{isActive && item.details && (
												<Text color="textMuted">
													{item.details}
												</Text>
											)}
											{(isActive || showIcons) &&
												(item.icon ?? (
													<MdAdd fontSize="20px" />
												))}
										</Flex>
									</Flex>
								);
							})
						) : (
							<Text>Nothing found...</Text>
						)}
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}