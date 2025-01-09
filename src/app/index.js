import { createDOM } from "../lib/jsx-runtime/index.js";

import App from "./app.js";

const root = document.getElementById("root");
root.appendChild(createDOM(App()));
