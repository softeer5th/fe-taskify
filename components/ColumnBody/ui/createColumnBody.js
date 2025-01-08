import { createElement } from "../../../dom.js";
import ColumnItem from "../../ColumnItem/ColumnItem.js";

const createColumnBody = ({ items }) => {
  const $columnBody = createElement("div", { className: "column__body" });

  items.forEach(({ title, content, author }) => {
    const $columnItem = ColumnItem({ title, content, author });
    $columnBody.appendChild($columnItem);
  });

  return $columnBody;
};

export default createColumnBody;
