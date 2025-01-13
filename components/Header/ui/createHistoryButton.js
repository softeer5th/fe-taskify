import { IMAGE } from "../../../assets/index.js";
import { createButton, createImg } from "../../../dom.js";

const createHistoryButton = () => {
  const handleClickHistory = (e) => {
    const $history = e.currentTarget.nextSibling;
    $history.classList.toggle("fade-in");
  };

  const $historyButton = createButton({ handleClick: handleClickHistory });
  const $img = createImg({
    src: IMAGE.clock,
    alt: "사용자 활동 기록",
  });

  $historyButton.appendChild($img);
  return $historyButton;
};

export default createHistoryButton;
