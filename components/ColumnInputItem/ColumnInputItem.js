import { ACTION_TYPE } from "../../constants/action.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnInputItem from "./ui/createColumnInputItem.js";

loadStyleSheet("/components/ColumnInputItem/styles.css");

const ColumnInputItem = ({
  id,
  title = "",
  content = "",
  type = ACTION_TYPE.add,
}) => {
  return createColumnInputItem({
    id,
    title,
    content,
    type,
  });
};

export default ColumnInputItem;
