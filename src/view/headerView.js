import icons from "../../asset/icon.js";

import Button from "../component/button.js";

export default function HeaderView({ onClickSortButton, onClickHistoryButton }) {
  const headerElement = document.createElement("header");
  headerElement.classList.add("header");

  const headerTitle = document.createElement("h3");
  headerTitle.classList.add("header__title");
  headerTitle.textContent = "TASKIFY";

  const sortButton = document.createElement("button");
  sortButton.classList.add("header__button--sort");
  sortButton.addEventListener("click", onClickSortButton);

  const sortButtonIcon = document.createElement("div");
  sortButtonIcon.appendChild(icons.arrowBoth());

  const sortButtonText = document.createElement("span");
  sortButtonText.textContent = "생성 순";

  sortButton.appendChild(sortButtonIcon);
  sortButton.appendChild(sortButtonText);

  const historyButton = Button({
    className: ["iconButton"],
    onClick: onClickHistoryButton,
    children: [icons.clock()],
  });
  historyButton.style.position = "absolute";
  historyButton.style.right = "80px";

  headerElement.appendChild(headerTitle);
  headerElement.appendChild(sortButton);
  headerElement.appendChild(historyButton);

  return headerElement;
}
