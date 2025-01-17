import { Chip } from "../../../components/chip.js";
import Component from "../../../components/component.js";
import { sortType } from "../../../route/data/sortType.js";

export class Header extends Component {

    rootId = "headerContent";

    historyIconId = "history-icon";
    historyIconRef = "/assets/images/clock.svg";

    currentSortType = sortType.create;

    constructor(currentSortType, onSortClick = (sortType) => { }, onHistoryClick = () => { }) {
        super();
        this.currentSortType = currentSortType;
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
    }

    template() {
        return `
             <div id = "header-logo">
                TASKIFY
            </div>
            <img src = "${this.historyIconRef}" alt = "history-icon" id = "${this.historyIconId}"/>
        `;
    }

    render(parent) {

        this.children.sort.object.addEvent("click", () => {
            this.switchSortType();
            this.onSortClick(this.currentSortType);
            this.rerender();
        });

        super.render(parent);

        const history = parent.querySelector(`#${this.historyIconId}`);

        if (history) {
            history.addEventListener("click", this.onHistoryClick);
        }

    }

    rerender() {

        this.setChildren();

        this.children.sort.object.addEvent("click", () => {
            this.switchSortType();
            this.onSortClick(this.currentSortType);
            this.rerender();
        });

        super.rerender();

        const history = this.parent.querySelector(`#${this.historyIconId}`);

        if (history) {
            history.addEventListener("click", this.onHistoryClick);
        }
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }

}