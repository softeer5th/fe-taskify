import Model from "./model.js";
import MainController from "./controller/mainController.js";

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
      title: "자바스크립트 공부",
      description: "자바스크립트 공부를 하면서 코드스피츠에 참석하기",
      createdAt: new Date(2021, 8, 1),
      device: "web",
      columnId: 1,
    },
    {
      id: 2,
      title: "코드스피츠 참석",
      description: "* 8/1 코드스피츠 참석\n* 8/2 코드스피츠 참석",
      createdAt: new Date(2021, 8, 2),
      device: "web",
      columnId: 2,
    },
    {
      id: 3,
      title: "TIL 작성",
      description: "Today I Learned 작성하기",
      createdAt: new Date(2021, 8, 3),
      device: "web",
      columnId: 3,
    },
    {
      id: 4,
      title: "알고리즘 공부",
      description: "알고리즘 문제 풀기",
      createdAt: new Date(2021, 8, 4),
      device: "web",
      columnId: 1,
    },
  ],
  user: {
    name: "TestUser",
    thumbnailUrl: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  },
};

const model = new Model();
model.setInitData(mockData);
const rootElement = document.getElementById("root");
const mainController = MainController(model, rootElement);
