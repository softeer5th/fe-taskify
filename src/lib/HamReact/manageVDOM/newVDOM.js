let createVDOMFunc;

export const getNewVDOM = () => createVDOMFunc();

export const setCreateVDOM = (currentCreateVDOM) => {
  createVDOMFunc = currentCreateVDOM;
};
