import { parser } from "../lib/jsx-runtime/parser.js";

import { Header } from "./Header/index.js";
import styles from "./page.module.js";
import { TodoColumn } from "./TodoColumn/index.js";

const MainPage = () => parser`
    <div>
        ${Header()}
        <main class="${styles.container}">
            ${TodoColumn({ title: "해야할 일" })}
            ${TodoColumn({ title: "하고 있는 일" })}
            ${TodoColumn({ title: "완료한 일" })}
        </main>
    </div>
`;

export default MainPage;
