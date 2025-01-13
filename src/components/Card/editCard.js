import { Button } from "../Button/button.js";
import Component from "../component.js";

export class EditCard extends Component {

    children = {
        dismiss:{
            object: new Button("취소", null, "dismiss-button"),
            parentSelector: ".card-buttons"
        },
        confirm:{
            object: new Button("저장", null, "confirm-button"),
            parentSelector: ".card-buttons"
        },
    };

    events = [];

    closeIconRef = "/assets/images/closed.svg";
    editIconRef = "/assets/images/edit.svg";

    constructor(title, body, onConfirm = () => {
            console.log("confirm")
     }, onDismiss = () => { 
        console.log("dismiss")
     }) {
        super();
        super.addRootclass("card");
        super.addRootclass("card-edit");

        this.title = title;
        this.body = body;

        this.onConfirm = onConfirm;
        this.onDismiss = onDismiss;
    }

    template() {
        return `
            <div class = "card-text_area">
                <input class = "card-title display-bold24" placeholder = "제목을 입력해주세요" value = "${this.title}"/>
                <input class = "card-body display-medium14" placeholder = "내용을 입력해주세요" value = "${this.body}"/>
            </div>
            <div class  = "card-buttons">
                
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