import { createElement } from "../../../dom.js";
import createAddButtonContainer from "./createAddButtonContainer.js";
import createInputContainer from "./createInputContainer.js";

const createColumnInputItem = ({
  handleInputTitle,
  handleInputContent,
  handleCancel,
  handleSubmit,
}) => {
  const $columnInputItem = createElement("div", { className: "column__item" });
  const $inputContainer = createInputContainer({
    handleInputTitle,
    handleInputContent,
  });
  const $addButtonContainer = createAddButtonContainer({
    handleCancel,
    handleSubmit,
  });

  $columnInputItem.append($inputContainer, $addButtonContainer);

  return $columnInputItem;
};

export default createColumnInputItem;
