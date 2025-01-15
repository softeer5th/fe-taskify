import { createButton, createElement } from "../../../dom.js";
import createModal from "../../Modal/createModal.js";

const createHistoryFooter = ({ histories }) => {
  if (histories.length === 0) return "";

  const $historyFooter = createElement("div", {
    className: "history__footer",
  });

  const $deleteButton = createButton({
    className: "delete__button display-bold14",
    text: "기록 전체 삭제",
  });

  $historyFooter.appendChild($deleteButton);
  return $historyFooter;
};

export default createHistoryFooter;
