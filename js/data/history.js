/**
 * @typedef {Object} HistoryObject
 * @property {Column[]} columnArray
 * @property {ActionLog[]} actionLog
 */

/**
 * @typedef {HistoryObject[]} HistoryStack
*/

/**
 * Initialize a history stack
 * @returns {HistoryStack}
 */
export const initHistoryStack = () => [];

/**
 * Push History
 * 
 * @param {HistoryStack} historyStack
 * @param {HistoryObject} history
 * @returns {HistoryStack}
 */
export const pushHistoryStack = (historyStack, history) => [...historyStack, history];

/**
 * Peek Historys
 * @param {HistoryStack} historyStack
 * @returns {HistoryObject}
 */
export const peekHistoryStack = historyStack => historyStack[-1];

/**
 * Pop History Stack
 * @param {HistoryStack} historyStack
 * @returns {HistoryObject}
 */
export const popHistoryStack = historyStack => historyStack.slice(0, -1);

/**
 * Check Stack is Empty
 * @param {HistoryStack} historyStack
 * @returns {boolean}
 */
export const isEmptyHistoryStack = historyStack => historyStack.length === 0 ? true : false;
