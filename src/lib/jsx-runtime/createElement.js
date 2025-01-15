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
  const formatConfigs = () => {
    const props = {};
    const events = {};

    for (const propName in config) {
      if (propName.startsWith("on")) {
        const eventName = propName.slice(2).toLowerCase();
        events[eventName] = config[propName];
      } else props[propName] = config[propName];
    }

    return { props, events };
  };

  const formatChildren = () => children.flat().map((child) => {
    const childType = typeof child;
    if (childType === "object") return child;
    const value = childType === "string" || childType === "number"
      ? `${child}`
      : "";
    return { type: "text", value, current: undefined };
  });

  const vDOMChildren = formatChildren();
  const { props, events } = formatConfigs();

  return {
    type,
    props,
    events,
    children: vDOMChildren,
    current: undefined,
  };
};
