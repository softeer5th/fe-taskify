
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

    addRootclass(className){
        this.rootClass.push(className);
    }

    template() {
        return '';
    }

    renderTree(parent) {
        const wrapper = document.createElement("div");

        if(this.rootId){
            wrapper.id = this.rootId;
        }

        this.rootClass.forEach( (className) => {
            wrapper.classList.add(className);
        });

        wrapper.innerHTML = this.template();

        // console.log("parent",parent);
        // console.log("rootid",this.rootId);
        // console.log("rooclass",this.rootClass);
        // console.log("wrapper",wrapper);

        parent.appendChild(wrapper);


        for (const key in this.children) {
            const childParent = wrapper.querySelector(this.children[key].parentSelector);
            if(childParent){
                this.children[key].object.render(childParent);
            }
            else{
                this.children[key].object.render(wrapper);
            }
        }
    }

    setEvents(parent) {
        if (this.rootId) {
            const root = parent.querySelector(`.${this.rootSelectorClassName}`);

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