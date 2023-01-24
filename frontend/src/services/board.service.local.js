
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'
const STORAGE_IMG_KEY = []

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardActivity,
    getEmpteyFilter,
    filterGroupsTasks,
    getBgImgsURL,
    getImgsFromUnsplash,
    getColors
}
window.cs = boardService
_createBoards()

function filterGroupsTasks(board, filterBy = { title: '' }) {
    let filterdBoard = board
    if (filterBy.title !== undefined) {
        const regex = new RegExp(filterBy.title, 'i')
        filterdBoard.groups = filterdBoard.groups.map(group => {
            const tasks = group.tasks.filter(task => regex.test(task.title))
            return { ...group, tasks }
        })
    }
    return filterdBoard
}

async function query(filterBy = { txt: '' }) {
    let boards = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.title))
    }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    let savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardActivity(boardId, txt) {
    const board = await getById(boardId)
    if (!board.activities) board.activities = []
    const activity = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.activities.push(activity)
    await storageService.put(STORAGE_KEY, board)
    return activity
}

function getEmptyBoard(title = '') {
    return {
        title,
        isstarred: false,
        style: {},
        groups: [],
        activities: [],
        labels: [],
        style: {
            "background": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1673811922/samples/landscapes/architecture-signs.jpg"

        },
        // style: {
        //     bgImgURL: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1281x1920/d808adc6ff4e58b7a4620bf4f70a729f/photo-1667391557801-53f64f0a5ffa.jpg",
        //     bgColor: ""
        // },
        members: []
    }
}

function getEmpteyFilter() {
    return { title: '' }
}

function getBgImgsURL() {
    return [
        {
            _id: utilService.makeId(),
            url: 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674294795/background-33_ol2iw7.jpg'
        },
        {
            _id: utilService.makeId(),
            url: 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674294796/backround-22_gemgna.jpg'
        },
        {
            _id: utilService.makeId(),
            url: 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674294794/photo-1673905110274-86b3c5680071_sbomgg.jpg'
        },
        {
            _id: utilService.makeId(),
            url: 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674294790/photo-1674130070695-82aefa76ca67_bgworq.jpg'

        }
    ]
}

function _createBoard(title, url, isStarred) {
    const board = getEmptyBoard(title)
    return {
        ...board,
        _id: utilService.makeId(),
        isStarred,
        style: {
            background: url
        }
    }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        const imgUrls = getBgImgsURL()
        boards = [
            _createBoard('Todos', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, true),
            _createBoard('2023 Goals', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, false),
            _createBoard('Fun Stuff', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, true),
            _createBoard('Shopping List', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, true),
            _createBoard('Sprint 2', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, false),
            _createBoard('My Pet', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, false),
            _createBoard('Project X', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, true),
            _createBoard('My Startup', imgUrls[utilService.getRandomIntInclusive(0, imgUrls.length - 1)].url, false),
            {
                "_id": "b101",
                "title": "Software Development",
                "isStarred": false,
                "archivedAt": 1589983468418,
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Or Dvir",
                    "imgUrl": "https://robohash.org/Or?set=set5"
                },
                "style": {
                    "background": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1673811922/samples/landscapes/architecture-signs.jpg",
                },
                "labels": [
                    {
                        "_id": "l101",
                        "title": "Done",
                        "color": "#d6ecd2"
                    },
                    {
                        "_id": "l102",
                        "title": "Progress",
                        "color": "#fbf3c0"
                    },
                    {
                        "_id": "l103",
                        "title": "Todo",
                        "color": "#fce7c6"
                    },
                    {
                        "_id": "l104",
                        "title": "Important",
                        "color": "#f5d3ce"
                    },
                    {
                        "_id": "l105",
                        "title": "Urgent",
                        "color": "#efb3ab"
                    },
                    {
                        "_id": "l106",
                        "title": "Later",
                        "color": "#dfc0eb"
                    },
                    {
                        "_id": "l107",
                        "title": "Basic",
                        "color": "#e4f0f6"
                    }
                ],
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Or Dvir",
                        "username": "Or Dvir",
                        "imgUrl": "https://robohash.org/Or?set=set5"
                    },
                    {
                        "_id": "u102",
                        "fullname": "Liad Gola",
                        "username": "Liad Gola",
                        "imgUrl": "https://robohash.org/Liad?set=set5"
                    },
                    {
                        "_id": "u103",
                        "fullname": "Oren Sharizad",
                        "username": "Oren Sharizad",
                        "imgUrl": "https://robohash.org/oren?set=set5"
                    }
                ],
                "groups": [
                    {
                        "_id": "g101",
                        "title": "In Development",
                        "archivedAt": 1589983468410,
                        "tasks": [
                            {
                                "_id": "c101",
                                "title": "functional testing for app header",
                                "archivedAt": 1589983468411,
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
                                "isDone": false,
                                "byMember": {
                                    "_id": "u103",
                                    "username": "Oren Sharizad",
                                    "fullname": "Oren Sharizad",
                                    "imgUrl": "https://robohash.org/oren?set=set5"
                                },
                                "style": {
                                    "background": "#26de81"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "l1",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
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
                                "groupId": "g101"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "_id": "g102",
                        "title": "Backlog-Server",
                        "archivedAt": 1589983478560,
                        "tasks": [
                            {
                                "_id": "c102",
                                "title": "Create backend services",
                                "archivedAt": 1589983468411,
                                "description": "",
                                "comments": [],
                                "checklists": [
                                    {
                                        "_id": "dsFge",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "_id": "212jX",
                                                "title": "Get packages",
                                                "isDone": false
                                            },
                                            {
                                                "_id": "32ttr",
                                                "title": "Open an Atlas account",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "0sd9P",
                                                "title": "Node js modules",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ],
                                "memberIds": [
                                    "u101"
                                ],
                                "labelIds": [
                                    "l102"
                                ],
                                "dueDate": 1589999468411,
                                "isDone": true,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "#26de81"
                                },
                                "activity": [
                                    {
                                        "_id": "a104",
                                        "txt": "added Checklist to this card",
                                        "createdAt": 1589669463411,
                                        "byMember": {
                                            "_id": "u103",
                                            "username": "Oren Sharizad",
                                            "fullname": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    },
                                    {
                                        "_id": "a150",
                                        "txt": "added this card to Backlog-Server",
                                        "createdAt": 1589669468411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g102"
                            },
                            {
                                "_id": "c103",
                                "title": "Connect the data with MongoDB",
                                "archivedAt": 1589989488411,
                                "description": "Change the all css in the app to Scss",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [],
                                "labelIds": [
                                    "l104",
                                    "l106",
                                    "l107"
                                ],
                                "dueDate": 1599989488411,
                                "isDone": true,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "background": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png",
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "ojasf",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a106",
                                        "txt": "added this card to Backlog-Server",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g102"
                            },
                            {
                                "_id": "c104",
                                "title": "More customization options",
                                "archivedAt": 1589954488411,
                                "description": "",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u101",
                                    "u102"
                                ],
                                "labelIds": [
                                    "l101",
                                    "l102",
                                    "l104"
                                ],
                                "dueDate": 1599989488411,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "background": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo101",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a108",
                                        "txt": "added label Progress to this card card",
                                        "createdAt": 1589999488411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    },
                                    {
                                        "_id": "a107",
                                        "txt": "added this card to Backlog-Server",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g102"
                            },
                            {
                                "_id": "c105",
                                "title": "Sanity test for new component",
                                "archivedAt": 1589957488411,
                                "description": "",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u102"
                                ],
                                "labelIds": [],
                                "dueDate": null,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo102",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                }],
                                "activity": [],
                                "groupId": "g102"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "_id": "g103",
                        "title": "Backlog-clinet",
                        "archivedAt": 1589983878560,
                        "tasks": [
                            {
                                "_id": "c106",
                                "title": "Provide training and support to other team members",
                                "archivedAt": 1589983468911,
                                "description": "",
                                "comments": [],
                                "checklists": [
                                    {
                                        "_id": "54yPP",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "_id": "97opd",
                                                "title": "Make an appointment",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "956IA",
                                                "title": "Prepare all the details",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "LKQ12",
                                                "title": "Sum up everything",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ],
                                "memberIds": [
                                    "u102",
                                    "u103"
                                ],
                                "labelIds": [
                                    "l101",
                                    "l102"
                                ],
                                "dueDate": 1689122468411,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "orange"
                                },
                                "activity": [
                                    {
                                        "_id": "a109",
                                        "txt": "added Checklist to this card",
                                        "createdAt": 1589669463411,
                                        "byMember": {
                                            "_id": "u103",
                                            "username": "Oren Sharizad",
                                            "fullname": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    },
                                    {
                                        "_id": "a110",
                                        "txt": "moved this card to Backlog-clinet",
                                        "createdAt": 1589669468411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g103"
                            },
                            {
                                "_id": "c107",
                                "title": "Build basic CRUD",
                                "archivedAt": 1693479488411,
                                "description": "Build basic CRUD for users",
                                "comments": [],
                                "checklists": [
                                    {
                                        "_id": "Ofe53",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "_id": "ueysd",
                                                "title": "Create",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "RDsaw",
                                                "title": "Read",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "23EDS",
                                                "title": "Update",
                                                "isDone": false
                                            },
                                            {
                                                "_id": "bcsv3",
                                                "title": "Delete",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ],
                                "memberIds": [
                                    "u101",
                                    "u103"
                                ],
                                "labelIds": [
                                    "l102"
                                ],
                                "dueDate": 1693489488411,
                                "isDone": true,
                                "byMember": {
                                    "_id": "u103",
                                    "fullname": "Oren Sharizad",
                                    "username": "Oren Sharizad",
                                    "imgUrl": "https://robohash.org/oren?set=set5"
                                },
                                "style": {
                                    "background": "blue"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo103",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a111",
                                        "txt": "added this card to Backlog-clinet",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u103",
                                            "fullname": "Oren Sharizad",
                                            "username": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g103"
                            },
                            {
                                "_id": "c108",
                                "title": "Connecting to PWA",
                                "archivedAt": 1693472488411,
                                "description": "",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u101",
                                    "u102"
                                ],
                                "labelIds": [
                                    "l104"
                                ],
                                "dueDate": null,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo104",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                },
                                {
                                    "createdAt": 1589989488411,
                                    "_id": "lo105",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                }],
                                "activity": [],
                                "groupId": "g103"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "_id": "g104",
                        "title": "Done",
                        "archivedAt": 1612483878560,
                        "tasks": [
                            {
                                "_id": "c109",
                                "title": "Apply socket service",
                                "archivedAt": 1612483878560,
                                "description": "Here we have some description of what the board is about and what rules are in place to co-ordinate the team members...",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u102",
                                    "u103"
                                ],
                                "labelIds": [
                                    "l104",
                                    "l106"
                                ],
                                "dueDate": 1612489978560,
                                "isDone": true,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "darkblue"
                                },
                                "activity": [
                                    {
                                        "_id": "a112",
                                        "txt": "changed this card color",
                                        "createdAt": 1612993878560,
                                        "byMember": {
                                            "_id": "u103",
                                            "username": "Oren Sharizad",
                                            "fullname": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    },
                                    {
                                        "_id": "a113",
                                        "txt": "moved this card to Done",
                                        "createdAt": 1612483878560,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g104"
                            },
                            {
                                "_id": "c110",
                                "title": "Add user authentication",
                                "archivedAt": 1693479488411,
                                "description": "Here we have some description of what the board is about and what rules are in place to co-ordinate the team members...",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u101",
                                    "u103"
                                ],
                                "labelIds": [
                                    "l102",
                                    "l103",
                                    "l105",
                                    "l107"
                                ],
                                "dueDate": 1693489488411,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "background": "lightgreen"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo106",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a114",
                                        "txt": "added label Urgent to this card",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u103",
                                            "fullname": "Oren Sharizad",
                                            "username": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g104"
                            },
                            {
                                "_id": "c111",
                                "title": "Database implementation",
                                "archivedAt": 1693472445411,
                                "description": "Need to finish JSON data ASAP",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u102"
                                ],
                                "labelIds": [
                                    "l101",
                                    "l103",
                                    "l106"
                                ],
                                "dueDate": 1693492445411,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "lightgreen"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo1017",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
                                "activity": [],
                                "groupId": "g104"
                            },
                            {
                                "_id": "c112",
                                "title": "Node",
                                "archivedAt": 1696472488411,
                                "description": "",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u101"
                                ],
                                "labelIds": [],
                                "dueDate": null,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "background": "https://trello.com/1/cards/63c6cafd547eff01d743d8f2/attachments/63c6cafd547eff01d743d958/download/Screenshot_2023-01-17_at_18.21.05.png"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo12201",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a115",
                                        "txt": "added an attachment to this card",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g104"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "_id": "g105",
                        "title": "QA",
                        "archivedAt": 1652483878560,
                        "tasks": [
                            {
                                "_id": "c113",
                                "title": "Testing",
                                "archivedAt": 1612483878560,
                                "description": "Here we have some description of what the board is about and what rules are in place to co-ordinate the team members...",
                                "comments": [],
                                "checklists": [],
                                "memberIds": [
                                    "u102"
                                ],
                                "labelIds": [],
                                "dueDate": 1612589978560,
                                "isDone": true,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "lightgreen"
                                },
                                "activity": [
                                    {
                                        "_id": "a116",
                                        "txt": "changed this card color",
                                        "createdAt": 1612993878560,
                                        "byMember": {
                                            "_id": "u103",
                                            "username": "Oren Sharizad",
                                            "fullname": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g105"
                            },
                            {
                                "_id": "c114",
                                "title": "Finish making more customization options",
                                "archivedAt": 1693479488411,
                                "description": "Here we have some description of what the board is about and what rules are in place to co-ordinate the team members...",
                                "comments": [],
                                "checklists": [
                                    {
                                        "_id": "EA342",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "_id": "31Qq5",
                                                "title": "Check software",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ],
                                "memberIds": [
                                    "u101",
                                    "u103",
                                    "u102"
                                ],
                                "labelIds": [
                                    "l101",
                                    "l102",
                                    "l103",
                                    "l104"
                                ],
                                "dueDate": 1693489988411,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "background": "orange"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lo112301",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a117",
                                        "txt": "added label Important to this card",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u103",
                                            "fullname": "Oren Sharizad",
                                            "username": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    },
                                    {
                                        "_id": "a118",
                                        "txt": "moved this card to QA",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    },
                                    {
                                        "_id": "a119",
                                        "txt": "added Checklist to this card",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g105"
                            },
                            {
                                "_id": "c115",
                                "title": "File Management",
                                "archivedAt": 1693482445411,
                                "description": "Files can't be larger than 40MB",
                                "comments": [],
                                "checklists": [
                                    {
                                        "_id": "RS43s",
                                        "title": "Todo-List",
                                        "todos": [
                                            {
                                                "_id": "sd2D4",
                                                "title": "Upload endpoint returns a 400 error code",
                                                "isDone": false
                                            }
                                        ]
                                    },
                                    {
                                        "_id": "ds64s",
                                        "title": "Task Review",
                                        "todos": [
                                            {
                                                "_id": "2gfd5",
                                                "title": "Implement endpoint to upload file",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "xw523",
                                                "title": "Implement endpoint to validate file",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "hd12D",
                                                "title": "Implement endpoint to tag files in folders",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "32re2",
                                                "title": "Implement endpoint to store file on cloudinary",
                                                "isDone": true
                                            },
                                            {
                                                "_id": "DSF23",
                                                "title": "Create a form to send upload request",
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
                                "dueDate": 1693492445411,
                                "isDone": true,
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "background": "orange"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "1123",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
                                "activity": [],
                                "groupId": "g105"
                            },
                            {
                                "_id": "c116",
                                "title": "Automation tests",
                                "archivedAt": 1696572488411,
                                "description": "Unit testing and review of QA team",
                                "comments": [
                                    {
                                        "_id": "E21W3",
                                        "txt": "Please Check Again, Found some Bugs",
                                        "createdAt": 1696572588411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ],
                                "checklists": [],
                                "memberIds": [
                                    "u103"
                                ],
                                "labelIds": [],
                                "dueDate": null,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "background": "lightblue"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "lxcvo101",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a120",
                                        "txt": "added a comment to this card",
                                        "createdAt": 1696572588411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g105"
                            },
                            {
                                "_id": "c117",
                                "title": "Bug fixes",
                                "archivedAt": 1696573488411,
                                "description": "",
                                "comments": [
                                    {
                                        "_id": "sd23d",
                                        "txt": "Joined Bugs",
                                        "createdAt": 1696575488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ],
                                "checklists": [],
                                "memberIds": [
                                    "u101",
                                    "u102"
                                ],
                                "labelIds": [],
                                "dueDate": null,
                                "isDone": false,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "background": "https://trello.com/1/cards/63c6ca7013479602374fc31d/attachments/63c6ca7013479602374fc33e/download/image.png"
                                },
                                "attachments": [{
                                    "createdAt": 1589989488411,
                                    "_id": "loxegre101",
                                    "title": "",
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                }],
                                "activity": [
                                    {
                                        "_id": "a121",
                                        "txt": "added a comment to this card",
                                        "createdAt": 1696575488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    },
                                    {
                                        "_id": "a122",
                                        "txt": "added an attachment to this card",
                                        "createdAt": 1696575488411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ],
                                "groupId": "g105"
                            }
                        ],
                        "style": {}
                    }
                ],
                "activities": [
                    {
                        "_id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Or Dvir",
                            "imgUrl": "https://robohash.org/Or?set=set5"
                        },
                        "type": "act",
                        "task": {
                            "_id": "c101",
                            "title": "Replace Logo"
                        }
                    },
                    {
                        "_id": "a102",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Or Dvir",
                            "imgUrl": "https://robohash.org/Or?set=set5"
                        },
                        "type": "act",
                        "task": {
                            "_id": "c101",
                            "title": "Replace Logo"
                        }
                    },
                    {
                        "_id": "a103",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Or Dvir",
                            "imgUrl": "https://robohash.org/Or?set=set5"
                        },
                        "type": "act",
                        "task": {
                            "_id": "c101",
                            "title": "Replace Logo"
                        }
                    },
                    {
                        "_id": "a104",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Or Dvir",
                            "imgUrl": "https://robohash.org/Or?set=set5"
                        },
                        "type": "act",
                        "task": {
                            "_id": "c102",
                            "title": "Replace Logo"
                        }
                    },
                    {
                        "_id": "a105",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Or Dvir",
                            "imgUrl": "https://robohash.org/Or?set=set5"
                        },
                        "type": "act",
                        "task": {
                            "_id": "c102",
                            "title": "Replace Logo"
                        }
                    },
                    {
                        "_id": "a505",
                        "txt": "Good job guys",
                        "createdAt": 1299438834,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Or Dvir",
                            "imgUrl": "https://robohash.org/Or?set=set5"
                        },
                        "type": "comment",
                        "task": {
                            "_id": "c102",
                            "title": "Replace Logo"
                        }
                    }
                ],
                "cmpsOrder": [
                    "status-picker",
                    "member-picker",
                    "date-picker"
                ]
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}

async function getImgsFromUnsplash(val = 'london') {
    const url = `https://api.unsplash.com/search/photos?query=${val}&client_id=3EstyVWkSWr6NLXH18MuOeXbQ8ZaoaBPZW1TGe64YI4`
    // return fetch(url).then((res) => res.json())
    try {
        const res = await fetch(url)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

function getColors() {
    return ['#0279C0', '#D29034', '#529839', '#B04632', '#89609E', '#CD5A91', '#4ABF6A', '#06AECC', '#838C91', '#172b4d']
}
