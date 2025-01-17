import Component from "../../../components/component.js";
import { Badge } from "./badge.js";

export class ColumnHeader extends Component {

    addIconRef = "/assets/images/plus.svg";
    addIconId = "add-icon";

    deleteIconRef = "/assets/images/closed.svg";
    deleteIconId = "delete-icon";

    constructor(name = '',numOfColumns = 0, onAddClick = () => { }, onDeleteClick = () => { }) {
        super();
        this.addRootclass("columnHeader");
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

    template() {
        return `
            <div class = "columnHeader-textArea">
                <div class = "display-bold16">
                    ${this.name}
                </div>
            </div>
            <div class = "columnHeader-icons">
                <img src = "${this.addIconRef}" alt = "add-icon" class = "columnHeader-icon" id = "${this.addIconId}"/>
                <img src = "${this.deleteIconRef}" alt = "delete-icon" class = "columnHeader-icon" id = "${this.deleteIconId}"/>
            </div>
        `;
    }

    render(parent) {
        super.render(parent);

        const component = this.parent.querySelector(`.${this.rootSelectorClassName}`);

        const addIcon = component.querySelector(`#${this.addIconId}`);
        if(addIcon){
            addIcon.addEventListener("click", this.onAddClick);
        }

        const deleteIcon = component.querySelector(`#${this.deleteIconId}`);
        if(deleteIcon){
            deleteIcon.addEventListener("click", this.onDeleteClick);
        }

    }

}