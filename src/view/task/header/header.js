import Component from "../../../components/component.js";

export class Header extends Component {

    rootId = "headerContent";

    historyIconRef ="/assets/images/clock.svg";

    constructor(onHistoryClick = () => {}) {
        super();
        this.onHistoryClick = onHistoryClick;
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

        super.render(parent);
        
        const history = parent.querySelector("#history-icon");

        if (history) {
            history.addEventListener("click", this.onHistoryClick);
        }

    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }

}