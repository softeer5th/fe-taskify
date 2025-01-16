export let store = {};
export let stateId = 0;

export const resetStore = () => {
  store = {};
};

export const resetStateId = () => {
  stateId = 0;
};

export const increaseStateId = () => {
  stateId += 1;
};

export const setInitState = (id, state) => {
  if (!store[id]) {
    store[id] = state;
  }
};

export const getStoreState = (id) => store[id];

export const setStoreState = (id, nextState) => {
  store[id] = nextState;
};
