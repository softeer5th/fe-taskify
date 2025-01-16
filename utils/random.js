export const getRandomId = () => {
  const randomValueArray = new Uint32Array(1);
  crypto.getRandomValues(randomValueArray);
  return randomValueArray[0];
};

export const getRandomString = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let str = "";

  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};
