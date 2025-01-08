import Header from "./components/Header/Header.js";
import TaskCard from "./components/TaskCard/TaskCard.js";
const $app = document.querySelector('#app');
$app.classList.add('surface-default');

$app.appendChild(Header());
$app.appendChild(TaskCard());