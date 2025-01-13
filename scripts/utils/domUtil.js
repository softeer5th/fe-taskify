// import { storeData, loadData } from './storageUtil.js'
import { setState, getState } from './stateUtil.js'

// dom 최적화와 반대되는 방향...
// async나 callback을 이용해서 dom 조작 작업이 완료된 뒤 DOM에 추가하는 방향으로 구현 수정?

// initialize = (documentFragment) => void
export const createDomElementAsChild = (
    templateId,
    parentDomElement,
    initialize,
    appendRear = true
) => {
    if (!parentDomElement) throw new Error(`Parent is ${parentDomElement}`)
    if (!initialize) throw new Error(`initialize is ${initialize}`)

    const { identifier, component } = createDomElement(templateId)
    initialize(identifier, component)
    if (appendRear) {
        parentDomElement.appendChild(component)
    } else {
        parentDomElement.prepend(component)
    }
    return identifier
}

export const replaceDomElement = (templateId, originDomElement, initialize) => {
    if (!initialize) throw new Error(`initialize is ${initialize}`)

    const { identifier, component } = createDomElement(templateId)
    initialize(identifier, component)
    originDomElement.replaceWith(component)
    return identifier
}

export const createDomElementAsSibling = (
    templateId,
    targetDomElement,
    initialize,
    insertAfter = true
) => {
    if (!initialize) throw new Error(`initialize is ${initialize}`)

    const { identifier, component } = createDomElement(templateId)
    initialize(identifier, component)
    if (insertAfter) {
        targetDomElement.after(component)
    } else {
        targetDomElement.before(component)
    }
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
