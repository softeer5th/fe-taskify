import { createElement } from "../../../../../../dom.js";
import createHistoryText from "./createHistoryText.js";

const createHistoryContent = ({ history }) => {
  const $contentContainer = createElement("span", {
    className: "history__content display-medium14",
  });

  $contentContainer.append(...createHistoryText({ history }));
  return $contentContainer;
};

export default createHistoryContent;
