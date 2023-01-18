
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
    addCarMsg: addBoardActivity
}
window.cs = boardService


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
        board.owner = userService.getLoggedinUser()
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




