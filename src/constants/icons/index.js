import icons from "./icons.js";

/**
 *
 * @param {object} props - 아이콘 컴포넌트의 props
 * @param {
 *  "arrowBoth" | "close" | "edit" | "history" | "plus" | "redo" | "undo"
 * } props.name - 아이콘 이름
 * @param {"md"|"lg"} [props.size] - 아이콘 크기
 * @param {string}[props.fillColor] - 아이콘 채우기 색상
 * @param {string} [props.strokeColor] - 아이콘 테두리 색상
 * @param {Function} [props.onClick] - 클릭 이벤트 시 호출할 함수
 * @returns {VDOM} - 생성된 아이콘 엘리먼트
 */
export const Icon = ({
  name, size = "lg", fillColor = "", strokeColor = "", onClick,
}) => {
  const SIZE_NUM = size === "lg" ? 24 : 16;
  const element = icons[name]();

  if (fillColor) element.props.fill = fillColor;
  if (strokeColor) element.props.stroke = strokeColor;
  if (typeof onClick === "function") {
    element.props.cursor = "pointer";
    element.events.click = onClick;
  }
  element.props.width = SIZE_NUM;
  element.props.height = SIZE_NUM;

  return element;
};
