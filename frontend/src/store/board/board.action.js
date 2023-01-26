import { boardService } from "../../services/board.service"
import { socketService, SOCKET_EMIT_GROUP_DRAGED, SOCKET_EMIT_TASK_DRAGED } from "../../services/socket.service"
import { taskService } from "../../services/task.service.local"
import { utilService } from "../../services/util.service"
import { store } from '../store'

import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UNDO_REMOVE_GROUP, UPDATE_GROUP } from "./board.reducer"

export async function loadBoard(boardId, filterBy) {
    try {
        const board = await boardService.getById(boardId)
        if (!board) throw new Error('Board not found')
        // const filterdBoard = boardService.filterGroupsTasks(board, filterBy)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function removeGroup(groupId) {
    store.dispatch({ type: REMOVE_GROUP, groupId })
    const { board } = store.getState().boardModule
    try {
        await boardService.removeGroup(board._id, groupId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_GROUP, })
        console.log('Err from removeGroup in board action :', err)
        throw err
    }
}

export async function saveGroup(group) {
    const type = (group._id) ? UPDATE_GROUP : ADD_GROUP
    const { board } = store.getState().boardModule
    try {
        // await boardService.saveGroup(board._id, group)
        // store.dispatch({ type, group })
        const savedGroup = await boardService.saveGroup(board._id, group)
        const newGroup = group._id ? group : savedGroup
        store.dispatch({ type, group: newGroup })
        return newGroup
    } catch (err) {
        console.log('Err from saveGroup in board action :', err)
        throw err
    }
}

export async function saveBoard(board) {
    try {
        const boardToSave = boardService.removeTasksFromBoard({ ...board })
        const savedBoard = await boardService.save(boardToSave)
        const newBoard = board._id ? board : savedBoard
        store.dispatch({ type: SET_BOARD, board: newBoard })
        return newBoard

        // store.dispatch({ type: SET_BOARD, board })
        // return board
        // store.dispatch({ type: SET_BOARD, board: newBoard })
        // return newBoard
    } catch (err) {
        console.log('Err from saveBoard in board action :', err)
        throw err
    }
}

export async function updateDrag({ source, destination, type }) {
    const { board } = store.getState().boardModule
    const update = type === 'TASK' ? taskService.reorderTasks : boardService.reorderGroups
    update(source, destination, board.groups)
    // const groupsToSave = update(source, destination, board.groups)
    // const groupsToSave = await update(source, destination, board.groups)
    const dragEv = type === 'TASK' ? SOCKET_EMIT_TASK_DRAGED : SOCKET_EMIT_GROUP_DRAGED

    saveBoard({ ...board })
    // saveBoard({ ...board, groups: groupsToSave })
}

// function _getTaskById(groupId, taskId) {
//     const { board: boardToUpdate } = store.getState().boardModule
//     const group = boardToUpdate.groups.find(group => group._id === groupId)
//     const task = group.tasks.find(task => task._id === taskId)
//     return task
// }

// function getGroupById(groupId,taskId){
//     const { board: boardToUpdate } = store.getState().boardModule
//     const group = boardToUpdate.groups.find(group => group._id === groupId)
//     const task = group.tasks.find(task => task._id === taskId)
//     return group
// }