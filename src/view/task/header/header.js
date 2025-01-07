import Component from "../../../components/component.js";
import { Logo } from "./logo.js";


export class Header extends Component{

    children = {
        logo: {
            object: new Logo(),
            selector: "#logo",
        }
    };

    events = []; 

    constructor() {
        super();
    }

    template() {
        return `
            <div id ="logo"> ${this.children.logo.object.template()}</div>
        `;
    }

    render(parent) {

        parent.innerHTML = this.template();

        for (const key in this.children) {
            const parent = document.querySelector(this.children[key].parentSelector);
            this.children[key].object.render(parent);
        }

        this.events.forEach(({ listenerName, callback }) => {
            this.template.addEventListener(listenerName, callback);
        });
    }

    addEvent(listenerName, callback) {
        this.events.push({listenerName, callback});

    }
    
}