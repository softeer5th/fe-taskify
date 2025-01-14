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
    draggable: true,
  });

  const handleDragStart = (e) => {
    const prevSectionId = e.target.closest(".column__container").id;
    e.target.classList.add("dragging");
    e.dataTransfer.setData("text/prevSectionId", prevSectionId);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  const $textContainer = createTextContainer({
    sectionId,
    itemId: id,
    title,
    content,
  });
  const $author = createAuthor({ author });

  $columnItem.append($textContainer, $author);
  $columnItem.addEventListener("dragstart", handleDragStart);
  $columnItem.addEventListener("dragend", handleDragEnd);

  return $columnItem;
};

export default ColumnItem;
