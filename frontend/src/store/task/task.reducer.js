
export const SET_TASK = 'SET_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const UNDO_REMOVE_TASK = 'UNDO_REMOVE_TASK'

const initialState = {
    currTask: null,

}

export function taskReducer(state = initialState, action) {

    let newState = state
    // let tasks
    // let lastRemovedGroup
    switch (action.type) {
        case SET_TASK:
            newState = { ...state, currTask: action.currTask }

            break
        // case REMOVE_TASK:
        //     lastRemovedGroup = state.board.tasks.find(task => task._id === action.taskId)
        //     tasks = state.board.tasks.filter(task => task._id !== action.taskId)
        //     newState = { ...state, board: { ...state.board, tasks }, lastRemovedGroup }
        //     break
        // case ADD_TASK:
        //     board = { ...state.board, tasks: [...state.board.tasks, action.task] }
        //     newState = { ...state, board }
        //     break
        // case UPDATE_TASK:
        //     tasks = state.board.tasks.map(task => (task._id === action.task._id) ? action.task : task)
        //     newState = { ...state, board: { ...state.board, tasks } }
        //     break
        // case UNDO_REMOVE_TASK:
        //     if (state.lastRemovedGroup) {
        //         board = { ...state.board, tasks: [state.lastRemovedGroup, ...state.board.tasks] }
        //         newState = { ...state, board, lastRemovedGroup: null }
        //     }
        //     break
        default:
            newState = { ...state }

    }
    return newState
}
