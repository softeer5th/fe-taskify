import { IMAGE } from "../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../dom.js";
import { loadLocalStorage } from "../../../utils/localStorage.js";
import ColumnSection from "../../ColumnSection/ColumnSection.js";

const INITIAL_SORT_TYPE = "생성 순";

const toggleText = {
  "최신 순": "생성 순",
  "생성 순": "최신 순",
};

const getSortedTodoList = ({ todoList, sortType }) => {
  return [...todoList].map((section) => {
    section.items.sort((a, b) => {
      if (sortType === "최신 순") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortType === "생성 순") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });

    return section;
  });
};

const updateDOM = (sortedTodoList) => {
  const $main = document.querySelector("main.column__section");

  const $fragment = document.createDocumentFragment();
  sortedTodoList.forEach((todo) => {
    $fragment.appendChild(ColumnSection(todo));
  });

  $main.replaceChildren($fragment);
};

const createSortButton = () => {
  const $sortButton = createButton({
    className: "sort__button",
    handleClick: handleClickSort,
  });
  const $arrow = createImg({ src: IMAGE.arrowBoth, alt: "정렬" });
  const $sortText = createElement("span", {
    className: "display-medium12",
    text: INITIAL_SORT_TYPE,
  });

  function handleClickSort(e) {
    // 1. 로컬 스토리지에서 데이터를 불러온다.
    const todoList = loadLocalStorage();

    // 2. 토글된 정렬 기준으로 데이터를 정렬한다.
    const sortedTodoList = getSortedTodoList({
      todoList,
      sortType: toggleText[e.currentTarget.textContent],
    });

    // 3. 데이터를 기준으로 column__section을 갈아끼운다.
    updateDOM(sortedTodoList);

    // 텍스트 토글 (생성 순 / 최신 순)
    e.currentTarget.querySelector("span").textContent =
      toggleText[e.currentTarget.textContent];
  }

  $sortButton.append($arrow, $sortText);
  return $sortButton;
};

export default createSortButton;
