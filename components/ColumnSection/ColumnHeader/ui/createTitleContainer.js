import { createElement } from "../../../../dom.js";

const createTitleContainer = ({ title, count }) => {
  const $titleContainer = createElement("div", {
    className: "column__header__titleContainer",
  });
  const $title = createElement("span", {
    className: "column__title display-bold16",
    text: title,
  });
  const $count = createElement("span", {
    className: "column__count display-medium12",
    text: count,
  });

  $titleContainer.append($title, $count);
  return $titleContainer;
};

export default createTitleContainer;
