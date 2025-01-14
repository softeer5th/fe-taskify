import { getSectionType } from "../utils/getSectionType.js";
import { updateCardCount } from "./cardCountUpdate.js";
import { updateLocalStorageAfterDrop } from "../store/workList.js";
import { NUMBER_OF_CARD_FORM_PER_SECTION } from "./index.js";

const dragStartHandler = (e) => {
  const { target: targetCard } = e;
  const prevSectionType = getSectionType(targetCard);
  targetCard.classList.add("dragging");

  // 출발 섹션 정보와 이전 카드 section 영역이 무엇인지 저장
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ targetCardId: targetCard.id, prevSectionType })
  );
};
const dragEndHandler = (e) => {
  const { target: targetCard } = e;
  targetCard.classList.remove("dragging");
};

const getPositionToDrop = (sectionWrapper, mouseYCoordinate) => {
  // 마우스현재 y축 값을 보고, 현재 section의 어느 카드와 가장 가까운가 반환.
  const cards = [...sectionWrapper.querySelectorAll(".card:not(.dragging)")];
  return cards.reduce(
    (closest, childCard) => {
      const box = childCard.getBoundingClientRect(); //element의 크기, 위치 정보를 담은 정보 반환.
      const offset = mouseYCoordinate - (box.top + box.height / 2); //마우스와 카드 중심점 사이의 거리

      if (offset < 0 && offset > closest.offset) {
        //마우스가 카드의 윗부분보다 위쪽에 있을 때,  현재 카드가 이전에 가장 가까운 카드보다 더 가까운 경우, 현재 카드를 업데이트
        return { offset, closestCard: childCard };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY } // 초반에 closest객체가 초기화 되는 부분.
  ).closestCard;
};

const dragOverHandler = (e) => {
  e.preventDefault();

  const { target: dragOverTarget } = e;

  // 드래그 오버 위치가 유효한지 확인
  const section = dragOverTarget.closest("section");
  if (!section) return;

  // 카드 컨테이너가 있는지 확인
  const sectionContainer = section.querySelector(".card-container");
  if (!sectionContainer) return;

  const draggingCard = document.querySelector(".dragging");
  if (!draggingCard) return;

  const { clientY: mouseYCoordinate } = e;

  const positionToDrop = getPositionToDrop(sectionContainer, mouseYCoordinate);

  try {
    if (positionToDrop && sectionContainer.contains(positionToDrop)) {
      sectionContainer.insertBefore(draggingCard, positionToDrop);
    } else {
      sectionContainer.appendChild(draggingCard);
    }
  } catch (error) {
    console.error("Drop failed:", error);
    // 실패 시 기본 동작으로 마지막에 추가
    sectionContainer.appendChild(draggingCard);
  }
};

const updateCountValue = (
  prevSection,
  prevSectionCardList,
  currentSection,
  currentCardList
) => {
  updateCardCount(
    // 옮겨진 섹션 count update
    currentSection,
    currentCardList.length
  );
  updateCardCount(
    // 옮기기전 섹션 count update
    prevSection,
    prevSectionCardList.length
  );
};

const dropCardHandler = (e) => {
  e.preventDefault();
  const draggingCard = document.querySelector(".dragging");
  if (!draggingCard) return;

  const draggCardInfo = e.dataTransfer.getData("text/plain");

  const nowSectionType = getSectionType(draggingCard);
  const currentCardList = document.querySelectorAll(
    `.${nowSectionType}-wrapper .card-container .card:not(.form-card)`
  );

  const prevSection = JSON.parse(draggCardInfo).prevSectionType;
  const prevCardList = document.querySelectorAll(
    `.${prevSection}-wrapper .card-container .card:not(.form-card)`
  );

  const changedIdx = [...currentCardList].findIndex(
    (card) => card.id === draggingCard.id
  );

  updateCountValue(prevSection, prevCardList, nowSectionType, currentCardList);
  updateLocalStorageAfterDrop(
    prevSection,
    nowSectionType,
    draggingCard,
    changedIdx
  );
};

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.addEventListener("dragstart", dragStartHandler);
  section.addEventListener("dragend", dragEndHandler); // 드래그를 중간에 취소했다면
  section.addEventListener("dragover", dragOverHandler);
  section.addEventListener("drop", dropCardHandler);
});
