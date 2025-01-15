let store = {};
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

export const getValidState = (state) => {
  if (store[stateId] === undefined) {
    store[stateId] = state;
  }

  return store[stateId];
};

export const getStoreState = (id) => store[id];

export const setStoreState = (id, nextState) => {
  store[id] = nextState;
};
