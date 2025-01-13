export const updateCardCount = (sectionType, countValue) => {
  const targetCountDom = document.querySelector(
    `.${sectionType}-wrapper .card-count`
  );

  targetCountDom.textContent = countValue;
};
