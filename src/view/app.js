import Component from "../components/component.js";
import { Header } from "./task/header/header.js";
import {  ColumnList } from "./task/column/columnList.js";
import {  ColumnData } from "../route/data/columnData.js";
import {  CardData } from "../route/data/cardData.js";

export class App extends Component {

    columnData = [
        new ColumnData(
            "해야할 일",
            [
                new CardData(
                    "제목1",
                    "내용1",
                    "web"
                )
            ]

        ),
        new ColumnData(
            "하고 있는 일",
            [
                new CardData(
                    "제목1",
                    "내용1",
                    "web"
                ),
               new  CardData(
                    "제목2",
                    "내용2",
                    "web"
                ),
                new CardData(
                    "제목3",
                    "내용3",
                    "web"
                )
            ]

        ),
        new ColumnData(
            "완료한 일"

        ),
    ]
    children = {
        header: {
            object: new Header(),
            parentSelector: "#header",
        },
        column: {
            object: new ColumnList(this.columnData),
            parentSelector: "#taskContent",
        },
    };

    events = [];

    constructor() {
        super();
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

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }
}