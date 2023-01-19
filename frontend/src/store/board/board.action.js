import { boardService } from "../../services/board.service.local"
import { groupService } from "../../services/group.service.local"
import { taskService } from "../../services/task.service.local"
import { utilService } from "../../services/util.service"
import { store } from '../store'

import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UNDO_REMOVE_GROUP, UPDATE_GROUP } from "./board.reducer"

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        if (!board) throw new Error('Board not found')
        console.log('board from DB:', board)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {

        throw err
    }
}

export async function removeGroup(groupId) {
    store.dispatch({ type: REMOVE_GROUP, groupId })
    try {
        const { board } = store.getState().boardModule
        await groupService.remove(board._id, groupId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_GROUP, })
        console.log('Err from removeGroup in board action :', err)
        throw err
    }
}

export async function saveGroup(group) {
    try {
        const type = (group._id) ? UPDATE_GROUP : ADD_GROUP
        const { board } = store.getState().boardModule
        const savedGroup = await groupService.save(board._id, group)
        store.dispatch({ type, group: savedGroup })
        return savedGroup
    } catch (err) {
        console.log('Err from saveGroup in board action :', err)
        throw err
    }
}

export async function saveBoard(board) {
    try {
        const newBoard = await boardService.save(board)
        store.dispatch({
            type: SET_BOARD,
            board: newBoard
        })
    } catch (err) {
        console.log('Err from saveBoard in board action :', err)
        throw err
    }
}
// saveTask(task)
export async function saveTask(task) {
    console.log('task from action: ', task)

    try {
        const { board: boardToUpdate } = store.getState().boardModule
        let group = boardToUpdate.groups.find(group => group._id === task.groupId)
        if (task._id) {
            group.tasks = group.tasks.map(currTask => currTask._id !== task._id ? currTask : task)
        } else {
            task._id = utilService.makeId()
            group.tasks.push(task)
        }
        saveGroup(group)
    } catch (err) {
        console.log('Err from saveTask in board action :', err)
        throw err
    }
}
// export async function saveTask(groupId, title) {
//     const task = taskService.getEmptyTask(groupId, title)
//     const { board: boardToUpdate } = store.getState().boardModule
//     boardToUpdate.groups.find(group => group._id === groupId).tasks.push(task)
//     try {
//         const board = await boardService.save(boardToUpdate)
//         store.dispatch({ type: SET_BOARD, board })
//     } catch (err) {

//         throw err
//     }
// }

export async function removeTask(groupId, taskId) {
    try {
        const { board: boardToUpdate } = store.getState().boardModule
        const group = boardToUpdate.groups.find(group => group._id === groupId)
        group.tasks = group.tasks.filter(task => task._id !== taskId)
        saveGroup(group)
    } catch (err) {
        console.log('Err from removeTask in board action :', err)
        throw err
    }
}
