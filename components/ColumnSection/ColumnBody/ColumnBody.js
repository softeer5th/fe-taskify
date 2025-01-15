import loadStyleSheet from "../../../utils/loadStyleSheet.js";
import createColumnBody from "./ui/createColumnBody.js";

loadStyleSheet("/components/ColumnSection/ColumnBody/styles.css");

const ColumnBody = ({ sectionId, items }) => {
  const $columnBody = createColumnBody({
    sectionId,
    items,
  });

  return $columnBody;
};

export default ColumnBody;
