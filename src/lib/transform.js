import { v } from "./v.js";

/**
 *
 * @param {string} code - 변환할 HTML 코드.
 * @returns {any} - 변환된 JSX 코드.
 */
export const transformJSX = (code) => code.replace(/<([a-zA-Z]+)(.*?)>(.*?)<\/\1>/g, (_, tag, props, children) => {
  const propString = props
    .trim()
    .split(/\s+/)
    .map((prop) => {
      const [key, value] = prop.split("=");
      return `${key}: ${value || true}`;
    })
    .join(", ");
  return v(tag, propString, children.trim());
});
