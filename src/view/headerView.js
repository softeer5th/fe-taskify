import arrowBoth from "../../public/arrowBoth.js";
import clock from "../../public/clock.js";

export default function HeaderView({ onSortButtonClick, onHistoryButtonClick }) {
  const headerElement = document.createElement("header");
  headerElement.classList.add("header");

  const headerTitle = document.createElement("h3");
  headerTitle.classList.add("header__title");
  headerTitle.textContent = "TASKIFY";

  const sortButton = document.createElement("button");
  sortButton.classList.add("header__button--sort");
  sortButton.addEventListener("click", onSortButtonClick);

  const sortButtonIcon = document.createElement("div");
  sortButtonIcon.innerHTML = arrowBoth;

  const sortButtonText = document.createElement("span");
  sortButtonText.textContent = "생성 순";

  sortButton.appendChild(sortButtonIcon);
  sortButton.appendChild(sortButtonText);

  const historyButton = document.createElement("button");
  historyButton.classList.add("header__button--history");
  historyButton.addEventListener("click", onHistoryButtonClick);
  historyButton.innerHTML = clock;

  headerElement.appendChild(headerTitle);
  headerElement.appendChild(sortButton);
  headerElement.appendChild(historyButton);

  return headerElement;
}
