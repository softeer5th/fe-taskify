import { Model } from "./model.js";
import { HeaderController } from "./controller.js";
import { ColumnListController } from "./controller.js";
import { TaskView } from "./view/taskView.js";

const mockData = {
  column: [
    {
      id: 1,
      title: "해야 할 일",
    },
    {
      id: 2,
      title: "하고 있는 일",
    },
    {
      id: 3,
      title: "완료한 일",
    },
  ],
  task: [
    {
      id: 1,
      name: "자바스크립트 공부",
      description: "자바스크립트 공부를 하면서 코드스피츠에 참석하기",
      createdAt: Date(2021, 8, 1),
      device: "web",
      columnId: 1,
    },
    {
      id: 2,
      name: "코드스피츠 참석",
      description: "* 8/1 코드스피츠 참석\n* 8/2 코드스피츠 참석",
      createdAt: Date(2021, 8, 2),
      device: "web",
      columnId: 2,
    },
    {
      id: 3,
      name: "TIL 작성",
      description: "Today I Learned 작성하기",
      createdAt: Date(2021, 8, 3),
      device: "web",
      columnId: 3,
    },
  ],
  user: {
    name: "TestUser",
    thumbnailUrl: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  },
};

const model = Model();
model.setInitData(mockData);
const rootElement = document.getElementById("root");
HeaderController(model, rootElement);
ColumnListController(model, rootElement);

function unselectTask(event) {
  event.stopPropagation();
  const state = model.getCurrentDataState().state;
  if (state.movingTaskId !== -1 && state.mouseOverColumnId !== -1) {
    model.moveTask(state.movingTaskId, state.mouseOverColumnId);
    console.log("Task", state.movingTaskId, "is moved to column", state.mouseOverColumnId);
  }
  model.setMovingTaskId(-1);
}

window.addEventListener("mouseup", unselectTask);

const ghostTask = TaskView({
  task: {
    id: -1,
    name: "",
    description: "",
    createdAt: 0,
    device: "web",
    columnId: -1,
  },
  state: "default",
});
ghostTask.classList.add("task--drag");
ghostTask.style.position = "absolute";
ghostTask.style.opacity = 0;
ghostTask.style.pointerEvents = "none";
ghostTask.style.zIndex = 1000;
ghostTask.style.transform = "translate(-50%, -50%)";
rootElement.appendChild(ghostTask);

function moveGhostTask(event) {
  event.stopPropagation();
  event.preventDefault();
  const state = model.getCurrentDataState().state;
  const task = model.getCurrentDataState().data.task.find((task) => task.id === state.movingTaskId);
  if (task) {
    ghostTask.innerHTML = TaskView({
      task: task,
      state: "default",
      onFirstButtonClicked: () => {},
      onSecondButtonClicked: () => {},
    }).innerHTML;
  }
  if (state.movingTaskId !== -1) {
    ghostTask.style.top = event.clientY + "px";
    ghostTask.style.left = event.clientX + "px";
    ghostTask.style.opacity = 1;
  } else {
    ghostTask.style.opacity = 0;
  }
}

window.addEventListener("mousemove", moveGhostTask);
window.addEventListener("mouseup", moveGhostTask);
window.addEventListener("mousedown", moveGhostTask);
