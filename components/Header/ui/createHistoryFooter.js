import { createButton, createElement } from "../../../dom.js";
import createModal from "../../Modal/createModal.js";

const createHistoryFooter = ({ handleDeleteHistory, histories }) => {
  if (histories.length === 0) return "";

  const $historyFooter = createElement("div", {
    className: "history__footer",
  });

  const $deleteButton = createButton({
    className: "display-bold14",
    text: "기록 전체 삭제",
    handleClick: () => {
      createModal({
        content: "모든 사용자 활동 기록을 삭제할까요?",
        onClick: handleDeleteHistory,
      });
    },
  });

  $historyFooter.appendChild($deleteButton);
  return $historyFooter;
};

export default createHistoryFooter;
