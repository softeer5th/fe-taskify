import { Icon } from "../../constants/icons/index.js";
import { typos, colors } from "../../constants/tokens/index.js";
import { useState } from "../../lib/hooks/useState.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Button } from "../Button/index.js";

import styles from "./card.module.js";

/**
 *
 * @param {Function} onClickLeft - 왼쪽 버튼 클릭 이벤트 시 호출할 함수.
 * @param {Function} onClickRight - 오른쪽 버튼 클릭 이벤트 시 호출할 함수.
 * @returns {VDOM} - 버튼 컴포넌트 가상돔
 */
const Buttons = (onClickLeft, onClickRight) => parser`
        <div class="${styles.buttons}">
            ${Button({
    label: "취소", variant: "sub", isFull: true, onClick: onClickLeft,
  })}
            ${Button({ label: "등록", isFull: true, onClick: onClickRight })}
        </div>
    `;

/**
 *
 * @param {Function} onClickTop - 위쪽 버튼 클릭 이벤트 시 호출할 함수.
 * @param {Function} onClickBottom - 아래쪽 버튼 클릭 이벤트 시 호출할 함수.
 * @returns {VDOM} - 아이콘 컴포넌트 가상돔
 */
const Icons = (onClickTop, onClickBottom) => parser`
        <div class="${styles["icon-container"]}">
            ${Icon({ name: "close", fillColor: colors.text.weak, onClick: onClickTop })}
            ${Icon({ name: "edit", strokeColor: colors.text.weak, onClick: onClickBottom })}
        </div>
`;

/**
 *
 * @param {object} props - 카드 컴포넌트에 전달되는 props.
 * @param {string} props.title - 카드의 제목.
 * @param {string} props.body - 카드의 본문.
 * @param {"default"|"add-edit"|"drag"|"place"} [props.type] - 카드의 타입.
 * @param {string} [props.caption] - 카드의 캡션.
 * @param {Function} [props.onClickLT] - 왼쪽, 위쪽 버튼 클릭 이벤트 시 호출할 함수.
 * @param {Function} [props.onClickRB] - 오른쪽, 아래쪽 버튼 클릭 이벤트 시 호출할 함수.
 * @returns {VDOM} - 카드 컴포넌트 가상 돔
 */
export const Card = ({
  title, body, caption, type = "default", onClickLT, onClickRB,
}) => {
  const [cardType, setCardType] = useState(type);

  // eslint-disable-next-line
  const findContents = () => {
    if (cardType === "add-edit") return Buttons(() => setCardType("default"), onClickRB);
    return Icons(onClickLT, onClickRB);
  };

  return parser`
    <div class="${styles.container} ${styles[type]}">
        <div class="${styles["text-container"]}">
            <div class="${typos.display.bold[14]} ${styles.title}">${title}</div>
            <div class="${typos.display.medium[14]} ${styles.body}">${body}</div>
            ${caption && parser`<div class="${typos.display.medium[12]} ${styles.caption}">${caption}</div>`}
        </div>
        ${findContents(type)}
    </div>
    `;
};
