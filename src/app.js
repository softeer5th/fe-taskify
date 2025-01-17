import Model from "./model.js";
import MainController from "./controller/mainController.js";

const model = new Model();
const rootElement = document.getElementById("root");
const mainController = MainController(model, rootElement);
