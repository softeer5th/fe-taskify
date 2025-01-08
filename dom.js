export const createElement = (tagName, options = {}) => {
  const element = document.createElement(tagName);
  const { id, className, text, ...attributes } = options;

  if (id) element.id = id;
  if (className)
    className.split(" ").forEach((cls) => element.classList.add(cls));
  if (text) element.textContent = text;
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
};

export const createButton = (
  id = null,
  className = null,
  text = "",
  handleClick,
  disabled
) => {
  const $button = createElement("button", { id, className, text });
  $button.disabled = disabled ?? false;
  $button.addEventListener("click", handleClick);

  return $button;
};

export const createImg = (src, alt) => {
  const $img = createElement("img");
  $img.src = src;
  $img.alt = alt;

  return $img;
};

export const createTextarea = ({
  id = null,
  className = null,
  handleChange,
  handleInput,
  placeholder = "",
  maxLength = 500,
}) => {
  const $textarea = createElement("textarea", { id, className });
  $textarea.rows = 1;
  $textarea.maxLength = maxLength;
  $textarea.placeholder = placeholder ?? undefined;

  $textarea.addEventListener("change", handleChange);
  $textarea.addEventListener("input", handleInput);

  return $textarea;
};
