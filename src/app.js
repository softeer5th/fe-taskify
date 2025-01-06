import Header from "./component/header.js";
import Column from "./component/column.js";

const root = document.getElementById("root");
const header = Header();
const column = Column();

root.innerHTML += `${header}`;
root.innerHTML += `${column}`;
