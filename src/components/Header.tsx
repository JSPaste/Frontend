import { IconCode, IconPuzzle } from '@tabler/icons-solidjs';
import HeaderLabel from '@x-component/HeaderLabel';
import type { Cursor } from '@x-component/screens/Editor';
import { language } from '@x-util/store';
import type { Accessor } from 'solid-js';

type HeaderProps = {
	cursor: Accessor<Cursor>;
};

export default function Header({ cursor }: HeaderProps) {
	return (
		<div class='flex min-h-6 pl-2 pr-2 bg-base-200'>
			<HeaderLabel
				label={`Ln ${cursor().line.toString().padStart(2, '0')} Col
            ${cursor().column.toString().padStart(2, '0')}`}
			/>
			<HeaderLabel label={`Lang ${language()}`} />
			<span class='flex-auto' />
			<div class='flex max-sm:hidden'>
				{/* TODO: Expose Backend API route location */}
				<HeaderLabel label='API' icon={<IconPuzzle size={12} />} onClick={() => window.open('/api/docs')} />
				<HeaderLabel
					label='Source'
					icon={<IconCode size={12} />}
					onClick={() => window.open('https://github.com/jspaste')}
				/>
			</div>
		</div>
	);
}
