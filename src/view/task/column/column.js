import Component from "../../../components/component.js";

export class Column extends Component{


    children = {};

    events = []; 

    constructor() {
        super();
    }

    template() {
        return `
            <div>Column</div>
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