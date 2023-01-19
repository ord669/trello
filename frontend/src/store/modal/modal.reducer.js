export const SET_MOUSE_POS = 'SET_MOUSE_POS'
// export const REMOVE_GROUP = 'REMOVE_GROUP'
// export const ADD_GROUP = 'ADD_GROUP'
// export const UPDATE_GROUP = 'UPDATE_GROUP'
// export const UNDO_REMOVE_GROUP = 'UNDO_REMOVE_GROUP'

const initialState = {
    mousePos: null,
    // board: null,
    // lastRemovedGroup: null
}

export function modalReducer(state = initialState, action) {
    let newState = state
    // let groups
    // let lastRemovedGroup
    switch (action.type) {
        case SET_MOUSE_POS:
            newState = { ...state, mousePos: action.pos }
            break
        // case REMOVE_GROUP:
        //     lastRemovedGroup = state.board.groups.find(group => group._id === action.groupId)
        //     groups = state.board.groups.filter(group => group._id !== action.groupId)
        //     newState = { ...state, board: { ...state.board, groups }, lastRemovedGroup }
        //     break
        // case ADD_GROUP:
        //     board = { ...state.board, groups: [...state.board.groups, action.group] }
        //     newState = { ...state, board }
        //     break
        // case UPDATE_GROUP:
        //     groups = state.board.groups.map(group => (group._id === action.group._id) ? action.group : group)
        //     newState = { ...state, board: { ...state.board, groups } }
        //     break
        // case UNDO_REMOVE_GROUP:
        //     if (state.lastRemovedGroup) {
        //         board = { ...state.board, groups: [state.lastRemovedGroup, ...state.board.groups] }
        //         newState = { ...state, board, lastRemovedGroup: null }
        //     }
        //     break
        default:
    }
    return newState
}
