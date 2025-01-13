import { createElement } from "../../../dom.js";

import HistoryItem from "./HistoryItem.js";

const createHistoryMain = ({ histories }) => {
  const $historyMain = createElement("ul", { className: "history__main" });

  $historyMain.append(...histories.map((history) => HistoryItem({ history })));
  return $historyMain;
};

export default createHistoryMain;
