import {executeModule} from "./react.js";
import * as tagObj from './react-dom-element.js'

function reverseForEach(array, callbackF) {
    for (let i = array.length - 1; i >= 0; i--) {
        callbackF(array[i], i)
    }
}

function diffChildren(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    if (pNode?.children?.length > 0 && nNode?.children?.length > 0) {
        const pNodeChildSet = new Set(pNode.children)

        reverseForEach(nNode.children, (nChild, i) => {
            nChild.parent = nNode

            if (nChild.key != null) {
                const pChild = pNode.children.find(child => child.key === nChild.key)
                // 동일한 키
                if (pChild) {
                    pNodeChildSet.delete(pChild)
                    pNodeStack.push(pChild)
                    nNodeStack.push(nChild)

                    // index가 nChild와 동일하지 않으면
                    if (pNode.children[i] !== pChild) {
                        const parent = findParentElement(nNode)
                        if (parent !== 'portal') {
                            effectObj.replace.add(parent)
                        }
                    }
                }
                // 동일한 키 없음
                else {
                    pNodeStack.push(null)
                    nNodeStack.push(nChild)

                    const parent = findParentElement(nNode)
                    if (parent !== 'portal') {
                        effectObj.replace.add(parent)
                    }
                }
            }
            // nChild가 index 기반
            else {
                const pChild = pNode.children[i]
                // 같은 index의 pChild 존재 && key가 없어야 한다.
                if (pChild?.key == null) {
                    pNodeChildSet.delete(pChild)
                    pNodeStack.push(pChild)
                    nNodeStack.push(nChild)
                }
                else {
                    pNodeStack.push(null)
                    nNodeStack.push(nChild)
                }
            }
        })

        pNodeChildSet.forEach(pChild => {
            // 선택받지 못한 자는 삭제될 준비를 (클린업, portal 등)
            const parent = findParentElement(nNode)
            if (parent !== 'portal') {
                effectObj.replace.add(parent)
            }

            pNodeStack.push(pChild)
            nNodeStack.push(null)
        })
    }
    // pNode 자식 없음
    else if (nNode?.children?.length > 0) {
        reverseForEach(nNode.children, nChild => {
            nChild.parent = nNode

            pNodeStack.push(null)
            nNodeStack.push(nChild)
            if (pNode != null) {
                const parent = findParentElement(nNode)
                if (parent !== 'portal') {
                    effectObj.replace.add(parent)
                }
            }
        })
    }
    // nNode 자식 없음
    else if (pNode?.children?.length > 0) {
        if (nNode != null && nNode.type in tagObj) {
            const parent = findParentElement(nNode)
            if (parent !== 'portal') {
                effectObj.replace.add(parent)
            }
        }

        pNode.children.forEach(pChild => {
            pNodeStack.push(pChild)
            nNodeStack.push(null)
        })
    }
    // 둘 다 자식 없음 ㅠㅠ
    else {

    }
}

function compareElements(pNode, nNode, pNodeStack, nNodeStack, effectObj) {

    // 키가 존재 -> 같은 키를 지님
    if (pNode.key != null && nNode.key != null) {
        // 재사용
        if (pNode.type === nNode.type) {
            nNode.stateNode = pNode.stateNode
            effectObj.update.add([pNode, nNode])
        }
        // 생성
        else {
            effectObj.mount.add(nNode)
            const parent = findParentElement(nNode.parent)
            if (parent !== 'portal') {
                effectObj.replace.add(parent)
            }
        }
    }
    // 하나 또는 둘이 index를 기반으로 같음
    else {
        if (pNode.type === nNode.type) {
            nNode.stateNode = pNode.stateNode
            effectObj.update.add([pNode, nNode])
        }
        else {
            effectObj.mount.add(nNode)
            const parent = findParentElement(nNode.parent)
            if (parent !== 'portal') {
                effectObj.replace.add(parent)
            }
        }
    }

    // 자식 처리
    diffChildren(pNode, nNode, pNodeStack, nNodeStack, effectObj)
}

function compareFuncs(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    if (pNode.key != null && nNode.key != null) {
        // 재사용
        if (pNode.component === nNode.component) {
            nNode.hook = pNode.hook
            executeModule(nNode)
            diffChildren(pNode, nNode, pNodeStack, nNodeStack, effectObj)
        }
        // 서로 다른 모듈
        else {
            effectObj.cleanup.add(pNode)
            effectObj.effect.add(nNode)
            executeModule(nNode)
            diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
            diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
        }
    }
    else {
        if (pNode.component === nNode.component) {
            nNode.hook = pNode.hook
            executeModule(nNode)
            diffChildren(pNode, nNode, pNodeStack, nNodeStack, effectObj)
        }
        else {
            effectObj.cleanup.add(pNode)
            executeModule(nNode)
            diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
            diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
        }
    }
}

function comparePortals(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    // 포탈은 무조건
    effectObj.portalUnmount.add(pNode)
    effectObj.portalMount.add(nNode)

    diffChildren(pNode, nNode, pNodeStack, nNodeStack, effectObj)
}

function compareElementFunc(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.effect.add(nNode)

    executeModule(nNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function compareElementPortal(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.portalMount.add(nNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function compareFuncElement(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.cleanup.add(pNode)

    // element 등록
    effectObj.mount.add(nNode)
    const parent = findParentElement(nNode.parent)
    if (parent !== 'portal') {
        effectObj.replace.add(parent)
    }

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function compareFuncPortal(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.cleanup.add(pNode)

    effectObj.portalMount.add(nNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function comparePortalElement(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.portalUnmount.add(pNode)

    // element 등록
    effectObj.mount.add(nNode)
    const parent = findParentElement(nNode.parent)
    if (parent !== 'portal') {
        effectObj.replace.add(parent)
    }

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function comparePortalFunc(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.portalUnmount.add(pNode)
    effectObj.effect.add(nNode)

    executeModule(nNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function onlyPrev(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    if (pNode.type in tagObj) {

    }
    else if (pNode.type === 'function') {
        effectObj.cleanup.add(pNode)
    }
    else if (pNode.type === 'portal') {
        effectObj.portalUnmount.add(pNode)
    }
    else if (pNode.type === 'memo') {

    }

    diffChildren(pNode, nNode, pNodeStack, nNodeStack, effectObj)
}

function onlyNext(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    if (nNode.type in tagObj) {
        effectObj.mount.add(nNode)
        const parent = findParentElement(nNode.parent)
        if (parent !== 'portal') {
            effectObj.replace.add(parent)
        }
    }
    else if (nNode.type === 'function') {
        effectObj.effect.add(nNode)
        executeModule(nNode)
    }
    else if (nNode.type === 'portal') {
        effectObj.portalMount.add(nNode)
    }
    else if (nNode.type === 'memo') {

    }

    diffChildren(pNode, nNode, pNodeStack, nNodeStack, effectObj)
}

function compareMemoElement(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.mount.add(nNode)
    const parent = findParentElement(nNode.parent)
    if (parent !== 'portal') {
        effectObj.replace.add(parent)
    }

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function compareMemoFunc(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.effect.add(nNode)
    executeModule(nNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function compareMemoPortal(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.portalMount.add(nNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function compareMemos(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    if (nNode.memo(pNode.children[0].props, nNode.children[0].props) === true) {
        nNode.children = pNode.children
        nNode.children.forEach(child => {
            child.parent = nNode
        })
        const parent = findParentElement(nNode.parent)
        if (parent !== 'portal') {
            effectObj.replace.add(parent)
        }

    }
    else {
        diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
        diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
    }
}

function compareElementMemo(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function compareFuncMemo(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.cleanup.add(pNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

function comparePortalMemo(pNode, nNode, pNodeStack, nNodeStack, effectObj) {
    effectObj.portalUnmount.add(pNode)

    diffChildren(null, nNode, pNodeStack, nNodeStack, effectObj)
    diffChildren(pNode, null, pNodeStack, nNodeStack, effectObj)
}

export {
    compareElements,
    compareFuncs,
    comparePortals,
    compareElementFunc,
    compareElementPortal,
    compareFuncElement,
    compareFuncPortal,
    comparePortalElement,
    comparePortalFunc,
    compareElementMemo,
    compareFuncMemo,
    comparePortalMemo,
    compareMemos,
    compareMemoPortal,
    compareMemoFunc,
    compareMemoElement,
    onlyPrev,
    onlyNext,
};


function findParentElement(node) {
    let parent = node
    while (!(parent.type in tagObj)) {
        if (parent.type === 'portal') {
            return 'portal'
        }
        parent = parent.parent
    }
    return parent
}