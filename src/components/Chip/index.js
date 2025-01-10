import { Icon } from "../../constants/icons/index.js";
import { colors, typos } from "../../constants/tokens/index.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Text } from "../Text/index.js";

/**
 *
 * @param {object} props - 칩 컴포넌트의 props
 * @param {string} props.label - 칩에 표시할 라벨
 * @returns {VDOM}
 */
export const Chip = ({ label }) => parser`
    <span class="chip-container">
        ${Icon({ name: "arrowBoth", size: "md", strokeColor: colors.text.default })}
        ${Text({ text: label, typo: typos.display.medium[12] })}
    </span>
    `;
