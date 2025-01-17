import { Column } from "../../../components/column.js";
import Component from "../../../components/component.js";
import { cardIdPrefixLength, draggingCardClassName } from "../../utils.js";

export class ColumnList extends Component {

    rootId = "columnList";

    constructor(columnList, onCardAdded = (columnIndex, cardData) => { }, onCardDeleted = (columnIndex, cardIndex) => { }, onCardEdited = (columnIndex, cardIndex, newCardData) => { }, onCardMoved = (cardId, preColumnIndex, newColumnIndex) => { }) {
        super();

        columnList.forEach((columnData, index) => {
            this.children[`column${index}`] = {
                object: new Column(columnData,
                    (cardData) => {
                        onCardAdded(index, cardData);
                    },
                    (cardIndex) => {
                        onCardDeleted(index, cardIndex);
                    }, (cardIndex, newCardData) => {
                        onCardEdited(index, cardIndex, newCardData);
                    }, () => {
                        const draggingCardId = this.getDraggingCardId();
                        const preColumnIndex = columnList.findIndex(column =>
                            column.data.find(card => card.cardId === Number(draggingCardId))
                        );
                        onCardMoved(draggingCardId, preColumnIndex, index);
                    }),
                parentSelector: "#columnList"
            };
        });
    }

    getDraggingCardId(){
        return document.querySelector(`.${draggingCardClassName}`).id.slice(cardIdPrefixLength);
    }

    template() {
        return '';
    }

}