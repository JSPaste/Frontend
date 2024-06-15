import { redirect } from 'next/navigation';

type RedirProps = {
	params: {
		documentName: string;
	};
};

// TODO: Expose Backend API route location
const redirRaw = (props: RedirProps) => redirect(`/api/document/${props.params.documentName}/raw`);

export default redirRaw;
