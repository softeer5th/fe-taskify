import { createButton, createPlusSvg } from "../../dom.js";

const ColumnAddButton = () => {
  const $columnAddButton = createButton({
    className: "floating__button shadow-up",
  });
  const $plusSvg = createPlusSvg({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
  });

  $columnAddButton.appendChild($plusSvg);
  return $columnAddButton;
};

export default ColumnAddButton;
