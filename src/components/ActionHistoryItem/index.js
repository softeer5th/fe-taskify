import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { calcBeforeTime } from "../../utils/date.js";

import styles from "./actionHistoryItem.module.js";

/**
 *
 * @param {object} props - 액션 히스토리 아이템 컴포넌트에 전달되는 props.
 * @param {"등록"|"삭제"|"변경"|"이동"} props.action - 액션 타입.
 * @param {string} props.title - 액션의 대상 투두의 제목.
 * @param {string} [props.columnBefore] - 액션 이전 컬럼 이름.
 * @param {string} [props.columnAfter] - 액션 이후 컬럼 이름.
 * @param {string} props.username - 액션을 수행한 사용자 이름.
 * @param {Date} props.timestamp - 액션 수행 시간.
 * @returns {VDOM} - 액션 히스토리 아이템 컴포넌트.
 */
export const ActionHistoryItem = ({
  username, title, columnBefore, columnAfter, action, timestamp,
}) => {
  /**
   *
   * @param {string} text - 굵은 글씨로 변환할 텍스트
   * @returns {VDOM} - 굵은 글씨로 변환된 텍스트
   */
  const formatTextToBoldTag = (text) => parser`<span class="${typos.display.bold[14]} ${styles.bold}">${text}</span>`;

  return parser`
    <div class="${styles.container}">
        <div class="${styles["img-container"]}"></div>
        <div class="${styles.content}">
            <div class="${typos.display.medium[14]} ${styles.body}">${username}</div>
            <div class="${typos.display.medium[14]} ${styles.body}">
                ${formatTextToBoldTag(title)}를 
                ${formatTextToBoldTag(columnBefore)}에서 
                ${formatTextToBoldTag(columnAfter)}으로 
                ${formatTextToBoldTag(action)}하였습니다.
            </div>
            <div class="${typos.display.medium[12]} ${styles.timestamp}">${calcBeforeTime(timestamp)}</div>
        </div>
    </div>
    `;
};
