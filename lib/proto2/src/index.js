import {createRoot, createComponent} from "../lib/react.js";
import App from "./App.js";
const C = createComponent

createRoot(document.getElementById('root'))
    .render(C(App, {}))