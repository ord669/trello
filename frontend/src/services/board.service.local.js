
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { taskService } from './task.service.js'

const STORAGE_KEY = 'board'
_createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getEmpteyFilter,
    getBgImgsURL,
    getImgsFromUnsplash,
    getColors,
    filterGroupsTasks,
    getEmptyGroup,
    saveGroup,
    removeGroup,
    reorderGroups,
    removeTasksFromBoard,
}

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

async function getById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    board.groups = await Promise.all(board.groups.map(async group => {
        const tasks = await Promise.all(group.tasksId.map(taskId => taskService.getById(taskId)))
        group.tasks = tasks

        return group
    }))
    return board
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    const boardForDb = removeTasksFromBoard(structuredClone(board))
    if (board._id) {
        await storageService.put(STORAGE_KEY, boardForDb)
    } else {
        const newBoard = await storageService.post(STORAGE_KEY, boardForDb)
        board._id = newBoard._id
    }
    return board
}

function getEmptyBoard(title = '') {
    return {
        title,
        isstarred: false,
        style: {},
        groups: [],
        activities: [],
        labels: [
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
        style: {
            "background": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1673811922/samples/landscapes/architecture-signs.jpg"

        },
        members: [
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
        ]
    }
}

function getEmpteyFilter() {
    return { title: '' }
}

function getEmptyGroup(title = 'New group') {
    return {
        title,
        tasksId: [],
        tasks: [],
        style: {},
        archivedAt: null
    }
}

async function removeGroup(board, groupId) {
    const newBoard = structuredClone(board)
    try {
        newBoard.groups = newBoard.groups.filter(group => group._id !== groupId)
        await save(newBoard)
        return groupId
    } catch (err) {
        console.log('Cannot remove group: ', err)
        throw err
    }
}

async function saveGroup(board, group) {
    const newBoard = structuredClone(board)
    try {
        if (group._id) {
            newBoard.groups = newBoard.groups.map(currGroup => currGroup._id === group._id ? group : currGroup)
        } else {
            group._id = utilService.makeId()
            newBoard.groups.push(group)
        }
        await save(newBoard)
        return group
    } catch (err) {
        console.log('Cannot save group: ', err)
        throw err
    }
}

function reorderGroups(source, destination, groups) {
    const [group] = groups.splice(source.index, 1)
    groups.splice(destination.index, 0, group)
    return groups
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

function removeTasksFromBoard(board) {
    const groups = board.groups.map(group => {
        delete group.tasks
        return group
    })
    return { ...board, groups }
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
        console.log('loading board from storage');
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
        ]
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}
