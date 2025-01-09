import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnSection from "./ui/createColumnSection.js";

loadStyleSheet("/components/ColumnSection/styles.css");

const ColumnSection = ({ id, title, items }) => {
  const store = { isTodoAdding: false };

  return createColumnSection({ id, title, items, store });
};

export default ColumnSection;
