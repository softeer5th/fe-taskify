import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Text } from "../Text/index.js";

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
    // TODO: 매직 넘버
    if (Number(text) > 9) {
      return `${text}+`;
    }
    return text;
  };

  return parser`
    <span class="badge-container">
        ${Text({ text: formatText(), typo: typos.display.medium[12] })}
    </span>`;
};
