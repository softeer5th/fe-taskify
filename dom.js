export const createNode = (tagName, id = null, className = null, text) => {
  const node = document.createElement(tagName);

  if (id) {
    node.id = id;
  }

  className &&
    className.split(" ").forEach((className) => {
      node.classList.add(className);
    });

  node.textContent = text;

  return node;
};

export const createButtonNode = (
  id = null,
  className = null,
  text = "",
  handleClick,
  disabled
) => {
  const $button = createNode("button", id, className, text);
  $button.disabled = disabled ?? false;
  $button.addEventListener("click", handleClick);

  return $button;
};

export const createImgNode = (src, alt) => {
  const $img = createNode("img");
  $img.src = src;
  $img.alt = alt;

  return $img;
};

export const createTextareaNode = ({
  id = null,
  className = null,
  handleChange,
  handleInput,
  placeholder = "",
  maxLength = 500,
}) => {
  const $textarea = createNode("textarea", id, className);
  $textarea.rows = 1;
  $textarea.maxLength = maxLength;
  $textarea.placeholder = placeholder ?? undefined;

  $textarea.addEventListener("change", handleChange);
  $textarea.addEventListener("input", handleInput);

  return $textarea;
};
