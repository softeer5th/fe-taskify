import { createElement } from "../../../dom.js";
import createInputBox from "./createInputBox.js";

const createInputTextContainer = ({ handleInputTitle, handleInputContent }) => {
  const $inputTextContainer = createElement("div", {
    className: "column__item__textContainer",
  });
  const $inputBox = createInputBox({ handleInputTitle, handleInputContent });

  $inputTextContainer.appendChild($inputBox);

  return $inputTextContainer;
};

export default createInputTextContainer;
