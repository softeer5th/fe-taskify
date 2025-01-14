import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Button } from "../Button/index.js";

import styles from "./alert.module.js";

/**
 *
 * @param {object} props - 알럿 컴포넌트의 속성.
 * @param {string} props.text - 알럿 안내 문구.
 * @param {boolean} props.isOpen - 알럿 오픈 여부.
 * @param {Function} props.onClose - 알럿 닫기 함수.
 * @param {Function} props.rightOnClick - 알럿 오른쪽 버튼 클릭 이벤트 함수.
 * @returns {VDOM} - 알럿 컴포넌트.
 */
export const Alert = ({
  text, isOpen, onClose, rightOnClick,
}) => {
  const handleClickRightButton = () => {
    rightOnClick();
    onClose();
  };

  return parser`
    <div class="${styles.background}">
        <dialog open="${isOpen}" class="${styles.container}">
            <div class="${typos.display.medium[16]} alert-text">${text}</div>
            <div class="${styles.buttons}">
                ${Button({
    label: "취소",
    onClick: onClose,
    variant: "sub",
    isFull: true,
  })}
                ${Button({
    label: "삭제",
    onClick: handleClickRightButton,
    variant: "danger",
    isFull: true,
  })}
            </div>
        </dialog>
    </div>
`;
};
