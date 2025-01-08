import { createElement } from "../dom.js";
import ColumnHeader from "./ColumnHeader.js";
import ColumnItem from "./ColumnItem.js";

const ColumnSection = ({ id, title, items }) => {
  let store = { isTodoAdding: false };

  const $section = createElement("section", {
    id,
    className: "column__container",
  });
  const $columnHeader = ColumnHeader({ id, title, items, store });

  const $columnBody = createElement("div", { className: "column__body" });
  items.forEach(({ title, content, author }) => {
    const $columnItem = ColumnItem({ title, content, author });
    $columnBody.appendChild($columnItem);
  });

  $section.append($columnHeader, $columnBody);

  return $section;
};

export default ColumnSection;
