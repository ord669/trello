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

async function remove(taskId) {

}

async function save(task) {
  
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

function reorderTasks(source, destination, groups) {
    const sourceGroup = groups.find(group => group._id === source.droppableId)
    const [task] = sourceGroup.tasks.splice(source.index, 1)
    const destinationGroup = groups.find(group => group._id === destination.droppableId)
    destinationGroup.tasks.splice(destination.index, 0, task)
    return groups
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
        "title": '',
        "archivedAt": Date.now(),
        "description": "description",
        "comments": [],
        "checklists": [
            {
                "_id": "YEhmF",
                "title": "Checklist",
                "todos": [
                    {
                        "_id": "212jX",
                        "title": "Make the header responsive",
                        "isDone": false
                    }
                ]
            }
        ],
        "memberIds": [
            "u102"
        ],
        "labelIds": [
            "l104"
        ],
        "dueDate": 16156215211,
        "byMember": {
            "_id": "u103",
            "username": "Oren Sharizad",
            "fullname": "Oren Sharizad",
            "imgUrl": "https://robohash.org/oren?set=set5"
        },
        "style": {
            "bgColor": "#26de81",
            "img": "#26de81"
        },
        "Attachments": {
            "file": "https://trello.com/1/cards/63c6c7e1fa702b025564cfd9/attachments/63c6c7f3d750200091545a10/download/3-Types-of-Functional-Testing.png"
        },
        "activity": [
            {
                "_id": "a101",
                "txt": "added Checklist to this card",
                "createdAt": 154513,
                "byMember": {
                    "_id": "u103",
                    "username": "Oren Sharizad",
                    "fullname": "Oren Sharizad",
                    "imgUrl": "https://robohash.org/oren?set=set5"
                }
            },
            {
                "_id": "a102",
                "txt": "attached 3-Types-of-Functional-Testing.png to this card",
                "createdAt": 154512,
                "byMember": {
                    "_id": "u103",
                    "username": "Oren Sharizad",
                    "fullname": "Oren Sharizad",
                    "imgUrl": "https://robohash.org/oren?set=set5"
                }
            },
            {
                "_id": "a103",
                "txt": "added this card to In Development",
                "createdAt": 154511,
                "byMember": {
                    "_id": "u103",
                    "username": "Oren Sharizad",
                    "fullname": "Oren Sharizad",
                    "imgUrl": "https://robohash.org/oren?set=set5"
                }
            }
        ],
        "groupId": ''
    }
}

function getMembers(board, task) {
    let members = board.members.filter(member => task.memberIds.indexOf(member._id) !== -1)
    return members
}










