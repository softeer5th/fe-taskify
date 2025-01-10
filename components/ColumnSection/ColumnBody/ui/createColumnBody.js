import { createElement } from "../../../../dom.js";
import ColumnItem from "../../../ColumnItem/ColumnItem.js";

const createColumnBody = ({ sectionId, items }) => {
  const $columnBody = createElement("div", {
    className: "column__body",
  });

  items.forEach(({ id, title, content, author }) => {
    const $columnItem = ColumnItem({ sectionId, id, title, content, author });
    $columnBody.appendChild($columnItem);
  });

  return $columnBody;
};

export default createColumnBody;
