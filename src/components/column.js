import { Button } from "../../../components/Button/button.js";
import Component from "../../../components/component.js";
import { DefaultCard } from "./Card/card.js";
import { EditCard } from "./Card/editCard.js";
import { ColumnHeader } from "./columnHeader.js";

export class Column extends Component {

    onCardAdd = () => {
        this.toggleAddCard();
    }

    onNewCardDismiss = () => {
        this.children.input.object.clearInput();
        this.toggleAddCard();
    };

    onEditCard = (index) => {
        const preData = this.children[`card${index}`].object;
        this.createEditCard(index, preData);
        this.rerender();
    }

    constructor(columnData, onCardAdded = (newCardData) => { }, onCardDelete = (cardIndex) => { }) {
        super();
        this.addRootclass("column");
        this.setCallback(onCardAdded, onCardDelete);

        this.setChildren(columnData);
    }

    setCallback(onCardAdded, onCardDelete) {

        this.onColumnDelete = () => {};

        this.onCardDelete = onCardDelete;

        this.onNewCardAdded = (newCardData) => {
            onCardAdded(newCardData);
            this.toggleAddCard();
        };

    }

    setChildren(columnData) {
        this.children = {
            header: {
                object: new ColumnHeader(columnData.name, columnData.data.length, this.onCardAdd, this.onColumnDelete),
                parentSelector: ".column"
            },
            input: {
                object: new EditCard('', '', this.onNewCardAdded, this.onNewCardDismiss)
            }
        };

        columnData.data.forEach((cardData, index) => {
            this.createDefaultCard(index, cardData);
        });
    }

    toggleAddCard() {
        const inputRootClass = this.children.input.object.rootSelectorClassName;
        const input = this.parent.querySelector(`.${inputRootClass}`);

        input.classList.toggle("hide");
    }

    createEditCard(index, preCardData){
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

    createDefaultCard(index, cardData){
        this.children[`card${index}`] = {
            object: new DefaultCard(
                cardData.title,
                cardData.body,
                cardData.author,
                () => {
                    this.onCardDelete(index);
                },
                () => {
                    this.onEditCard(index);
                }
            ),
            parentSelector: '.column'
        }
    }

    template() {
        return '';
    }

    render(parent) {
        super.render(parent);
        this.toggleAddCard();
    }

}