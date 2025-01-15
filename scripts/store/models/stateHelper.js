/**
 * 상태를 생성하는 함수
 * @param {*} initialState 
 * @returns {object}
 */
const createState = (initialState) => {
    let state = initialState;
    const listeners = [];

    const getState = () => state;

    const setState = (newState) => {
        state = typeof newState === 'function' ? newState(state) : newState;
        listeners.forEach((listener) => listener(state));
    };

    const subscribe = (listener) => {
        listeners.push(listener);
    };

    return { getState, setState, subscribe };
}

export default createState;