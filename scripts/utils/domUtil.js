const elements = []

export const createDomElement = (identifier, parent, classNames = [], attributes = {}) => {
    if (!parent) throw new Error(`Parent is ${parent}`)

    const element = document.createElement(tagName)
    for (const className of classNames) {
        element.classList.add(className)
    }
    for (const key in attributes) { 
        element.setAttribute(key, attributes[key])
    }
    parent.appendChild(element)

    elements.push({identifier: identifier, element: element})
    return element
}

export const findDomElement = (id) => {
    return document.getElementById(id)
}

export const removeDomElement = (element) => {
    element.remove()
}