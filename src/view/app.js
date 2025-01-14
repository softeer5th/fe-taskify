import Component from "../components/component.js";
import { Header } from "./task/header/header.js";
import { ColumnList } from "./task/column/columnList.js";
import { columnData } from "../route/mock/fakeColumnListData.js";

export class App extends Component {

    columnData = columnData;

    onCardAdd = (columnIndex, cardData) => {
        this.columnData[columnIndex].addData(cardData);

        this.rerender();
    };

    onCardDelete = (columnIndex, cardIndex) => {
        this.columnData[columnIndex].removeData(cardIndex);

        this.rerender();
    };

    constructor() {
        super();
        this.setChildren();
    }

    setChildren() {
        this.children = {
            header: {
                object: new Header(),
                parentSelector: "#header",
            },
            column: {
                object: new ColumnList(this.columnData, this.onCardAdd, this.onCardDelete),
                parentSelector: "#taskContent",
            }
        };
    }

    template() {
        return `
            <div id = "header">  </div>
            <div id = "taskContent">  </div>
        `;
    }

    render(parent) {
        super.render(parent);
    }

    rerender() {
        this.setChildren();
        super.rerender();
    }

}