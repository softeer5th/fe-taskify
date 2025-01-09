// 카드의 데이터들을 불러오고 저장하기.
// const workList = {
//   todo: [
//     {
//       title: "",
//       content: "",
//       createdDate: "",
//       id: "",
//     },
//   ],
//   doing: [
//     {
//       title: "",
//       content: "",
//       createdDate: "",
//       id: "",
//     },
//   ],
//   done: [
//     {
//       title: "",
//       content: "",
//       createdDate: "",
//       id: "",
//     },
//   ],
// };

const savedData = (workList) => {
  localStorage.setItem("workList", JSON.stringify(workList));
};
const loadData = () => {
  const workList = localStorage.getItem("workList");
  if (!workList) {
    const workList = {
      todo: [],
      doing: [],
      done: [],
    };
    return workList;
  }
  return JSON.parse(workList);
};
export { savedData, loadData };
