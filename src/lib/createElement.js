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
 * @param {string} type - 생성할 가상 DOM의 HTML 태그 이름
 * @param {{ [key: string]: unknown } | null } config - 생성할 HTML 태그의 속성 객체
 * @param {VNode[]} children - 생성할 HTML 태그의 자식 요소
 * @returns {VDOM} - 생성된 가상 DOM
 */
export const createElement = (type, config, ...children) => {
  const props = {};

  for (const propName in config) {
    props[propName] = config[propName];
  }

  return {
    type,
    props,
    children,
  };
};
