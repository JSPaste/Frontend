import { Route, Router } from '@solidjs/router';
import { type JSXElement, lazy } from 'solid-js';
import { render } from 'solid-js/web';
import NotFoundScreen from '#screen/NotFoundScreen.tsx';
import Context from './Context.tsx';
import './index.css';

const EditorScreen: () => JSXElement = lazy(() => import('#screen/EditorScreen'));

render(
	() => (
		<Router root={Context}>
			<Route path='/' component={EditorScreen} />
			<Route path='/:documentName' component={EditorScreen} />
			<Route path='*' component={NotFoundScreen} />
		</Router>
	),
	document.body
);
