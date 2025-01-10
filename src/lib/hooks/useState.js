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
  const element = App();
  root.appendChild(createDOM(element));
};

/**
 *
 * @param {*} initState - 초기 상태.
 * @returns {[*, Function]} - 상태와 상태를 변경하는 함수.
 */
export const useState = (initState) => {
  if (!states[currentIndex]) {
    states[currentIndex] = initState;
  }

  const state = states[currentIndex];

  /**
   *
   * @param newState
   */
  const setState = (newState) => {
    states[currentIndex] = newState;
    render();
  };

  currentIndex += 1;

  return [state, setState];
};
