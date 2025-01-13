import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./text.module.js";

/**
 *
 * @param {object} props - 텍스트 컴포넌트의 props
 * @param {string} props.text - 표시할 텍스트
 * @param {string} [props.typo] - 텍스트의 타이포 클래스명
 * @returns {VDOM} - 생성된 텍스트 가상돔
 */
export const Text = ({ text, typo = typos.display.medium[14] }) => parser`
  <span class="${styles.text} ${typo}">${text}</span>`;
