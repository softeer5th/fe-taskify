import { Column } from "../../../components/column.js";
import Component from "../../../components/component.js";

export class ColumnList extends Component {

    rootId = "columnList";

    constructor(columnList, onCardAdd = (columnIndex, cardData) => { }, onCardDelete = (columnIndex, cardIndex) => { }) {
        super();

        columnList.forEach((columnData, index) => {
            this.children[`column${index}`] = {
                object: new Column(columnData,
                    (cardData) => {
                        onCardAdd(index, cardData);
                    },
                    (cardIndex) => {
                        onCardDelete(index, cardIndex);
                    }),
                parentSelector: "#columnList"
            };
        });
    }

    template() {
        return '';
    }

}