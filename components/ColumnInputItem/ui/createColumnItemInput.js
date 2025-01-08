import { createElement } from "../../../dom.js";
import createAddButtonContainer from "./createAddButtonContainer.js";
import createInputTextContainer from "./createInputTextContainer.js";

const createColumnInputItem = ({
  handleInputTitle,
  handleInputContent,
  handleCancel,
  handleSubmit,
}) => {
  const $columnInputItem = createElement("div", { className: "column__item" });
  const $inputTextContainer = createInputTextContainer({
    handleInputTitle,
    handleInputContent,
  });
  const $addButtonContainer = createAddButtonContainer({
    handleCancel,
    handleSubmit,
  });

  $columnInputItem.append($inputTextContainer, $addButtonContainer);

  return $columnInputItem;
};

export default createColumnInputItem;
