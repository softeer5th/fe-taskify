import {createRoot, component} from "./react.js";
import App from "./App.js";
const C = component

createRoot(document.getElementById('root'))
    .render(C(App, {key: 0}))