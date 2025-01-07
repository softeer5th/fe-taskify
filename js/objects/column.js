/**
 * @typedef {Object} Column
 * @property {string} title
 * @property {number} contentNum
 * @property {Card[]} cards
 */

/**
 * Create a new column
 * @param {string} title
 * @param {number} contentNum
 * @returns {Column}
 */

const createEmptyColumn = (title, contentNum = 0) => {
    return {
        title,
        contentNum,
        cards: []
    }
};

/**
 * Create a new columns
 * @param {string} title
 * @param {number} contentNum
 * @returns {Column[]}
 */
const createEmptyColumns = (titleArray) => titleArray.map(title => createEmptyColumn(title));

/**
 * Create default columns
 * @returns {Column[]}
 */
export const createDefaultColumns = () => createEmptyColumns(['해야 할 일', '하고 있는 일', '완료한 일']);

/**
 * Append column to original columns
 * @param {Column[]} columnArray
 * @param {string} title
 * @param {number} contentNum
 * @returns {Column[]}
 */

export const appendColumns = () => [...columnArray, createEmptyColumn(title, contentNum)];