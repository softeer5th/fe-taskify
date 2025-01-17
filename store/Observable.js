export class Observable {
  constructor() {
    this.observers = new Set();
  }
  // 상태 변화 시 실행할 함수 등록
  subscribe(observer) {
    this.observers.add(observer);
  }
  unsubscribe(observer) {
    this.observers.delete(observer);
  }
  notify(actionType, data) {
    this.observers[actionType].forEach((observer) =>
      observer(actionType, data)
    );
  }
}
