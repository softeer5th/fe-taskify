import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Button } from "../Button/index.js";

/**
 *
 * @param {object} props - 알럿 컴포넌트의 속성.
 * @param {string} props.text - 알럿 안내 문구.
 * @param {Function} props.leftOnClick
 * @param {Function} props.rightOnClick
 * @returns {VDOM} - 알럿 컴포넌트.
 */
export const Alert = ({ text, leftOnClick, rightOnClick }) => parser`
    <div class="alert-background">
        <dialog open="true" class="alert-container">
            <div class="${typos.display.medium[16]} alert-text">${text}</div>
            <div class="alert-buttons">
                ${Button({
    label: "취소", onClick: leftOnClick, variant: "sub", isFull: true,
  })}
                ${Button({
    label: "삭제", onClick: rightOnClick, variant: "danger", isFull: true,
  })}
            </div>
        </dialog>
    </div>
`;
