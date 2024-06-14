'use client';

import { Show, Spacer } from '@chakra-ui/react';
import './information.css';
import type { ReactElement } from 'react';
import { SiGitbook, SiGithub } from 'react-icons/si';

type InformationLabelProps = {
	label: ReactElement<any> | string;
	icon?: ReactElement<any>;
	isSelectable?: boolean;
	onClick?: () => void;
};

const InformationLabel = ({ label, icon, isSelectable, onClick }: InformationLabelProps) => (
	<div className={isSelectable ? 'information-label' : 'information-label_static'} onClick={onClick}>
		{icon}
		<p className='information-label-text'>{label}</p>
	</div>
);

type InformationProps = {
	lineNumber?: number;
	columnNumber?: number;
};

const Information = (props: InformationProps) => (
	<div id='information'>
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

export default Information;
