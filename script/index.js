import { ColumnController } from "./column.js";
import State from "./state.js";

const state = State();
const body = document.body;
const columnController = ColumnController(state, body);

columnController.renderInit();