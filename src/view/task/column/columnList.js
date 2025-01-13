import { Button } from "../../../components/Button/button.js";
import { Column } from "../../../components/column.js";
import Component from "../../../components/component.js";

export class ColumnList extends Component {

    children = {};
    events = [];

    rootId = "columnList";

    constructor(columnList, onCardAdd = (columnIndex, cardData) => { }, onCardDelete = (columnIndex, cardIndex) => { }) {
        super();

        console.log("columnList",columnList);
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

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }

}