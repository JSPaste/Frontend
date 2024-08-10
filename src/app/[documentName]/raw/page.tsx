import { redirect } from 'next/navigation';

type PageProps = {
	params: {
		documentName: string;
	};
};

export default function (props: PageProps) {
	// TODO: Expose Backend API route location
	return redirect(`/api/document/${props.params.documentName}/raw`);
}
