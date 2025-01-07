export const createNode = (tagName, id = null, className = null, text) => {
  const node = document.createElement(tagName);

  node.id = id ?? undefined;

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
  handleClick
) => {
  const $button = createNode("button", id, className, text);
  $button.addEventListener("click", handleClick);

  return $button;
};

export const createImgNode = (src, alt) => {
  const $img = createNode("img");
  $img.src = src;
  $img.alt = alt;

  return $img;
};
