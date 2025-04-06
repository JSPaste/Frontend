import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import NotFoundGenericScreen from '#screen/NotFoundGenericScreen.tsx';
import Context from './Context.tsx';
import './index.css';

const EditorScreen = lazy(() => import('#screen/EditorScreen'));

render(
	() => (
		<Router root={Context}>
			<Route path='/' component={EditorScreen} />
			<Route path='/:documentName' component={EditorScreen} />
			<Route path='*' component={NotFoundGenericScreen} />
		</Router>
	),
	document.body
);
