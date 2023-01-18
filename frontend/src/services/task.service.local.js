
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const taskService = {
    setTaskInBoard,
    removeTaskFromBoard,
    getEmptyTask
}

function setTaskInBoard() {

}

function removeTaskFromBoard() {

}

function getEmptyTask(groupId, title) {
    return {
        "_id": utilService.makeId(),
        "title": title,
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
        "groupId": groupId
    }
}
