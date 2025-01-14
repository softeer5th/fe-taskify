import { Card } from "../../components/Card/index.js";
import { ColumnTitle } from "../../components/ColumnTitle/index.js";
import { useState } from "../../lib/hooks/useState.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./todoColumn.module.js";

export const TodoColumn = ({ title }) => {
  const [todos, setTodos] = useState([]);

  const handleClickAddTodo = () => {
    const newTodo = {
      id: new Date().getTime(),
    };
    setTodos([...todos, newTodo]);
  };

  const handleClickDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return parser`
        <div class="${styles.container}">
            ${ColumnTitle({ title, count: todos.length, onClickPlus: handleClickAddTodo })}
            <ul class="${styles.list}">
                ${todos.map((todo) => parser`
                  <li key="${todo.id}">
                    ${Card({ type: "add-edit", onClickDelBtn: () => handleClickDeleteTodo(todo.id) })}
                  </li>`)}
            </ul>
        </div>
    `;
};
