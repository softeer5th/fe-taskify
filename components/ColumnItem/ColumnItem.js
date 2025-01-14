import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnItem from "./ui/createColumnItem.js";

loadStyleSheet("/components/ColumnItem/styles.css");

const ColumnItem = ({
  sectionId,
  id,
  title = "",
  content = "",
  author = "web",
}) => {
  const handleDragStart = (e) => {
    const prevSectionId = e.target.closest(".column__container").id;
    e.target.classList.add("dragging");
    e.dataTransfer.setData("text/prevSectionId", prevSectionId);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  const $columnItem = createColumnItem({
    sectionId,
    itemId: id,
    title,
    content,
    author,
  });

  $columnItem.addEventListener("dragstart", handleDragStart);
  $columnItem.addEventListener("dragend", handleDragEnd);

  return $columnItem;
};

export default ColumnItem;
