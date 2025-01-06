/**
 * @typedef VDOM
 * @type {object}
 * @property {string} tag - 생성할 HTML 태그의 종류.
 * @property {{ [key: string]: unknown }} props - 생성할 HTML 태그의 속성 객체.
 * @property {any[]} children - 생성할 HTML 태그의 자식 요소.
 */

/**
 *
 * @param {string} tag - HTML 태그의 종류.
 * @param {{ [key: string]: unknown } | null} props - HTML 태그의 속성 객체.
 * @param  {...any} children - HTML 태그의 자식 요소.
 * @returns {VDOM} - 생성된 VDOM 객체.
 */
export const v = (tag, props, ...children) => ({
  tag,
  props: props || null,
  children: children.flat(),
});
