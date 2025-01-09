import Header from "./components/Header/Header.js";
import ColumnSection from "./components/ColumnSection/ColumnSection.js";
import { createElement } from "./dom.js";

function App($root, todoList) {
  const $main = createElement("main", { className: "column__section" });

  this.render = function () {
    todoList &&
      todoList.forEach((todo) => {
        $main.appendChild(ColumnSection(todo));
      });

    $root.appendChild(Header());
    $root.appendChild($main);
  };
}

export default App;
