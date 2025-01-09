export const storeData = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}

export const loadData = (name) => {
    if (!localStorage.getItem(name)) return null
    return JSON.parse(localStorage.getItem(name))
}
