import Column from "./column.js";

export default function Body() {
  const columns = Column({ id: 1, title: "To Do", tasks: [1] }) + Column({ id: 2, title: "In Progress", tasks: [1, 2] }) + Column({ id: 3, title: "Done", tasks: [1, 2, 3] });
  return `<body class="column">
        ${columns}
    </body>`;
}
