import { Icon } from "../../constants/icons/index.js";
import { typos, colors } from "../../constants/tokens/index.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Badge } from "../Badge/index.js";

import styles from "./column.module.js";

/**
 *
 * @param {object} props - 컬럼 제목 컴포넌트에 전달되는 props.
 * @param {string} props.title - 컬럼 제목.
 * @param {number} props.count - 컬럼에 포함된 카드 개수.
 * @param {Function} [props.onClickPlus] - 컬럼 추가 버튼 클릭 이벤트 시 호출할 함수.
 * @param {Function} [props.onClickDel] - 컬럼 삭제 버튼 클릭 이벤트 시 호출할 함수.
 * @returns {VDOM} - 컬럼 제목 컴포넌트 가상돔
 */
export const ColumnTitle = ({
  title, count, onClickPlus, onClickDel,
}) => parser`
        <div class="${styles.container}">
            <div class="${styles.content}">
                <span class="${typos.display.bold[16]} ${styles.title}">${title}</span>
                ${Badge({ text: count })}
            </div>
            ${Icon({ name: "plus", fillColor: colors.text.weak, onClick: onClickPlus })}
            ${Icon({ name: "close", fillColor: colors.text.weak, onClick: onClickDel })}
        </div>
    `;
