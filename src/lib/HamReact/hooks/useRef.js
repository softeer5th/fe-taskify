/**
 *
 * @param {*} initialValue - 초기값
 * @returns {object} - useRef 객체
 */
export const useRef = (initialValue = null) => ({
  current: initialValue,
});
