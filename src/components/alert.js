import { Button } from "./Button/button.js";
import Component from "./component.js";

export class AlertDialog extends Component {

    rootId = "alertDialog"

    children = {
        dismiss: {
            object: new Button("취소", null, "dismiss-button"),
            parentSelector: "#alertButtons"
        },
        confirm: {
            object: new Button("삭제", null, "alert-button"),
            parentSelector: "#alertButtons"
        },
    };

    constructor(text, onConfirmClck = () => { }, onDismissClick = () => { }) {
        super();
        this.text = text;

        this.children.confirm.object.addEvent("click", onConfirmClck);
        this.children.dismiss.object.addEvent("click", onDismissClick);
    }

    template() {
        return `
            <div id="alertText" class = "display-medium16"> 
                ${this.text}
            </div>
            <div id = "alertButtons">
            </div>
         `;
    }

}