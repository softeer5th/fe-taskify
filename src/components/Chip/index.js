import { Icon } from "../../constants/icons/index.js";
import { colors } from "../../constants/tokens/colors.js";
import { typos } from "../../constants/tokens/typos.js";
import { parser } from "../../lib/jsx-runtime/index.js";

/**
 *
 * @param {object} props - 칩 컴포넌트의 props
 * @param {string} props.label - 칩에 표시할 라벨
 * @returns {VDOM}
 */
export const Chip = ({ label }) => parser`
    <span class="chip-container ${typos.display.medium[12]}">
        ${Icon({ name: "arrowBoth", size: "md", strokeColor: colors.text.default })} ${label}
    </span>
    `;
