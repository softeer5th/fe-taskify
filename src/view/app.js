import Component from "../components/component.js";
import { Header } from "./task/header/header.js";
import { Column } from "./task/column/column.js";

export class App extends Component {

    children = {
        // header: {
        //     object: new Header(),
        //     parentSelector: "#header",
        // },
        column: {
            object: new Column(),
            parentSelector: "#header + .div",
        },
    };
    events = [];

    constructor() {
        super();
    }

    template() {
        return `
            <div id = "${this.rootId}">
                <div id = "header">  </div>
                <div class = "div">  </div>
            </div>
        `;
    }

    render(parent) {
        super.render(parent);

    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }
}