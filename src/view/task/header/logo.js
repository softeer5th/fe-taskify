import { DefaultCard } from "../../../components/Card/card.js";
import { EditCard } from "../../../components/Card/editCard.js";
import Component from "../../../components/component.js";

export class Logo extends Component {

    children = {
        default:{
            object: new DefaultCard("title", "body", "author",
                 () => {
                console.log("close cliek!!");
            }, 
            ()=>{
                console.log("edit click!!");
            }),
            parentSelector: `#${this.rootId}`
        },
        edit:{
            object: new EditCard("title", "body", "author", () => {
                console.log("confirm cliek!!");
            }, ()=>{
                console.log("dismiss click!!");
            }),
            parentSelector:`#${this.rootId}`
        }
    };

    events = [];

    constructor() {
        super();
        this.children.edit.object.addEvent("click", () => {
            console.log("edit card clicked!!");
        });
    }

    template() {
        return `
            <div>Logo</div>
        `;
    }

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
       super.addEvent( listenerName, callback );

    }

}