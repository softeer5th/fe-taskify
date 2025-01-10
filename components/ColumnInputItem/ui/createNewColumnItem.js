import { createElement } from "../../../dom.js";
import ColumnItem from "../../ColumnItem/ColumnItem.js";

const createNewColumnItem = ({ id, title, content, author, sectionId }) => {
  const $userAgent = createElement("span", {
    className: "userAgent display-medium12",
    text: `author by ${author}`,
  });

  const $newColumnItem = ColumnItem({
    id,
    title,
    content,
    author,
    sectionId,
  });

  $newColumnItem.replaceChild($userAgent, $newColumnItem.lastChild);
  return $newColumnItem;
};

export default createNewColumnItem;
