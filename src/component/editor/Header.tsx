'use client';

import Spacer from '@/component/Spacer.tsx';
import { Class, GitHub } from '@mui/icons-material';
import { Box, useMediaQuery } from '@mui/material';
import type { ReactElement } from 'react';

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
						{/* TODO: Expose Backend API route location */}
						<HeaderLabel
							label='Docs'
							icon={<Class fontSize='inherit' />}
							onClick={() => window.open('/api/docs')}
						/>
						<HeaderLabel
							label='Github'
							icon={<GitHub fontSize='inherit' />}
							onClick={() => window.open('https://github.com/jspaste')}
						/>
					</>
				)}
			</Box>
		</>
	);
};

export default Header;
