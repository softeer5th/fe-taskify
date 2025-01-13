import App from "../../app/app.js";
import { createDOM } from "../jsx-runtime/index.js";

const states = {};
let currentIndex = 0;

/**
 *
 */
export const render = () => {
  currentIndex = 0;
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(createDOM(App()));
};

/**
 *
 * @param {*} initState - 초기 상태.
 * @returns {[*, Function]} - 상태와 상태를 변경하는 함수.
 */
export const useState = (initState) => {
  const index = currentIndex;

  if (!states[currentIndex]) {
    states[currentIndex] = initState;
  }

  const state = states[index];

  /**
   *
   * @param {*} newState - 변경할 새로운 상태.
   */
  const setState = (newState) => {
    states[index] = newState;
    render();
  };

  currentIndex += 1;

  return [state, setState];
};
