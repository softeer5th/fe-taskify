const HamReact = (() => {
  const states = {};
  let index = 0;
  let currentComponentFunc = null;
  let currentComponent = null;

  const render = (componentFunc) => {
    index = 0;

    const prevComponent = currentComponent;

    currentComponentFunc = componentFunc;
    const component = componentFunc();
    currentComponent = component;

    // prevComponent의 parent를 알아내서, 새로운 component를 render한다.
    console.log(prevComponent, component);

    component.render();
    return component;
  };

  /**
   *
   * @param {*} initState - 초기 상태.
   * @returns {[*, Function]} - 상태와 상태를 변경하는 함수.
   */
  const useState = (initState) => {
    const state = states[index] || initState;
    const idx = index;
    /**
     *
     * @param {*} newState - 변경할 새로운 상태.
     */
    const setState = (newState) => {
      states[idx] = newState;

      if (currentComponentFunc) {
        render(currentComponentFunc);
      }
    };

    index += 1;
    return [state, setState];
  };

  return { render, useState };
})();

export * from "./useRef.js";
export default HamReact;
