let clone = null;
let isOrderChanging = false;
let isColumnNameChanging = false;
let isCardEditing = false;
let isDragging = false;

export function getClone () {
    return clone;
}

export function setClone (newClone) {
    clone = newClone;
}


export function getIsOrderChanging () {
    return isOrderChanging;
}

export function toggleIsOrderChanging () {
    isOrderChanging = !isOrderChanging;
}


export function getIsColumnNameChanging () {
    return isColumnNameChanging;
}

export function toggleIsColumnNameChanging () {
    isColumnNameChanging = !isColumnNameChanging;
}


export function getIsCardEditing () {
    return isCardEditing;
}

export function toggleIsCardEditing () {
    isCardEditing = !isCardEditing;
}


export function getIsDragging () {
    return isDragging;
}

export function toggleIsDragging () {
    isDragging = !isDragging;
}