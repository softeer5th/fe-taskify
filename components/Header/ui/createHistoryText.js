import { createElement } from "../../../dom.js";

const actionMapper = {
  add: "등록",
  remove: "삭제",
  update: "변경",
  move: "이동",
};

const createHistoryText = ({ history }) => {
  const $title = createElement("span", {
    className: "bold display-bold14",
    text: history.title,
  });

  const $column = createElement("span", {
    className: "bold display-bold14",
    text: history.column,
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

  switch (history.action) {
    case "add":
      return [
        $title,
        document.createTextNode("을(를) "),
        $column,
        document.createTextNode("에 "),
        $action,
        document.createTextNode("하였습니다."),
      ];

    case "remove":
      return [
        $title,
        document.createTextNode("을(를) "),
        $action,
        document.createTextNode("하였습니다."),
      ];

    case "update":
      return [
        $title,
        document.createTextNode("을(를) "),
        $action,
        document.createTextNode("하였습니다."),
      ];

    case "move":
      return [
        $title,
        document.createTextNode("을(를) "),
        $prevColumn,
        document.createTextNode("에서 "),
        $nextColumn,
        document.createTextNode("로 "),
        $action,
        document.createTextNode("하였습니다."),
      ];

    default:
      return [document.createTextNode("알 수 없는 작업입니다.")];
  }
};

export default createHistoryText;
