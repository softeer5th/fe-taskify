import setAttrs from "./setAttrs.js";

/**
 * @param {string} type - 생성할 DOM 요소의 타입.
 * @returns {HTMLElement | SVGElement} - 생성된 DOM 요소.
 */
const createElement = (type) => {
  if (type === "svg" || type === "path") {
    return document.createElementNS("http://www.w3.org/2000/svg", type);
  }
  return document.createElement(type);
};

/**
 * 가상 돔을 실제 돔으로 변환합니다.
 * @param {VDOM} vDOM - 변환할 가상 돔.
 * @returns {HTMLElement | Text | DocumentFragment} - 변환된 실제 DOM.
 */
export const createDOM = (vDOM) => {
  if (!vDOM || vDOM === null || vDOM === undefined) {
    return document.createDocumentFragment();
  }

  if (vDOM.type === "text") {
    const textElement = document.createTextNode(vDOM.value);
    const { current } = vDOM;

    if (typeof current?.data === "string"
      && Object.is(current?.data, textElement.data)) return current;

    vDOM.current = textElement;
    return textElement;
  }

  const {
    type, props, events, children,
  } = vDOM;
  const element = createElement(type);
  vDOM.current = element;

  setAttrs(props, events, element);

  children.forEach((child) => element.appendChild(createDOM(child)));

  return element;
};
