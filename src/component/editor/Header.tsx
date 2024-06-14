'use client';

import './editorComponents.css';
import Spacer from '@/component/Spacer.tsx';
import { useMediaQuery } from '@mui/material';
import type { ReactElement } from 'react';
import { SiGitbook, SiGithub } from 'react-icons/si';

type HeaderLabelProps = {
	label: string;
	icon?: ReactElement;
	isSelectable?: boolean;
	onClick?: () => void;
};

const HeaderLabel = (props: HeaderLabelProps) => (
	<div className={props.isSelectable ? 'header-label' : 'header-label_static'} onClick={props.onClick}>
		{props.icon}
		<p className='header-label-text'>{props.label}</p>
	</div>
);

type InformationProps = {
	lineNumber?: number;
	columnNumber?: number;
};

const Header = (props: InformationProps) => {
	!props.lineNumber && (props.lineNumber = 1);
	!props.columnNumber && (props.columnNumber = 1);

	const mobile = useMediaQuery('(min-width:600px)');

	return (
		<header className='header'>
			<HeaderLabel
				label={`Ln ${props.lineNumber.toString().padStart(2, '0')} Col ${props.columnNumber
					.toString()
					.padStart(2, '0')}`}
			/>
			<HeaderLabel label='Lang (TODO)' />
			{mobile && (
				<>
					<Spacer />
					<HeaderLabel
						label='Docs'
						isSelectable
						icon={<SiGitbook size='12px' />}
						onClick={() => window.open('/docs')}
					/>
					<HeaderLabel
						label='Github'
						isSelectable
						icon={<SiGithub size='12px' />}
						onClick={() => window.open('/github')}
					/>
				</>
			)}
		</header>
	);
};

export default Header;
