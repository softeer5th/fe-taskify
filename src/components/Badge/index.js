import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Text } from "../Text/index.js";

import styles from "./badge.module.js";

/**
 *
 * @param {object} props - 뱃지 컴포넌트의 props
 * @param {string} props.text - 뱃지에 표시할 텍스트
 * @returns {VDOM}
 */
export const Badge = ({ text }) => {
  /**
   * @returns {string} - 포매팅된 텍스트
   */
  const formatText = () => {
    if (Number(text) > 9) {
      return `${text}+`;
    }
    return text;
  };

  return parser`
    <span class=${styles.container}>
        ${Text({ text: formatText(), typo: typos.display.medium[12] })}
    </span>`;
};
