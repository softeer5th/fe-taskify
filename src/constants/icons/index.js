import { useState } from "../../lib/HamReact/hooks/useState.js";

import icons from "./icons.js";

/**
 *
 * @param {object} props - 아이콘 컴포넌트의 props
 * @param {"arrowBoth" | "close" | "edit" | "history" | "plus" | "redo" | "undo"} props.name - 아이콘 이름
 * @param {"md"|"lg"} [props.size] - 아이콘 크기
 * @param {string}[props.fillColor] - 아이콘 채우기 색상
 * @param {string} [props.strokeColor] - 아이콘 테두리 색상
 * @param {Function} [props.onClick] - 클릭 이벤트 시 호출할 함수
 * @param {number} [props.width] - 아이콘 너비
 * @param {number} [props.height] - 아이콘 높이
 * @param {string} [props.hoverColor] - 마우스 호버 시 색상
 * @returns {VDOM} - 생성된 아이콘 엘리먼트
 */
export const Icon = ({
  name, size = "lg", fillColor = "", strokeColor = "", onClick,
  width, height,
  hoverColor,
}) => {
  const SIZE_NUM = size === "lg" ? 24 : 16;
  const element = icons[name]();
  const [color, setColor] = useState(fillColor || strokeColor);

  const colorIcon = () => {
    if (fillColor) element.props.fill = color;
    if (strokeColor) element.props.stroke = color;
  };

  if (typeof onClick === "function") {
    element.props.cursor = "pointer";
    element.events.click = onClick;
  }

  element.props.width = width || SIZE_NUM;
  element.props.height = height || SIZE_NUM;
  colorIcon(fillColor || strokeColor);

  if (hoverColor) {
    element.events.mouseenter = () => {
      setColor(hoverColor);
    };
    element.events.mouseleave = () => {
      setColor(fillColor || strokeColor);
    };
  }

  return element;
};
