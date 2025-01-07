const ObjectType = {
    CARD,
    COLUMN
}

const ActionType = {
    CREATE,
    DELETE,
    UPDATE,
    MOVE
}

Object.freeze(ObjectType);
Object.freeze(ActionType);

export const ACTION_LOG_ENUMS = {
    ObjectType,
    ActionType
}