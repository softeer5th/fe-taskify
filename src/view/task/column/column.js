import { Button } from "../../../components/Button/button.js";
import Component from "../../../components/component.js";

export class Column extends Component{


    children = {
        dismiss:{
            object: new Button("취소", null, "dismiss-button"),
            parentSelector: `#${this.rootId}`
        },
        confirm:{
            object: new Button("저장", null, "confirm-button"),
            parentSelector: `#${this.rootId}`
        },
    };

    events = []; 

    constructor() {
        super();
    }

    template() {
        return `
            <div id = "${this.rootId}">Column</div>
        `;
    }

    render(parent) {


        this.children.confirm.object.addEvent("click", this.onConfirm);
        this.children.dismiss.object.addEvent("click", this.onDismiss);
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }
    
}