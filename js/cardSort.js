import { loadData } from "../store/workList.js";
import { SORT_METHOD } from "../constant/sortMethod.js";
const sortBtnTextToggle = (btn) => {
  const sortMethod = btn.textContent;
  if (sortMethod === SORT_METHOD.created) {
    btn.textContent = SORT_METHOD.current;
  } else {
    btn.textContent = SORT_METHOD.created;
  }
};

const getSortedWorkList = (workList, nowSortMethod) => {
  return workList.map(([sectionType, dataArr], i) => {
    dataArr.sort((a, b) => {
      if (nowSortMethod === SORT_METHOD.created)
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
    });
  });
};
const sortHandler = (e) => {
  const { target: sortBtn } = e;
  const currentSortMethod = sortBtn.textContent;
  sortBtnTextToggle(sortBtn); // 텍스트 토글

  const workList = Object.entries(loadData()); // storage에서 데이터 가져오기.

  const sortedList = getSortedWorkList(workList, currentSortMethod);

  sortingAnimation(sortedList);
};
document.querySelector(".sort-btn").addEventListener("click", sortHandler);
