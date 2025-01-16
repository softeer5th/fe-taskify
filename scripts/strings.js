export const classNames = {
    todoContainer: 'todos',
    todoHeader: 'todos__header',
    todoHeaderTitle: 'todos__header__title',
    todoHeaderTodoCount: 'todos__header__todo-count',
    todoBody: 'todos__body',
    todoDragZone: 'todos__drag-zone',

    todoItemBody: 'todos__body__item',
    todoItemTitle: 'todos__body__item__title',
    todoItemContent: 'todos__body__item__content',
    todoItemAuthor: 'todos__body__item__author',

    todoAddForm: 'todos__add-form',
    todoAddFormInputTitle: 'todos__add-form__input-title',
    todoAddFormInputContent: 'todos__add-form__input-content',
    todoAddFormButtonContainer: 'todos__add-form__button-container',
    todoAddFormCancelBtn: 'todos__add-form__cancel-btn',
    todoAddFormSubmitBtn: 'todos__add-form__submit-btn',

    todoEditForm: 'todos__add-form',
    todoEditFormInputTitle: 'todos__add-form__input-title',
    todoEditFormInputContent: 'todos__add-form__input-content',
    todoEditFormButtonContainer: 'todos__add-form__button-container',
    todoEditFormCancelBtn: 'todos__add-form__cancel-btn',
    todoEditFormSubmitBtn: 'todos__add-form__submit-btn',

    historyView: 'activity-history',
    historyToggleBtn: 'activity-history__toggle-btn',
    historyCloseBtn: 'activity-history__close-btn',
    historyBody: 'activity-history__body',
    historyClearBtn: 'activity-history__clear-btn',

    historyItemCreator: 'activity-history__item__nickname',
    historyItemContent: 'activity-history__item__content',
    historyItemTime: 'activity-history__item__time',

    afterImage: 'after-image',

    button: 'btn',
    addButton: 'add-btn',
    deleteButton: 'delete-btn',
    editButton: 'edit-btn',

    undoButton: 'advanced-features__undo-btn',
    redoButton: 'advanced-features__redo-btn',
    addCategoryButton: 'advanced-features__add-category-btn',
}

export const templateNames = {
    todoHeader: 'todo-header-template',
    todoItem: 'todo-item-template',
    todoCategory: 'todo-category-template',
    todoItemAddForm: 'todo-item-add-form-template',
    todoItemEditForm: 'todo-item-edit-form-template',
    historyView: 'activity-history-template',
    historyItem: 'activity-history-item-template',
}

export const keys = {
    TODO_CATEGORY_KEY: 'todoCategory',
    DATA_IDENTIFIER_KEY: 'dataIdentifier',
    LAST_UID_KEY: 'lastUid',
    ACTION_STORAGE_KEY: 'action',
    HISTORY_STORAGE_KEY: 'history',
    RESET_DATA_KEY: true,
}
