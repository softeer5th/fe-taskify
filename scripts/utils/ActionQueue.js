export default class ActionQueue {
    constructor(size, front, current, rear, queue) {
        this.size = size
        this.front = front
        this.current = current
        this.rear = rear
        this.queue = queue
    }

    addAction(action) {
        let next = (this.current + 1) % this.size
        if (next === this.front) {
            this.front = (next + 1) % this.size
        }
        this.queue[this.current] = action
        this.rear = next
        this.current = next
    }

    undo() {
        if (this.front === this.current) return null

        this.current = (this.current - 1 + this.size) % this.size
        return this.queue[this.current]
    }

    redo() {
        if (this.current === this.rear) return null

        let res = this.queue[this.current]
        this.current = (this.current + 1) % this.size
        return res
    }
}
