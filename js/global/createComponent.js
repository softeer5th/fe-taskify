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
    rootElement.replaceChildren(...updatedElement.childNodes);
  };

  rootElement.appendChild(render({ state, setState, props }));
  subscribe(rerender);

  return rootElement;
}
