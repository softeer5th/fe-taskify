import Observable from "./store.js";

class LogStore extends Observable {
    #logId = 0;
    #logs;
    constructor() {
        super();
        this.#logs = [];
    }

    addLog(log) {
        this.#logs.push({...log, logId: this.#logId});
        this.#logId++;
        this.notify(this.#logs);
    }

    clearLog() {
        this.#logs = [];
        this.notify(this.#logs);
    }

    getLogs() {
        return this.#logs;
    }
}

export default LogStore;
