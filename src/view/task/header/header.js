import { IconButton} from "../../../components/Button/iconButton.js";
import Component from "../../../components/component.js";
import { Logo } from "./logo.js";


export class Header extends Component{

    children = {
        logo: {
            object: new IconButton("/assets/images/plus.svg",),
            parentSelector: ".div",
        },
    };

    events = []; 

    constructor() {
        super();
        this.setup();
    }

    setup(){
        this.children.logo.object.addEvent("click", () => {
            console.log("click!!");
        });
    }

    template() {
        return `
            <div class = "div">  <span> text!!! </span> </div>
        `;
    }

    render(parent) {

        parent.innerHTML += this.template();
    
        for (const key in this.children) {
            const childParent = document.querySelector(this.children[key].parentSelector);
            this.children[key].object.render(childParent);
        }

        this.events.forEach(({ listenerName, callback }) => {
            this.template.addEventListener(listenerName, callback);
        });
    }

    addEvent(listenerName, callback) {
        this.events.push({listenerName, callback});

    }
    
}