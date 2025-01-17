import { Icon } from "../../constants/icons/index.js";
import { colors } from "../../constants/tokens/index.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./header.module.js";

export const Header = () => parser`
        <header class="${styles.container}">
            <img src=${"../../public/img/logo.svg"} alt="Logo" />
            ${Icon({ name: "history", strokeColor: colors.text.default })}
        </header>
    `;
