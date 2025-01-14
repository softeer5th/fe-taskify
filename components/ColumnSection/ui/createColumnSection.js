import { createElement } from "../../../dom.js";
import ColumnBody from "../ColumnBody/ColumnBody.js";
import ColumnHeader from "../ColumnHeader/ColumnHeader.js";

const createColumnSection = ({ id, title, items }) => {
  const $columnSection = createElement("section", {
    id,
    className: "column__container",
  });
  const $columnHeader = ColumnHeader({ title, items });
  const $columnBody = ColumnBody({ sectionId: id, items });

  $columnSection.append($columnHeader, $columnBody);

  return $columnSection;
};

export default createColumnSection;
