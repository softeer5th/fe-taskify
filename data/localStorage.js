export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(getStorage(key));
}

export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const removeStorage = (key) => {
  localStorage.removeItem(key);
}

export const editStorage = (key, value) => {
  removeStorage(key);
  setStorage(key, JSON.stringify(value));
}