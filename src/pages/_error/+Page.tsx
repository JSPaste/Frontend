import { usePageContext } from 'vike-react/usePageContext';

export default function () {
	const pageContext = usePageContext();
	const { abortReason } = pageContext;

	let msg: string;

	if (typeof abortReason === 'string') {
		msg = abortReason;
	} else {
		msg = pageContext.is404 ? "This page doesn't exist" : 'Unknown error';
	}

	return <p>{msg}</p>;
}
