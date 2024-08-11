import { useTheme } from '@/hook/useTheme.ts';
import { themeStore } from '@/utils/store';
import { themes } from '@/utils/themes';
import { Flex, IconButton, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

export default function () {
	const { setTheme } = useTheme();

	const maxColumns = useBreakpointValue([2, 3, 4]) ?? 4;

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex + maxColumns > themes.length) {
			setCurrentIndex(Math.max(0, themes.length - maxColumns));
		}
	}, [currentIndex, maxColumns]);

	const nextIndex = () => setCurrentIndex((currentIndex + 1) % themes.length);
	const previousIndex = () => setCurrentIndex((currentIndex - 1 + themes.length) % themes.length);

	const { themeId } = themeStore();

	return (
		<Stack spacing='10px'>
			<p>Editor theme:</p>
			<Flex justifyContent='space-between' alignItems='center'>
				<IconButton
					aria-label='Previous'
					icon={<MdArrowBack />}
					onClick={previousIndex}
					isDisabled={currentIndex === 0}
				/>
				<div
					className='w-full pl-5 pr-5 grid grid-flow-col gap-4'
					style={{ gridTemplateColumns: `repeat(${maxColumns}, 1fr)` }}
				>
					{themes.slice(currentIndex, currentIndex + maxColumns).map((theme) => (
						<Flex
							key={theme.id}
							className='h-12 w-full rounded-lg items-end'
							bg={theme.palette.primaryDisplay}
							style={
								theme.id === themeId
									? {
											outline: '3px solid',
											outlineOffset: '-3px',
											outlineColor: theme.palette.midTransparency
										}
									: undefined
							}
							_hover={{
								outline: '3px solid',
								outlineOffset: '-3px',
								outlineColor: theme.palette.lowTransparency
							}}
							onClick={() => setTheme(theme.id)}
						>
							<p
								className='w-full align-text-bottom text-center rounded-b-lg'
								style={{
									backgroundColor: theme.palette.lowAltTransparency,
									color: theme.palette.text,
									fontSize: '12px',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap'
								}}
							>
								{theme.name}
							</p>
						</Flex>
					))}
				</div>
				<IconButton
					aria-label='Next'
					icon={<MdArrowForward />}
					onClick={nextIndex}
					isDisabled={currentIndex === themes.length - maxColumns}
				/>
			</Flex>
		</Stack>
	);
}
