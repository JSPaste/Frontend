import { createBreakpoints } from '@solid-primitives/media';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-solidjs';
import { breakpoints } from '@x-util/breakpoints';
import { setTheme, theme } from '@x-util/store';
import { type ThemeKeys, Themes } from '@x-util/themes';
import { createEffect, createSignal } from 'solid-js';

export default function ThemeSection() {
	const matches = createBreakpoints(breakpoints);

	const [maxColumns, setMaxColumns] = createSignal(0);
	const [currentIndex, setCurrentIndex] = createSignal(0);

	const changeIndex = (delta: number) => {
		setCurrentIndex((prev) => (prev + delta + Object.keys(Themes).length) % Object.keys(Themes).length);
	};

	createEffect(() => setMaxColumns(matches.sm ? 3 : 2));

	createEffect(() => {
		const maxIndex = Math.max(0, Object.keys(Themes).length - maxColumns());

		if (currentIndex() > maxIndex) {
			setCurrentIndex(maxIndex);
		}
	});

	return (
		<div class='flex flex-col gap-4'>
			<p>Editor theme:</p>
			<div class='flex justify-between align-middle items-center'>
				<button
					type='button'
					aria-label='Previous'
					class='btn btn-square btn-sm bg-base-200'
					onClick={() => changeIndex(-1)}
					disabled={currentIndex() === 0}
				>
					<IconChevronLeft />
				</button>
				<div class={`w-full pl-5 pr-5 grid grid-flow-col gap-4 grid-cols-${maxColumns()}`}>
					{Object.entries(Themes)
						.slice(currentIndex(), currentIndex() + maxColumns())
						.map(([id, name]) => (
							<input
								checked={theme() === id}
								type='radio'
								name='theme-button'
								class='btn theme-controller join-horizontal bg-base-200'
								aria-label={name}
								value={id}
								onChange={() => setTheme(id as ThemeKeys)}
							/>
						))}
				</div>
				<button
					type='button'
					aria-label='Next'
					class='btn btn-square btn-sm bg-base-200'
					onClick={() => changeIndex(1)}
					disabled={currentIndex() === Object.keys(Themes).length - maxColumns()}
				>
					<IconChevronRight />
				</button>
			</div>
		</div>
	);
}
