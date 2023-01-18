// import { boardService } from "../../services/board.service.local"
import { groupService } from "../../services/group.service.local"
import { store } from '../store'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { REMOVE_TASK, ADD_TASK, UPDATE_TASK, UNDO_REMOVE_TASK } from "./task.reducer"

// Action Creators:
export function getActionRemoveGroup(groupId) {
    return {
        type: REMOVE_TASK,
        groupId
    }
}
// export function getActionAddGroup(group) {
//     return {
//         type: ADD_GROUP,
//         group
//     }
// }
// export function getActionUpdateGroup(group) {
//     return {
//         type: UPDATE_GROUP,
//         group
//     }
// }

// export async function loadTask(boardId) {
//     try {
//         const board = await boardService.getById(boardId)
//         console.log('board from DB:', board)
//         store.dispatch({
//             type: SET_BOARD,
//             board
//         })

//     } catch (err) {
//         console.log('Cannot load board', err)
//         throw err
//     }

// }
export async function saveTask(groupId, task) {
    try {
        const type = (task._id) ? UPDATE_TASK : ADD_TASK
        const { board } = store.getState().boardModule
        const savedTask = await groupService.saveTask(board._id, groupId, task)
        store.dispatch({ type, task: savedTask })
        return savedTask
    } catch (err) {
        console.error('Cannot save group:', err)
        throw err
    }
}

export async function removeTask(taskId) {
    store.dispatch(getActionRemoveGroup(taskId))
    try {
        const { board } = store.getState().boardModule
        await groupService.remove(board._id, taskId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_TASK, })
        console.log('Cannot remove group', err)
        throw err
    }
}




