import { FAB } from "../components/FAB/index.js";
import { useState } from "../lib/HamReact/hooks/useState.js";
import { parser } from "../lib/jsx-runtime/parser.js";
import ColumnStore from "../store/column/index.js";
import TodoStore from "../store/todo/index.js";

import { Header } from "./Header/index.js";
import styles from "./page.module.js";
import { TodoColumn } from "./TodoColumn/index.js";

const MainPage = () => {
  const columnStore = new ColumnStore();
  const todoStore = new TodoStore({ columnIds: columnStore.getColumnIds() });
  const [columns, setColumns] = useState(columnStore.getColumns());

  const handleClickAddColumn = () => {
    const newColumn = columnStore.addColumn();
    setColumns([...columns, newColumn]);
  };

  const handleClickDelColumn = (id) => {
    const deletedColumns = columnStore.removeColumn(id);
    setColumns(deletedColumns);
  };

  return parser`
    <div>
        ${Header()}
        <main>
          <ul class="${styles.container}">
            ${columns.map(({ id, name }) => parser`<li class=${styles.list} key=${id}>
                ${TodoColumn({
    id,
    name,
    todoStore,
    onClickDel: () => handleClickDelColumn(id),
  })}
              </li>`)}
          </ul>
        </main>
        ${FAB({ onClick: handleClickAddColumn })}
    </div>
`;
};

export default MainPage;
