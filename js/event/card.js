import { createCard } from "../data/card.js";
import { cancelCardHTML, editCardHTML, saveCardHTML } from "../template/card.js";

// create,edit을 할 때 사용하는 event
export const attachCommandEvent = (cardElement, index, isEditting = false, originalData = undefined) => {
    cardElement.addEventListener("click", function (event) {
        if (event.target) {
            const button = event.target;
            if (button.className.includes("card-button-cancel")) {
                if (!isEditting) {
                    const card = button.closest(".card-template");
                    card.remove();
                    return;
                }
                const card = button.closest(".card-template");
                const { title, content, id } = originalData;
                let cardData = createCard();
                cardData.title = title;
                cardData.content = content;
                const cardList = button.closest("ol");
                cardList.replaceChild(cancelCardHTML(cardData), card)
                return;
            }
            if (button.className.includes("card-button-submit")) {
                const card = button.closest(".card-template");
                const inputTitle = card.querySelector("input")?.value;
                const inputContent = card.querySelector("textarea")?.value;
                if (inputTitle && inputContent) {
                    let cardData = createCard();
                    cardData.title = inputTitle;
                    cardData.content = inputContent;
                    const cardList = button.closest("ol");
                    const cardIndex = [...cardList.childNodes].indexOf(card);
                    cardList.replaceChild(saveCardHTML(cardData, index, cardIndex - 1), card);
                    let cardNum = cardList.closest(".column-template").querySelector(".column-header-content-num");
                    cardNum.innerText = Number(cardNum.innerText) + 1;
                }
                return;
            }
        }
    }, true);
    cardElement.querySelectorAll("input, textarea").forEach(card => card.addEventListener("input", function (event) {
        const inputElement = event.target;
        // 유동적인 크기 조절
        if (inputElement.tagName === "TEXTAREA") {
            const card = inputElement.closest(".card-template");
            let textarea = card.querySelector("textarea");
            textarea.style.height = 0;
            textarea.style.height = textarea.scrollHeight + "px";
        }
        // 등록 버튼 활성화
        if (inputElement.tagName === "INPUT" || inputElement.tagName === "TEXTAREA") {
            const card = inputElement.closest(".card-template");
            const isInputEmpty = [card.querySelector("input"), card.querySelector("textarea")].filter(card => card.value !== "").length < 2 ? false : true;
            let cardSubmitButton = card.querySelector(".card-button-submit");
            if (isInputEmpty) {
                cardSubmitButton.disabled = false;
                return;
            }
            cardSubmitButton.disabled = true;
        }

    }))

    return cardElement;
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
                    cardList.removeChild(card);
                    let cardNum = cardList.closest(".column-template").querySelector(".column-header-content-num");
                    cardNum.innerText = Number(cardNum.innerText) - 1;
                    alert("삭제 되었습니다.");
                    return;
                }
                alert("삭제가 취소되었습니다.")
                return;

            }
            if (button?.classList.contains("card-edit-button")) {
                const card = button.closest(".card-view-template");
                const id = card.id;
                const title = card.querySelector('.card-title').textContent.trim();
                const content = card.querySelector('.card-content').textContent.trim();
                const cardData = { title, content, id };
                const cardList = card.closest("ol");
                cardList.replaceChild(editCardHTML(cardData, Number(cardList.id.replace("list-", ""))), card);
            }
            return;
        }
    }
    )
    return cardElement;
}