import { createElement } from "../../../../dom.js";
import ColumnItem from "../../../ColumnItem/ColumnItem.js";

const createColumnBody = ({ sectionId, items }) => {
  const $columnBody = createElement("div", {
    className: "column__body",
  });

  const $columnItemList = items.map(({ id, title, content, author }) =>
    ColumnItem({ sectionId, id, title, content, author })
  );

  $columnBody.append(...$columnItemList);
  return $columnBody;
};

export default createColumnBody;
