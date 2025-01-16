import { AlertManager } from "./view/alertManager.js";
import { App } from "./view/app.js";

export const alertManager =  new AlertManager();

const app = new App();
app.render(document.querySelector("#app"));

