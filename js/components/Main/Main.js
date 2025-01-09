import TaskColumn from "../TaskColumn/TaskColumn.js";

export default function Main() {
  const main = document.createElement("main");
  main.classList.add("main");

  main.appendChild(TaskColumn({ title: "해야할 일", tasks: [1, 2, 3] }));
  main.appendChild(TaskColumn({ title: "하고 있는 일", tasks: [4, 5] }));
  main.appendChild(TaskColumn({ title: "완료한 일", tasks: [6, 7, 8, 9] }));

  return main;
}
