import { ObjectType, ActionType } from '../enums/actionLog';
import { CANNOT_GENERATE_LOG } from '../enums/errorMessage';

/**
 * @typedef {string} ActionLog
 */

/**
 * Create a new actionLogArray
 * @returns {ActionLog[]}
 */
export const initActionLogArray = () => [];

/**
 * Push Action Log
 * @returns {ActionLog[]}
 */
export const pushActionLog = (actionLogArray, actionLog) => [...actionLogArray, actionLog]

/**
 * Clear Action Logs
 * @returns {ActionLog[]}
 */
export const removeAllActionLog = () => []

/**
 * Generate a new actionLog
 * @param {ObjectType} objectType
 * @param {ActionType} actionType
 * @param {Card} card
 * @param {Column[]} columnArray
 * @returns {string}
 */
export const generateActionLog = (
    objectType,
    actionType,
    card,
    columnArray
) => {
    try {
        switch (objectType) {
            case objectType.CARD:
                return generateCardActionLog(actionType, card, columnArray)
            case objectType.COLUMN:
                return generateColumnActionLog(actionType, columnArray)
            default:
                throw new Error(CANNOT_GENERATE_LOG);
        }
    } catch (e) {
        return e.message;
    }

};
/**
 * Generate a new CardActionLog
 * @param {ActionType} actionType
 * @param {Card} card
 * @param {Column[]} columnArray
 * @returns {string}
 */
const generateCardActionLog = (actionType, card, columnArray) => {
    const cardTitle = card?.title;
    const columnTitle = columnArray[0]?.title;
    const destColumnTitle = columnArray.length > 1 ? columnArray[1]?.title : undefined;
    switch (actionType) {
        case actionType.CREATE:
            return `${cardTitle}을(를) ${columnTitle}에서 등록하였습니다.`;
        case actionType.UPDATE:
            return `${cardTitle}을(를) 변경하였습니다.`;
        case actionType.DELETE:
            return `${cardTitle}을(를) ${columnTitle}에서 삭제하였습니다.`;
        case actionType.MOVE:
            return `${cardTitle}을(를) ${columnTitle}에서 ${destColumnTitle}으로 이동했습니다.`
        default:
            throw new Error(CANNOT_GENERATE_LOG);
    }
}

/**
 * Generate a new column action log
 * @param {ActionType} actionType
 * @param {Column[]} columnArray
 * @returns {string}
 */
const generateColumnActionLog = (actionType, columnArray) => {
    const columnTitle = columnArray[0]?.title;
    const destColumnTitle = columnArray.length > 1 ? columnArray[1]?.title : undefined;
    switch (actionType) {
        case actionType.CREATE:
            return `${columnTitle}을(를) 생성하였습니다.`;
        case actionType.UPDATE:
            return `${columnTitle}을(를) 삭제하였습니다.`;
        case actionType.UPDATE:
            return `${columnTitle}을(를) ${destColumnTitle}로 변경하였습니다.`;
        case actionType.MOVE:
        default:
            throw new Error(CANNOT_GENERATE_LOG);
    }
}
