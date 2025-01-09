import { storeData, loadData } from './storageUtil.js'

export const createDomElement = (
    templateId,
    parentDomElement,
    appendRear = true
) => {
    if (!parentDomElement) throw new Error(`Parent is ${parentDomElement}`)

    const templateElement = document.getElementById(templateId)
    const component = document.importNode(templateElement.content, true)
    const firstTag = component.firstElementChild
    const identifier = `id-${generateId()}`
    firstTag.id = identifier

    if (appendRear) {
        parentDomElement.appendChild(component)
    } else {
        parentDomElement.insertBefore(component, parentDomElement.firstChild)
    }

    return identifier
}

export const findDomElement = (id) => {
    return document.querySelector(`#${id}`)
}

export const removeDomElement = (id) => {
    const element = findDomElement(id)
    element.remove()
}

const generateId = () => {
    const prevId = loadData('elementId') ?? 0
    storeData('elementId', prevId + 1)
    return prevId + 1
}
