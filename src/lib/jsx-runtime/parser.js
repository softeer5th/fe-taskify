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
   * @param {string} text - dirty index가 있는 텍스트 노드
   * @returns {number | null} - dirty index
   */
  const findDirtyIndex = (text) => {
    const match = DIRTY_REGEX.exec(text);
    return match ? Number(match[1]) : null;
  };

  /**
   * 텍스트 노드에 붙인 dirty index를 찾아서 해당 인덱스의 args로 대체하여 반환합니다.
   * @param {string} text - 텍스트 노드
   * @returns {string | string[]} - 변환된 텍스트 노드
   */
  const handleTextNode = (text) => {
    if (!text.includes(DIRTY_PREFIX)) return text || null;
    const texts = text.split(DIRTY_SEPERATOR_REGEX_G);
    return texts.map((textPart) => {
      const dirtyIndex = findDirtyIndex(textPart);
      if (!dirtyIndex) return textPart || null;

      return args[Number(dirtyIndex)];
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

    Array.from(element.attributes || []).forEach((attr) => {
      const { name, value } = attr;
      if (!value.includes(DIRTY_PREFIX)) {
        props[name] = value;
        return;
      }
      const dirtyIndex = findDirtyIndex(value);
      const arg = args[dirtyIndex];
      props[name] = arg;
    });

    Array.from(element.childNodes || []).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const formattedText = handleTextNode(child.nodeValue);
        if (typeof formattedText === "string") {
          children.push(formattedText);
          return;
        }
        children.push(...formattedText);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
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
