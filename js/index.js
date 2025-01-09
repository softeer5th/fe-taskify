import { cardContainer } from "../components/cardContainer.js";
import { cardForm } from "../components/cardForm.js";
import { cardNavbar } from "../components/cardNavbar.js";
import { eachColumn } from "../components/eachColumn.js";
import { header } from "../components/header.js";

const eachColumnRender = () => {
  const sectionType = ["todo", "doing", "done"];
  sectionType.forEach((type) => {
    const column = eachColumn(type);
    const navbar = cardNavbar(type);
    const container = cardContainer();
    const form = cardForm(type);

    container.appendChild(form);
    column.appendChild(navbar);
    column.appendChild(container);
    document.querySelector(".column-area").append(column);
  });
};

const initRender = () => {
  const root = document.querySelector("#root");
  // root 바로 뒤에 헤더 추가
  root.append(header());

  const columnArea = document.createElement("main");
  columnArea.classList.add("column-area");
  root.appendChild(columnArea); // 전체 칼럼 영역.

  eachColumnRender();
};

initRender();
