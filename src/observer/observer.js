class Observable {
    constructor() {
        this._observers = new Set();
    }
    subscribe(observer) {
        this._observers.add(observer);
    }
    unsubscribe(observer) {
        this._observers.delete(observer);
    }
    notify(data) {
        this._observers.forEach(observer => observer(data));
    }
}


export class TaskModel extends Observable{
    constructor(initialData) {
        super();
        this.tasks = initialData || [];
    }

    addTask(task) {
        this.tasks = [...this.tasks, task];
        this.notify(this.tasks); 
    }

    deleteTask(task){
        this.tasks = this.tasks.filter(item => item.id !== task.id);
        this.notify(this.tasks);
    }
    editTask(task){
        this.tasks = this.tasks.map(item =>
            item.id === task.id ? { ...item, ...task } : item
        ); 
        this.notify(this.tasks); 
    }

}
