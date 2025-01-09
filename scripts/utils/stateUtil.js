const states = {}

export const setState = (key, value) => {
    states[key] = value
}

export const getState = (key) => {
    return states[key]
}
