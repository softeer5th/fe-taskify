let currentNode = null

const Mount = 0b1
const Update = 0b10
const Placement = 0b100


const div = 'div'
const span = 'span'
const text = 'text'
const h1 = 'h1'
export {div, span, text, h1}

/*
함수 컴포넌트의 부모는 함수 컴포넌트 또는 dom element
함수 컴포넌트의 자식은 무조건 1개 (함수 컴포넌트 또는 dom element)

함수 컴포넌트를 실행하기 전에 상위 dom element를 같이 넘기기
실행한 함수의 자식이 dom element이면
 */

// 해당 키가 더이상 참조되지 않으면 사라짐
const onClickMap = new WeakMap();

function createRoot(root) {
    const node = component('root', {})
    node.stateNode = root
    root.addEventListener('click', (e) => {
        let element = e.target
        // 버블링만
        while (element.id !== 'root') {
            const eventHandler = onClickMap.get(element)
            if (typeof eventHandler === 'function') {
                eventHandler({
                    event: e,
                    target: element,
                })
            }
            element = element.parentNode
        }
    })
    return {node, render}
}

function render(appNode) {
    const stack = [appNode]
    appNode.parent = this.node

    while (stack.length > 0) {
        const node = stack.pop()
        const parentNode = node.parent // 상위 DOM


        if (typeof node.type === 'function') {
            // 함수의 parent에는 상위 DOM
            currentNode = node // function의 useState 같은게 node를 참조할 수 있게
            const childNode = node.type(node.props) // 함수는 자식이 1개임
            node.children = [childNode]
            childNode.parent = parentNode // 상위 DOM 계승
            childNode.key = node.key // key 도 계승
            stack.push(childNode)
        }
        else {
            // 현재 element 처리
            const domElement = createElement(node)
            parentNode.stateNode.appendChild(domElement)
            node.stateNode = domElement

            // 역으로 해서 자식이 순서대로 탐색이 되어서 순서에 맞게 dom 자식이 형성되게
            for (let i = node.children.length - 1; i >= 0; i--) {
                // TextNode
                if (typeof node.children[i] === 'string') {
                    node.children[i] = component(text, {text: node.children[i]})
                }

                const childNode = node.children[i]
                childNode.parent = node // 상위 DOM 전달 시작
                stack.push(childNode)
            }

        }
    }

}
export {render, createRoot}

function setElementProps(node, element) {
    Object.keys(node.props).forEach(key => {
        const value = node.props[key];

        switch (key) {
            case 'text':
                element.textContent = value;
                break

            case 'className':
                element.className = value;
                break;

            case 'style':
                if (typeof value === 'object') {
                    Object.keys(value).forEach(styleKey => {
                        element.style[styleKey] = value[styleKey];
                    });
                }
                break;

            // Mouse events
            case 'onClick':
                onClickMap.set(element, value)
                //element.addEventListener('click', value);
                break;
            case 'onDoubleClick':
                //element.addEventListener('dblclick', value);
                break;
            case 'onMouseDown':
                //element.addEventListener('mousedown', value);
                break;
            case 'onMouseUp':
                //element.addEventListener('mouseup', value);
                break;
            case 'onMouseEnter':
                //element.addEventListener('mouseenter', value);
                break;
            case 'onMouseLeave':
                //element.addEventListener('mouseleave', value);
                break;
            case 'onMouseMove':
                //element.addEventListener('mousemove', value);
                break;

            // Keyboard events
            case 'onKeyDown':
                //element.addEventListener('keydown', value);
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
                //element.addEventListener('input', value);
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
                //element.addEventListener('dragstart', value);
                break;
            case 'onDragEnd':
                //element.addEventListener('dragend', value);
                break;
            case 'onDragOver':
                //element.addEventListener('dragover', value);
                break;
            case 'onDragEnter':
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
        }
    });
}

function createElement(node) {
    if (node.type === text) {
        return document.createTextNode(node.text)
    }


    const element = document.createElement(node.type);

    setElementProps(node, element);

    return element;
}


function createKeyIndexMap(children) {
    const keyIndexMap = {};
    children.forEach((child, index) => {
        if (child.key !== undefined) {
            keyIndexMap[child.key] = index;
        }
    });
    return keyIndexMap;
}

/**
 *
 * @param type
 * @param props 예약: key, memo, children, .....
 * @returns {*&{type}}
 */
function component(type, props) {
    if (typeof type === 'function') {
        return {
            type,
            props: {
                ...props,
                key: null, // 예약된거 지우기
                memo: null
            },
            // 예약
            key: props.key,
            memo: props.memo,

            parent: null, // 부모 중 dom 인 것
            children: null,
            useHook: {
                current: null,
                next: null
            }
        }
    }
    else {
        return {
            type,
            props: {
                ...props,
                key: null,
                children: null,
            },
            key: props.key,
            childrenKeyMap: props.children === undefined ? {} : createKeyIndexMap(props.children),
            parent: null,
            children: props.children === undefined ? [] : props.children,
            text: props.text,
            stateNode: null,
            flags: 0
        }
    }
}
export {component};

// 모듈이 동일하면
function checkModule(node1, node2) {
    if (typeof node2.type === 'function') {
        // 동일 모듈
        return node1.type === node2.type;
    }
    else {
        return typeof node1.type !== 'function';

    }
}

function executeModule(node) {
    currentNode = node
    node.useHook.current = node.useHook.next
    node.children = [node.type(node.props)]
    node.children[0].parent = node.parent
    node.children[0].key = node.key
}

function reverseForEach(array, callbackfn) {
    for (let i = array.length - 1; i >= 0; i--) {
        callbackfn(array[i], i);
    }
}

function findChildIndexByKey(node, key) {
    return node.childrenKeyMap[key]
}

// commit 넘기는거 밑에 다 처리하기
function compareFuncs(prevNode, nextNode) {
    const [_, prevNodes, nextNodes] = this

    // 같은 함수 여부. type
    if (prevNode.type === nextNode.type) {
        // 상태값 계승
        nextNode.useHook = prevNode.useHook;

        // React.memo 여부
        if (start === false && typeof nextNode.memo === 'function' && nextNode.memo(prevNode.props, nextNode.props) === true) {
            // return 값 재활용
            nextNode.children = prevNode.children;
        }
        else {
            executeModule(nextNode)
            prevNodes.push(prevNode.children[0])
            nextNodes.push(nextNode.children[0])
        }
    }
    else {
        executeModule(nextNode)
        prevNodes.push(null)
        nextNodes.push(nextNode.children[0])
    }
    start = true
}

function compareFunctionAndElement(prevNode, nextNode) {
    const [effectQueue, prevNodes, nextNodes] = this

    if (typeof nextNode.type === 'function') {
        executeModule(nextNode)
        prevNodes.push(null)
        nextNodes.push(nextNode.children[0])
    }
    else {
        nextNode.stateNode = createElement(nextNode)

        nextNode.flags |= Mount
        nextNode.parent.flags |= Placement

        effectQueue.add(nextNode)
        effectQueue.add(nextNode.parent)


        reverseForEach(nextNode.children, (nChild, index) => {
            // TextNode 변환
            if (typeof nextNode.children[index] === 'string') {
                nextNode.children[index] = component(text, {text: nextNode.children[index]})
            }

            nextNode.children[index].parent = nextNode
            nChild = nextNode.children[index]

            prevNodes.push(null)
            nextNodes.push(nChild)

        })
    }
}



function compareDOMElements(prevNode, nextNode) {
    const [effectQueue, prevNodes, nextNodes] = this

    if (prevNode.type === nextNode.type) {
        nextNode.stateNode = prevNode.stateNode
        if (!shallowEqualObj(prevNode.props, nextNode.props)) {
            nextNode.flags |= Update
            effectQueue.add(nextNode)
        }
    }
    else {
        nextNode.stateNode = createElement(nextNode)

        nextNode.flags |= Mount
        nextNode.parent.flags = Placement

        effectQueue.add(nextNode)
        effectQueue.add(nextNode.parent)
    }

    reverseForEach(nextNode.children, (nChild, index) => {
        // TextNode 변환
        if (typeof nextNode.children[index] === 'string') {
            nextNode.children[index] = component(text, {text: nextNode.children[index]})
        }

        nextNode.children[index].parent = nextNode
        nChild = nextNode.children[index]

        let equalChildCount = 0

        if (nChild.key >= 0) {
            const pIndex = findChildIndexByKey(prevNode, nChild.key);
            if (pIndex >= 0) {
                const pChild = prevNode.children[pIndex];
                prevNodes.push(pChild)
                nextNodes.push(nChild)

                if (pIndex !== index) {
                    nextNode.flags |= Placement
                    effectQueue.add(nextNode)
                }
                else {
                    equalChildCount++
                }
            }
            else {
                prevNodes.push(null)
                nextNodes.push(nChild)
            }
        }
        else {
            if (prevNode.children[index]?.key >= 0) {
                prevNodes.push(null)
            }
            else {
                const pChild = prevNode.children[index]
                prevNodes.push(pChild)
                equalChildCount++
            }
            nextNodes.push(nChild)
        }

        if (prevNode.children.length !== equalChildCount) {
            nextNode.flags |= Placement
            effectQueue.add(nextNode)
        }

    })
}

function onlyMount(prevNode, nextNode) {
    const [effectQueue, prevNodes, nextNodes] = this

    if (typeof nextNode.type === 'function') {
        executeModule(nextNode)
        prevNodes.push(null)
        nextNodes.push(nextNode.children[0])
    }
    else {
        nextNode.stateNode = createElement(nextNode)

        nextNode.flags |= Mount
        nextNode.parent.flags |= Placement
        effectQueue.add(nextNode)
        effectQueue.add(nextNode.parent)


        reverseForEach(nextNode.children, (nChild, index) => {
            // TextNode 변환
            if (typeof nextNode.children[i] === 'string') {
                nextNode.children[i] = component(text, {text: nextNode.children[i]})
            }
            nChild = nextNode.children[i]
            prevNodes.push(null)
            nextNodes.push(nChild)

        })
    }
}

function replaceChildren(node) {
    const children = []
    node.children.forEach(child => {
        while (typeof child.type === 'function') {
            child = child.children[0]
        }
        children.push(child.stateNode)
    })
    node.stateNode.replaceChildren(...children)
}

let start = true
function setState(newValue) {
    const commonRoot = this.node // state 호출된 컴포넌트(function)
    this.state.value = newValue // 상태값 업데이트

    // 계층 구조에 맞추면 들어가지는 배열 (key로 계층 구조 바꿀 수 도)
    const prevNodes = [commonRoot]
    const nextNodes = [{...commonRoot, children: []}]

    const effectQueue = new Set()

    start = true
    while (nextNodes.length > 0) {
        const prevNode = prevNodes.pop()
        const nextNode = nextNodes.pop()

        // 둘 다 함수
        if (typeof prevNode.type === 'function' && typeof nextNode.type === 'function') {
            compareFuncs.call([effectQueue, prevNodes, nextNodes], prevNode, nextNode);
            start = false
        }
        // 함수, dom element / 또는 그 반대
        else if ((typeof prevNode.type === 'function' && typeof nextNode.type === 'string') || (typeof prevNode.type === 'string' && typeof nextNode.type === 'function')) {
            compareFunctionAndElement.call([effectQueue, prevNodes, nextNodes], prevNode, nextNode)
        }
        // 둘 다 dem element
        else if (typeof prevNode.type === 'string' && typeof nextNode.type === 'string') {
            compareDOMElements.call([effectQueue, prevNodes, nextNodes], prevNode, nextNode)
        }
        // prevNode가 없고, nextNode가 존재하는 경우
        else if (typeof nextNode.type === 'function' || typeof nextNode.type === 'string') {
            onlyMount.call([effectQueue, prevNodes, nextNodes], null, nextNode)
        }
    }

    effectQueue.forEach(effectNode => {
        if ((effectNode.flags & Update) === Update) {
            setElementProps(effectNode, effectNode.stateNode)
        }
        if ((effectNode.flags & Mount) === Mount) {
            replaceChildren(effectNode)
        }
        if ((effectNode.flags & Placement) === Placement) {
            replaceChildren(effectNode)
        }
        effectNode.flags = 0
    })
}

/*
function setState2(newValue) {
    const prevVDOMRoot = this.node
    const state = this.state

    state.value = newValue;

    const effectList = new Set()
    const newVDOMRoot = {
        ...prevVDOMRoot,
        children: [],
    }
    const stack = []

    // while 문에는 React.memo를 고려해야해서, 시작부분만 따로 작성
    // 실행
    const childNode = executeModule(newVDOMRoot)

    // 자식의 함수가 동일하면, key는 이미 같음. 상속 받아서
    // 모듈 check
    if (checkModule(prevVDOMRoot.children[0], newVDOMRoot.children[0])) {
        stack.push([prevVDOMRoot.children[0], newVDOMRoot.children[0]])
    }
    else {
        stack.push([null, newVDOMRoot.children[0]])
    }


    while (stack.length > 0) {
        // ********* 중요 *************
        // prevNode, node가 둘 다 존재하면, 그것은 같은 모듈 내에 존재하는 노드라는 것
        const [prevNode, node] = stack.pop()
        // 컴포넌트는 독립적인 개체
        // 모듈과 같다는 것을 인지
        // 전체 계층구조를 기반으로 모듈을 식별, 모듈 호출 계층이 달라지면 다른 모듈로 인식
        if (typeof node.type === 'function') {
            // 비교할 노드가 없음 => 새로 마운트된 노드
            // 현재 node는 새로운 모듈의 내용물이라는 것
            if (prevNode === null) {
                const childNode = executeModule(node)
                stack.push([prevNode, childNode])
            }
            else {
                node.useHook = prevNode.useHook
                // React.memo가 등록된 컴포넌트 (이전, 지금 모두 등록되어있어야함)
                if (typeof node.memo === 'function' && typeof prevNode.memo === 'function') {
                    const needExecuted = node.memo(prevNode.props, node.props)
                    // memo 사용
                    if (needExecuted === true) {
                        // return 재활용
                        node.children = prevNode.children
                    }
                    else {
                        const prevChildNode = prevNode.children[0]
                        const childNode = executeModule(node)
                        // 같은 모듈 또는 같은 모듈 내
                        if (checkModule(prevChildNode, childNode)) {
                            stack.push([prevChildNode, childNode])
                        }
                        else {
                            stack.push([null, childNode])
                        }
                    }
                }
                // memo false와 같음. 함수 실행
                else {
                    const prevChildNode = prevNode.children[0]
                    const childNode = executeModule(node)
                    // 같은 모듈 또는 같은 모듈 내
                    if (checkModule(prevChildNode, childNode)) {
                        stack.push([prevChildNode, childNode])
                    }
                    else {
                        stack.push([null, childNode])
                    }
                }
            }
        }
        else {
            // 같은 모듈 내에서는
            // 계층만 동일하게 내려가지, 부모는 동일하지 않다.
            // 이전 노드와 현재 노드의 parent가 다를 수 있다는 얘기.
            // 하지만 자식 노드는 재활용함
            if (prevNode === null) {
                // 자식 입장(현재 node)
                node.flags |= Mount
                node.stateNode = createElement(node)
                effectList.add(node)

                // 부모의 입장으로 로직을 짠다.
                // 이거는 모두 다 mount
                // 이유는 부모가 새로 mount 되었기에
                for (let i = node.children.length - 1; i >= 0; i--) {
                    // TextNode 변환
                    if (typeof node.children[i] === 'string') {
                        node.children[i] = component(text, {text: node.children[i]})
                    }

                    const childNode = node.children[i]
                    childNode.parent = node

                    stack.push([null, childNode])
                    node.flags |= Placement
                    effectList.add(node)
                }
            }
            else {
                // 자식 입장(현재 node)
                // 동일 ex) div === div
                if (prevNode.type === node.type) {
                    node.flags |= Update
                    // dom element 재사용
                    node.stateNode = prevNode.stateNode
                    effectList.add(node)
                }
                else {
                    // Mount 는 자식 무조건 다시 등록해야함
                    node.flags |= Mount
                    node.stateNode = createElement(node)
                    effectList.add(node)
                    node.parent.flags |= Placement
                    effectList.add(node.parent)
                }


                // 부모의 입장으로 로직을 짠다.
                //
                let equalKeysCount = 0

                // 자식이 존재하면
                if (node.children !== undefined) {
                    // appendChild에 맞춰서 하기
                    for (let i = node.children.length - 1; i >= 0; i--) {
                        // TextNode 변환
                        if (typeof node.children[i] === 'string') {
                            node.children[i] = component(text, {text: node.children[i]})
                        }

                        const childNode = node.children[i]
                        childNode.parent = node

                        // key 가 있는 경우
                        if (childNode.key) {
                            // 이전 노드의 자식들 키맵 확인
                            const keyIndex = prevNode.childrenKeyMap[childNode.key]
                            if (keyIndex >= 0) {
                                const prevChildNode = prevNode.children[keyIndex]
                                if (checkModule(prevChildNode, childNode)) {
                                    stack.push([prevChildNode, childNode])
                                }
                                else {
                                    stack.push([null, childNode])
                                }
                                // 계층이 같으면
                                if (keyIndex === i) {
                                    equalKeysCount++
                                }
                            }
                            else {
                                stack.push([null, childNode])
                            }

                        }
                        else {
                            const prevChildNode = prevNode.children[i]
                            // 이전과 현재 모두 key가 없으면
                            if (!prevChildNode.key) {

                                if (checkModule(prevChildNode, childNode)) {
                                    stack.push([prevChildNode, childNode])
                                }
                                else {
                                    stack.push([null, childNode])
                                }
                            }
                            else {
                                stack.push([null, childNode])
                            }
                        }
                    }
                }
                else {
                    // 자식이 없으면... 할게 없지
                }

                if (prevNode.children.length !== equalKeysCount) {
                    // 부모는 자식 재배치
                    node.flags |= Placement
                    effectList.add(node)
                }
            }
        }

    }

    // CommitPhase
    // Mount -> replaceChildren(),
    // 이거 고쳐야한다. 플래그 삭제로
    effectList.forEach(node => {
        if ((node.flags & Mount) === Mount) {

        }
        if ((node.flags & Update) === Update) {
            setElementProps(node, node.stateNode)
        }
        if ((node.flags & Placement) === Placement || (node.flags & Mount) === Mount) {
            const children = []
            node.children.forEach(child => {
                let t = child
                while (typeof t.type === 'function') {
                    t = t.children[0]
                }
                children.push(t.stateNode)
            })
            node.stateNode.replaceChildren(...children)
        }
        node.flags = 0
    })

    prevVDOMRoot.parent.stateNode.replaceChild(prevVDOMRoot.children[0].stateNode, newVDOMRoot.children[0].stateNode)
}

 */


function useState(initialValue) {
    const node = currentNode

    // 가져올 useHook이 없다 -> 처음 실행되는 것 (새 node)
    if (node.useHook.next === null || node.useHook.current === null) {
        const state = {
            value: initialValue,
            setState: null
        }

        // 함수의 처음 useHook 라인이면 -> ㅇㅇ 이렇게 한다. 글로 적기 힘드네
        // 시작지점을 저장해둬야함. 링크드 리스트의 시작지점
        if (node.useHook.next === null) {
            node.useHook.current = node.useHook.next = state;
        }
        else {
            // 할당 순서만 지킨다면 코드 1줄로 될 것 같지만, 쫄려서 못하겠다.
            node.useHook.current = state;
        }
        state.setState = setState.bind({node, state})
        return [initialValue, state.setState]
    }
    else {
        const state = node.useHook.current
        node.useHook.current = state.next

        return [state.value, state.setState]
    }
}
export {useState}


function shallowEqualObj(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // 키의 개수가 다르면 다름
    if (keys1.length !== keys2.length) return false;

    // 키와 값 비교
    for (const key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true; // 모든 키와 값이 같음
}

/*
지켜야하는 것
함수 컴포넌트는 무조건 1개의 component()를 return 해야한다. 0개도 안됨. 배열 형식도 아님
key는 무조건 전부 지정을 해줘야한다. 무조건.
children은 생략해도됨.
 */




