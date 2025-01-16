import Component from "../../../components/component.js";
import { getCardData } from "../route/store/todoStore.js";
import { DefaultCard } from "./Card/card.js";
import { EditCard } from "./Card/editCard.js";
import { ColumnHeader } from "./columnHeader.js";

let previousPositions = {};

export class Column extends Component {

    onColumnDelete = () => { };

    onCardAdd = () => this.toggleAddCard();

    onNewCardDismiss = () => {
        this.children.input.object.clearInput();
        this.hideAddCard();
    };

    onEditCard = (index) => {
        const preData = this.children[`card${index}`].object.cardData;
        this.createEditCard(index, preData);
        this.rerender();
    }

    constructor(columnData, onCardAdded = (newCardData) => { }, onCardDelete = (cardIndex) => { }, onCardMoved = () => { }) {
        super();
        this.columnData = columnData;
        this.addRootclass("column");
        this.setCallback(onCardAdded, onCardDelete, onCardMoved);

        this.addEvent("dragover", (event) => {
            if (!event.target.classList.contains(this.rootSelectorClassName)) return;
            event.preventDefault();
            this.hideAddCard();
            this.showDragGhost()
        });
        this.addEvent("dragleave", (event) => {
            if (event.target !== event.currentTarget) return; //card -> column list로 나갈 때 막기
            if (this.current.contains(event.relatedTarget)) return;
            this.hideAddCard();
            this.removeDragGhost();
        });

        this.addEvent("drop", (event) => {
            onCardMoved()
        });

        this.setChildren();
    }

    setCallback(onCardAdded, onCardDelete, onCardMoved) {

        this.onCardDelete = onCardDelete;

        this.onNewCardAdded = (newCardData) => {
            onCardAdded(newCardData);
            this.hideAddCard();
        };

        this.onCardMoved = onCardMoved;
    }

    setChildren() {
        this.children = {
            header: {
                object: new ColumnHeader(this.columnData.name, this.columnData.data.length, this.onCardAdd, this.onColumnDelete),
                parentSelector: ".column"
            },
            input: {
                object: new EditCard(null, this.onNewCardAdded, this.onNewCardDismiss)
            },
        };

        this.columnData.data.forEach((cardData, index) => {
            this.createDefaultCard(index, cardData);
        });

        Object.values(this.children).forEach((child) => {
            child.object.addEvent("dragover", (event) => {
                event.preventDefault(); // drop을 허용
            });

            child.object.addEvent("drop", () => {
            });
        });
    }

    toggleAddCard() {
        const inputRootClass = this.children.input.object.rootSelectorClassName;
        const input = this.parent.querySelector(`.${inputRootClass}`);

        if (this.isHidden(input)) {
            this.showAddCard(input);
        } else {
            this.hideAddCard(input);
        }
    }

    showAddCard() {
        const inputRootClass = this.children.input.object.rootSelectorClassName;
        const input = this.parent.querySelector(`.${inputRootClass}`);

        if (this.isHidden(input)) {
            input.classList.remove("hide");
        }
    }

    hideAddCard() {
        const inputRootClass = this.children.input.object.rootSelectorClassName;
        const input = this.parent.querySelector(`.${inputRootClass}`);

        if (!this.isHidden(input)) {
            input.classList.add("hide");
        }
    }

    isHidden(element) {
        return element.classList.contains("hide");
    }

    createEditCard(index, preCardData) {
        this.children[`card${index}`] = {
            object: new EditCard(
                preCardData,
                (newCardData) => {
                    this.createDefaultCard(index, newCardData);
                    this.rerender();
                },
                () => {
                    this.createDefaultCard(index, preCardData);
                    this.rerender();
                }
            ),
            parentSelector: '.column'
        }
    }

    createDefaultCard(index, cardData) {
        this.children[`card${index}`] = {
            object: new DefaultCard(
                cardData,
                () => this.onCardDelete(index),
                () => this.onEditCard(index),
            ),
            parentSelector: '.column'
        }
    }

    showDragGhost() {

        const existedDragging = this.current.querySelector(".dragging");
        if (existedDragging && !existedDragging.classList.contains("hide")) return;

        const existedGhostCard = this.current.querySelector(".ghostCard"); //enter 이벤트가 두 번 발생할 경우가 존재 (경계 -> 안쪽으로 이동하면 두 번 호출됨), 중복방지
        if (existedGhostCard) return;

        const dragging = document.querySelector(".dragging");
        if (!dragging) return; //처음에 dragging 시작했을 때도 호출됨

        const cardId = dragging.id.slice(4);
        const cardData = getCardData(cardId);

        const ghostCard = new DefaultCard(cardData).createDOM();
        
        ghostCard.addEventListener("dragover", (event) => {
            event.preventDefault(); // drop을 허용
        });

        ghostCard.addEventListener("drop", () => {
        });
        

        ghostCard.classList.add("ghostCard");

        this.current.insertBefore(ghostCard, this.current.firstChild.nextSibling);
    }

    removeDragGhost() {
        const ghostCard = this.current.querySelector(".ghostCard");
        if (ghostCard) {
            this.current.removeChild(ghostCard);
        } else {
            this.hideDraggingGhostCard();
        }
    }

    hideDraggingGhostCard() {
        const existedDragging = this.current.querySelector(".dragging");
        if (!existedDragging) return;

        existedDragging.classList.add("hide");
    }

    template() {
        return '';
    }

    render(parent) {
        super.render(parent);
        this.hideAddCard();
        this.applyAnimation();
    }

    rerender() {
        super.rerender(parent);
        this.hideAddCard();
    }

    applyAnimation() {
        if (!previousPositions || !previousPositions[this.columnData.name]) {
            this.remeberPreOrder();
            return
        }

        const prev = previousPositions[this.columnData.name];

        const newPositions = this.columnData.data.map((card) => {
            const cardElement = this.parent.querySelector(`#card${card.cardId}`);
            if (!cardElement) return;
            const rect = cardElement.getBoundingClientRect();
            return {
                id: card.cardId,
                top: rect.top,
                left: rect.left,
                element: cardElement,
            };
        });

        newPositions.forEach((newPos) => {
            const prevPos = prev.find((prev) => prev.id === newPos.id);

            if (!prevPos) return;

            const deltaX = prevPos.left - newPos.left;
            const deltaY = prevPos.top - newPos.top;

            newPos.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        });

        requestAnimationFrame(() => {
            newPositions.forEach((newPos) => {
                const prevPos = prev.find((prev) => prev.id === newPos.id);
                if (!prevPos) return;

                newPos.element.style.transition = "transform 0.5s ease";
                newPos.element.style.transform = "translate(0, 0)";

                newPos.element.addEventListener("transitionend", () => {
                    this.remeberPreOrder();
                }, { once: true });
            });

        });
    }

    remeberPreOrder() {
        previousPositions[this.columnData.name] = this.columnData.data.map((card) => {
            const cardElement = this.parent.querySelector(`#card${card.cardId}`);
            if (!cardElement) return;

            const rect = cardElement.getBoundingClientRect();
            return {
                id: card.cardId,
                top: rect.top,
                left: rect.left,
            };

        });
    }
}