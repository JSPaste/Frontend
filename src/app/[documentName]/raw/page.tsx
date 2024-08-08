import { redirect } from 'next/navigation';

type RedirectProps = {
	params: {
		documentName: string;
	};
};

export default function (props: RedirectProps) {
	// TODO: Expose Backend API route location
	return redirect(`/api/document/${props.params.documentName}/raw`);
}
