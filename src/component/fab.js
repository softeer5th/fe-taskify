import plus from "../../public/plus.js";
import redo from "../../public/redo.js";
import undo from "../../public/undo.js";

export default function Fab({ icon, color, onButtonClick }) {
  const $fab = document.createElement("button");
  $fab.classList.add("fab");
  if (color === "brand") {
    $fab.classList.add("fab--brand");
  } else {
    $fab.classList.add("fab--default");
  }
  $fab.innerHTML = icon === "plus" ? plus : icon === "redo" ? redo : icon === "undo" ? undo : "";
  $fab.addEventListener("click", onButtonClick);
  return $fab;
}
