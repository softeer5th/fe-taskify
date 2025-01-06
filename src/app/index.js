import { createElement } from "../lib/createElement.js";

import App from "./app.js";

const root = document.getElementById("root");
root.appendChild(createElement(App()));
