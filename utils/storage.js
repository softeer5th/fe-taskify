const loadStorage = () => {
  try {
    const data = localStorage.getItem("workList");
    if (!data) {
      return [];
    }
    const parsedData = JSON.parse(data);
    return Object.entries(parsedData);
  } catch (error) {
    throw new Error("Failed to load data from localStorage: " + error.message);
  }
};

const saveStorage = (workList) => {
  localStorage.setItem("workList", workList);
};

export { loadStorage, saveStorage };
