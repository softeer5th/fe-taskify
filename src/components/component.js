
export default class Component {
    children = {};
    events = [];

    constructor() {
        this.rootId = this.generateRandomString(16);
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
        parent.innerHTML += this.template();

        for (const key in this.children) {
            const childParent = parent.querySelector(this.children[key].parentSelector);
            this.children[key].object.render(childParent);
        }
    }

    setEvents(parent) {
        if (this.rootId) {
            const root = parent.querySelector(`#${this.rootId}`);

            if (root) {
                this.events.forEach(({ listenerName, callback }) => {
                    console.log(`root ${this.rootId} ${listenerName} `);
                    console.log(root);
                    root.addEventListener(listenerName, (event) => {
                        console.log("rootdddddd", this.rootId);
                        // if (event.currentTarget.id === this.rootId) {
                        //     event.stopPropagation();
                        //     callback();
                        // }
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
        console.log("event add!", this.rootId, listenerName);
        this.events.push({ listenerName, callback });
    }

}