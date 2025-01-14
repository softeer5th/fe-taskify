import { Chip } from "../../../components/chip.js";
import Component from "../../../components/component.js";
import { sortType } from "../../../route/data/sortType.js";

export class Header extends Component {

    rootId = "headerContent";

    historyIconRef = "/assets/images/clock.svg";

    currentSortType = sortType.create;

    constructor(onSortClick = (sortType) => { }, onHistoryClick = () => { }) {
        super();
        this.setChildren();
        this.onSortClick = onSortClick;
        this.onHistoryClick = onHistoryClick;
    }

    setChildren() {
        this.children = {
            sort: {
                object: new Chip(this.currentSortType),
                parentSelector: "#header-logo"
            }
        }
    }

    switchSortType() {
        if (this.currentSortType === sortType.create) {
            this.currentSortType = sortType.recent;
        } else {
            this.currentSortType = sortType.create;
        }
        this.setChildren();
    }

    template() {
        return `
             <div id = "header-logo">
                TASKIFY
            </div>
            <img src = "${this.historyIconRef}" alt = "history-icon" id = "history-icon"/>
        `;
    }

    render(parent) {

        this.children.sort.object.addEvent("click", () => {
            this.switchSortType();
            this.onSortClick(this.currentSortType);
            this.rerender();
        });

        super.render(parent);

        const history = parent.querySelector("#history-icon");

        if (history) {
            history.addEventListener("click", this.onHistoryClick);
        }

    }
    
    rerender(){

        remeberPreOrder();
        this.setChildren();

        this.children.sort.object.addEvent("click", () => {
            this.switchSortType();
            this.onSortClick(this.currentSortType);
            this.rerender();
        });

        super.rerender();

        const history = this.parent.querySelector("#history-icon");

        if (history) {
            history.addEventListener("click", this.onHistoryClick);
        }
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }

}