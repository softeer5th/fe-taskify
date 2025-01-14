import { columnStore } from "../store/column.js";
import { cancelCardHTML, editCardHTML, saveCardHTML } from "../template/card.js";

const {
    createCardData,
    createCard,
    getCardWithId,
    getNumberOfCards,
    updateCard,
    deleteCard
} = columnStore();

// create,edit을 할 때 사용하는 event
export const attachCommandEvent = (cardElement) => {
    cardElement.addEventListener("click", function (event) {
        if (event.target) {
            const button = event.target;
            if (button.className.includes("card-button-cancel")) {
                const card = button.closest(".card-template");
                console.log(button.closest(".card-template"));
                const isEditting = card.classList.contains("edit");
                // 수정 모드가 아닐때
                if (!isEditting) {
                    const card = button.closest(".card-template");
                    card.remove();
                    return;
                }
                // 수정 모드 일 때
                const [columnId, cardId] = card.id.replace("card-", "").split("-").map(Number);
                const cardList = button.closest("ol");
                cardList.replaceChild(cancelCardHTML(getCardWithId(columnId, cardId)), card);
                return;
            }
            if (button.className.includes("card-button-submit")) {
                // 등록하기
                const card = button.closest(".card-template");
                const isEditting = card.classList.contains("edit");

                const inputTitle = card.querySelector("input")?.value;
                const inputContent = card.querySelector("textarea")?.value;

                // input이 모두 들어있고, 생성일 때
                if (inputTitle && inputContent) {
                    let cardData = {
                        ...createCardData(),
                        title: inputTitle,
                        content: inputContent
                    }
                    const column = button.closest("ol");
                    const columnId = Number(column.id.replace("list-", ""));
                    // 수정일 때는 원래 내용 교체
                    if (isEditting) {
                        const [columnId, cardId] = card.id.replace("card-", "").split("-").map(Number);
                        updateCard(columnId, cardId, card);
                        column.replaceChild(saveCardHTML(columnId, cardId), card);
                        return;
                    }
                    // 새로운 카드 ID 발급
                    const newCardId = createCard(columnId, cardData);
                    column.replaceChild(saveCardHTML(columnId, newCardId), card);
                    let cardNum = column.closest(".column-template").querySelector(".column-header-content-num");
                    console.log(cardNum.innerText, cardNum.textContent)
                    cardNum.innerText = getNumberOfCards(columnId);
                }
                return;
            }
        }
    }, true);
}

// 일반 카드 뷰에서 사용하는 이벤트
export const attachViewEvent = (cardElement) => {
    cardElement.addEventListener("click", function (event) {
        if (event.target) {

            const button = event.target.closest("button");
            console.log(button)
            if (button?.classList.contains("card-closed-button")) {
                if (confirm("삭제하시겠습니까?")) {
                    const cardList = button.closest("ol");
                    const card = button.closest(".card-view-template");
                    const [columnId, cardId] = card.id.replace("card-", "").split("-").map(Number);
                    deleteCard(columnId, cardId);
                    cardList.removeChild(card);
                    let cardNum = cardList.closest(".column-template").querySelector(".column-header-content-num");
                    cardNum.innerText = getNumberOfCards(columnId);
                    alert("삭제 되었습니다.");
                    return;
                }
                alert("삭제가 취소되었습니다.")
                return;

            }
            if (button?.classList.contains("card-edit-button")) {
                const card = button.closest(".card-view-template");
                const [columnId, cardId] = card.id.replace("card-", "").split("-").map(Number);
                const cardList = card.closest("ol");
                cardList.replaceChild(editCardHTML(), card);
            }
            return;
        }
    }
    )
    return cardElement;
}