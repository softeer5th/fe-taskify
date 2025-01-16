import { Column } from "../../../components/column.js";
import Component from "../../../components/component.js";

export class ColumnList extends Component {

    rootId = "columnList";

    constructor(columnList, onCardAdded = (columnIndex, cardData) => { }, onCardDeleted = (columnIndex, cardIndex) => { }, onCardMoved = (cardId, preColumnIndex, newColumnIndex) => { }) {
        super();

        columnList.forEach((columnData, index) => {
            this.children[`column${index}`] = {
                object: new Column(columnData,
                    (cardData) => {
                        onCardAdded(index, cardData);
                    },
                    (cardIndex) => {
                        onCardDeleted(index, cardIndex);
                    }, () => {
                        const draggingCardId = document.querySelector(".dragging").id.slice(4);
                        const preColumnIndex = columnList.findIndex(column =>
                            column.data.find(card => card.cardId === Number(draggingCardId))
                        );
                        onCardMoved(draggingCardId, preColumnIndex, index);
                    }),
                parentSelector: "#columnList"
            };
        });
    }



    template() {
        return '';
    }

}