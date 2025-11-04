import { Route, Router } from "@solidjs/router";
import { type JSXElement, lazy } from "solid-js";
import { render } from "solid-js/web";
import NotFoundScreen from "#screen/NotFoundScreen.tsx";
import Context from "./Context.tsx";
import "./index.css";

const EditorScreen: () => JSXElement = lazy(() => import("#screen/EditorScreen.tsx"));

render(
  () => (
    <Router root={Context}>
      <Route component={EditorScreen} path="/" />
      <Route component={EditorScreen} path="/:documentName" />
      <Route component={NotFoundScreen} path="*" />
    </Router>
  ),
  document.body
);
