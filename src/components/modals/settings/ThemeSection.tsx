import { IconButton, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useTheme } from '@x-hook/useTheme';
import { themeStore } from '@x-util/store';
import { themes } from '@x-util/themes';
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
			<div className='flex justify-between align-middle items-center'>
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
						<div
							key={theme.id}
							className='flex h-12 w-full rounded-lg items-end'
							style={{
								backgroundColor: theme.palette.primaryDisplay,

								...(theme.id === themeId && {
									outline: '3px solid',
									outlineOffset: '-3px',
									outlineColor: theme.palette.midTransparency
								})
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.outline = '3px solid';
								e.currentTarget.style.outlineOffset = '-3px';
								e.currentTarget.style.outlineColor = theme.palette.midTransparency;
							}}
							onMouseLeave={(e) => {
								if (theme.id === themeId) return;

								e.currentTarget.style.outline = '';
								e.currentTarget.style.outlineOffset = '';
								e.currentTarget.style.outlineColor = '';
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
						</div>
					))}
				</div>
				<IconButton
					aria-label='Next'
					icon={<MdArrowForward />}
					onClick={nextIndex}
					isDisabled={currentIndex === themes.length - maxColumns}
				/>
			</div>
		</Stack>
	);
}
