export const getRandomId = () => {
  const randomValueArray = new Uint32Array(1);
  crypto.getRandomValues(randomValueArray);
  return randomValueArray[0];
};
