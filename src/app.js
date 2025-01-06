import Header from "./component/header.js";
import Body from "./component/body.js";

const root = document.getElementById("root");
const header = Header();
const body = Body();

root.innerHTML += `${header}`;
root.innerHTML += `${body}`;
