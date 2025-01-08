const ObjectType = Object.freeze({
    CARD: 'CARD',
    COLUMN: 'COLUMN'
});

const ActionType = Object.freeze({
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    MOVE: 'MOVE'
});

export const ACTION_LOG_ENUMS = {
    ObjectType,
    ActionType
}