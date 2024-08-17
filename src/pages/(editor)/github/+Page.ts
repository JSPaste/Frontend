import { redirect } from 'vike/abort';

export default function () {
	throw redirect('https://github.com/jspaste', 301);
}
