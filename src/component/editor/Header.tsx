'use client';

import Spacer from '@/component/Spacer.tsx';
import { Box, useMediaQuery } from '@mui/material';
import type { ReactElement } from 'react';
import { SiGitbook, SiGithub } from 'react-icons/si';

type HeaderLabelProps = {
	label: string;
	icon?: ReactElement;
	onClick?: () => void;
};

const HeaderLabel = (props: HeaderLabelProps) => (
	<>
		<Box
			sx={{
				alignItems: 'center',
				display: 'flex',
				fontSize: '12px',
				gap: '5px',
				margin: '0 5px',
				padding: '0 5px',
				...(props.onClick && {
					'&:hover': {
						bgcolor: 'secondary.light',
						cursor: 'pointer'
					}
				})
			}}
			onClick={props.onClick}
		>
			{props.icon}
			{props.label}
		</Box>
	</>
);

type InformationProps = {
	lineNumber?: number;
	columnNumber?: number;
};

const Header = ({ lineNumber = 1, columnNumber = 1 }: InformationProps) => {
	const desktop = useMediaQuery('(min-width:600px)');

	return (
		<>
			<Box sx={{ bgcolor: 'grey.900', display: 'flex', height: '22px', padding: '0 8px' }}>
				<HeaderLabel
					label={`Ln ${lineNumber.toString().padStart(2, '0')} Col ${columnNumber
						.toString()
						.padStart(2, '0')}`}
				/>
				<HeaderLabel label='Lang (TODO)' />
				{desktop && (
					<>
						<Spacer />
						<HeaderLabel
							label='Docs'
							icon={<SiGitbook size='12px' />}
							onClick={() => window.open('/docs')}
						/>
						<HeaderLabel
							label='Github'
							icon={<SiGithub size='12px' />}
							onClick={() => window.open('/github')}
						/>
					</>
				)}
			</Box>
		</>
	);
};

export default Header;
