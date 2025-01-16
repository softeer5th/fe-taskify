// import { storeData, loadData } from './storageUtil.js'
import { keys } from '../strings.js'
import { setState, getState } from './stateUtil.js'

// TODO: map 자료구조 사용 검토하기
setState(keys.DATA_IDENTIFIER_KEY, {})

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
    const uid = initialize(identifier, component)
    uid && mapUidToIdentifier(uid, identifier)

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
    const uid = initialize(identifier, component)
    originDomElement.replaceWith(component)
    uid && mapUidToIdentifier(uid, identifier)
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
    const uid = initialize(identifier, component)
    uid && mapUidToIdentifier(uid, identifier)

    if (insertAfter) {
        targetDomElement.after(component)
    } else {
        targetDomElement.before(component)
    }
    return identifier
}

export const createDomElement = (templateId) => {
    const templateElement = document.getElementById(templateId)
    if (!templateElement) throw new Error(`Template is ${templateElement}`)
    const component = document.importNode(templateElement.content, true)
    const firstTag = component.firstElementChild
    const identifier = `id-${generateId()}`
    firstTag.id = identifier
    return { identifier: identifier, component: component }
}

export const findDomElement = (id) => {
    return document.querySelector(`#${id}`)
}

export const findDomElementByUid = (uid) => {
    const identifier = getIdentifierByUid(uid)
    return findDomElement(identifier)
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

const mapUidToIdentifier = (uid, identifier) => {
    getState(keys.DATA_IDENTIFIER_KEY)[uid] = identifier
}

export const getIdentifierByUid = (uid) => {
    return getState(keys.DATA_IDENTIFIER_KEY)[uid]
}

// 데이터 종속적인 코드.. 개선 필요
export const getUidByIdentifier = (identifier) => {
    const state = getState(keys.DATA_IDENTIFIER_KEY)
    return (
        Number(Object.keys(state).find((uid) => state[uid] === identifier)) ??
        null
    )
}
