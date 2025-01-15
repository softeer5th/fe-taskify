import ColumnController from "./column.js";
import FabController from "./fab.js";
import HeaderController from "./header.js";
import State from "./state.js";
import LogStore from "./store/log.js";

const state = State();
const logStore = new LogStore();
const body = document.body;
const headerController = HeaderController(state, body, logStore);
const columnController = ColumnController(state, body, logStore);
const fabController = FabController(body, state, logStore);

headerController.renderInit();
columnController.renderInit();
fabController.renderInit();