import Component from "../../../components/component.js";

export class Logo extends Component {

    children = {};

    events = [];

    constructor() {
        super();
    }

    template() {
        return `
            <div>Logo</div>
        `;
    }

    render(parent) {

        console.log(this.template());
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