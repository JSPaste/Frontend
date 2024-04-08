import useServerURLStore from '@/store/serverURL';

export default function useServerURL() {
	const { serverURL, setServerURL } = useServerURLStore();

	return [serverURL, setServerURL] as const;
}
