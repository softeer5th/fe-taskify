import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnItem from "./ui/createColumnItem.js";

loadStyleSheet("/components/ColumnItem/styles.css");

const ColumnItem = ({ id, title = "", content = "", author = "web" }) => {
  const $columnItem = createColumnItem({
    itemId: id,
    title,
    content,
    author,
  });

  return $columnItem;
};

export default ColumnItem;
