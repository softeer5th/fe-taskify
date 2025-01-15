import plus from "../../public/plus.js";

export default function Fab({ onButtonClick }) {
  const $fab = document.createElement("button");
  $fab.classList.add("fab");
  $fab.innerHTML = plus;
  $fab.addEventListener("click", onButtonClick);
  return $fab;
}
