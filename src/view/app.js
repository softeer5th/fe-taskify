import Component from "../components/component.js";
import { Header } from "./task/header/header.js";
import { Column } from "./task/column/column.js";

export class App extends Component {

    children = {};
    events = [];

    constructor() {
        super();
        this.children = {
            header: {
                object: new Header(),
                parentSelector: "#header",
            },
            column: {
                object: new Column(),
                parentSelector: "#header + .div",
            },
        };
    }

    template() {
        return `
            <div id = "header"> </div>
            <div class = "div"> </div>
        `;
    }

    render(parent) {

        parent.innerHTML = this.template();4

        for (const key in this.children) {
            const childParent = document.querySelector(this.children[key].parentSelector);
            this.children[key].object.render(childParent);
        }

        this.events.forEach(({ listenerName, callback }) => {
            this.template.addEventListener(listenerName, callback);
        });
    }

    addEvent(listenerName, callback) {
        this.events.push({ listenerName, callback });

    }
}