
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { boardService } from './board.service.local.js'

const STORAGE_KEY = 'board'

export const groupService = {
    query,
    getById,
    save,
    remove,
    getEmptyGroup,
    queryTasks,
    getTaskById,
    removeTask,
    saveTask,
    getEmptyTask,
}
window.cs = groupService

// query(boardId)


async function query(boardId) {

    const boards = await boardService.getById(boardId)
    return boards.groups
}

async function getById(boardId, groupId) {
    const groups = await query(boardId)
    return groups.find(group => group._id === groupId) || null
}

async function remove(boardId, groupId) {
    try {
        let board = await boardService.getById(boardId)
        board = board.groups.filter(group => group._id !== groupId)
        await boardService.save(STORAGE_KEY, board)
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
            board.groups.map(currGroup => currGroup._id === group._id ? group : currGroup)
        } else {
            // Later, owner is set by the backend
            group.byMember = userService.getLoggedinUser()
            group._id = utilService.makeId()
            board.groups.push(group)
        }
        await boardService.save(STORAGE_KEY, board)
        return group
    } catch (err) {
        console.log('Cannot save group: ', err)
        throw err
    }
}

function getEmptyGroup() {
    return {
        title: '',
        tasks: [],
        style: {}
    }
}

async function queryTasks(boardId, groupId) {
    const groups = await query(boardId)
    return groups.find(group => group._id === groupId).tasks
}

async function getTaskById(boardId, groupId, taskId) {
    const tasks = queryTasks(boardId, groupId)
    return tasks.find(task => task._id === taskId)
}

async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        let group = board.groups.find(group => group._id === groupId)
        group = group.tasks.filter(task => task._id !== taskId)
        await boardService.save(STORAGE_KEY, board)
    } catch (err) {
        console.log('Cannot remove task: ', err)
        throw err
    }
}

async function saveTask(boardId, groupId, task) {
    try {
        const board = await boardService.getById(boardId)
        let group = board.groups.find(group => group._id === groupId)
        if (task._id) {
            group.tasks.map(currTask => currTask._id === task._id ? task : currTask)
        } else {
            group.byMember = userService.getLoggedinUser()
            group._id = utilService.makeId()
            group.tasks.push(group)
        }
        await boardService.save(STORAGE_KEY, board)
        return group
    } catch (err) {
        console.log('Cannot save task: ', err)
        throw err
    }
}

function getEmptyTask() {
    return {
        title: '',
        description: '',
        comments: [],
        labelsId: [],

    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, { vendor: 'Subali Rahok 2', price: 980 }).then(x => console.log(x))
