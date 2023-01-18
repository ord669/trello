
import { utilService } from './util.service.js'
import { boardService } from './board.service.local.js'

export const groupService = {
    query,
    getById,
    save,
    remove,
    getEmptyGroup,
}
window.cs = groupService

async function query(boardId) {
    const board = await boardService.getById(boardId)
    if (board) throw new Error('Board not found')
    return board.groups
}

async function getById(boardId, groupId) {
    const groups = await query(boardId)
    return groups.find(group => group._id === groupId)
}

async function remove(boardId, groupId) {
    try {
        let board = await boardService.getById(boardId)
        board.groups = board.groups.filter(group => group._id !== groupId)
        await boardService.save(board)
    } catch (err) {
        console.log('Cannot remove group: ', err)
        throw err
    }
}

async function save(boardId, group) {
    try {
        const board = await boardService.getById(boardId)
        if (!board.groups) board.groups = []
        if (group._id) {
            board.groups = board.groups.map(currGroup => currGroup._id === group._id ? group : currGroup)
        } else {
            group._id = utilService.makeId()
            board.groups.push(group)
        }
        await boardService.save(board)
        return group
    } catch (err) {
        console.log('Cannot save group: ', err)
        throw err
    }
}

function getEmptyGroup() {
    return {
        title: '',
        tasks: [],
        style: {}
    }
}
