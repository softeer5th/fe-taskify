import { transformJSX } from "./transform.js";

/**
 *
 * @param {any} node - 변환할 JSX.
 * @returns {HTMLElement | Text | DocumentFragment} - 변환된 DOM.
 */
export const createElement = (node) => {
  const JSX = transformJSX(node);

  if (JSX === null || JSX === undefined) {
    return document.createDocumentFragment();
  }

  if (typeof JSX === "string" || typeof JSX === "number") {
    return document.createTextNode(JSX);
  }

  const element = document.createElement(JSX.tag);

  // 자식 노드 추가
  JSX.children.forEach((child) => element.appendChild(createElement(child)));

  return element;
};
