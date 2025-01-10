export const updateCardCount = (sectionType, countValue) => {
  const targetCountDom = document
    .querySelector(`.${sectionType}-wrapper`)
    .querySelector(".card-count");

  targetCountDom.textContent = countValue;
};
