import { getSectionType } from "../utils/getSectionType.js";
import { updateCardCount } from "./cardNavbar.js";
import { updateLocalStorageAfterDrop } from "../store/workList.js";

const NUMBER_OF_CARD_FORM_PER_SECTION = 1;
const dragStartHandler = (e) => {
  console.log("dragstart!!!!");

  const targetCard = e.target;
  const prevSectionType = getSectionType(targetCard);
  targetCard.classList.add("dragging");

  // 출발 섹션 정보와 카드 정보 저장
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ targetCardId: targetCard.id, prevSectionType })
  );
};
const dragEndHandler = (e) => {
  console.log("dragend");
  const targetCard = e.target;
  targetCard.classList.remove("dragging");
};

const getPositionToDrop = (sectionWrapper, mouseYCoordinate) => {
  // 마우스현재 y축 값을 보고, 현재 section의 어느 카드와 가장 가까운가 반환.
  const cards = [...sectionWrapper.querySelectorAll(".card:not(.dragging)")];
  console.log(sectionWrapper);
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

  const sectionContainer = e.target
    .closest("section")
    .querySelector(".card-container");
  if (!sectionContainer) return;

  const draggingCard = document.querySelector(".dragging");
  if (!draggingCard) return;

  const mouseYCoordinate = e.clientY;

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
    section.appendChild(draggingCard);
  }
};

const dropCardHandler = (e) => {
  e.preventDefault();
  const draggingCard = document.querySelector(".dragging");
  if (!draggingCard) return;

  draggingCard.classList.remove("dragging");
  const nowSectionType = getSectionType(draggingCard);

  const currentCardList = document.querySelectorAll(
    `.${nowSectionType}-wrapper .card-container .card`
  );

  updateCardCount(
    nowSectionType,
    currentCardList.length - NUMBER_OF_CARD_FORM_PER_SECTION
  );

  const cardInfo = e.dataTransfer.getData("text/plain");
  const prevSection = JSON.parse(cardInfo).prevSectionType;
  updateLocalStorageAfterDrop(prevSection, nowSectionType, draggingCard);

  console.log(nowSectionType);
};

const cards = document.querySelectorAll(".card");
cards.forEach((eachCard) => {
  eachCard.addEventListener("dragstart", dragStartHandler);
  eachCard.addEventListener("dragend", dragEndHandler); // 드래그를 중간에 취소했다면
  eachCard.addEventListener("dragover", dragOverHandler);
  eachCard.addEventListener("drop", dropCardHandler);
});
