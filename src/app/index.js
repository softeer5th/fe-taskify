import { createDOM } from "../lib/createDOM.js";

import App from "./app.js";

const root = document.getElementById("root");
root.appendChild(createDOM(App()));
