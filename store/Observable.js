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

  notify(action, data) {
    this._observers.forEach((observer) => observer(action, data));
  }
}

export default Observable;
