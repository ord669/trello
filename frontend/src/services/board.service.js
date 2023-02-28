
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'board/'

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
    createAiBoard,
    createAiImg,
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

async function query(filterBy = { title: '' }) {
    const queryParams = `?title=${filterBy.title}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(boardId) {
    return httpService.get(BASE_URL + boardId)
}

async function remove(boardId) {
    return httpService.delete(BASE_URL + boardId)
}

async function save(board) {
    const boardForDb = removeTasksFromBoard(structuredClone(board))
    if (board._id) {
        await httpService.put(BASE_URL + board._id, boardForDb)
    } else {
        const newBoard = await httpService.post(BASE_URL, boardForDb)
        board._id = newBoard._id
    }
    return board
}

async function createAiBoard(txt) {
    const prompt = { prompt: txt }
    return await httpService.post(BASE_URL + 'aiboard', prompt)
}

async function createAiImg(txt) {
    const prompt = { prompt: txt }
    const img = await httpService.post(BASE_URL + 'aiimg', prompt)
    return img
}

function getEmptyBoard(title = '') {
    return {
        title,
        isStarred: false,
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
                "imgUrl": "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674737130/Me_q1h5fa.jpg"
            },
            {
                "_id": "u102",
                "fullname": "Liad Gola",
                "username": "Liad Gola",
                "imgUrl": "https://res.cloudinary.com/dug85f2rg/image/upload/v1674737415/liad_tveksl.jpg"
            },
            {
                "_id": "u103",
                "fullname": "Oren Sharizad",
                "username": "Oren Sharizad",
                "imgUrl": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg"
            }
        ]
    }
}

function getEmpteyFilter() {
    return { title: '', memberIds: [] }
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
    try {
        return httpService.delete(`${BASE_URL}${board._id}/${groupId} `)
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
    if (!board.groups) return board
    const groups = board.groups.map(group => {
        delete group.tasks
        return group
    })
    return { ...board, groups }
}

async function getImgsFromUnsplash(val = 'london') {
    const url = `https://api.unsplash.com/search/photos?query=${val}&client_id=3EstyVWkSWr6NLXH18MuOeXbQ8ZaoaBPZW1TGe64YI4`
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
