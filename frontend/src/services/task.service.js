import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'tasks'

_createTasks()

function _createTasks() {
    const tasks = utilService.loadFromStorage(STORAGE_KEY)
    if (!tasks) {
        storageService._save(STORAGE_KEY, [])
    }
}
export const taskService = {
    remove,
    save,
    // getById,
    getEmptyTask,
    createChecklists,
    getEmptyTodo,
    getEmptyComment,
    getEmptyChecklist,
    getAttachment,
    getMembers,
    reorderTasks,
}

// async function remove(boardId, groupId, taskId) {
//     console.log('boardId, groupId, taskId:', boardId, groupId, taskId);
//     return httpService.delete(`task/${boardId}/${groupId}/${taskId}`)
// }

// async function save(boardId, task) {
//     console.log('boardId:', boardId);
//     let savedTask
//     if (task._id) {
//         savedTask = await httpService.put(`task/${boardId}/${task._id}`, task)
//     } else {
//         // Later, owner is set by the backend
//         // board.owner = userService.getLoggedinUser()
//         savedTask = await httpService.post(`task/${boardId}`, task)
//     }
//     return savedTask
// }
// async function remove(taskId) {
//     return httpService.delete(`task/${taskId}`)
// }

// function getById(taskId) {
//     return storageService.get(STORAGE_KEY, taskId)
// }

async function remove(taskId) {
    return httpService.delete(`task/${taskId}`)
}

async function save(task) {
    let savedTask
    if (task._id) {
        savedTask = await httpService.put(`task/${task._id}`, task)
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedTask = await httpService.post(`task/`, task)
    }
    return savedTask
}

async function reorderTasks(source, destination, groups) {
    const sourceGroup = groups.find(group => group._id === source.droppableId)
    const [task] = sourceGroup.tasks.splice(source.index, 1)
    sourceGroup.tasksId = sourceGroup.tasksId.filter(id => id !== task._id)
    const destinationGroup = groups.find(group => group._id === destination.droppableId)
    task.groupId = destinationGroup._id

    destinationGroup.tasks.splice(destination.index, 0, task)
    destinationGroup.tasksId.splice(destination.index, 0, task._id)
    await save(task)
    return groups
}

function createChecklists(title = 'checklists', todoTitle = 'Write Your Todo') {
    return {
        "_id": utilService.makeId(),
        title,
        "todos": [
            {
                "_id": utilService.makeId(),
                "title": todoTitle,
                "isDone": false
            }
        ]
    }
}

function getAttachment(file, title) {
    return {
        "_id": utilService.makeId(),
        title,
        file,
        createdAt: Date.now()

    }
}

function getEmptyChecklist() {
    return {
        "_id": utilService.makeId(),
        "title": "Checklist",
        "todos": []
    }
}

function getEmptyTodo() {
    return {
        "_id": '',
        "title": "",
        "isDone": false
    }
}

function getEmptyComment() {
    return {
        "_id": utilService.makeId(),
        "txt": "",
        "type": "comment",
        "byMember": userService.getLoggedinUser(),
    }
}

function getEmptyTask(title = '') {
    return {
        title,
        "archivedAt": Date.now(),
        "description": "",
        "comments": [],
        "checklists": [],
        "memberIds": [],
        "labelIds": [],
        "dueDate": 0,
        "isDone": false,
        "byMember": userService.getLoggedinUser(),
        "style": {
            "background": ""
        },
        "attachments": [{
            "createdAt": 1589989488411,
            "_id": "l1",
            "title": "",
            "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
        }],
        "activity": [],
        "groupId": "",
    }
}

function getMembers(board, task) {
    let members = board.members.filter(member => task.memberIds.indexOf(member._id) !== -1)
    return members
}

// async function onCoverChangeBg(task, bg) {
//     task.style.background = bg
//     try {
//     } catch (err) {
//         console.log('err', err)
//     }
// }
