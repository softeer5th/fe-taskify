import { createElement } from "../../../../dom.js";
import createTitleContainer from "./createTitleContainer.js";
import createButtonContainer from "./createButtonContainer.js";

const createColumnHeader = ({ title, count }) => {
  const $columnHeader = createElement("div", { className: "column__header" });
  const $titleContainer = createTitleContainer({ title, count });
  const $buttonContainer = createButtonContainer();

  $columnHeader.append($titleContainer, $buttonContainer);
  return $columnHeader;
};

export default createColumnHeader;
