import { redirect } from 'next/navigation';

type RedirProps = {
	params: {
		documentName: string;
	};
};

export default function redirRaw(props: RedirProps) {
	// TODO: Add .env variable for the API endpoint
	redirect(`/api/document/${props.params.documentName}/raw`);
}
