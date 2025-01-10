import { Button } from "../../../components/Button/button.js";
import Component from "../../../components/component.js";
import { Badge } from "./badge.js";

export class ColumnHeader extends Component {

    events = [];

    constructor(name = '',numOfColumns = 0, onAddClick = () => { }, onDeleteClick = () => { }) {
        super();
        this.name = name;
        this.children = {
            badge: {
                object: new Badge(numOfColumns),
                parentSelector: ".columnHeader-textArea"
            }
        }
        this.onAddClick = onAddClick;
        this.onDeleteClick = onDeleteClick;
    }

    addIconRef = "/assets/images/plus.svg";
    deleteIconRef = "/assets/images/closed.svg";

    template() {
        return `
            <div class = "columnHeader">
                <div class = "columnHeader-textArea">
                    <div class = "display-bold16">
                        ${this.name}
                    </div>
                </div>
                <div class = "columnHeader-icons">
                    <img src = "${this.addIconRef}" alt = "add-icon" class = "columnHeader-icon" id = "add-icon"/>
                    <img src = "${this.deleteIconRef}" alt = "delete-icon" class = "columnHeader-icon" id = "delete-icon"/>
                </div>
            </div>
        `;
    }

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }

}