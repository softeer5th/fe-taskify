const getDevice = () => {
  if ("ontouchstart" in document.documentElement) {
    return "mobile";
  }

  return "web";
};

export default getDevice;
