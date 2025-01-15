import { Column } from "../../../components/column.js";
import Component from "../../../components/component.js";

export class ColumnList extends Component {

    rootId = "columnList";

    constructor(columnList, onCardAdd = (columnIndex, cardData) => { }, onCardDelete = (columnIndex, cardIndex) => { }, onCardMoved = (cardId, preColumnIndex, newColumnIndex) => { }) {
        super();

        columnList.forEach((columnData, index) => {
            this.children[`column${index}`] = {
                object: new Column(columnData,
                    (cardData) => {
                        onCardAdd(index, cardData);
                    },
                    (cardIndex) => {
                        onCardDelete(index, cardIndex);
                    }, () => {
                        const draggingCardId = document.querySelector(".dragging").id.slice(4);
                        const preColumnIndex = columnList.findIndex(column =>
                            column.data.some(card => card.cardId === draggingCardId)
                        );
                        onCardMoved(draggingCardId, preColumnIndex, index)
                    }),
                parentSelector: "#columnList"
            };
        });
    }



    template() {
        return '';
    }

}