import {createRoot, component} from "./react.js";
import App from "./App.js";

createRoot(document.getElementById('root'))
    .render(component(App, {key: 0}))