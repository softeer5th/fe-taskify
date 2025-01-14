import Component from "../../../components/component.js";
import { Badge } from "./badge.js";

export class ColumnHeader extends Component {

    addIconRef = "/assets/images/plus.svg";
    deleteIconRef = "/assets/images/closed.svg";

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
                <img src = "${this.addIconRef}" alt = "add-icon" class = "columnHeader-icon" id = "add-icon"/>
                <img src = "${this.deleteIconRef}" alt = "delete-icon" class = "columnHeader-icon" id = "delete-icon"/>
            </div>
        `;
    }

    render(parent) {
        super.render(parent);

        const component = this.parent.querySelector(`.${this.rootSelectorClassName}`);

        const addIcon = component.querySelector("#add-icon");
        if(addIcon){
            addIcon.addEventListener("click", this.onAddClick);
        }

        const deleteIcon = component.querySelector("#delete-icon");
        if(deleteIcon){
            deleteIcon.addEventListener("click", this.onDeleteClick);
        }

    }

}