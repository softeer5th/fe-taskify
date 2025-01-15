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
  const getRootElement = () => {
    /**
     * @returns {string} - 템플릿 문자열
     */
    const getTemplateString = () => {
      if (typeof strings === "string" && strings.trim().startsWith("<svg")) {
        return [strings, "image/svg+xml"];
      }
      return [strings
        .map((str, index) => {
          const argsString = args.length > index ? `${DIRTY_PREFIX}${index}:` : "";
          return `${str}${argsString}`;
        })
        .join(""), "text/html"];
    };

    const domParser = new DOMParser();
    const [template, type] = getTemplateString();
    const doc = domParser.parseFromString(template, type);
    return doc.body ? doc.body.firstChild : doc.firstChild;
  };

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
      if (dirtyIndex === undefined || dirtyIndex === null) return textPart || null;

      return args[Number(dirtyIndex)];
    });
  };

  /**
   * dirty index를 포함하여 변환했던 속성들을 다시 객체로 변환합니다.
   * @param {NamedNodeMap} attributes - 속성 객체
   * @returns {{ [key: string]: unknown }} - 변환된 속성 객체
   */
  const getProps = (attributes) => {
    const props = {};
    if (!attributes) return props;

    /**
     *
     * @param {string} value - 속성 값
     * @returns {string} - 변환된 속성 값
     */
    const formatAttributes = (value) => {
      if (!value.includes(DIRTY_PREFIX)) return value;

      const dirtyIndex = findDirtyIndex(value);
      const arg = args[dirtyIndex];
      return arg;
    };

    Array.from(attributes).forEach((attr) => {
      const { name, value } = attr;

      if (name.includes(DIRTY_PREFIX)) {
        const arg = formatAttributes(name);
        if (arg) props[arg] = true;
      } else if (name === "class") {
        const classes = value.split(" ").map((className) => formatAttributes(className)).join(" ");
        props[name] = classes;
      } else props[name] = formatAttributes(value);
    });
    return props;
  };

  /**
   * 자식 노드들을 파싱하여 자식 VDOM 배열로 변환합니다.
   * @param {any} parentId - 부모 VDOM의 id
   * @param {any} childNodes - 자식 노드들
   * @param {Function} callback - VDOM으로 변환할 콜백 함수
   * @returns {VDOM[]} - 변환된 자식 노드들
   */
  const getChildren = (childNodes, callback) => {
    const children = [];
    if (!childNodes) return children;

    Array.from(childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        children.push(callback(child));
      } else if (child.nodeType === Node.TEXT_NODE) {
        const formattedText = handleTextNode(child.nodeValue);
        if (typeof formattedText === "string") {
          children.push(formattedText);
        } else children.push(...formattedText);
      }
    });
    return children;
  };

  /**
   *
   * @param {ChildNode} element - 파싱할 HTML 요소
   * @returns {VDOM} - 생성된 가상 DOM
   */
  const parseElement = (element) => {
    const type = element.tagName.toLowerCase();
    const props = getProps(element.attributes);
    const children = getChildren(element.childNodes, parseElement);

    return createElement(type, props, ...children);
  };

  const rootElement = getRootElement();

  return parseElement(rootElement);
};
