import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./actionHistoryItem.module.js";

/**
 *
 * @param props
 * @param props.action
 * @param props.title
 * @param props.columnBefore
 * @param props.columnAfter
 * @param props.username
 * @param props.timestamp
 * @returns {VDOM} -
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
            <div class="${typos.display.medium[12]} ${styles.timestamp}">${timestamp}</div>
        </div>
    </div>
    `;
};
