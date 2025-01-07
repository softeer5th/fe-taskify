// value 는 {"title": "~~" ,"body" : " !! " , " author " : " 나야 " , " timestamp" : " 222" }
// 식의 객체 배열로 저장

// 해당 열에 맞는 값들을 어떻게 불러 올건지 고민후 구현 필요.

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