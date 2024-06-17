'use client';

import Spacer from '@/component/Spacer.tsx';
import { Box, useMediaQuery } from '@mui/material';
import type { ReactElement } from 'react';
import { MdClass } from 'react-icons/md';
import { PiGithubLogoFill } from 'react-icons/pi';

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

export type HeaderProps = {
	lineNumber: number;
	columnNumber: number;
};

const Header = (props: HeaderProps) => {
	const desktop = useMediaQuery('(min-width:600px)');

	return (
		<>
			<Box sx={{ bgcolor: 'grey.900', display: 'flex', height: '22px', padding: '0 8px' }}>
				<HeaderLabel
					label={`Ln ${props.lineNumber.toString().padStart(2, '0')} Col ${props.columnNumber
						.toString()
						.padStart(2, '0')}`}
				/>
				<HeaderLabel label='Lang (TODO)' />
				{desktop && (
					<>
						<Spacer />
						{/* TODO: Expose Backend API route location */}
						<HeaderLabel
							label='Docs'
							icon={<MdClass fontSize='inherit' />}
							onClick={() => window.open('/api/docs')}
						/>
						<HeaderLabel
							label='Github'
							icon={<PiGithubLogoFill fontSize='inherit' />}
							onClick={() => window.open('https://github.com/jspaste')}
						/>
					</>
				)}
			</Box>
		</>
	);
};

export default Header;
