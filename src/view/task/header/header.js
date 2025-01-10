import { Badge } from "../../../components/badge.js";
import { IconButton } from "../../../components/Button/iconButton.js";
import { Chip } from "../../../components/chip.js";
import Component from "../../../components/component.js";
import { Logo } from "./logo.js";


export class Header extends Component {

    children = {
    };

    events = [];

    constructor(onHistoryClick = () => {}) {
        super();
        this.onHistoryClick = onHistoryClick;
    }

    historyIconRef ="/assets/images/clock.svg"

    template() {
        return `
            <div id = "headerContent">
                <div id = "header-logo">
                    TASKIFY
                </div>
                <img src = "${this.historyIconRef}" alt = "history-icon" id = "history-icon"/>
            </div>
        `;
    }

    render(parent) {

        super.render(parent);
        
        const history = parent.querySelector("#history-icon");

        if (history) {
            history.addEventListener("click", (event) => {
                this.onHistoryClick
            },false);
        }

    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }

}