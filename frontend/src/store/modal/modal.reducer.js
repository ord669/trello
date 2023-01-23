export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const UPDATE_POS = 'UPDATE_POS'
export const UPDATE_ELEMENT_SIZE = 'UPDATE_ELEMENT_SIZE'

const initialState = {
    dynamicModalStatus: null,
    pos: { x: 0, y: 0 },
    clickedElemntSize: { width: 0, height: 0 }
}

export function modalReducer(state = initialState, action) {
    let newState = state

    switch (action.type) {
        case OPEN_MODAL:
            newState = { ...state, dynamicModalStatus: action.status }
            break
        case CLOSE_MODAL:
            newState = { ...state, dynamicModalStatus: action.status }
            break
        case UPDATE_POS:
            newState = { ...state, pos: action.pos }
            break
        case UPDATE_ELEMENT_SIZE:
            newState = { ...state, clickedElemntSize: action.size }
            break
        default:
    }

    return newState
}
