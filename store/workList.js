import { updateCardCount } from "../js/cardNavbar.js";

let workList;

const savedData = (updatedWorkList) => {
  updatedWorkList, "저장될 리스트";
  localStorage.setItem("workList", JSON.stringify(updatedWorkList));
  workList = loadData(); // 삭제가 되고, 다시 workList 변수에 업데이트 필수.
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
};

const updateLocalStorageAfterDrop = (prevSection, nowSection, targetCard) => {
  const targetCardData = workList[prevSection].find(
    (item) => item.id === Number(targetCard.id)
  );

  const workListAfterDeletePrev = {
    ...workList,
    [prevSection]: workList[prevSection].filter(
      (item) => item.id !== Number(targetCard.id)
    ),
  };

  const updatedWorkList = {
    ...workListAfterDeletePrev,
    [nowSection]: [targetCardData, ...workListAfterDeletePrev[nowSection]],
  };

  savedData(updatedWorkList);
};

workList = loadData();

export {
  deleteCardFormStorage,
  savedData,
  loadData,
  addStorage,
  editStorage,
  updateLocalStorageAfterDrop,
};
