
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


// window.cs = boardService
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

}

async function query(filterBy = { title: '' }) {
    const queryParams = `?title=${filterBy.title}`
    return httpService.get(BASE_URL + queryParams)
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

function getById(boardId) {
    return httpService.get(BASE_URL + boardId)
}

async function remove(boardId) {
    return httpService.delete(BASE_URL + boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(BASE_URL + board._id, board)
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
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

        members: []
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

// async function removeGroup(board, groupId) {
function removeGroup(boardId, groupId) {
    try {
        return httpService.delete(`${BASE_URL}${boardId}/${groupId} `)
    } catch (err) {
        console.log('Cannot remove group: ', err)
        throw err
    }
}

async function saveGroup(boardId, group) {
    let savedGroup
    try {
        if (group._id) {
            savedGroup = httpService.put(BASE_URL + boardId + '/group', group)
        } else {
            savedGroup = httpService.post(BASE_URL + boardId + '/group', group)
        }
        return savedGroup
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



