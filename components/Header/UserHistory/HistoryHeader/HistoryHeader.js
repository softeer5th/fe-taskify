import { IMAGE } from "../../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../../dom.js";
import createHistoryHeader from "./ui/createHistoryHeader.js";

const HistoryHeader = () => {
  const handleClickClose = (e) => {
    const $userHistory = e.currentTarget.closest(".user-history");
    $userHistory.classList.toggle("fade-in");
  };

  const $historyHeader = createHistoryHeader({ handleClickClose });
  return $historyHeader;
};

export default HistoryHeader;
