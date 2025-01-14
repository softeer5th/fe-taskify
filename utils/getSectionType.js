export const getSectionType = (target) => {
  const sectionType = target.closest("section").className.split("-")[0]; // 어떤 칼럼 영역인지.
  return sectionType;
};
