import { parser } from "../../lib/jsx-runtime/index.js";

/**
 *
 * @param {object} props - 컴포넌트의 props
 * @param {string} props.label - 버튼에 표시할 라벨
 * @param {"contained"|"ghost"} [props.type] - 버튼의 타입
 * @param {boolean} [props.showIcon] - 아이콘을 표시할지 여부
 * @param {Function} [props.onClick] - 클릭 이벤트 시 호출할 함수
 * @returns {HTMLElement} - 생성된 버튼 엘리먼트
 */
export const Button = ({
  showIcon = false,
  label,
  type = "contained",
  onClick,
}) => parser`
<button onClick=${onClick}>
    ${showIcon && "아이콘"}
    ${label}
</button>`;
