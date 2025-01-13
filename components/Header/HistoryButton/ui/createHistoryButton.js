import { createButton, createImg } from "../../../../dom.js";
import { IMAGE } from "../../../../assets/index.js";

const createHistoryButton = ({ handleClickHistory }) => {
  const $historyButton = createButton({ handleClick: handleClickHistory });
  const $img = createImg({
    src: IMAGE.clock,
    alt: "사용자 활동 기록",
  });

  $historyButton.appendChild($img);
  return $historyButton;
};

export default createHistoryButton;
