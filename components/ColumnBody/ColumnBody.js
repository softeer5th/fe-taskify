import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnBody from "./ui/createColumnBody.js";

loadStyleSheet("/components/ColumnBody/styles.css");

const ColumnBody = ({ items }) => {
  return createColumnBody({ items });
};

export default ColumnBody;
