import { Icon } from "../../constants/icons/index.js";
import { colors, typos } from "../../constants/tokens/index.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Text } from "../Text/index.js";

import styles from "./button.module.js";

/**
 *
 * @param {object} props - 컴포넌트의 props
 * @param {string} [props.label] - 버튼에 표시할 라벨
 * @param {"contained"|"ghost"} [props.type] - 버튼의 타입
 * @param {"sub"|"primary"|"danger"} [props.variant] - 버튼의 종류
 * @param {boolean} [props.showIcon] - 아이콘을 표시할지 여부
 * @param {Function} [props.onClick] - 클릭 이벤트 시 호출할 함수
 * @param {boolean} [props.isFull] - 버튼의 너비를 꽉 채울지 여부
 * @param props.state
 * @returns {VDOM} - 생성된 버튼 가상돔
 */
export const Button = ({
  showIcon = false,
  label,
  type = "contained",
  variant = "primary",
  isFull = false,
  onClick,
}) => {
  /**
   * @returns {string} - 버튼의 클래스명
   */
  const findClasses = () => {
    const buttonClass = `${styles[type]} ${styles[variant]}`;
    if (isFull) return `${buttonClass} ${styles.full}`;
    return buttonClass;
  };

  return parser`
  <button onClick=${onClick} class="${findClasses()}">
      ${showIcon && Icon({ name: "plus", size: "md", fillColor: colors.text.white.default })}
      ${label && Text({ text: label, typo: typos.selected.bold[14] })}
  </button>`;
};
