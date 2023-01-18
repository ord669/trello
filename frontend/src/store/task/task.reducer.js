import { boardService } from "../../services/board.service.local"

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const UNDO_REMOVE_TASK = 'UNDO_REMOVE_TASK'

// const initialState = {
//     lastRemovedTask: null
// }

// export function taskReducer(state = initialState, action) {
//     let newState = state
//     let board
//     let groups
//     let tasks
//     let lastRemovedGroup
//     switch (action.type) {
//         case REMOVE_TASK:
//             lastRemovedGroup = state.board.groups.find(group => group.id === action.groupId)
//             groups = state.board.groups.filter(group => group.id !== action.groupId)
//             newState = { ...state, board: { ...state.board, groups }, lastRemovedGroup }
//             break
//         case ADD_TASK:
//             board = { ...state.board, groups: [...state.board.groups, action.group] }
//             newState = { ...state, board }
//             break
//         case UPDATE_TASK:
//             groups = state.board.groups.map(group => (group.id === action.group.id) ? action.group : group)
//             newState = { ...state, board: { ...state.board, groups } }
//             break
//         case UNDO_REMOVE_TASK:
//             if (state.lastRemovedGroup) {
//                 board = { ...state.board, groups: [state.lastRemovedGroup, ...state.board.groups] }
//                 newState = { ...state, board, lastRemovedGroup: null }
//             }
//             break
//         default:
//     }
//     return newState
// }
