import { createElement } from "../../../dom.js";
import ColumnBody from "../../ColumnBody/ColumnBody.js";
import ColumnHeader from "../../ColumnHeader/ColumnHeader.js";

const createColumnSection = ({ id, title, items, store }) => {
  const $columnSection = createElement("section", {
    id,
    className: "column__container",
  });
  const $columnHeader = ColumnHeader({ id, title, items, store });
  const $columnBody = ColumnBody({ items });

  $columnSection.append($columnHeader, $columnBody);

  return $columnSection;
};

export default createColumnSection;
