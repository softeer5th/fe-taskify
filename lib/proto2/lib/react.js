import * as tagObj from './react-dom-element.js'
import {
    compareElementFunc,
    compareElementMemo,
    compareElementPortal,
    compareElements,
    compareFuncElement,
    compareFuncMemo,
    compareFuncPortal,
    compareFuncs,
    compareMemoElement,
    compareMemoFunc,
    compareMemoPortal,
    compareMemos,
    comparePortalElement,
    comparePortalFunc,
    comparePortalMemo,
    comparePortals,
    onlyNext,
    onlyPrev
} from "./compareNode.js";
import {
    eventHandler,
    mouseOnOutHandler,
    onClickMap,
    onDoubleClickMap, onDragEndMap, onDragEnterMap, onDragStartMap,
    onInputMap,
    onKeyDownMap, onMouseDownMap,
    onMouseMoveMap,
    onMouseOutMap,
    onMouseOverMap, onMouseUpMap,
    onOuterClickMap, onSelectStartMap,
} from "./event.js";

let currentNode = null
function executeModule(node) {
    currentNode = node
    node.hookIndex = 0

    node.children = [node.component(node.props)]

    node.children[0].parent = node
    node.children[0].key = node.key
}
export {executeModule}

/*
{
    type: 'element' | 'function' | 'portal',
	component: () => null, // 함수
	stateNode: div | null, // <div>
	props: {
		children: []
	},
	key: null,
	ref: null,
	memo: null,
	parent: null,
	children: [],
	hook: [],
}
 */
function createComponent(type, props) {
    const hNode = {
        type: '',
        component: null,
        stateNode: null,
        props: {
            children: []
        },
        key: null,
        ref: null,
        memo: null,
        parent: null,
        children: [],
        hook: [],
        hookIndex: 0,
        text: '',
        portal: null,
    }

    if (type === 'root') {
        hNode.type = type
    }
    else if (type in tagObj) {
        hNode.type = type
        if (type === 'text' && props.text != null) {
            hNode.text = props.text
        }
    }
    else if (typeof type === 'function') {
        hNode.type = 'function'
        hNode.component = type
    }
    else if (type === 'portal') {
        hNode.type = type
        //hNode.parent = hNode
        hNode.portal = props.element
    }
    else if (type === 'memo') {
        hNode.type = type
        hNode.memo = props.memo
    }
    else {
        // error
    }

    if (props?.children?.length > 0 && typeof type !== 'function') {
        props.children.forEach(v => {
            if (typeof v === 'string') {
                hNode.children.push(createComponent(tagObj.text, {text: v}))
            }
            else if (v != null) {
                hNode.children.push(v)
            }
        })
    }

    if (props.key != null) {
        hNode.key = props.key
        delete props.key
    }

    if (props.ref != null) {
        hNode.ref = props.ref
        delete props.ref
    }

    if (props.memo != null) {
        hNode.memo = props.memo
        delete props.memo
    }

    hNode.props = props

    return hNode
}

function createPortal(node, element) {
    return createComponent('portal', {element, children: [node]})
}

function createMemo(node, memo) {
    return createComponent('memo', {memo, children: [node]})
}

export const useEffectStack = []
function renderPhase(pRootNode, nRootNode) {
    const pNodeStack = [pRootNode]
    const nNodeStack = [nRootNode]
    const effectObj = {
        mount: new Set(), // element 생성
        update: new Set(), // element 속성 변경
        cleanup: new Set(), // cleanup 실행
        effect: new Set(), // useEffect 실행 - 마운트 할 때
        portalUnmount: new Set(), // portal 해제 목록
        portalMount: new Set(), // portal 등록 목록
        replace: new Set() // 부모가 자식 재정렬
    }

    while (pNodeStack.length > 0 || nNodeStack.length > 0) {
        const [pNode, nNode] = [pNodeStack.pop(), nNodeStack.pop()]
        if (pNode != null && nNode != null) {
            if (pNode.type in tagObj) {
                if (nNode.type in tagObj) {
                    compareElements(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'function') {
                    compareElementFunc(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'portal') {
                    compareElementPortal(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'memo') {
                    compareElementMemo(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
            }
            else if (pNode.type === 'function') {
                if (nNode.type in tagObj) {
                    compareFuncElement(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'function') {
                    compareFuncs(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'portal') {
                    compareFuncPortal(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'memo') {
                    compareFuncMemo(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
            }
            else if (pNode.type === 'portal') {
                if (nNode.type in tagObj) {
                    comparePortalElement(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'function') {
                    comparePortalFunc(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'portal') {
                    comparePortals(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'memo') {
                    comparePortalMemo(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
            }
            else if (pNode.type === 'memo') {
                if (nNode.type in tagObj) {
                    compareMemoElement(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'function') {
                    compareMemoFunc(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'portal') {
                    compareMemoPortal(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
                else if (nNode.type === 'memo') {
                    compareMemos(pNode, nNode, pNodeStack, nNodeStack, effectObj)
                }
            }

        }
        else {
            if (pNode == null && nNode != null) {
                onlyNext(pNode, nNode, pNodeStack, nNodeStack, effectObj)
            }
            else if (pNode != null && nNode == null) {
                onlyPrev(pNode, nNode, pNodeStack, nNodeStack, effectObj)
            }
        }
    }

    return effectObj
}

function removeElementAttribute(pNode, nNode) {
    const element = nNode.stateNode;
    Object.keys(pNode.props).forEach(prop => {
        if (!(prop in nNode.props)) {
            switch (prop) {
                case 'style':
                    if (typeof pNode.props.style === 'object') {
                        Object.keys(pNode.props.style).forEach(styleKey => {
                            element.style[styleKey] = '';
                        });
                    }
                    break;
                case 'text':
                    element.textContent = '';
                    break;
                case 'className':
                    element.className = '';
                    break;
                case 'contentEditable':
                    element.contentEditable = 'false';
                    break;
                case 'draggable':
                    element.removeAttribute('draggable');
                    break;
                case 'width':
                    element.removeAttribute('width');
                    break;
                case 'height':
                    element.removeAttribute('height');
                    break;
                case 'viewBox':
                    element.removeAttribute('viewBox');
                    break;
                case 'fill':
                    element.removeAttribute('fill');
                    break;
                case 'xmlns':
                    element.removeAttribute('xmlns');
                    break;
                case 'd':
                    element.removeAttribute('d');
                    break;
                case 'stroke':
                    element.removeAttribute('stroke');
                    break;
                case 'strokeWidth':
                    element.removeAttribute('stroke-width');
                    break;
                case 'strokeLinecap':
                    element.removeAttribute('stroke-linecap');
                    break;
                case 'strokeLinejoin':
                    element.removeAttribute('stroke-linejoin');
                    break;

                // Mouse events
                case 'onClick':
                    onClickMap.delete(element);
                    break;
                case 'onOuterClick':
                    onOuterClickMap.delete(element);
                    break;
                case 'onDoubleClick':
                    onDoubleClickMap.delete(element);
                    break;
                case 'onMouseDown':
                    onMouseDownMap.delete(element);
                    break;
                case 'onMouseUp':
                    onMouseUpMap.delete(element);
                    break;
                case 'onMouseOver':
                    onMouseOverMap.delete(element);
                    break;
                case 'onMouseOut':
                    onMouseOutMap.delete(element);
                    break;
                case 'onMouseMove':
                    onMouseMoveMap.delete(element);
                    break;
                case 'onSelectStart':
                    onSelectStartMap.delete(element);
                    break

                // Keyboard events
                case 'onKeyDown':
                    onKeyDownMap.delete(element);
                    break;
                case 'onKeyUp':
                case 'onKeyPress':
                    break;

                // Focus events
                case 'onFocus':
                case 'onBlur':
                    break;

                // Form events
                case 'onChange':
                case 'onInput':
                    onInputMap.delete(element);
                    break;
                case 'onSubmit':
                    break;

                // Clipboard events
                case 'onCopy':
                case 'onCut':
                case 'onPaste':
                    break;

                // Drag events
                case 'onDragStart':
                    onDragStartMap.delete(element);
                    break;
                case 'onDragEnter':
                    onDragEnterMap.delete(element);
                    break
                case 'onDragEnd':
                    onDragEndMap.delete(element, value)
                    break
                case 'onDrag':
                case 'onDragOver':
                case 'onDragLeave':
                case 'onDrop':
                    break;

                // Scroll events
                case 'onScroll':
                    break;

                // Wheel events
                case 'onWheel':
                    break;

                case 'children':
                    break

                default:
                    element.removeAttribute(prop);
                    //console.warn(`Unknown attribute removed: ${prop}`);
            }
        }
    });
}

function setElementAttribute(node) {
    const element = node.stateNode


    Object.keys(node.props).forEach((key) => {
        const value = node.props[key]

        switch (key) {
            case 'style':
                if (typeof value === 'object') {
                    Object.keys(value).forEach(styleKey => {
                        element.style[styleKey] = value[styleKey];
                    });
                }
                break;
            case 'text':
                element.textContent = value;
                break
            case 'className':
                element.className = value;
                break;
            case 'contentEditable':
                element.contentEditable = value;
                break;
            case 'draggable':
                element.draggable = value === 'true' || value === true; // Boolean 속성 처리
                break;

            // SVG 속성 처리
            case 'width':
            case 'height':
            case 'viewBox':
            case 'fill':
            case 'stroke':
            case 'strokeWidth':
            case 'strokeLinecap':
            case 'strokeLinejoin':
            case 'xmlns':
            case 'd':
                element.setAttribute(key, value);
                break;

            // Mouse events
            case 'onClick':
                onClickMap.set(element, value)
                break;
            case 'onOuterClick':
                onOuterClickMap.set(element, value)
                break
            case 'onDoubleClick':
                onDoubleClickMap.set(element, value)
                break;
            case 'onMouseDown':
                onMouseDownMap.set(element, value)
                break;
            case 'onMouseUp':
                onMouseUpMap.set(element, value)
                break;
            case 'onMouseOver':
                onMouseOverMap.set(element, value)
                break;
            case 'onMouseOut':
                onMouseOutMap.set(element, value)
                break;
            case 'onMouseMove':
                onMouseMoveMap.set(element, value)
                break;

            case 'onSelectStart':
                onSelectStartMap.set(element, value);
                break

            // Keyboard events
            case 'onKeyDown':
                onKeyDownMap.set(element, value)
                break;
            case 'onKeyUp':
                //element.addEventListener('keyup', value);
                break;
            case 'onKeyPress':
                //element.addEventListener('keypress', value); // Deprecated, but added for compatibility
                break;

            // Focus events
            case 'onFocus':
                //element.addEventListener('focus', value);
                break;
            case 'onBlur':
                //element.addEventListener('blur', value);
                break;

            // Form events
            case 'onChange':
                //element.addEventListener('change', value);
                break;
            case 'onInput':
                onInputMap.set(element, value)
                break;
            case 'onSubmit':
                //element.addEventListener('submit', value);
                break;

            // Clipboard events
            case 'onCopy':
                //element.addEventListener('copy', value);
                break;
            case 'onCut':
                //element.addEventListener('cut', value);
                break;
            case 'onPaste':
                //element.addEventListener('paste', value);
                break;

            // Drag events
            case 'onDrag':
                //element.addEventListener('drag', value);
                break;
            case 'onDragStart':
                onDragStartMap.set(element, value)
                //element.addEventListener('dragstart', value);
                break;
            case 'onDragEnd':
                onDragEndMap.set(element, value)
                //element.addEventListener('dragend', value);
                break;
            case 'onDragOver':
                //element.addEventListener('dragover', value);
                break;
            case 'onDragEnter':
                onDragEnterMap.set(element, value)
                //element.addEventListener('dragenter', value);
                break;
            case 'onDragLeave':
                //element.addEventListener('dragleave', value);
                break;
            case 'onDrop':
                //element.addEventListener('drop', value);
                break;

            // Scroll events
            case 'onScroll':
                //element.addEventListener('scroll', value);
                break;

            // Wheel events
            case 'onWheel':
                //element.addEventListener('wheel', value);
                break;

            case 'children':
                break

            default:
                element.setAttribute(key, value);
                //console.warn(`Unknown attribute: ${key}`);
        }

    })
}

function executeCleanup(node) {
    node.hook.forEach(hook => {
        if (typeof hook.cleanup === 'function') {
            hook.cleanup()
        }
    })
}

function executeUpdate(pNode, nNode) {
    nNode.stateNode = pNode.stateNode;
    removeElementAttribute(pNode, nNode);
    setElementAttribute(nNode);
}

function executeMount(node) {
    let element

    // 이것들은 좀 다르게 만들어줘야한다고 함
    if (
        node.type === 'svg' ||
        node.type === 'path' ||
        node.type === 'circle' ||
        node.type === 'rect' ||
        node.type === 'line' ||
        node.type === 'polyline' ||
        node.type === 'polygon' ||
        node.type === 'ellipse' ||
        node.type === 'g' ||
        node.type === 'tspan' ||
        node.type === 'textPath' ||
        node.type === 'defs' ||
        node.type === 'clipPath' ||
        node.type === 'mask' ||
        node.type === 'filter' ||
        node.type === 'linearGradient' ||
        node.type === 'radialGradient' ||
        node.type === 'stop' ||
        node.type === 'symbol' ||
        node.type === 'use' ||
        node.type === 'animate' ||
        node.type === 'animateTransform' ||
        node.type === 'animateMotion'
    ) {
        element = document.createElementNS("http://www.w3.org/2000/svg", node.type);
    }
    else if (node.type === tagObj.text) {
        element = document.createTextNode(node.text);
    }
    else {
        element = document.createElement(node.type);
    }

    node.stateNode = element
    setUseRef(node)
    setElementAttribute(node)
}

function executeReplace(node) {
    // portal에 올 수 있음
    if (node.type in tagObj) {
        const children = []
        node.children.forEach(child => {
            while (!(child.type in tagObj)) {
                child = child.children[0]
            }

            children.push(child.stateNode)
        })

        node.stateNode?.replaceChildren(...children)
    }
    // portal 보고 오는 요청은 무시하기
    else {

    }
}

function executePortalUnmount(node) {
    let childNode = node.children[0]

    while (!(childNode.type in tagObj)) {
        childNode = childNode.children[0]
    }
    node.portal.removeChild(childNode.stateNode)
}

function executePortalMount(node) {
    let childNode = node.children[0]
    while (!(childNode.type in tagObj)) {
        childNode = childNode.children[0]
    }

    node.portal.appendChild(childNode.stateNode)
}

function executeEffect(node) {
    node.hook.forEach(hook => {
        if (typeof hook.effect === 'function') {
            hook.cleanup = hook.effect()
        }
    })
}

function commitPhase(effectObj) {
    effectObj.cleanup.forEach((node) => {
        executeCleanup(node)
    })

    effectObj.update.forEach(([pNode, nNode]) => {
        executeUpdate(pNode, nNode)
    })

    effectObj.mount.forEach((node) => {
        executeMount(node)
    })

    effectObj.replace.forEach((node) => {
        executeReplace(node)
    })

    effectObj.portalUnmount.forEach((node) => {
        executePortalUnmount(node)
    })

    effectObj.portalMount.forEach((node) => {
        executePortalMount(node)
    })

    effectObj.effect.forEach((node) => {
        executeEffect(node)
    })
}

function createRoot() {
    const node = createComponent('body', {})
    const root = document.body
    node.stateNode = root

    // click
    root.addEventListener('click', (e) => {
        eventHandler(e, onClickMap)
    })

    // mouseMove
    root.addEventListener('mousemove', (e) => {
        eventHandler(e, onMouseMoveMap)
        mouseOnOutHandler(e)
    })

    // mouseDown
    root.addEventListener('mousedown', (e) => {
        eventHandler(e, onMouseDownMap)
    })
    // mouseUp
    root.addEventListener('mouseup', (e) => {
        eventHandler(e, onMouseUpMap)
    })

    // mouseDoubleClick
    root.addEventListener('dblclick', (e) => {
        eventHandler(e, onDoubleClickMap)
    });

    // onInput
    root.addEventListener('input', (e) => {
        eventHandler(e, onInputMap)
    });

    // keyDown
    root.addEventListener('keydown', (e) => {
        eventHandler(e, onKeyDownMap)
    })

    // dragStart
    root.addEventListener('dragstart', (e) => {
        eventHandler(e, onDragStartMap)
    })

    // dragEnd
    root.addEventListener('dragend', (e) => {
        eventHandler(e, onDragEndMap)
    })

    // dragEnter
    root.addEventListener('dragenter', (e) => {
        eventHandler(e, onDragEnterMap)
    })

    // 텍스트 선택
    root.addEventListener('selectstart', (e) => {
        eventHandler(e, onSelectStartMap)
    });

    return {node, render}
}

function render(appNode) {
    appNode.parent = this.node
    this.node.children = [appNode]

    const effectObj = renderPhase(null, appNode)
    effectObj.replace.add(this.node)
    commitPhase(effectObj)
}
export {
    createRoot,
    render,
    createComponent,
    createPortal,
    createMemo
}

let setStateMap = new Map()
async function setState(newValue) {

    // 값이 같으면
    if (this.state.value === newValue) {
        return
    }

    // setState 배치 처리를 위한 callStack
    if (setStateMap.has(this.node)) {
        setStateMap.get(this.node).push({
            state: this.state,
            newValue: newValue
        })
    }
    else {
        setStateMap.set(this.node, [{
            state: this.state,
            newValue: newValue
        }])
    }

    // 작업 분리
    await Promise.resolve();

    // 여기서 부터는 전혀 다른 영역
    // 위의 동기 영역의 값을 가져다 쓰면 안된다.
    if (setStateMap.size === 0) {
        return
    }

    const setStateStack = []
    setStateMap.forEach((array, node) => {
        let parent = node.parent
        // 부모를 찾을 때 까지 || null이 아닐 때 까지
        while (!setStateMap.has(parent) && parent != null) {
            parent = parent.parent
        }

        // 상태 갱신
        array.forEach(({state, newValue}) => {
            state.value = newValue
        })

        // 부모를 못찾았다.
        if (parent == null) {
            setStateStack.push(node)
        }
        else {
        }
    })
    setStateMap.clear()

    const commitStack = []

    // 연속적인 렌더 작업
    setStateStack.forEach(node => {
        const pNodeRoot = node
        const nNodeRoot = {...node, children: []}
        const pIndex = pNodeRoot.parent.children.findIndex((child) => child === pNodeRoot)
        nNodeRoot.parent.children[pIndex] = nNodeRoot
        const effectObj = renderPhase(pNodeRoot, nNodeRoot)

        // 자식 element 찾기
        let pChild = pNodeRoot.children[0]
        while (!(pChild.type in tagObj)) {
            pChild = pChild.children[0]
        }
        let nChild = nNodeRoot.children[0]
        while (!(nChild.type in tagObj)) {
            nChild = nChild.children[0]
        }
        // 부모 element 찾기
        let parent = node.parent
        while (!(parent.type in tagObj)) {
            parent = parent.parent
        }
        commitStack.push([effectObj, parent, pChild, nChild])

    })
    setStateStack.length = 0

    // 커밋 작업
    commitStack.forEach(([effectObj, parent, pChild, nChild]) => {
        commitPhase(effectObj)
        parent.stateNode.replaceChild(pChild.stateNode, nChild.stateNode)

        // dom 렌더링 사이클 이후에 바로 실행
        requestAnimationFrame(() => {
            while (useEffectStack.length > 0) {
                const effect = useEffectStack.pop()

                if (typeof effect.cleanup === 'function') {
                    effect.cleanup()
                }

                if (typeof effect.effect === 'function') {
                    effect.cleanup = effect.effect()
                }
            }
        })
    })

    commitStack.length = 0
}

function useState(initialValue) {
    const node = currentNode
    let state = node.hook[node.hookIndex++]
    // 마운트
    if (state == null){
        state = {
            value: initialValue,
            obj: {node},
            setState: null,
        }
        state.obj.state = state
        state.setState = setState.bind(state.obj)
        node.hook.push(state)

        return [state.value, state.setState]
    }
    else {
        state.obj.node = node
        return [state.value, state.setState]
    }
}

function setUseRef(node) {
    if (node.ref) {
        node.ref.current = node.stateNode
    }
}

function useRef(initialValue = null) {
    const node = currentNode
    let state = node.hook[node.hookIndex++]

    // 마운트
    if (state == null){
        state = {
            ref: {current: initialValue},
        }
        node.hook.push(state)

        return state.ref
    }
    else {
        return state.ref
    }
}

function useEffect(effect, dependencies = []) {
    const node = currentNode
    let state = node.hook[node.hookIndex++]
    // 마운트
    if (state == null){
        state = {
            effect,
            dependencies,
            cleanup: null,
        }
        node.hook.push(state)
    }
    else {
        if (
            state.dependencies?.length > 0 && // 의존성 배열이 정의된 경우
            (
                state.dependencies.length !== dependencies.length || // 배열 길이가 다르거나
                !state.dependencies.every((value, index) => value === dependencies[index]) // 값이 다를 때
            )
        ) {
            state.effect = effect
            state.dependencies = dependencies
            useEffectStack.push(state); // 콜백 실행
        }
    }
}

export {useState, useRef, useEffect}


