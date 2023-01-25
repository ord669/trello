const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const taskService = require('../task/task.service')

async function query(filterBy = { title: '' }) {
    try {
        // const criteria = _buildCriteria(filterBy)
        // console.log('criteria: ', criteria);
        const collection = await dbService.getCollection('board')
        const boards = await collection.find().toArray()
        console.log('boards: ', boards)
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}


async function getById(boardId) {
    console.log('boardId:', boardId)
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ _id: ObjectId(boardId) })
        board.groups = await Promise.all(board.groups.map(async group => {
            const tasks = await Promise.all(group.tasksId.map(taskId => taskService.getById(taskId)))
            group.tasks = tasks
            return group
        }))
        console.log('board:', board)
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    console.log('board:', board)
    try {
        const boardToSave = {
            title: board.title,
            background: board.background,
            isStarred: board.isStarred
        }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(board._id) }, { $set: boardToSave })
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

async function addGroupToBoard(boardId, group) {
    try {
        group._id = utilService.makeId()
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(boardId) }, { $push: { 'groups': group } })
        return group
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function updateGroupToBoard(boardId,group){
    try {
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(boardId) }, { $push: { 'groups': group } })
        return group
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title !== 'undefined') criteria.title = filterBy.title
    return criteria
}



module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addGroupToBoard,
}
