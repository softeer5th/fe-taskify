import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnSection from "./ui/createColumnSection.js";

loadStyleSheet("/components/ColumnSection/styles.css");

const ColumnSection = ({ id, title, items }) => {
  return createColumnSection({ id, title, items });
};

export default ColumnSection;
