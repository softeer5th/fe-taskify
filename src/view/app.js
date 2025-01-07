import Component from "/components/component.js";


export class App extends Component {
    constructor(parent) {
        super();
        this.parent = parent;
        this.state = {};
        this.events = [];
    }

    template() {
        return `
            <div id = "header">hi</div>
            <div id = "column">hello </div>
        `;
    }

    render() {
        this.parent.innerHTML = this.template();
    }

    addEvent() {

    }
}