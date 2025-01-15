import Observable from "./store.js";

class LogStore extends Observable {
    #logId;
    #logs;
    #logPointer
    constructor() {
        super();
        this.#logs = [];
        this.#logId = 0;
        this.#logPointer = 0;
    }

    addLog(log) {
        this.#logPointer = 0;
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

    #getCurrentLog(index) {
        return this.#logs[index];
    }

    undo() {
        if(this.#logPointer >= this.#logs.length || this.#logPointer === 4) return undefined;
        const index = this.#logs.length -1 - this.#logPointer;
        this.#logPointer++;
        return this.#getCurrentLog(index);
    }

    redo() {
        if(this.#logPointer === 0 ) return undefined;
        this.#logPointer--;
        const index = this.#logs.length -1 - this.#logPointer;
        return this.#getCurrentLog(index);
    }
}

export default LogStore;
