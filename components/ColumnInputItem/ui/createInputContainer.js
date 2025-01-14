import { createElement } from "../../../dom.js";
import createInputBox from "./createInputBox.js";

const createInputContainer = ({ title = "", content = "" }) => {
  const $inputTextContainer = createElement("div", {
    className: "column__item__textContainer",
  });
  const $inputBox = createInputBox({
    title,
    content,
  });

  $inputTextContainer.appendChild($inputBox);
  return $inputTextContainer;
};

export default createInputContainer;
