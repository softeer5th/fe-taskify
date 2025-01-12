export function createComponent({ initialState, render, props }) {
  let state = initialState || null;
  const subscribers = [];
  const rootElement = document.createElement("div");

  const setState = (newState) => {
    state = typeof newState === "function" ? newState(state) : newState;
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
  };

  const rerender = () => {
    console.log("State updated:", state);
    const updatedElement = render({ state, setState, props });

    // 기존 DOM 내부만 교체
    rootElement.replaceChildren(...updatedElement.childNodes);
  };

  // 초기 렌더링
  rootElement.appendChild(render({ state, setState, props }));
  subscribe(rerender);

  return rootElement;
}
