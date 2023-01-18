
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { boardService } from './board.service.local.js'
import { storageService } from './async-storage.service.js'

const TSAK_KEY = 'board'

export const taskService = {
    query,
    getById,
    remove,
    save,
    getEmptyTask,
}
window.cs = taskService

async function query(groupId) {
    let tasks = await storageService.query(TSAK_KEY)
    if (groupId) {
        tasks = tasks.filter(task => task.groupId === groupId)
    }
    return tasks
}

async function getById(taskId) {
    return storageService.get(taskId)
}

async function remove(groupId, task) {
    try {
        task.groupId = ''
        await storageService.save(TSAK_KEY, task)
    } catch (err) {
        console.log('Cannot remove task: ', err)
        throw err
    }
}

async function save(groupId, task) {
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
