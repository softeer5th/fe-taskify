import { IMAGE } from "../../../assets/index.js";
import { STORAGE_KEY } from "../../../constants/storageKey.js";
import { createButton, createElement, createImg } from "../../../dom.js";
import { loadLocalStorage } from "../../../utils/localStorage.js";

const ANIMATION_DURATION = 500;
const INITIAL_SORT_TYPE = "생성 순";

const toggleText = {
  "최신 순": "생성 순",
  "생성 순": "최신 순",
};

const getSortedTodoList = ({ todoList, sortType }) => {
  return [...todoList].map((section) => {
    section.items.sort((a, b) => {
      if (sortType === "최신 순") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortType === "생성 순") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    return section;
  });
};

// 정렬 애니메이션 적용
const applySortAnimation = (sortedTodoList) => {
  sortedTodoList.forEach((section) => {
    const $columnBody = document.querySelector(`#${section.id} .column__body`);

    const $items = Array.from($columnBody.children);
    const orderedIdList = section.items.map((item) => item.id);

    const gap = Number(
      window
        .getComputedStyle($columnBody)
        .getPropertyValue("gap")
        .split("px")[0]
    );

    $items.forEach(($item) => {
      const currentIndex = $items.indexOf($item);
      const newIndex = orderedIdList.indexOf(Number($item.dataset.id));
      const offset = (newIndex - currentIndex) * ($item.offsetHeight + gap);

      $item.classList.add("item-move");
      $item.style.setProperty("--translate-offset", `${offset}px`);

      setTimeout(() => {
        $item.classList.remove("item-move");
      }, ANIMATION_DURATION);
    });

    setTimeout(() => {
      const sortedItems = orderedIdList.map((id) =>
        $items.find(($item) => Number($item.dataset.id) === id)
      );

      $columnBody.replaceChildren(...sortedItems);
    }, ANIMATION_DURATION);
  });
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
    const todoList = loadLocalStorage(STORAGE_KEY.todoList);

    // 2. 토글된 정렬 기준으로 데이터를 정렬한다.
    const sortType = toggleText[e.currentTarget.textContent];
    const sortedTodoList = getSortedTodoList({ todoList, sortType });

    // 카드 정렬 애니메이션 적용
    applySortAnimation(sortedTodoList);

    // 텍스트 토글 (생성 순 / 최신 순)
    e.currentTarget.querySelector("span").textContent =
      toggleText[e.currentTarget.textContent];
  }

  $sortButton.append($arrow, $sortText);
  return $sortButton;
};

export default createSortButton;
