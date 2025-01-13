import Button from "../Button/Button.js";
import createImg from "../../utils/createImg.js";

export default function Header() {
  const header = document.createElement("header");
  header.classList.add("header");

  const headerTitle = document.createElement("div");
  headerTitle.classList.add("header__title", "display-bold24");
  headerTitle.textContent = "TASKFY";

  const historyClickHandler = () => {
    console.log("History button clicked!");
  };

  const historyButton = Button({
    format: "icon",
    onClick: historyClickHandler,
    children: createImg({
      src: "/assets/icons/clock.svg",
      alt: "history icon",
      classList: "header__historyIcon",
    }),
  });

  header.append(headerTitle, historyButton);

  return header;
}
