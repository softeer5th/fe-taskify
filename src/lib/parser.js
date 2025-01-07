import { createElement } from "./createElement.js";

const DIRTY_PREFIX = "dirtyindex:";
const DIRTY_REGEX = /dirtyindex:(\d+):/;

/**
 * html을 파싱하여 가상 DOM(VDOM)을 생성합니다.
 * @param {TemplateStringsArray} strings - 템플릿 문자열 배열
 * @param {...any} args - 템플릿 문자열에 삽입할 값들
 * @returns {VDOM} - 생성된 가상 DOM
 */
export const parser = (strings, ...args) => {
  const templateString = strings
    .map((str, index) => {
      const argsString = args.length > index ? `${DIRTY_PREFIX}${index}:` : "";
      return `${str}${argsString}`;
    })
    .join("");

  const domParser = new DOMParser();
  const doc = domParser.parseFromString(templateString, "text/html");
  const rootElement = doc.body.firstChild;

  /**
   *
   * @param {ChildNode} element - 파싱할 HTML 요소
   * @returns {VDOM} - 생성된 가상 DOM
   */
  const parseElement = (element) => {
    const type = element.tagName.toLowerCase();
    const props = {};
    const children = [];

    Array.from(element.attributes || []).forEach((attr) => {
      const { name, value } = attr;
      if (value.includes(DIRTY_PREFIX)) {
        const match = DIRTY_REGEX.exec(value);
        if (match) {
          const arg = args[Number(match[1])];
          props[name] = arg;
        }
      } else {
        props[name] = value;
      }
    });

    Array.from(element.childNodes || []).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        children.push(child.nodeValue);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        children.push(parseElement(child));
      }
    });

    return createElement(type, props, ...children);
  };

  return parseElement(rootElement);
};
