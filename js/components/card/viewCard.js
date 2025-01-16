import { ModalContainer } from "../../container/modalContainer.js";
import { createComponent } from "../../global/createComponent.js";
import { CardViewButtons } from "./buttons/cardViewButtons.js";
import { CardViewText } from "./text/cardViewText.js";

export const ViewCard = (card, columnId, onCardDelete, onCardUpdate) => {

    return createComponent({
        initialState: {
            modalVisible: false,
        }, render: ({ state, setState }) => {
            // 모아서 Batch로 넣는 방식을 연구해라.
            const fragment = document.createDocumentFragment();
            const cardContainer = document.createElement("div");
            cardContainer.className = "card-view-template";
            cardContainer.draggable = true;
            cardContainer.id = `${columnId}-${card.id}`;

            cardContainer.addEventListener("click", e => {
                const button = e.target.closest("button");
                if (button) {
                    if (button.classList.contains("card-edit-button")) {
                        onCardUpdate({
                            ...card,
                            readOnly: false

                        })
                    }
                    if (button.classList.contains("card-closed-button")) {
                        setState({ modalVisible: true })
                    }
                }
            })
            cardContainer.addEventListener("dragstart", (event) => {
                const cardElement = event.target.closest(".card-view");
                if (cardElement) {
                    console.log(`dragstart: ${columnId}-${card.id}`);
                    cardElement.classList.add("dragging");
                    cardElement.style.opacity = "0.5";
                    event.dataTransfer.setData("text", `${columnId}-${card.id}`);
                }
            });

            cardContainer.addEventListener("dragend", (event) => {
                const cardElement = event.target.closest(".card-view");
                if (cardElement) {
                    cardElement.style.opacity = "1";
                    cardElement.classList.remove("dragging");
                }
            });

            cardContainer.appendChild(CardViewText(card));
            cardContainer.appendChild(CardViewButtons());
            if (state.modalVisible) {
                cardContainer.appendChild(ModalContainer(
                    "선택한 카드를 삭제할까요?",
                    onCardDelete, setState));
            }

            fragment.appendChild(cardContainer);

            return fragment;
        },
        className: "card-view"
    })

}