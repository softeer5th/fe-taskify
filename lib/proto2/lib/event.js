const onClickMap = new WeakMap();
const onOuterClickMap = new WeakMap();
const onDoubleClickMap = new WeakMap();
const onMouseOverMap = new WeakMap();
const onMouseOutMap = new WeakMap();
const onMouseMoveMap = new WeakMap();
const onMouseDownMap = new WeakMap();
const onMouseUpMap = new WeakMap();
const onInputMap = new WeakMap();
const onKeyDownMap = new WeakMap();
const onDragStartMap = new WeakMap();
const onDragEnterMap = new WeakMap();
const onDragEndMap = new WeakMap();
const onSelectStartMap = new WeakMap();

function eventHandler(e, eventMap) {
    let element = e.target
    // 버블링만
    while (element.id !== 'root') {
        const eventHandler = eventMap.get(element)
        if (typeof eventHandler === 'function') {
            const stopP = eventHandler({
                event: e,
                target: element,
            })
            if (stopP === true) {
                break
            }
        }
        element = element.parentNode
    }
}

const onMouseOverSet = new Set();
const onMouseOutSet = new Set();
function mouseOnOutHandler(e) {
    let element = e.target
    while (element.id !== 'root') {
        // 등록된 것 찾기
        const eventHandler = onMouseOverMap.get(element)
        if (typeof eventHandler === 'function' && !onMouseOverSet.has(element)) {
            eventHandler({
                event: e,
                target: element,
            })
        }

        onMouseOutSet.delete(element)
        element = element.parentNode
    }

    onMouseOverSet.clear()
    onMouseOutSet.forEach(element => {
        const eventHandler = onMouseOutMap.get(element)
        eventHandler({
            event: e,
            target: element,
        })
    })
    onMouseOutSet.clear()

    element = e.target
    while (element.id !== 'root') {
        let eventHandler = onMouseOverMap.get(element)
        if (typeof eventHandler === 'function') {
            onMouseOverSet.add(element)
        }
        eventHandler = onMouseOutMap.get(element)
        if (typeof eventHandler === 'function') {
            onMouseOutSet.add(element)
        }
        element = element.parentNode
    }
}


export {
    onClickMap,
    onOuterClickMap,
    onDoubleClickMap,
    onMouseOverMap,
    onMouseOutMap,
    onMouseMoveMap,
    onInputMap,
    onKeyDownMap,
    onDragStartMap,
    onDragEnterMap,
    onDragEndMap,
    onMouseDownMap,
    onMouseUpMap,
    onSelectStartMap,
    eventHandler,
    mouseOnOutHandler,
}