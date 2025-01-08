import Component from "../../../components/component.js";
import { Logo } from "./logo.js";


export class Header extends Component{

    children = {
        logo: {
            object: new Logo(),
            parentSelector: ".div",
        }
    };

    events = []; 

    constructor() {
        super();
    }

    template() {
        return `
            <div class = "div"> </div>
        `;
    }

    render(parent) {
        
        parent.innerHTML = this.template();
    

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