/**
 * @param {VNode} node - 변환할 가상 노드.
 * @returns {HTMLElement | Text | DocumentFragment} - 변환된 실제 DOM.
 */
export const createDOM = (node) => {
  if (node === null || node === undefined) {
    return document.createDocumentFragment();
  }

  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.type);
  Object.entries(node.props).forEach(([key, value]) => {
    element.setAttribute(key, value.toString());
  });
  node.children.forEach((child) => element.appendChild(createDOM(child)));

  return element;
};
