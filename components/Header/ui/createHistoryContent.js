import { createElement } from "../../../dom.js";

const actionMapper = {
  add: "등록",
  remove: "삭제",
  update: "변경",
  move: "이동",
};

const createHistoryContent = ({ history }) => {
  const $contentContainer = createElement("span", {
    className: "history__content display-medium14",
  });

  const $title = createElement("span", {
    className: "bold display-bold14",
    text: history.title,
  });

  const $prevColumn = createElement("span", {
    className: "bold display-bold14",
    text: history.prevColumn,
  });

  const $nextColumn = createElement("span", {
    className: "bold display-bold14",
    text: history.nextColumn,
  });

  const $action = createElement("span", {
    className: "bold display-bold14",
    text: actionMapper[history.action],
  });

  $contentContainer.append(
    $title,
    document.createTextNode("을(를) "),
    $prevColumn,
    document.createTextNode("에서 "),
    $nextColumn,
    document.createTextNode("로 "),
    $action,
    document.createTextNode("하였습니다.")
  );

  return $contentContainer;
};

export default createHistoryContent;
