import { Observable } from "./Observable.js";
import { loadStorage } from "../utils/storage.js";
import { ACTION_TYPE } from "../constant/actionType.js";
export class TaskStore extends Observable {
  #tasks = loadStorage() || [];
  constructor() {
    super();
    // {'todo': [{id, title,content,createdDate},],'doing,,}
  }
  addTask({ sectionType, task }) {
    // task: {title, content}
    // actionType: add, edit ,delete, move
    // this.#tasks = [task, ...this.#tasks];
    const newTask = {
      ...task,
      id: Date.now(),
      createdDate: new Date().toISOString(),
    };
    this.#tasks = [...this.#tasks].map(([section, taskArr]) => {
      return sectionType === section
        ? [section, [newTask, ...taskArr]]
        : [section, [...taskArr]];
    });
    this.notify(ACTION_TYPE.add, { sectionType, newTask });
  }

  editTask({ sectionType, taskToEdit }) {
    const { editId, title, content } = taskToEdit;

    this.#tasks = this.#tasks.map(([section, taskArr]) => {
      if (section === sectionType) {
        const updatedTaskArr = taskArr.map((task) => task.id === editId)
          ? { ...task, title, content }
          : task;
        return [section, updatedTaskArr];
      }
      return [section, taskArr];
    });

    const editedTask = this.#tasks
      .find(([section, taskArr]) => section === sectionType)?.[1]
      .find((task) => task.id === editId);

    this.notify(ACTION_TYPE.edit, { sectionType, editedTask });
  }

  deleteTask({ sectionType, deleteId }) {
    this.#tasks = this.#tasks.map(([section, taskArr]) => {
      if (section === sectionType) {
        const updatedTaskArr = taskArr.filter((task) => task.id !== deleteId);
        return [section, updatedTaskArr];
      }
      return [section, taskArr];
    });

    this.notify(ACTION_TYPE.delete, { sectionType, deleteId });
  }
  moveTask({ prevSection, newSection, moveTask }) {
    const { moveId } = moveTask;
    // 이전 섹션에서 카드 삭제
    const deletedTaskList = this.#tasks.map(([section, taskArr]) => {
      if (section === prevSection) {
        const updatedTaskArr = taskArr.filter((task) => task.id !== moveId);
        return [section, updatedTaskArr];
      }
      return [section, taskArr];
    });
    // 옮겨진 섹션에서 카드 추가
    this.#tasks = deletedTaskList.map(([section, taskArr]) => {
      return newSection === section
        ? [section, [moveTask, ...taskArr]]
        : [section, [...taskArr]];
    });

    this.notify(ACTION_TYPE.move, { prevSection, newSection, moveId });
  }
}
