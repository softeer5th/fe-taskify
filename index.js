import { App } from "./js/app.js";

const rootElement = document.querySelector("body")

if (rootElement) {
    const app = App(); // App 컴포넌트 실행
    rootElement.appendChild(app); // DOM에 추가
}

