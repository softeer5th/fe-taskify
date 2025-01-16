import { ACTION_TYPE } from "./constants/action.js";

export const createElement = (tagName, options = {}) => {
  const $element = document.createElement(tagName);
  const { id, className, text, ...attributes } = options;

  if (id) $element.id = id;
  if (className)
    className.split(" ").forEach((cls) => $element.classList.add(cls));
  if (text) $element.textContent = text;

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      $element.setAttribute(key, value);
    });
  }

  return $element;
};

export const createButton = ({
  id = null,
  className = null,
  text = "",
  handleClick,
  disabled,
  type = ACTION_TYPE.add,
}) => {
  const $button = createElement("button", { id, className, text });
  $button.disabled = disabled ?? false;
  $button.addEventListener("click", handleClick);
  $button.setAttribute("data-type", type);

  return $button;
};

export const createImg = ({ src, alt = "" }) => {
  const $img = createElement("img");
  $img.src = src;

  if (alt) {
    $img.alt = alt;
  }

  return $img;
};

export const createTextarea = ({
  id = null,
  className = null,
  handleChange,
  handleInput,
  placeholder = "",
  maxLength = 500,
  value = "",
}) => {
  const $textarea = createElement("textarea", { id, className });
  $textarea.rows = 1;
  $textarea.maxLength = maxLength;
  $textarea.placeholder = placeholder ?? undefined;
  $textarea.value = value;

  $textarea.addEventListener("change", handleChange);
  $textarea.addEventListener("input", handleInput);

  return $textarea;
};

export const createDeleteSvg = ({ className, ...props }) => {
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
