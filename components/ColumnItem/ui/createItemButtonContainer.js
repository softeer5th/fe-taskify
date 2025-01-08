import { IMAGE } from "../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../dom.js";

const createSvg = ({ className, ...props }) => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  const $svg = document.createElementNS(SVG_NS, "svg");
  $svg.setAttribute("xmlns", SVG_NS);
  $svg.setAttribute("class", className);

  props &&
    Object.entries(props).forEach(([key, value]) => {
      $svg.setAttribute(key, value);
    });

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute(
    "d",
    "M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z"
  );
  path.setAttribute("fill", "#A0A3BD");

  $svg.appendChild(path);

  return $svg;
};

const createItemButtonContainer = () => {
  const $itemButtonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });

  const $deleteButton = createButton({
    handleClick: () => alert("Delete button clicked"),
  });

  const $deleteImg = createSvg({
    className: "delete__img",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
  });

  $deleteButton.appendChild($deleteImg);

  const $editButton = createButton({
    handleClick: () => alert("Edit button clicked"),
  });
  const $editImg = createImg({
    src: IMAGE.edit,
    alt: "수정",
  });

  $editButton.appendChild($editImg);

  $itemButtonContainer.append($deleteButton, $editButton);

  return $itemButtonContainer;
};

export default createItemButtonContainer;
