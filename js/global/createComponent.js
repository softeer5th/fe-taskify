export function createComponent({ initialState, render, props, className = "" }) {
  let state = initialState || null;
  const subscribers = [];
  const rootElement = document.createElement("div");
  if (className !== "") rootElement.className = className;

  const setState = (newState) => {
    state = typeof newState === "function" ? newState(state) : newState;
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
  };

  const rerender = () => {
    const updatedElement = render({ state, setState, props });
    rootElement.replaceChildren(...updatedElement.childNodes);
  };

  rootElement.appendChild(render({ state, setState, props }));
  subscribe(rerender);

  return rootElement;
}
