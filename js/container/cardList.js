import { onDeleteCard, onUpdateCard } from "../action/stateActions.js";
import { Card } from "../components/card/card.js";
import { columnStore } from "../store/column.js";


function getDragAfterElement(container, mouseY) {
  const draggableElements = [
    ...container.querySelectorAll(".card-view:not(.dragging)")
  ];

  // reduce를 돌면서, "마우스가 이 요소의 가운데 위에 있는지, 아래에 있는지" 계산
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      // 요소의 세로 중앙점
      const offset = mouseY - (box.top + box.height / 2);

      // offset이 0보다 작다는 것은
      // "드래그 중인 요소가 child의 위에 있다"는 뜻
      // 근데 그 중에서도 offset이 가장 큰(가장 근접한) child를 찾아야 함
      // 밑에 있는 경우도 고려해야함

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      }
      else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

export function CardList({ cards, columnId, setState }) {

  const store = columnStore();

  const cardList = document.createElement("ol");
  cardList.id = `list-${columnId}`;
  cardList.className = "column-card-list";

  cards.forEach((card) => {
    const { id } = card;
    const onCardDelete = () => onDeleteCard(columnId, id, setState);
    const onCardUpdate = (cardData) => onUpdateCard(columnId, id, cardData, setState)
    const cardElement = Card({
      card,
      columnId,
      onCardDelete,
      onCardUpdate,
    });
    cardList.appendChild(cardElement)
  });



  cardList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(cardList, e.clientY);


    if (!afterElement) {
      // 리스트의 맨 마지막으로 이동
      cardList.appendChild(dragging);
    } else {
      // 특정 요소 앞에 삽입

      //console.log("afterElement", afterElement)
      cardList.insertBefore(dragging, afterElement);
    }
  })

  cardList.addEventListener("drop", (e) => {
    e.preventDefault();
    // 본인 위에 drop하는 경우
    const [fromColumnId, fromCardId] = e.dataTransfer.getData("text").split("-").map(Number);
    const toColumnId = columnId;
    const cardIndex = Array.from(cardList.children).indexOf(document.querySelector(".dragging"));
    if (fromColumnId === toColumnId) {
      store.changeCardOnIndex(fromColumnId, fromCardId, cardIndex);
      setState({ columns: store.getColumns() });
      return;
    }
    console.log("성공")
    store.moveCard(fromColumnId, toColumnId, fromCardId, cardIndex);
    setState({ columns: store.getColumns() });
    e.dataTransfer.clearData();
  })

  return cardList;
}
