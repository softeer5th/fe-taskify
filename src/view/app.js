import Component from "../components/component.js";
import { Header } from "./task/header/header.js";
import { ColumnList } from "./task/column/columnList.js";
import { sortType } from "../route/data/sortType.js";
import { todoStore } from "../route/store/todoStore.js";

export class App extends Component {

    columnData = todoStore.getAllData();

    rootId = "appContainer";

    currentSortType = sortType.create;

    onSortClick = (newSortType) => {
        this.currentSortType = newSortType;

        todoStore.sort(this.currentSortType);

        this.columnData = todoStore.getAllData();
        
        this.rerender();
    }

    onHistoryClick = () => { }

    onCardAdded = (columnIndex, cardData) => {
        todoStore.addCard(columnIndex,cardData);
        todoStore.sort(this.currentSortType);

        this.columnData = todoStore.getAllData();
        this.rerender();
    }

    onCardDeleted = (columnIndex, cardIndex) => {
        todoStore.removeCard(columnIndex, cardIndex);
        todoStore.sort(this.currentSortType);
        this.columnData = todoStore.getAllData();

        this.rerender();
    }

    onCardEdited = (columnIndex, cardIndex, newCardData) => {
        todoStore.editCard(columnIndex, cardIndex, newCardData);
        this.columnData = todoStore.getAllData();
        this.rerender();
    }

    onCardMoved = (cardId, preColumnIndex, newColumnIndex) => {
        const temp = todoStore.getCardData(cardId);
        todoStore.removeCardById(cardId);
        todoStore.addCard(newColumnIndex, temp);
        todoStore.sort(this.currentSortType);
        this.columnData = todoStore.getAllData();

        this.rerender();
    }

    constructor() {
        super();
        this.setChildren();
    }

    setChildren() {
        this.children = {
            header: {
                object: new Header(this.currentSortType, this.onSortClick, this.onHistoryClick),
                parentSelector: "#header",
            },
            column: {
                object: new ColumnList(this.columnData, this.onCardAdded, this.onCardDeleted, this.onCardEdited, this.onCardMoved),
                parentSelector: "#taskContent",
            }
        }
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
        console.log("data", this.columnData);
        this.setChildren();
        super.rerender();
    }

}