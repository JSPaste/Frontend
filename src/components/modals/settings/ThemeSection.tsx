import { useBreakpoint } from '@x-hook/useBreakpoint.ts';
import { themeStore } from '@x-util/store.ts';
import { type ThemeKeys, Themes } from '@x-util/themes.ts';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function () {
	const breakpoint = useBreakpoint();
	const maxColumns = breakpoint === 'sm' ? 2 : 3;

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex + maxColumns > Object.keys(Themes).length) {
			setCurrentIndex(Math.max(0, Object.keys(Themes).length - maxColumns));
		}
	}, [currentIndex, maxColumns]);

	const nextIndex = () => setCurrentIndex((currentIndex + 1) % Object.keys(Themes).length);
	const previousIndex = () =>
		setCurrentIndex((currentIndex - 1 + Object.keys(Themes).length) % Object.keys(Themes).length);

	const { setTheme, themeId } = themeStore();

	return (
		<div className='flex flex-col gap-4'>
			<p>Editor theme:</p>
			<div className='flex justify-between align-middle items-center'>
				<button
					type='button'
					aria-label='Previous'
					className={'btn btn-sm h-8 min-h-8 w-8 min-w-8 bg-base-200'}
					onClick={previousIndex}
					disabled={currentIndex === 0}
				>
					<span>
						<IoIosArrowBack />
					</span>
				</button>
				<div className={`w-full pl-5 pr-5 grid grid-flow-col gap-4 grid-cols-${maxColumns}`}>
					{Object.entries(Themes)
						.slice(currentIndex, currentIndex + maxColumns)
						.map(([id, name]) => (
							<input
								key={id}
								checked={themeId === id}
								type='radio'
								name='theme-buttons'
								className='btn theme-controller join-horizontal bg-base-200'
								aria-label={name}
								value={id}
								onChange={() => setTheme(id as ThemeKeys)}
							/>
						))}
				</div>
				<button
					type='button'
					aria-label='Next'
					className='btn btn-sm h-8 min-h-8 w-8 min-w-8 bg-base-200'
					onClick={nextIndex}
					disabled={currentIndex === Object.keys(Themes).length - maxColumns}
				>
					<span>
						<IoIosArrowForward />
					</span>
				</button>
			</div>
		</div>
	);
}
