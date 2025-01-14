import loadStyleSheet from "../../../utils/loadStyleSheet.js";
import createColumnHeader from "./ui/createColumnHeader.js";

loadStyleSheet("/components/ColumnSection/ColumnHeader/styles.css");

const ColumnHeader = ({ title, items }) => {
  return createColumnHeader({
    title,
    count: items.length,
  });
};

export default ColumnHeader;
