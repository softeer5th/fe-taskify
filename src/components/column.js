import Component from "../../../components/component.js";
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
        const preData = this.children[`card${index}`].object;
        this.createEditCard(index, preData);
        this.rerender();
    }

    constructor(columnData, onCardAdded = (newCardData) => { }, onCardDelete = (cardIndex) => { }) {
        super();
        this.columnData = columnData;
        this.addRootclass("column");
        this.setCallback(onCardAdded, onCardDelete);

        this.setChildren();
    }

    setCallback(onCardAdded, onCardDelete) {

        this.onCardDelete = onCardDelete;

        this.onNewCardAdded = (newCardData) => {
            onCardAdded(newCardData);
            this.hideAddCard();
        };

    }

    setChildren() {
        this.children = {
            header: {
                object: new ColumnHeader(this.columnData.name, this.columnData.data.length, this.onCardAdd, this.onColumnDelete),
                parentSelector: ".column"
            },
            input: {
                object: new EditCard('', '', this.onNewCardAdded, this.onNewCardDismiss)
            }
        };

        this.columnData.data.forEach((cardData, index) => {
            this.createDefaultCard(index, cardData);
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
                preCardData.title,
                preCardData.body,
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
                () => {
                    this.onCardDelete(index);
                },
                () => {
                    this.onEditCard(index);
                },
            ),
            parentSelector: '.column'
        }
    }

    template() {
        return '';
    }

    render(parent) {
        super.render(parent);
        this.hideAddCard();
        this.applyAnimation();
    }

    applyAnimation() {
        if (!previousPositions || !previousPositions[this.columnData.name]) {
            this.remeberPreOrder();
            return
        }

        const prev = previousPositions[this.columnData.name];

        const newPositions = this.columnData.data.map((card) => {
            const cardElement = this.parent.querySelector(`#card${card.cardId}`);
            if (cardElement) {
                const rect = cardElement.getBoundingClientRect(); 
                return {
                    id: card.cardId,
                    top: rect.top,
                    left: rect.left,
                    element: cardElement,
                };
            }
        });

        newPositions.forEach((newPos) => {
            const prevPos = prev.find((prev) => prev.id === newPos.id);

            if (prevPos) {
                const deltaX = prevPos.left - newPos.left;
                const deltaY = prevPos.top - newPos.top;

                newPos.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
        });

        requestAnimationFrame(() => {
            newPositions.forEach((newPos) => {
                const prevPos = prev.find((prev) => prev.id === newPos.id);
                if (prevPos) {
                    newPos.element.style.transition = "transform 0.5s ease";
                    newPos.element.style.transform = "translate(0, 0)";
                }

                newPos.element.addEventListener("transitionend", () => {
                    this.remeberPreOrder(); 
                }, { once: true });
            });
        
        });
    }

    remeberPreOrder() {
        previousPositions[this.columnData.name] = this.columnData.data.map((card) => {
            const cardElement = this.parent.querySelector(`#card${card.cardId}`);
            if (cardElement) {
                const rect = cardElement.getBoundingClientRect(); // 현재 위치 저장
                return {
                    id: card.cardId,
                    top: rect.top,
                    left: rect.left,
                };
            }
        });
    }
}