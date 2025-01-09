import Header from "./components/Header/Header.js";
import Main from "./components/Main/Main.js";

const $app = document.querySelector("#app");
$app.append(Header(), Main());
