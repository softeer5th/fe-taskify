
export default class Component {
    children = {};
    events = [];

    constructor() {
        this.rootId = this.generateRandomString(16);
        this.children = {};
        this.events = [];
    }

    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    template() {
        return '';
    }

    renderTree(parent) {
        const wrapper = document.createElement("div"); 
        wrapper.id = this.rootId; 
        wrapper.innerHTML = this.template(); 
        parent.appendChild(wrapper); 

        console.log(parent, this.rootId);
        for (const key in this.children) {
            const childParent = wrapper.querySelector(this.children[key].parentSelector);
            this.children[key].object.render(childParent);
        }
    }

    setEvents(parent) {
        if (this.rootId) {
            const root = parent.querySelector(`#${this.rootId}`);

            if (root) {
                this.events.forEach(({ listenerName, callback }) => {
                    root.addEventListener(listenerName, (event) => {
                            callback();
                    }, false);
                });
            }
        }
    }

    render(parent) {
        this.renderTree(parent);
        this.setEvents(parent);
    }

    addEvent(listenerName, callback) {
        this.events.push({ listenerName, callback });
    }

}