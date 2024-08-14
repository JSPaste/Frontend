import { redirect } from 'vike/abort';

// FIXME: Uncaught Error: AbortRender
export default function () {
	throw redirect('https://github.com/jspaste', 301);
}
