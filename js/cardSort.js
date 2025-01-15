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

// 특정 id를 가진 카드의 정렬 후 Y 좌표 계산 함수
const calculateSortedYPosition = (cardId, orderedListId, cardListArr) => {
  const sortedIdx = orderedListId.indexOf(Number(cardId));
  let yPosition = 0;

  // 해당 카드 위에 있는 모든 카드들의 높이 + gap 합산
  for (let i = 0; i < sortedIdx; i++) {
    const prevCardId = orderedListId[i];
    const prevCard = cardListArr.find((card) => Number(card.id) === prevCardId);
    yPosition += prevCard.offsetHeight + getGapBetweenCards();
  }

  return yPosition;
};

// 정렬 전 현재 Y 좌표 계산 함수
const calculateCurrentYPosition = (card, cardListArr) => {
  const currentIdx = cardListArr.indexOf(card);
  let yPosition = 0;

  // 현재 카드 위에 있는 모든 카드들의 높이 + gap 합산
  for (let i = 0; i < currentIdx; i++) {
    yPosition += cardListArr[i].offsetHeight + getGapBetweenCards();
  }

  return yPosition;
};

const sortingAnimation = (sortedList) => {
  sortedList.map(([sectionType, dataArr], index) => {
    const cardList = document.querySelectorAll(
      `.${sectionType}-wrapper .card-container .card:not(.form-card)`
    );
    const cardListArr = Array.from(cardList);
    const orderedListId = dataArr.map((item) => item.id);

    cardListArr.forEach((card) => {
      // 정렬 후의 Y 좌표
      const sortedYPosition = calculateSortedYPosition(
        card.id,
        orderedListId,
        cardListArr
      );

      // 현재 Y 좌표
      const currentYPosition = calculateCurrentYPosition(card, cardListArr);

      // 이동해야 할 거리 계산
      const yOffset = sortedYPosition - currentYPosition;

      card.classList.add("sorting-card");
      card.style.setProperty("--translateY-offset", `${yOffset}px`);
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
