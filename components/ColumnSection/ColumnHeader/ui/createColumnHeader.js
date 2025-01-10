import { createElement } from "../../../../dom.js";
import createTitleContainer from "./createTitleContainer.js";
import createButtonContainer from "./createButtonContainer.js";

const createColumnHeader = ({ title, count, handleClickAdd }) => {
  const $columnHeader = createElement("div", { className: "column__header" });
  const $titleContainer = createTitleContainer({ title, count });
  const $buttonContainer = createButtonContainer({ handleClickAdd });

  $columnHeader.append($titleContainer, $buttonContainer);
  return $columnHeader;
};

export default createColumnHeader;
