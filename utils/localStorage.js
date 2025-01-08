// Tasks 저장
  // key => column number
  // value => task 객체들의 배열

// column 저장
  // key => `column${columnCount}`
  // value => column title

export const setStorage = (key, value) => {
  const storedTasks = getStorage(key) || [];
  const updatedTasks = [...storedTasks, value];
  localStorage.setItem(key, JSON.stringify(updatedTasks));
  console.log(getStorage(key));
}

export const getStorage = (key) => {
  //return null if no key
  return JSON.parse(localStorage.getItem(key));
}

export const removeStorage = (key) => {
  localStorage.removeItem(key);
}

export const editStorage = (key, value) => {
  removeStorage(key);
  setStorage(key, JSON.stringify(value));
}

export const setDefaultColumn = () =>  {
  setStorage('column1', '해야할 일');
  setStorage('column2', '진행중인 일');
  setStorage('column3', '완료한 일');
  let columnCount = 4;
  while (getStorage(`column${columnCount}`)){
    removeStorage(`column${columnCount}`);
  }
}

export const setColumnStorage = (columntitle) => {
  let columnCount = 1;
  while (getStorage(`column${columnCount}`)){
    columnCount++;
  }
  setStorage(`column${columnCount}`, columntitle);
}