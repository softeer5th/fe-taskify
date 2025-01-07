import Column from "./column.js";

const mockColumn = [
  { id: 1, title: "해야 할 일", tasks: [1, 2] },
  { id: 2, title: "하고 있는 일", tasks: [3] },
  { id: 3, title: "완료한 일", tasks: [] },
];

const mockTask = [
  { id: 1, title: "블로그에 포스팅할 것", description: "* GitHub 공부내용\n* 모던 자바스크립트 1장 공부내용", createdAt: "1736181251", device: "web" },
  { id: 2, title: "GitHub 공부하기", description: "add, commit, push", createdAt: "1736181431", device: "web" },
  { id: 3, title: "HTML/CSS 공부하기", description: "input 태그 실습", createdAt: "1736181611", device: "web" },
];

export default function Body() {
  const columns = mockColumn
    .map(
      (column) => `
        ${Column({
          ...column,
          tasks: column.tasks.map((taskId) => mockTask.find((task) => task.id === taskId)),
        })}
        `
    )
    .join("");
  return `<div class="body">
        ${columns}
    </div>`;
}
