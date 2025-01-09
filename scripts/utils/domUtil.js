import { storeData, loadData } from "./storageUtil.js"

const elements = []

export const createDomElement = (templateId, parent, attributes = {}) => {
    if (!parent) throw new Error(`Parent is ${parent}`)

    const templateTag = document.getElementById(templateId)
    const component = document.importNode(templateTag.content, true)
    const firstTag = component.firstElementChild
    const identifier = generateId()
    firstTag.id = identifier

    elements.push({ identifier: identifier, element: component })
    return { identifier: identifier, element: component }
}

export const findDomElement = (id) => {
    return document.getElementById(id)
}

export const removeDomElement = (id) => {}

const generateId = () => {
    const prevId = loadData("elementId") ?? 0
    storeData("elementId", prevId + 1)
    return prevId + 1
}
