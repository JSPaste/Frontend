'use client';

import './editor.css';
import Spacer from '@/component/spacer.tsx';
import { Show } from '@chakra-ui/media-query';
import type { ReactElement } from 'react';
import { SiGitbook, SiGithub } from 'react-icons/si';

type InformationLabelProps = {
	label: ReactElement<any> | string;
	icon?: ReactElement<any>;
	isSelectable?: boolean;
	onClick?: () => void;
};

const InformationLabel = ({ label, icon, isSelectable, onClick }: InformationLabelProps) => (
	<div className={isSelectable ? 'header-label' : 'header-label_static'} onClick={onClick}>
		{icon}
		<p className='header-label-text'>{label}</p>
	</div>
);

type InformationProps = {
	lineNumber?: number;
	columnNumber?: number;
};

const Header = (props: InformationProps) => (
	<div className='header'>
		<InformationLabel
			label={`Ln ${(props.lineNumber ?? '1').toString().padStart(2, '0')} Col ${(props.columnNumber ?? '1')
				.toString()
				.padStart(2, '0')}`}
		/>
		<InformationLabel label='Lang (TODO)' />
		<Spacer />
		<Show breakpoint='(min-width: 500px)'>
			<InformationLabel
				label='Docs'
				isSelectable
				icon={<SiGitbook size='12px' />}
				onClick={() => window.open('/docs')}
			/>
			<InformationLabel
				label='Github'
				isSelectable
				icon={<SiGithub size='12px' />}
				onClick={() => window.open('/github')}
			/>
		</Show>
	</div>
);

export default Header;
