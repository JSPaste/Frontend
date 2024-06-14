import { redirect } from 'next/navigation';

type RedirProps = {
	params: {
		documentName: string;
	};
};

export default function redirRaw(props: RedirProps) {
	// TODO: Expose Backend API route location
	return redirect(`/api/document/${props.params.documentName}/raw`);
}
