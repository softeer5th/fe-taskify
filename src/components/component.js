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

        this.createRoot();
        this.renderTree();
        this.setEvents();
    }

    createRoot() {
        const wrapper = document.createElement("div");

        if (this.rootId) {
            wrapper.id = this.rootId;
        }

        this.rootClass.forEach((className) => {
            wrapper.classList.add(className);
        });

        wrapper.innerHTML = this.template();

        this.parent.appendChild(wrapper);
        this.current = wrapper;
    }

    renderTree() {
        for (const key in this.children) {
            const childParent = this.current.querySelector(this.children[key].parentSelector) || this.current;
            this.children[key].object.render(childParent);
        }
    }

    setEvents() {
        const root = this.parent.querySelector(`.${this.rootSelectorClassName}`);
        if (root) {
            this.events.forEach(({ listenerName, callback }) => {
                root.addEventListener(listenerName, () => callback());
            });
        }
    }

    rerender() {
        this.clear();
        this.renderTree();
        this.setEvents();
    }

    clear() {
        this.current.innerHTML = this.template();
    }

    addEvent(listenerName, callback) {
        this.events.push({ listenerName, callback });
    }

}