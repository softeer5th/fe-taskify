import { cardContainer } from "../components/cardContainer.js";
import { cardForm } from "../components/cardForm.js";
import { cardNavbar } from "../components/cardNavbar.js";
import { eachColumn } from "../components/eachColumn.js";
import { header } from "../components/header.js";
import { loadData } from "../store/workList.js";
import { card } from "../components/card.js";
import { updateCardCount } from "./cardNavbar.js";

const SECTION_TYPE = ["todo", "doing", "done"];
const workList = loadData();

const eachColumnRender = () => {
  SECTION_TYPE.forEach((type) => {
    const column = eachColumn(type);
    const navbar = cardNavbar(type);
    const container = cardContainer();
    const form = cardForm(type);

    form.querySelector(".add-btn").disabled = true;
    container.appendChild(form);

    column.appendChild(navbar);
    column.appendChild(container);

    document.querySelector(".column-area").append(column);
  });
};

const initRender = async () => {
  const root = document.querySelector("#root");
  // root 바로 뒤에 헤더 추가
  root.append(header());

  const columnArea = document.createElement("main");
  columnArea.classList.add("column-area");
  root.appendChild(columnArea); // 전체 칼럼 영역.

  eachColumnRender();
  loadPreviousCard();

  // index.js가 로드되고 나서 로드 됨.
  await import("./createCard.js");
  await import("./editCard.js");
  await import("./deleteCard.js");
  await import("./cardNavbar.js");
};

const loadPreviousCard = () => {
  const fragment = new DocumentFragment();

  SECTION_TYPE.forEach((type) => {
    if (workList[type].length > 0) {
      //  최신순으로 default를 두어야할 것임. > 나중에 정렬 기능할 때 적용!
      workList[type].forEach(({ title, content, id }) => {
        const cardDoc = card(id, title, content);
        cardDoc.querySelector(".title").disabled = true;
        cardDoc.querySelector(".content").disabled = true;

        fragment.appendChild(cardDoc);
      });
      updateCardCount(type, workList[type].length);
      const cardForm = document.querySelector(`.${type}-form-card`);
      cardForm.after(fragment);
    }
  });
};

initRender();
