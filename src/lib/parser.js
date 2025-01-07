import { createElement } from "./createElement.js";

const DIRTY_PREFIX = "dirtyindex:";
const DIRTY_REGEX = /dirtyindex:(\d+):/;
const DIRTY_SEPERATOR_REGEX_G = /(dirtyindex:\d+:)/g;

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

  /**
   *
   * @param {string} text - 텍스트 노드
   * @returns {string | string[]} - 변환된 텍스트 노드
   */
  const handleTextNode = (text) => {
    if (!text.includes(DIRTY_PREFIX)) return text || null;

    const texts = text.split(DIRTY_SEPERATOR_REGEX_G);
    return texts.map((textPart) => {
      const dirtyIndex = DIRTY_REGEX.exec(textPart)?.[1];
      if (!dirtyIndex) return textPart || null;

      const arg = args[Number(dirtyIndex)];
      if (arg instanceof Array) {
        return arg;
      }
      return arg;
    });
  };

  /**
   *
   * @param {ChildNode} element - 파싱할 HTML 요소
   * @returns {VDOM} - 생성된 가상 DOM
   */
  const parseElement = (element) => {
    const type = element.tagName.toLowerCase();
    const props = {};
    const children = [];

    // 속성 처리
    Array.from(element.attributes || []).forEach((attr) => {
      const { name, value } = attr;
      if (value.includes(DIRTY_PREFIX)) {
        const match = DIRTY_REGEX.exec(value);
        if (match) {
          const arg = args[Number(match[1])];
          props[name] = arg; // DIRTY_PREFIX 처리된 값 치환
        } else {
          props[name] = value; // 치환되지 않은 값도 유지
        }
      } else {
        props[name] = value; // DIRTY_PREFIX가 없는 일반 속성 처리
      }
    });

    // 자식 노드 처리
    Array.from(element.childNodes || []).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        // 텍스트 노드 처리
        children.push(...handleTextNode(child.nodeValue));
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // 자식 엘리먼트를 재귀적으로 처리
        children.push(parseElement(child));
      }
    });

    return createElement(type, props, ...children);
  };

  const domParser = new DOMParser();
  const doc = domParser.parseFromString(templateString, "text/html");
  const rootElement = doc.body.firstChild;

  return parseElement(rootElement);
};
