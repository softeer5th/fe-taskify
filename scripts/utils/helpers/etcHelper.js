/**
 * 모달 초기화 함수
 * @param {string} message 
 * @returns {HTMLElement}
 */

const initModal = (message) => {
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'flex';
  const modal = overlay.querySelector('.modal');
  modal.querySelector('h2').textContent = message;
  return overlay;
};

export { initModal };