import { ACTION_TYPE } from "../../../constants/action.js";
import { createElement } from "../../../dom.js";
import createAddButtonContainer from "./createAddButtonContainer.js";
import createInputContainer from "./createInputContainer.js";

const createColumnInputItem = ({
  id,
  title = "",
  content = "",
  type = ACTION_TYPE.add,
}) => {
  const $columnInputItem = createElement("div", {
    className: "column__item",
    "data-id": id,
  });
  const $inputContainer = createInputContainer({
    title,
    content,
  });
  const $addButtonContainer = createAddButtonContainer({ type });

  $columnInputItem.append($inputContainer, $addButtonContainer);
  return $columnInputItem;
};

export default createColumnInputItem;
