import Component from "../components/component.js";
import { Header } from "./task/header/header.js";
import { ColumnList } from "./task/column/columnList.js";
import { sortType } from "../route/data/sortType.js";
import { getAllData } from "../route/store/todoStore.js";

export class App extends Component {

    columnData = getAllData();

    rootId = "appContainer";

    currentSortType = sortType.create;

    onSortClick = (newSortType) => {
        this.currentSortType = newSortType;

        this.sort();
       
        this.rerender();
    }

    onHistoryClick = () => { }

    onCardAdded = (columnIndex, cardData) => {
        this.columnData[columnIndex].addCard(cardData);

        this.rerender();
    }

    onCardDeleted = (columnIndex, cardIndex) => {
        this.columnData[columnIndex].removeData(cardIndex);

        this.rerender();
    }

    onCardMoved = (cardId, preColumnIndex, newColumnIndex) => {
        const temp = this.columnData[preColumnIndex].getCard(cardId);
        this.columnData[preColumnIndex].removeDataById(cardId);
        this.columnData[newColumnIndex].addCard(temp);
        this.sort();
        this.rerender();
    }

    constructor() {
        super();
        this.setChildren();
    }

    setChildren() {
        this.children = {
            header: {
                object: new Header(this.currentSortType,this.onSortClick, this.onHistoryClick),
                parentSelector: "#header",
            },
            column:{
                object: new ColumnList(this.columnData, this.onCardAdded, this.onCardDeleted, this.onCardMoved),
                parentSelector: "#taskContent",
            }
        }
    }

    sort(){
        if (this.currentSortType === sortType.create) {
            this.sortByCreated();
        } else {
            this.sortByRecent();
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