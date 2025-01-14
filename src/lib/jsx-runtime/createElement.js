import { createDOM } from "./createDOM.js";

/**
 * @typedef VNode
 * @type {string | number | VDOM | null | undefined}
 */

/**
 * @typedef VDOM
 * @type {object}
 * @property {string} tag - 생성할 HTML 태그의 종류.
 * @property {{ [key: string]: unknown } | null } props - 생성할 HTML 태그의 속성 객체.
 * @property {VNode[]} children - 생성할 HTML 태그의 자식 요소.
 */

/**
 *
 * @param {VDOM} parent - 가상 DOM의 부모 요소
 * @param {string} id - 가상 DOM의 고유 식별자
 * @param {string} type - 생성할 가상 DOM의 HTML 태그 이름
 * @param {{ [key: string]: unknown } | null } config - 생성할 HTML 태그의 속성 객체
 * @param {VNode[]} children - 생성할 HTML 태그의 자식 요소
 * @returns {VDOM} - 생성된 가상 DOM
 */
export const createElement = (parent, id, type, config, ...children) => {
  const props = {};
  const events = {};

  for (const propName in config) {
    if (propName.startsWith("on")) {
      const eventName = propName.slice(2).toLowerCase();
      events[eventName] = config[propName];
    } else props[propName] = config[propName];
  }

  const VDom = {
    type,
    props,
    events,
    children: children.filter((child) => {
      if (typeof child === "string") return child.trim() !== "";
      return child;
    }),
    id,
    parent,
  };

  return {
    ...VDom,
    render() {
      return createDOM(VDom);
    },
  };
};
