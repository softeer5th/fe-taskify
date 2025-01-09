import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnBody from "./ui/createColumnBody.js";

loadStyleSheet("/components/ColumnBody/styles.css");

const ColumnBody = ({ sectionId, items }) => {
  return createColumnBody({ sectionId, items });
};

export default ColumnBody;
