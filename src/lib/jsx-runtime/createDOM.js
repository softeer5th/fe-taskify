/**
 * @param {VNode} node - 변환할 가상 노드.
 * @param {HTMLElement} [prev] - 이전에 생성된 실제 DOM.
 * @returns {HTMLElement | Text | DocumentFragment} - 변환된 실제 DOM.
 */
export const createDOM = (node) => {
  if (node instanceof HTMLElement) {
    return node;
  }

  if (!node || node === null || node === undefined) {
    return document.createDocumentFragment();
  }

  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  }

  /**
   * @returns {HTMLElement | SVGElement} - 생성된 DOM 요소.
   */
  const createElement = () => {
    if (node.type === "svg" || node.type === "path") {
      return document.createElementNS("http://www.w3.org/2000/svg", node.type);
    }
    return document.createElement(node.type);
  };

  const element = createElement();

  if (node.id) element.id = node.id;

  Object.entries(node.props).forEach(([key, value]) => {
    if (element.nodeName === "path" && (key === "stroke" || key === "fill")) {
      element.setAttribute(key, "current");
    } else if (key === "ref") {
      value.current = element;
    } else element.setAttribute(key, value.toString());
  });
  Object.entries(node.events).forEach(([key, value]) => {
    element.addEventListener(key, value);
  });

  node.children.forEach((child) => element.appendChild(createDOM(child)));

  return element;
};
