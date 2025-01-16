import { FAB } from "../components/FAB/index.js";
import { useState } from "../lib/HamReact/hooks/useState.js";
import { parser } from "../lib/jsx-runtime/parser.js";

import { Header } from "./Header/index.js";
import styles from "./page.module.js";
import { TodoColumn } from "./TodoColumn/index.js";

let globalId = 0;

const MainPage = () => {
  const [columns, setColumns] = useState([{ id: 0, title: "해야할 일" },
    { id: 1, title: "하고 있는 일" },
    { id: 2, title: "완료한 일" }]);

  globalId = columns.length;

  const handleClickAddColumn = () => {
    const item = { id: globalId, title: "새로운 컬럼" };
    setColumns([...columns, item]);
    globalId += 1;
  };

  const handleClickDelColumn = (id) => {
    const deletedColumns = columns.filter((column) => column.id !== id);
    setColumns(deletedColumns);
  };

  return parser`
    <div>
        ${Header()}
        <main>
          <ul class="${styles.container}">
            ${columns.map(({ id, title }) => parser`<li key=${id}>
                ${TodoColumn({ id, title, onClickDel: () => handleClickDelColumn(id) })}
              </li>`)}
          </ul>
        </main>
        ${FAB({ onClick: handleClickAddColumn })}
    </div>
`;
};

export default MainPage;
