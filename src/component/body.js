import Column from "./column.js";

export default function Body() {
  const columns = Column({ id: 1, title: "해야 할 일", tasks: [1] }) + Column({ id: 2, title: "하고 있는 일", tasks: [1, 2] }) + Column({ id: 3, title: "완료한 일", tasks: [1, 2, 3] });
  return `<div class="body">
        ${columns}
    </div>`;
}
