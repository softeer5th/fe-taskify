import { Icon } from "../../constants/icons/index.js";
import { colors } from "../../constants/tokens/colors.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./fab.module.js";

/**
 *
 * @param {object} props - FAB에 전달할 props.
 * @param {Function} props.onClick - FAB 클릭 시 실행할 함수.
 * @returns {VDOM} FAB 가상 돔.
 */
export const FAB = ({ onClick }) => (
  parser`<button class="${styles.container}">
    ${Icon({
    name: "plus", fillColor: colors.text.white.default, onClick, width: 32, height: 32,
  })}
  </button>`
);
