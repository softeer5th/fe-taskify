import Component from "../components/component.js";
import { Header } from "./header/header.js";
import { Column } from "./column/column.js";

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
                parentSelector: "#column",
            },
        };
    }

    template() {
        return `
            <div id = "header"></div>
            <div id = "column"> </div>
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
        this.events.push({ listenerName, callback });

    }
}