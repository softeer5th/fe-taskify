import { loadData } from "../store/workList.js";
import { SORT_METHOD } from "../constant/sortMethod.js";

const sortBtnTextToggle = (currentSortMethodString, sortMethodElement) => {
  if (currentSortMethodString === SORT_METHOD.created) {
    sortMethodElement.textContent = SORT_METHOD.current;
  } else {
    sortMethodElement.textContent = SORT_METHOD.created;
  }
};

const getSortedWorkList = (workList, sortMethodElement) => {
  return workList.map(([sectionType, dataArr], i) => {
    dataArr.sort((a, b) => {
      if (sortMethodElement === SORT_METHOD.created)
        return (
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        );
      return (
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    });
    return [sectionType, dataArr];
  });
};

const getGapBetweenCards = () => {
  const gapBetweenCards = Number(
    window
      .getComputedStyle(document.querySelector("section"))
      .getPropertyValue("gap")
      .split("px")[0]
  );
  return gapBetweenCards;
};

const sortingAnimation = (sortedList) => {
  sortedList.map(([sectionType, dataArr], index) => {
    const cardList = document.querySelectorAll(
      `.${sectionType}-wrapper .card-container .card:not(.form-card)`
    );
    const cardListArr = Array.from(cardList);
    const orderedListId = dataArr.map((item) => item.id);

    const gapBetweenCards = getGapBetweenCards();

    cardListArr.forEach((card) => {
      const UIIdx = cardListArr.indexOf(card);

      const sortedIdx = orderedListId.indexOf(Number(card.id));

      const offset =
        (sortedIdx - UIIdx) * (gapBetweenCards + card.offsetHeight); // (최근 위치 - 현재 위치) * (섹션 간 gap과 +카드의 크기 만큼) 이동.

      card.classList.add("sorting-card");
      card.style.setProperty("--translateY-offset", `${offset}px`);
      setTimeout(() => {
        card.classList.remove("sorting-card"); // 정렬된 이후에는 애니메이션 제거.
      }, 700);
      setTimeout(() => {
        updateUI(sectionType, cardListArr, orderedListId); // 애니메이션에 시점에 맞춰서 UI도 업데이트 되도록 바뀜.
      }, 700);
    });
  });
};

const updateUI = (sectionType, cardNodeList, orderedListId) => {
  const cardContainer = document.querySelector(
    `.${sectionType}-wrapper .card-container`
  );
  const formCard = document.querySelector(`.${sectionType}-form-card`);

  const orderedCardNodeList = orderedListId.map((cardId) =>
    cardNodeList.find((card) => Number(card.id) === cardId)
  );

  cardContainer.replaceChildren(formCard, ...orderedCardNodeList);
};

const sortHandler = (e) => {
  const { currentTarget: sortBtn } = e;
  const sortMethodElement = sortBtn.querySelector(".sort-method");
  const currentSortMethod = sortMethodElement.textContent;

  sortBtnTextToggle(currentSortMethod, sortMethodElement); // 텍스트 토글

  const workList = Object.entries(loadData()); // storage에서 데이터 가져오기.

  const sortedList = getSortedWorkList(workList, currentSortMethod);

  sortingAnimation(sortedList);
};
document.querySelector(".sort-btn").addEventListener("click", sortHandler);
