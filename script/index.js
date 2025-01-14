import ColumnController from "./column.js";
import HeaderController from "./header.js";
import State from "./state.js";

const state = State();
const body = document.body;
const headerController = HeaderController(state, body);
const columnController = ColumnController(state, body);
headerController.renderInit();
columnController.renderInit();