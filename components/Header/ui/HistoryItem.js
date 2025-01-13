import { createElement, createImg } from "../../../dom.js";
import createHistoryContent from "./createHistoryContent.js";

const HistoryItem = ({ history }) => {
  const $historyContainer = createElement("li", {
    className: "history__container",
  });

  const $profileImg = createImg({
    src: history.profileImg,
    alt: "프로필",
  });
  $profileImg.width = 40;
  $profileImg.height = 40;

  const $contentContainer = createElement("div", {
    className: "history__contentContainer",
  });

  const $user = createElement("span", {
    className: "history__user display-medium14",
    text: history.nickname,
  });

  const $content = createHistoryContent({ history });

  const $date = createElement("span", {
    className: "history__date display-medium12",
    text: "3분 전",
  });

  $contentContainer.append($user, $content, $date);
  $historyContainer.append($profileImg, $contentContainer);
  return $historyContainer;
};

export default HistoryItem;
