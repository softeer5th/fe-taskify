import { cardContainer } from "../components/cardContainer.js";
import { cardForm } from "../components/cardForm.js";
import { cardNavbar } from "../components/cardNavbar.js";
import { eachColumn } from "../components/eachColumn.js";
import { header } from "../components/header.js";
import { loadData } from "../store/workData.js";
import { card } from "../components/card.js";

const workList = loadData();

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
  loadPreviousCard();
};

const loadPreviousCard = () => {
  const sectionsTypes = ["todo", "doing", "done"];
  const fragment = new DocumentFragment();
  sectionsTypes.forEach((type) => {
    if (workList[type].length > 0) {
      workList[type].reverse(); //  최신순으로 default를 두어야할 것임. > 나중에 정렬 기능할 때 적용!

      workList[type].forEach(({ title, content }) => {
        fragment.appendChild(card(title, content));
      });

      const cardForm = document.querySelector(`.${type}-form-card`);
      cardForm.after(fragment);
    }
  });
};

initRender();
