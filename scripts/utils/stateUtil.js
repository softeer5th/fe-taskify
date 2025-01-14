// map 으로 구현 변경하여 성능 최적화?

const states = {}

export const setState = (key, value) => {
    states[key] = value
}

export const getState = (key) => {
    return states[key]
}
