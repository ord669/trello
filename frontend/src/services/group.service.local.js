
import { utilService } from './util.service.js'
import { boardService } from './board.service.local.js'

export const groupService = {
    query,
    getById,
    save,
    remove,
    getEmptyGroup,
    reorderGroups,
    reorderTasks,
    setNewCheckList,
    getEmptyTodo,
}
window.cs = groupService

async function query(boardId) {
    const board = await boardService.getById(boardId)
    if (board) throw new Error('Board not found')
    return board.groups
}

async function getById(boardId, groupId) {
    const groups = await query(boardId)
    return groups.find(group => group._id === groupId)
}

async function remove(boardId, groupId) {
    try {
        let board = await boardService.getById(boardId)
        board.groups = board.groups.filter(group => group._id !== groupId)
        await boardService.save(board)
    } catch (err) {
        console.log('Cannot remove group: ', err)
        throw err
    }
}

async function save(boardId, group) {
    try {
        const board = await boardService.getById(boardId)
        if (!board.groups) board.groups = []
        if (group._id) {
            board.groups = board.groups.map(currGroup => currGroup._id === group._id ? group : currGroup)
        } else {
            group._id = utilService.makeId()
            board.groups.push(group)
        }
        await boardService.save(board)
        return group
    } catch (err) {
        console.log('Cannot save group: ', err)
        throw err
    }
}

function getEmptyGroup(title = '') {
    return {
        title,
        tasks: [],
        style: {},
        archivedAt: null
    }
}

function reorderTasks(source, destination, groups) {
    const [task] = groups.find(group => group._id === source.droppableId)
        .tasks.splice(source.index, 1)
    groups.find(group => group._id === destination.droppableId)
        .tasks.splice(destination.index, 0, task)
    return groups
}
function reorderGroups(source, destination, groups) {
    const [group] = groups.splice(source.index, 1)
    groups.splice(destination.index, 0, group)
    return groups
}

function setNewCheckList(title) {
    return {
        "_id": "YEhmF",
        "title": title,
        "todos": []
    }
}

function getEmptyTodo() {
    return {
        "_id": utilService.makeId(),
        "title": "",
        "isDone": false
    }
}