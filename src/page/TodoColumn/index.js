import { Card } from "../../components/Card/index.js";
import { ColumnTitle } from "../../components/ColumnTitle/index.js";
import { useState } from "../../lib/hooks/useState.js";
import { parser } from "../../lib/jsx-runtime/index.js";

export const TodoColumn = ({ title }) => {
  const [todos, setTodos] = useState([]);

  const handleClickAddTodo = () => {
    const newTodo = {};
    setTodos([...todos, newTodo]);
  };

  return parser`
        <div>
            ${ColumnTitle({ title, count: todos.length, onClickPlus: handleClickAddTodo })}
            <ul>
            </ul>
        </div>
    `;
};
