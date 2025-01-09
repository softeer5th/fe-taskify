import { Button } from "../Button/button.js";
import Component from "../component.js";

export class EditCard extends Component {

    children = {
        confirm:{
            object: new Button("저장", null, "confirm-button"),
            parentSelector: ".card-buttons"
        },
        dismiss:{
            object: new Button("취소", null, "dismiss-button"),
            parentSelector: ".card-buttons"
        },
    };

    events = [];

    closeIconRef = "/assets/images/closed.svg";
    editIconRef = "/assets/images/edit.svg";

    constructor(title, body, author,
         onConfirm = () => {
        console.log("!!!1");
     }, onDismiss = () => { }) {
        super();
        this.title = title;
        this.body = body;
        this.author = author;
        this.onConfirm = onConfirm;
        this.onDismiss = onDismiss;
    }

    template() {
        return `
        <div id = "${this.rootId}" class="card card-edit"> 
            <div class = "card-text_area">
                <div class = "card-title display-bold24">
                    ${this.title}
                </div>
                <div class = "card-body display-medium14">
                    ${this.body}
                </div>
                <div class = "card-author display-medium12">
                    author by ${this.author}
                </div>
            </div>
            <div class  = "card-buttons">
                
            </div>
        </div>
    `;
    }

    render(parent) {   
        
        this.children.confirm.object.addEvent("click", this.onConfirm);
        this.children.dismiss.object.addEvent("click", this.onDismiss);

        super.render(parent);
        

    }

    addEvent(listenerName, callback) {
        this.events.push({ listenerName, callback });

    }

}