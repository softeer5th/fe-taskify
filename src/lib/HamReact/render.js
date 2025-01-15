import { updateDOM } from "./manageDOM/index.js";
import { setCreateVDOM, setRoot } from "./manageVDOM/index.js";

const render = (createVDOM, $root) => {
  setRoot($root);
  setCreateVDOM(createVDOM);
  updateDOM();
};

export default render;
