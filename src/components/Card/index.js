import { Icon } from "../../constants/icons/index.js";
import { typos, colors } from "../../constants/tokens/index.js";
import { useState, useRef } from "../../lib/hooks/index.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { checkUserAgent } from "../../utils/checkUserAgent.js";
import { Button } from "../Button/index.js";

import styles from "./card.module.js";

/**
 *
 * @param {object} props - 카드 컴포넌트에 전달되는 props.
 * @param {string} [props.title] - 카드의 제목.
 * @param {string} [props.body] - 카드의 본문.
 * @param {"default"|"add-edit"|"drag"|"place"} [props.type] - 카드의 타입.
 * @param {Function} [props.onClickDelBtn] - 삭제 버튼 클릭 이벤트 시 호출할 함수.
 * @returns {VDOM} - 카드 컴포넌트 가상 돔
 */
export const Card = ({
  title, body, type = "default", onClickDelBtn,
}) => {
  const [cardType, setCardType] = useState(type);
  const [cardTitle, setCardTitle] = useState(title);
  const [cardBody, setCardBody] = useState(body);

  // TODO: diffing algorithm 구현 이후 제어 컴포넌트로 수정, 버튼 비활성화 구현하기.
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  /**
   *
   * @param {Function} onClickLeft - 왼쪽 버튼 클릭 이벤트 시 호출할 함수.
   * @param {Function} onClickRight - 오른쪽 버튼 클릭 이벤트 시 호출할 함수.
   * @param {boolean} disabled
   * @returns {VDOM} - 버튼 컴포넌트 가상돔
   */
  const Buttons = () => {
    const handleClickCancelButton = () => setCardType("default");

    const handleClickEnrollButton = () => {
      setCardTitle(titleRef.current.value);
      setCardBody(bodyRef.current.value);
      setCardType("default");
    };

    return parser`
      <div class="${styles.buttons}">
          ${Button({
    label: "취소",
    variant: "sub",
    isFull: true,
    onClick: handleClickCancelButton,
  })}
    ${Button({
    label: "등록",
    isFull: true,
    disabled: !cardTitle || !cardBody,
    onClick: handleClickEnrollButton,
  })}
      </div>
      `;
  };

  const Icons = () => {
    const handleClickEdit = () => setCardType("add-edit");
    return parser`
        <div class="${styles["icon-container"]}">
            ${Icon({ name: "close", fillColor: colors.text.weak, onClick: onClickDelBtn })}
            ${Icon({ name: "edit", strokeColor: colors.text.weak, onClick: handleClickEdit })}
        </div>
      `;
  };

  const FormContent = () => {
    const MAX_LENGTH = 500;

    return parser`
      <form class="${styles["text-container"]}">
        <input ref=${titleRef} class="${typos.display.bold[14]} ${styles.title}" placeholder="제목을 입력하세요" value=${cardTitle} maxLength=${MAX_LENGTH} required />
        <input ref=${bodyRef} class="${typos.display.medium[14]} ${styles.body}" placeholder="내용을 입력하세요" value=${cardBody} maxLength=${MAX_LENGTH} required />
      </form>
    `;
  };

  const Content = () => parser`
      <div class="${styles["text-container"]}">
          <div class="${typos.display.bold[14]} ${styles.title}">${cardTitle}</div>
          <div class="${typos.display.medium[14]} ${styles.body}">${cardBody}</div>
          <div class="${typos.display.medium[12]} ${styles.caption}">author by ${checkUserAgent()}</div>
      </div>`;

  const mainContents = () => {
    if (cardType === "add-edit") return FormContent();
    return Content();
  };

  const actionContents = () => {
    if (cardType === "add-edit") return Buttons();
    return Icons();
  };

  return parser`
    <div class="${styles.container} ${styles[cardType]}">
        ${mainContents()}
        ${actionContents()}
    </div>
    `;
};
