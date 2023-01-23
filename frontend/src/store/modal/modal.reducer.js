export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const UPDATE_MODAL_POS = 'UPDATE_MODAL_POS'
export const UPDATE_ELEMENT_SIZE = 'UPDATE_ELEMENT_SIZE'
export const UPDATE_CLICKED_POS = 'UPDATE_ELEMENT_SIZE'
export const UPDATE_MODAL_TYPE = 'UPDATE_MODAL_TYPE'

const initialState = {
    dynamicModalStatus: null,
    modalPos: { x: 0, y: 0 },
    clickedElemntSize: { width: 0, height: 0 },
    clickedPos: { width: 0, height: 0 },
    modalDetails: {}
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
        case UPDATE_MODAL_POS:
            newState = { ...state, modalPos: action.pos }
            break
        case UPDATE_ELEMENT_SIZE:
            newState = { ...state, clickedElemntSize: action.size }
            break
        case UPDATE_CLICKED_POS:
            newState = { ...state, clickedPos: action.clickedPos }
            break
        case UPDATE_MODAL_TYPE:
            newState = { ...state, modalDetails: action.element }
            break
        default:
    }

    return newState
}
