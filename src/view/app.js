import Component from "../components/component.js";
import { Header } from "./task/header/header.js";
import { ColumnList } from "./task/column/columnList.js";
import { columnData } from "../route/mock/fakeColumnListData.js";
import { sortType } from "../route/data/sortType.js";

export class App extends Component {

    columnData = columnData;

    onSortClick = (newSortType) => {

        console.log("newsort",newSortType);
        if (newSortType === sortType.create) {
            this.sortByCreated();
        } else {
            this.sortByRecent();
        }

        this.rerender();
    }

    onHistoryClick = () => { }

    onCardAdded = (columnIndex, cardData) => {
        this.columnData[columnIndex].addData(cardData);

        this.rerender();
    }

    onCardDeleted = (columnIndex, cardIndex) => {
        this.columnData[columnIndex].removeData(cardIndex);

        this.rerender();
    }

    children = {
        header: {
            object: new Header(this.onSortClick, this.onHistoryClick),
            parentSelector: "#header",
        }
    };
    
    constructor() {
        super();
        this.setChildren();
    }

    setChildren() {

        this.children["column"] = {
            object: new ColumnList(this.columnData, this.onCardAdded, this.onCardDeleted),
            parentSelector: "#taskContent",
        }
    }

    sortByCreated() {
        this.columnData = this.columnData.map((columnData) => {
            columnData.data = columnData.data.sort((cardData1, cardData2) => cardData1.cardId - cardData2.cardId);
            return columnData;
        });
    }

    sortByRecent() {
        this.columnData = this.columnData.map((columnData) => {
            columnData.data = columnData.data.sort((cardData1, cardData2) => cardData2.cardId - cardData1.cardId);
            return columnData;
        });
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