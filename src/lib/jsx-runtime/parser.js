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
  // 템플릿 리터럴 중 tagged templates 방식 사용.
  // ${}를 이용한 값들은 차례로 args로 들어오고, 순수 텍스트 값들은 ${}를 기준으로 분리되어 들어옴. (배열)
  const templateString = strings
    .map((str, index) => {
      // <div>hi${0}my${1}name${2}is Ham</div>
      // args.length = 3
      // <div>hidirtyindex:0:mydirtyindex:1:namedirtyindex:2:is Ham</div>
      // 즉 args가 들어갈 자리 뒤에 dirtyindex:0: 이런식으로 붙임.
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
   *
   * @param {string} text - 텍스트 노드
   * @returns {string | string[]} - 변환된 텍스트 노드
   */
  const handleTextNode = (text) => {
    if (!text.includes(DIRTY_PREFIX)) return text || null;
    const texts = text.split(DIRTY_SEPERATOR_REGEX_G);
    return texts.map((textPart) => {
      const dirtyIndex = findDirtyIndex(textPart);
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
        children.push(...handleTextNode(child.nodeValue));
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
