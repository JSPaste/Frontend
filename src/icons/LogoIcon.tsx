import useThemeValues from '@/hooks/useThemeValues';
import { Icon, type IconProps } from '@chakra-ui/react';

export default function LogoIcon(props: Readonly<IconProps>) {
	const { getThemeValue } = useThemeValues();

	return (
		<Icon x='0px' y='0px' viewBox='0 0 460 460' enableBackground='new 0 0 460 460' {...props}>
			<path
				fill={getThemeValue('primary')}
				d='M283 323c0-11 2-13 13-13h13c10-1 14-5 15-15l1-36c0-6 1-13 4-19 3-4 9-6 14-10h2l-5-3c-11-3-14-12-15-22l-1-40c0-11-5-15-16-16l-16-1c-6 0-8-2-9-8v-24c1-6 2-8 8-8 16-1 33-3 49 2 14 5 22 16 26 30l2 15v36c0 12 8 18 19 18h9c6 0 9 3 9 9v23c0 7-2 9-9 9h-10c-11 0-18 6-18 18v37c-1 12-3 23-12 33-8 8-17 13-29 13h-35c-6 0-8-1-9-8v-20zM122 110c16-4 32-2 48-2 7 0 8 2 9 9v23c-1 6-3 8-9 9h-18c-8 1-14 5-14 14l-1 36-2 14c-2 10-9 13-18 16l5 3c11 3 14 12 15 22v31l1 12c1 8 5 12 13 13h16c9 0 12 2 12 12v21c-1 7-3 8-9 8h-34c-16 0-28-8-36-21-4-8-6-16-6-25v-36c0-13-7-19-19-19H65c-6-1-8-2-8-9v-24c0-5 3-7 8-8h10c12 0 19-7 19-18v-39c1-15 7-28 19-37l9-5z'
			/>
		</Icon>
	);
}
