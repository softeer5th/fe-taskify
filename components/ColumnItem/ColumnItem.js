import { createElement } from "../../dom.js";
import createAuthor from "./ui/createAuthor.js";
import createItemButtonContainer from "./ui/createItemButtonContainer.js";
import createTextBox from "./ui/createTextBox.js";

const ColumnItem = ({ title = "", content = "", author = "web" }) => {
  const $columnItem = createElement("div", { className: "column__item" });

  const $textContainer = createElement("div", {
    className: "column__item__textContainer",
  });
  const $itemButtonContainer = createItemButtonContainer();
  const $textBox = createTextBox({ title, content });
  $textContainer.append($textBox, $itemButtonContainer);

  const $author = createAuthor({ author });
  $columnItem.append($textContainer, $author);

  return $columnItem;
};

export default ColumnItem;
