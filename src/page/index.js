import { FAB } from "../components/FAB/index.js";
import { useState } from "../lib/hooks/useState.js";
import { parser } from "../lib/jsx-runtime/parser.js";

import { Header } from "./Header/index.js";
import styles from "./page.module.js";
import { TodoColumn } from "./TodoColumn/index.js";

const MainPage = () => {
  const [columns, setColumns] = useState([{ title: "해야할 일" }, { title: "하고 있는 일" }, { title: "완료한 일" }]);
  const handleClickAddColumn = () => {
    const newColumn = {
      title: "새로운 컬럼",
    };
    setColumns([...columns, newColumn]);
  };
  return parser`
    <div>
        ${Header()}
        <main class="${styles.container}">
            ${columns.map(({ title }) => TodoColumn({ title }))}
        </main>
        ${FAB({ onClick: handleClickAddColumn })}
    </div>
`;
};

export default MainPage;
