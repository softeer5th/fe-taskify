import { createElement } from "../../dom.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createAuthor from "./ui/createAuthor.js";
import createItemButtonContainer from "./ui/createItemButtonContainer.js";
import createTextBox from "./ui/createTextBox.js";

loadStyleSheet("/components/ColumnItem/styles.css");

const ColumnItem = ({
  sectionId,
  id,
  title = "",
  content = "",
  author = "web",
}) => {
  const $columnItem = createElement("div", {
    className: "column__item",
    "data-id": id,
  });

  const $textContainer = createElement("div", {
    className: "column__item__textContainer",
  });
  const $itemButtonContainer = createItemButtonContainer({
    sectionId,
    itemId: id,
  });
  const $textBox = createTextBox({ title, content });
  $textContainer.append($textBox, $itemButtonContainer);

  const $author = createAuthor({ author });
  $columnItem.append($textContainer, $author);

  return $columnItem;
};

export default ColumnItem;
