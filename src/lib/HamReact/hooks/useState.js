import { updateDOM } from "../manageDOM/updateDOM.js";
import {
  getValidState,
  stateId,
  getStoreState,
  setStoreState,
  increaseStateId,
} from "../store.js";

/**
 *
 * @param {*} initState - 초기 상태.
 * @returns {[*, Function]} - 상태와 상태를 변경하는 함수.
 */
export const useState = (initState) => {
  const currentStateId = stateId;
  const state = getValidState(initState);
  const setState = (nextState) => {
    if (Object.is(getStoreState(currentStateId), nextState)) return;
    setStoreState(currentStateId, nextState);
    updateDOM();
  };

  increaseStateId();
  return [state, setState];
};
