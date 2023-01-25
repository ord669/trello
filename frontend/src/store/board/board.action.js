import { boardService } from "../../services/board.service.local"
import { taskService } from "../../services/task.service.local"
import { utilService } from "../../services/util.service"
import { store } from '../store'

import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UNDO_REMOVE_GROUP, UPDATE_GROUP } from "./board.reducer"

export async function loadBoard(boardId, filterBy) {
    try {
        const board = await boardService.getById(boardId)
        if (!board) throw new Error('Board not found')
        const filterdBoard = boardService.filterGroupsTasks(board, filterBy)
        store.dispatch({ type: SET_BOARD, board: filterdBoard })
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
        const savedGroup = await boardService.saveGroup(board._id, group)
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
        return newBoard
    } catch (err) {
        console.log('Err from saveBoard in board action :', err)
        throw err
    }
}

export async function saveTask(task) {

    try {
        const { board } = store.getState().boardModule
        const group = board.groups.find(group => group._id === task.groupId)
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

export async function toggleMemberAssigned(memberId, groupId, taskId) {
    const { board: boardToUpdate } = store.getState().boardModule
    const group = boardToUpdate.groups.find(group => group._id === groupId)
    const task = group.tasks.find(task => task._id === taskId)

    if (task.memberIds.includes(memberId)) {
        task.memberIds = task.memberIds.filter(member => member !== memberId)
    } else {
        task.memberIds.push(memberId)
    }
    try {
        saveTask(task)
    } catch (err) {
        console.log('err error from toggle members', err)
        throw err
    }
}

export async function toggleTaskLabel(labelId, groupId, taskId) {
    const { board } = store.getState().boardModule

    const group = board.groups.find(group => group._id === groupId)
    const task = group.tasks.find(task => task._id === taskId)

    if (task.labelIds.includes(labelId)) {
        task.labelIds = task.labelIds.filter(currLabelId => currLabelId !== labelId)
    } else {
        task.labelIds.push(labelId)

    }
    try {
        saveTask(task)
    } catch (err) {
        console.log('err from toggle task label', err)
        throw err
    }
}

export function updateDrag({ source, destination, type }) {
    const { board } = store.getState().boardModule
    const update = type === 'TASK' ? taskService.reorderTasks : boardService.reorderGroups
    const groupsToSave = update(source, destination, board.groups)
    saveBoard({ ...board, groups: groupsToSave })
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