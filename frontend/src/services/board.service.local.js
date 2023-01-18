
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardActivity
}
window.cs = boardService
_createBoards()

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
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    let savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardActivity(boardId, txt) {
    // Later, this is all done by the backend
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

function getEmptyBoard() {
    return {
        title: '',
        isstarred: false,
        style: {},
        activities: [],
        labels: [],
        style: {},
        members: []
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = [
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
                "style": {},
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#d6ecd2"
                    },
                    {
                        "id": "l102",
                        "title": "Progress",
                        "color": "#fbf3c0"
                    },
                    {
                        "id": "l103",
                        "title": "Todo",
                        "color": "#fce7c6"
                    },
                    {
                        "id": "l104",
                        "title": "Important",
                        "color": "#f5d3ce"
                    },
                    {
                        "id": "l105",
                        "title": "Urgent",
                        "color": "#efb3ab"
                    },
                    {
                        "id": "l106",
                        "title": "Later",
                        "color": "#dfc0eb"
                    },
                    {
                        "id": "l107",
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
                        "id": "g101",
                        "title": "In Development",
                        "archivedAt": 1589983468410,
                        "tasks": [
                            {
                                "id": "c101",
                                "title": "functional testing for app header",
                                "archivedAt": 1589983468411,
                                "description": "description",
                                "comments": [],
                                "checklists": [
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
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
                                        "id": "a101",
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
                                        "id": "a102",
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
                                        "id": "a103",
                                        "txt": "added this card to In Development",
                                        "createdAt": 154511,
                                        "byMember": {
                                            "_id": "u103",
                                            "username": "Oren Sharizad",
                                            "fullname": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    }
                                ]
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g102",
                        "title": "Backlog-Server",
                        "archivedAt": 1589983478560,
                        "tasks": [
                            {
                                "id": "c102",
                                "title": "Create backend services",
                                "archivedAt": 1589983468411,
                                "description": "",
                                "comments": [],
                                "checklists": [
                                    {
                                        "id": "dsFge",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
                                                "title": "Get packages",
                                                "isDone": false
                                            },
                                            {
                                                "id": "32ttr",
                                                "title": "Open an Atlas account",
                                                "isDone": true
                                            },
                                            {
                                                "id": "0sd9P",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                },
                                "activity": [
                                    {
                                        "id": "a104",
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
                                        "id": "a105",
                                        "txt": "added this card to Backlog-Server",
                                        "createdAt": 1589669468411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c103",
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
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "bgColor": "#26de81",
                                    "img": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                },
                                "Attachments": {
                                    "file": "https://trello.com/1/cards/63c6cb110f16e00169784602/attachments/63c6ccfdecac0d01f83f1e66/download/lhnymyb97mr83uw34vzv.png"
                                },
                                "activity": [
                                    {
                                        "id": "a106",
                                        "txt": "added this card to Backlog-Server",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c104",
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
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "bgColor": ""
                                },
                                "Attachments": {},
                                "activity": [
                                    {
                                        "id": "a108",
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
                                        "id": "a107",
                                        "txt": "added this card to Backlog-Server",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c105",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "bgColor": ""
                                },
                                "Attachments": {},
                                "activity": []
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g103",
                        "title": "Backlog-clinet",
                        "archivedAt": 1589983878560,
                        "tasks": [
                            {
                                "id": "c106",
                                "title": "Provide training and support to other team members",
                                "archivedAt": 1589983468911,
                                "description": "",
                                "comments": [],
                                "checklists": [
                                    {
                                        "id": "54yPP",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "97opd",
                                                "title": "Make an appointment",
                                                "isDone": true
                                            },
                                            {
                                                "id": "956IA",
                                                "title": "Prepare all the details",
                                                "isDone": true
                                            },
                                            {
                                                "id": "LKQ12",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "bgColor": "orange"
                                },
                                "activity": [
                                    {
                                        "id": "a109",
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
                                        "id": "a110",
                                        "txt": "moved this card to Backlog-clinet",
                                        "createdAt": 1589669468411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c107",
                                "title": "Build basic CRUD",
                                "archivedAt": 1693479488411,
                                "description": "Build basic CRUD for users",
                                "comments": [],
                                "checklists": [
                                    {
                                        "id": "Ofe53",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "ueysd",
                                                "title": "Create",
                                                "isDone": true
                                            },
                                            {
                                                "id": "RDsaw",
                                                "title": "Read",
                                                "isDone": true
                                            },
                                            {
                                                "id": "23EDS",
                                                "title": "Update",
                                                "isDone": false
                                            },
                                            {
                                                "id": "bcsv3",
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
                                "byMember": {
                                    "_id": "u103",
                                    "fullname": "Oren Sharizad",
                                    "username": "Oren Sharizad",
                                    "imgUrl": "https://robohash.org/oren?set=set5"
                                },
                                "style": {
                                    "bgColor": "blue"
                                },
                                "Attachments": {},
                                "activity": [
                                    {
                                        "id": "a111",
                                        "txt": "added this card to Backlog-clinet",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u103",
                                            "fullname": "Oren Sharizad",
                                            "username": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c108",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "bgColor": "",
                                    "img": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                },
                                "Attachments": {
                                    "file": "https://trello.com/1/cards/63c6cabe12d00103d58557be/attachments/63c6cad25bf8c801a3c857e3/download/featured-image-PWA.png"
                                },
                                "activity": []
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g104",
                        "title": "Done",
                        "archivedAt": 1612483878560,
                        "tasks": [
                            {
                                "id": "c109",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "bgColor": "darkblue"
                                },
                                "activity": [
                                    {
                                        "id": "a112",
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
                                        "id": "a113",
                                        "txt": "moved this card to Done",
                                        "createdAt": 1612483878560,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c110",
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
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "bgColor": "lightgreen"
                                },
                                "Attachments": {},
                                "activity": [
                                    {
                                        "id": "a114",
                                        "txt": "added label Urgent to this card",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u103",
                                            "fullname": "Oren Sharizad",
                                            "username": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c111",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {},
                                "Attachments": {},
                                "activity": []
                            },
                            {
                                "id": "c112",
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
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "bgColor": "",
                                    "img": "https://trello.com/1/cards/63c6cafd547eff01d743d8f2/attachments/63c6cafd547eff01d743d958/download/Screenshot_2023-01-17_at_18.21.05.png"
                                },
                                "Attachments": {
                                    "file": "https://trello.com/1/cards/63c6cafd547eff01d743d8f2/attachments/63c6cafd547eff01d743d958/download/Screenshot_2023-01-17_at_18.21.05.png"
                                },
                                "activity": [
                                    {
                                        "id": "a115",
                                        "txt": "added an attachment to this card",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ]
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g105",
                        "title": "QA",
                        "archivedAt": 1652483878560,
                        "tasks": [
                            {
                                "id": "c113",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {
                                    "bgColor": "yellow"
                                },
                                "activity": [
                                    {
                                        "id": "a116",
                                        "txt": "changed this card color",
                                        "createdAt": 1612993878560,
                                        "byMember": {
                                            "_id": "u103",
                                            "username": "Oren Sharizad",
                                            "fullname": "Oren Sharizad",
                                            "imgUrl": "https://robohash.org/oren?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c114",
                                "title": "Finish making more customization options",
                                "archivedAt": 1693479488411,
                                "description": "Here we have some description of what the board is about and what rules are in place to co-ordinate the team members...",
                                "comments": [],
                                "checklists": [
                                    {
                                        "id": "EA342",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "31Qq5",
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
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "bgColor": "orange"
                                },
                                "Attachments": {},
                                "activity": [
                                    {
                                        "id": "a117",
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
                                        "id": "a118",
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
                                        "id": "a119",
                                        "txt": "added Checklist to this card",
                                        "createdAt": 1589989488411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c115",
                                "title": "File Management",
                                "archivedAt": 1693482445411,
                                "description": "Files can't be larger than 40MB",
                                "comments": [],
                                "checklists": [
                                    {
                                        "id": "RS43s",
                                        "title": "Todo-List",
                                        "todos": [
                                            {
                                                "id": "sd2D4",
                                                "title": "Upload endpoint returns a 400 error code",
                                                "isDone": false
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ds64s",
                                        "title": "Task Review",
                                        "todos": [
                                            {
                                                "id": "2gfd5",
                                                "title": "Implement endpoint to upload file",
                                                "isDone": true
                                            },
                                            {
                                                "id": "xw523",
                                                "title": "Implement endpoint to validate file",
                                                "isDone": true
                                            },
                                            {
                                                "id": "hd12D",
                                                "title": "Implement endpoint to tag files in folders",
                                                "isDone": true
                                            },
                                            {
                                                "id": "32re2",
                                                "title": "Implement endpoint to store file on cloudinary",
                                                "isDone": true
                                            },
                                            {
                                                "id": "DSF23",
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
                                "byMember": {
                                    "_id": "u102",
                                    "fullname": "Liad Gola",
                                    "username": "Liad Gola",
                                    "imgUrl": "https://robohash.org/Liad?set=set5"
                                },
                                "style": {},
                                "Attachments": {},
                                "activity": []
                            },
                            {
                                "id": "c116",
                                "title": "Automation tests",
                                "archivedAt": 1696572488411,
                                "description": "Unit testing and review of QA team",
                                "comments": [
                                    {
                                        "id": "E21W3",
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
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "bgColor": "lightblue"
                                },
                                "Attachments": {},
                                "activity": [
                                    {
                                        "id": "a120",
                                        "txt": "added a comment to this card",
                                        "createdAt": 1696572588411,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Or Dvir",
                                            "username": "Or Dvir",
                                            "imgUrl": "https://robohash.org/Or?set=set5"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "c117",
                                "title": "Bug fixes",
                                "archivedAt": 1696573488411,
                                "description": "",
                                "comments": [
                                    {
                                        "id": "sd23d",
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
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Or Dvir",
                                    "username": "Or Dvir",
                                    "imgUrl": "https://robohash.org/Or?set=set5"
                                },
                                "style": {
                                    "bgColor": "",
                                    "img": "https://trello.com/1/cards/63c6ca7013479602374fc31d/attachments/63c6ca7013479602374fc33e/download/image.png"
                                },
                                "Attachments": {
                                    "file": "https://trello.com/1/cards/63c6ca7013479602374fc31d/attachments/63c6ca7013479602374fc33e/download/image.png"
                                },
                                "activity": [
                                    {
                                        "id": "a121",
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
                                        "id": "a122",
                                        "txt": "added an attachment to this card",
                                        "createdAt": 1696575488411,
                                        "byMember": {
                                            "_id": "u102",
                                            "fullname": "Liad Gola",
                                            "username": "Liad Gola",
                                            "imgUrl": "https://robohash.org/Liad?set=set5"
                                        }
                                    }
                                ]
                            }
                        ],
                        "style": {}
                    }

                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Or Dvir",
                            "imgUrl": "https://robohash.org/Or?set=set5"
                        },
                        "task": {
                            "id": "c101",
                            "title": "Replace Logo"
                        }
                    }
                ],

                "cmpsOrder": ["status-picker", "member-picker", "date-picker"]

            }
        ]
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}
