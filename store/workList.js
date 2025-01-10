import { updateCardCount } from "../js/cardNavbar.js";

let workList = JSON.parse(localStorage.getItem("workList"));

const savedData = (updatedWorkList) => {
  localStorage.setItem("workList", JSON.stringify(updatedWorkList));
};

const loadData = () => {
  if (!workList) {
    const workList = {
      todo: [],
      doing: [],
      done: [],
    };
    return workList;
  }
  workList = JSON.parse(localStorage.getItem("workList"));
  return workList;
};

const deleteCardFormStorage = (cardId, sectionType) => {
  const updatedWorkList = {
    ...workList,
    [sectionType]: workList[sectionType].filter(
      (item) => item.id !== Number(cardId)
    ),
  };

  savedData(updatedWorkList);
  updateCardCount(sectionType, updatedWorkList[sectionType].length);
};

const editStorage = (sectionType, cardId, newTitle, newContent) => {
  const updatedWorkList = {
    ...workList,
    [sectionType]: workList[sectionType].map((item) => {
      if (item.id === Number(cardId)) {
        return {
          ...item,
          title: newTitle,
          content: newContent,
        };
      }
      return item;
    }),
  };
  savedData(updatedWorkList);
};
const addStorage = (sectionType, title, content, CARD_ID) => {
  workList[sectionType].unshift({
    id: CARD_ID,
    createdDate: new Date().toISOString(),
    title,
    content,
  });
  savedData(workList);
  updateCardCount(sectionType, workList[sectionType].length);
};

export { deleteCardFormStorage, savedData, loadData, addStorage, editStorage };
