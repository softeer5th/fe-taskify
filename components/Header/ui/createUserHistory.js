import { IMAGE } from "../../../assets/index.js";
import { createElement, createButton, createImg } from "../../../dom.js";
import createModal from "../../Modal/createModal.js";
import createHistoryContent from "./createHistoryItem.js";

const history = {
  id: 1,
  action: "move",
  date: "2025-01-10T05:20:01.833Z",
  profileImg: IMAGE.profile,
  nickname: "@멋진삼",
  title: "블로그에 포스팅할 것",
  prevColumn: "하고있는 일",
  nextColumn: "해야할 일",
};

const createUserHistory = () => {
  const $userHistory = createElement("div", {
    className: "user-history shadow-floating",
  });

  const $historyHeader = createElement("div", {
    className: "history__header",
  });
  const $historyTitle = createElement("span", {
    className: "history__title display-bold16",
    text: "사용자 활동 기록",
  });

  const $closeImg = createImg({
    src: IMAGE.closed,
    alt: "닫기",
  });
  const $closeText = createElement("span", {
    className: "history__close display-bold14",
    text: "닫기",
  });

  // TODO: 닫기 버튼 클릭 시 오른쪽 이동 애니메이션 적용
  const $closeButton = createButton({
    className: "history__closeButton",
    handleClick: () => {
      alert("닫기");
    },
  });

  $closeButton.append($closeImg, $closeText);
  $historyHeader.append($historyTitle, $closeButton);

  const $historyContainer = createElement("div", {
    className: "history__container",
  });

  const $profileImg = createImg({
    src: IMAGE.profile,
    alt: "프로필",
  });
  $profileImg.width = 40;
  $profileImg.height = 40;

  const $contentContainer = createElement("div", {
    className: "history__contentContainer",
  });

  const $user = createElement("span", {
    className: "history__user display-medium14",
    text: "@멋진삼",
  });

  const $content = createHistoryContent({ history });

  const $date = createElement("span", {
    className: "history__date display-medium12",
    text: "3분 전",
  });

  $contentContainer.append($user, $content, $date);
  $historyContainer.append($profileImg, $contentContainer);

  const $historyFooter = createElement("div", {
    className: "history__footer",
  });

  // TODO: 기록 전체 삭제 삭제 클릭 시 모달 띄우기
  // TODO: 삭제하기 클릭 시 컨텐츠 전체 삭제
  const $deleteButton = createButton({
    className: "display-bold14",
    text: "기록 전체 삭제",
    handleClick: () => {
      // TODO: 사용자 활동 기록 저장 데이터도 모두 삭제
      $historyContainer.replaceChildren();
    },
  });

  $historyFooter.appendChild($deleteButton);

  $userHistory.append($historyHeader, $historyContainer, $historyFooter);
  return $userHistory;
};

export default createUserHistory;
