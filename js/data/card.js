/**
 * @typedef {Object} Card
 * @property {string} title
 * @property {string} content
 * @property {Date} date
 * @property {string} author
 */

/**
 * Create a new card
 * @returns {User}
 */
export const createCard = () => {
  return {
    title: '',
    content: '',
    date: new Date(),
    author: '박준혁'
  };
}