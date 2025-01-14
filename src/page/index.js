import { parser } from "../lib/jsx-runtime/parser.js";

import { Header } from "./Header/index.js";
import styles from "./page.module.js";
import { TodoColumn } from "./TodoColumn/index.js";

const MainPage = () => {
  const columns = [{ title: "해야할 일" }, { title: "하고 있는 일" }, { title: "완료한 일" }];
  return parser`
    <div>
        ${Header()}
        <main class="${styles.container}">
            ${columns.map(({ title }) => TodoColumn({ title }))}
        </main>
    </div>
`;
};

export default MainPage;
