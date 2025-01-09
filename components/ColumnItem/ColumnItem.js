import { createElement } from "../../dom.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createAuthor from "./ui/createAuthor.js";
import createTextContainer from "./ui/createTextContainer.js";

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

  const $textContainer = createTextContainer({
    sectionId,
    itemId: id,
    title,
    content,
  });

  const $author = createAuthor({ author });
  $columnItem.append($textContainer, $author);

  return $columnItem;
};

export default ColumnItem;
