export default class Component {
    children = {};
    events = [];

    rootId;
    rootClass = [];
    rootSelectorClassName = "";

    constructor() {
        this.rootSelectorClassName = this.generateRandomString(16);
        this.rootClass.push(this.rootSelectorClassName);
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

    addRootclass(className) {
        this.rootClass.push(className);
    }

    template() {
        return '';
    }

    render(parent) {
        this.parent = parent;

        this.current = this.createDOM();

        this.parent.appendChild(this.current);

        this.setEvents(this.current);
    }

    createDOM() {
        const wrapper = document.createElement("div");

        if (this.rootId) {
            wrapper.id = this.rootId;
        }

        this.rootClass.forEach((className) => {
            wrapper.classList.add(className);
        });

        wrapper.innerHTML = this.template();

        this.renderTree(wrapper);
        this.current = wrapper;

        return wrapper;
    }

    renderTree(root) {
        for (const key in this.children) {
            const childParent = root.querySelector(this.children[key].parentSelector) || root;
            this.children[key].object.render(childParent);
        }
    }

    setEvents(root) {
        if (root) {
            this.events.forEach(({ listenerName, callback }) => {
                root.addEventListener(listenerName, (event) => callback(event));
            });
        }
    }

    rerender() {
        this.clear();
        this.renderTree(this.current);
        this.setEvents(this.current);
    }

    clear() {
        this.current.innerHTML = this.template();
    }

    addEvent(listenerName, callback) {
        this.events.push({ listenerName, callback });
    }

}