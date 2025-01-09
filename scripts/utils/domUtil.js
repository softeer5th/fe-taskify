import { storeData, loadData } from './storageUtil.js'

const elements = []

export const createDomElement = (templateId, parentDomElement) => {
    if (!parentDomElement) throw new Error(`Parent is ${parentDomElement}`)

    const templateElement = document.getElementById(templateId)
    const component = document.importNode(templateElement.content, true)
    const firstTag = component.firstElementChild
    const identifier = `id-${generateId()}`
    firstTag.id = identifier

    parentDomElement.appendChild(component)

    elements.push({ identifier: identifier, element: component })
    return identifier
}

export const findDomElement = (id) => {
    return document.getElementById(id)
}

export const removeDomElement = (id) => {}

const generateId = () => {
    const prevId = loadData('elementId') ?? 0
    storeData('elementId', prevId + 1)
    return prevId + 1
}
