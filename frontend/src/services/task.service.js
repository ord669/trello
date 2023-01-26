import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

export const taskService = {
    remove,
    save,
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
    sourceGroup.tasksId.splice(source.index, 1)
    const destinationGroup = groups.find(group => group._id === destination.droppableId)
    task.groupId = destinationGroup._id
    // save(task)
    // try {
    //     await save(task)
    //     destinationGroup.tasks.splice(destination.index, 0, task)
    //     destinationGroup.tasksId.splice(destination.index, 0, task._id)
    //     return groups
    // } catch (err) {
    //     console.log('Cannot save task drag', err)
    // }
    destinationGroup.tasks.splice(destination.index, 0, task)
    destinationGroup.tasksId.splice(destination.index, 0, task._id)
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
        // "_id": utilService.makeId(),
        "title": "",
        "isDone": false
    }
}

function getEmptyComment() {
    return {
        "_id": utilService.makeId(),
        "txt": "",
        "type": "comment",
        "byMember": {
            "_id": "u101",
            "fullname": "Or Dvir",
            "imgUrl": "https://robohash.org/Or?set=set5"
        },
    }
}

function getEmptyTask() {
    return {
        "title": "",
        "archivedAt": Date.now(),
        "description": "description",
        "comments": [],
        "checklists": [],
        "memberIds": [
            "u102"
        ],
        "labelIds": [
            "l104"
        ],
        "dueDate": 16156215211,
        "isDone": false,
        "byMember": {
            "_id": "u103",
            "username": "Oren Sharizad",
            "fullname": "Oren Sharizad",
            "imgUrl": "https://robohash.org/oren?set=set5"
        },
        "style": {
            "background": "#26DE81"
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