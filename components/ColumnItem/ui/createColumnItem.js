import { createElement } from "../../../dom.js";
import createAuthor from "./createAuthor.js";
import createTextContainer from "./createTextContainer.js";

const createColumnItem = ({ sectionId, itemId, title, content, author }) => {
  const $columnItem = createElement("div", {
    className: "column__item",
    "data-id": itemId,
    draggable: true,
  });

  const $textContainer = createTextContainer({
    sectionId,
    itemId,
    title,
    content,
  });
  const $author = createAuthor({ author });

  $columnItem.append($textContainer, $author);
  return $columnItem;
};

export default createColumnItem;
