// import { storeData, loadData } from './storageUtil.js'
import { setState, getState } from './stateUtil.js'

export const createDomElementAsChild = (
    templateId,
    parentDomElement,
    appendRear = true
) => {
    if (!parentDomElement) throw new Error(`Parent is ${parentDomElement}`)

    const { identifier, component } = createDomElement(templateId)
    if (appendRear) {
        parentDomElement.appendChild(component)
    } else {
        parentDomElement.prepend(component)
    }
    return identifier
}

export const replaceDomElement = (templateId, originDomElement) => {
    const { identifier, component } = createDomElement(templateId)
    originDomElement.replaceWith(component)
    return identifier
}

export const createDomElement = (templateId) => {
    const templateElement = document.getElementById(templateId)
    const component = document.importNode(templateElement.content, true)
    const firstTag = component.firstElementChild
    const identifier = `id-${generateId()}`
    firstTag.id = identifier
    return { identifier: identifier, component: component }
}

export const findDomElement = (id) => {
    return document.querySelector(`#${id}`)
}

export const removeDomElement = (id) => {
    const element = findDomElement(id)
    element.remove()
}

const generateId = () => {
    const prevId = getState('elementId') ?? 0
    setState('elementId', prevId + 1)
    return prevId + 1
}
